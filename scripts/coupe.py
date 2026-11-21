#!/usr/bin/env python3
"""Coupe brute d'une vidéo face caméra (le « rush » filmé au téléphone).

Étape 1, la liste des coupes (rien n'est encore fabriqué) :
  python3 coupe.py rush.mp4                 -> work/mots.json (transcription, une seule fois)
                                              work/coupes.json + work/coupes.txt (à montrer à l'utilisateur)
Étape 2, après son accord (il peut modifier coupes.json) :
  python3 coupe.py rush.mp4 --fabriquer     -> work/coupe.mp4, vérifiée image par image

Ce qui est coupé : les blancs, les « euh / heu / hum / bah », les faux départs et les phrases
redites (on garde la dernière prise complète). La personnalité et les tics de langage utiles restent.
Chaque morceau garde un peu d'air (0,08 s avant, 0,12 s après) sans mordre sur un mot coupé,
les bords sont calés sur les images et deux morceaux ne se chevauchent jamais.
Options : --blanc 0.45 (blanc maximum gardé, en s) --lang fr --model small --out work
"""
import argparse, os, json, re, subprocess, shutil, hashlib, unicodedata

def _ff(name='ffmpeg'):
    if name == 'ffmpeg' and os.environ.get('FFMPEG_PATH'): return os.environ['FFMPEG_PATH']
    if shutil.which(name): return name
    try:
        import imageio_ffmpeg; return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception: return name
FF = _ff()

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('--fabriquer', action='store_true')
ap.add_argument('--blanc', type=float, default=0.45); ap.add_argument('--lang', default='fr')
ap.add_argument('--model', default='small'); ap.add_argument('--out', default='work')
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)

def info(path):
    """fps, durée, largeur, hauteur, lus avec ffmpeg (ffprobe n'est pas toujours là)."""
    r = subprocess.run([FF, '-hide_banner', '-i', path], capture_output=True, text=True).stderr
    fps = re.search(r'(\d+(?:\.\d+)?) fps', r); d = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', r)
    wh = re.search(r'Video:.*?(\d{3,5})x(\d{3,5})', r); rot = re.search(r'rotation of (-?\d+)', r)
    dur = int(d[1]) * 3600 + int(d[2]) * 60 + float(d[3]) if d else 0
    w, h = (int(wh[1]), int(wh[2])) if wh else (0, 0)
    if rot and abs(int(rot[1])) == 90: w, h = h, w
    return float(fps[1]) if fps else 30.0, dur, w, h

FPS, DUR, W, H = info(a.video)
mj = os.path.join(a.out, 'mots.json')
key = hashlib.md5(f"{os.path.abspath(a.video)}:{os.path.getsize(a.video)}".encode()).hexdigest()[:12]

# 1) transcription mot à mot, une seule fois par rush
if not (os.path.exists(mj) and json.load(open(mj)).get('cle') == key):
    import numpy as np
    from faster_whisper import WhisperModel
    raw = subprocess.run([FF, '-v', 'error', '-i', a.video, '-vn', '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'], capture_output=True, check=True).stdout
    m = WhisperModel(a.model, device='cpu', compute_type='int8')
    seg, _ = m.transcribe(np.frombuffer(raw, np.float32), language=a.lang, word_timestamps=True, vad_filter=False,
                          initial_prompt="Euh, heu, bon, alors… voilà.")
    mots = [[w.word.strip(), round(w.start, 3), round(w.end, 3)] for s in seg for w in s.words if w.word.strip()]
    json.dump({'cle': key, 'mots': mots}, open(mj, 'w'), ensure_ascii=False)
mots = json.load(open(mj))['mots']

if not a.fabriquer:
    def norm(t):
        t = unicodedata.normalize('NFD', t.lower()); t = ''.join(c for c in t if unicodedata.category(c) != 'Mn')
        return re.sub(r"[^a-z0-9']", '', t)
    FILL = {'euh', 'heu', 'hum', 'hmm', 'bah', 'ben', 'euhm', 'mmh', 'hein'}
    # phrases = suites de mots séparées par un blanc ou une ponctuation forte
    phr, cur = [], []
    for i, (t, s, e) in enumerate(mots):
        if cur and (s - mots[i - 1][2] > 0.6): phr.append(cur); cur = []
        cur.append(i)
        if re.search(r'[.!?…]$', t): phr.append(cur); cur = []
    if cur: phr.append(cur)
    keep = [True] * len(mots)
    for i, (t, s, e) in enumerate(mots):
        if norm(t) in FILL: keep[i] = False
    # redites : une phrase dont le début (3 mots) est repris par une des 3 phrases suivantes -> on garde la dernière prise
    for k, p in enumerate(phr):
        head = ' '.join(norm(mots[i][0]) for i in p if keep[i]).split()[:3]
        if len(head) < 2: continue
        for q in phr[k + 1:k + 4]:
            if ' '.join(norm(mots[i][0]) for i in q if keep[i]).split()[:3] == head:
                for i in p: keep[i] = False
                break
    # faux départ : phrase de 1 à 3 mots coupée net, suivie d'une phrase qui commence pareil
    for k, p in enumerate(phr[:-1]):
        ws = [norm(mots[i][0]) for i in p if keep[i]]
        nx = [norm(mots[i][0]) for i in phr[k + 1] if keep[i]]
        if 0 < len(ws) <= 3 and nx[:1] == ws[:1] and not re.search(r'[.!?…]$', mots[p[-1]][0]):
            for i in p: keep[i] = False
    # morceaux gardés, avec un peu d'air sans mordre sur un mot coupé
    PRE, POST = 0.08, 0.12
    segs = []
    for i, (t, s, e) in enumerate(mots):
        if not keep[i]: continue
        if segs and s - segs[-1]['_e'] <= a.blanc and all(keep[j] for j in range(segs[-1]['_last'] + 1, i)):
            segs[-1]['_e'] = e; segs[-1]['_last'] = i; segs[-1]['text'] += ('' if t[:1] in "'-" else ' ') + t
        else:
            segs.append({'_s': s, '_e': e, '_first': i, '_last': i, 'text': t})
    out = []
    for k, g in enumerate(segs):
        lo = mots[g['_first'] - 1][2] if g['_first'] > 0 else 0.0
        hi = mots[g['_last'] + 1][1] if g['_last'] + 1 < len(mots) else DUR
        st = max(lo, g['_s'] - PRE, 0.0); en = min(hi, g['_e'] + POST, DUR)
        if out and st < out[-1]['end']:
            mid = (out[-1]['end'] + st) / 2; out[-1]['end'] = mid; st = mid
        snap = lambda x: round(round(x * FPS) / FPS, 4)
        out.append({'start': snap(st), 'end': snap(en), 'text': g['text']})
    out = [o for o in out if o['end'] - o['start'] >= 2 / FPS]
    json.dump({'fps': FPS, 'source': os.path.abspath(a.video), 'segments': out}, open(os.path.join(a.out, 'coupes.json'), 'w'), ensure_ascii=False, indent=1)
    tot = sum(o['end'] - o['start'] for o in out)
    cut = [mots[i][0] for i in range(len(mots)) if not keep[i]]
    lines = [f"Rush : {DUR:.1f} s  ->  coupe : {tot:.1f} s  ({len(out)} morceaux, {FPS:g} i/s, {W}x{H})", '']
    lines += [f"{k + 1:>2}. {o['start']:7.2f} → {o['end']:7.2f}  {o['text']}" for k, o in enumerate(out)]
    lines += ['', f"Mots retirés ({len(cut)}) : " + ' · '.join(cut[:60]) + (' …' if len(cut) > 60 else '')]
    open(os.path.join(a.out, 'coupes.txt'), 'w').write('\n'.join(lines))
    print('\n'.join(lines)); print('\nMontre cette liste et attends l\'accord avant --fabriquer.')
    raise SystemExit

# 2) fabrication : un seul graphe ffmpeg, coupes franches calées sur les images, micro-fondus audio (pas de clic)
C = json.load(open(os.path.join(a.out, 'coupes.json'))); S = C['segments']
fc, n = [], len(S)
for k, o in enumerate(S):
    d = o['end'] - o['start']; f = min(0.006, d / 4)
    fc.append(f"[0:v]trim=start_frame={round(o['start'] * C['fps'])}:end_frame={round(o['end'] * C['fps'])},setpts=PTS-STARTPTS[v{k}]")
    fc.append(f"[0:a]atrim=start={o['start']}:end={o['end']},asetpts=PTS-STARTPTS,afade=t=in:d={f},afade=t=out:st={d - f:.4f}:d={f}[a{k}]")
fc.append(''.join(f'[v{k}][a{k}]' for k in range(n)) + f'concat=n={n}:v=1:a=1[v][a]')
dst = os.path.join(a.out, 'coupe.mp4')
subprocess.run([FF, '-v', 'error', '-y', '-i', a.video, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]',
                '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17', '-pix_fmt', 'yuv420p', '-fps_mode', 'passthrough',
                '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', dst], check=True)
# preuve : le nombre d'images rendues doit égaler la somme des morceaux, image pour image
attendu = sum(round(o['end'] * C['fps']) - round(o['start'] * C['fps']) for o in S)
r = subprocess.run([FF, '-hide_banner', '-i', dst, '-map', '0:v', '-f', 'null', '-'], capture_output=True, text=True).stderr
got = int(re.findall(r'frame=\s*(\d+)', r)[-1])
ok = got == attendu
print(f"{'✓' if ok else '✗'} coupe.mp4 : {got} images = {got / C['fps']:.2f} s (attendu {attendu} images, {n} morceaux)")
if not ok: raise SystemExit("Le nombre d'images ne correspond pas : vérifie coupes.json avant d'aller plus loin.")
