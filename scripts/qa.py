#!/usr/bin/env python3
"""Contrôle qualité automatique de la vidéo finale, AVANT de l'envoyer.

  python3 qa.py video.mp4 [--format 9:16|16:9|4:5] [--cible reseaux|youtube] [--script script.txt]

Vérifie, sans jugement de goût : format et taille, images par seconde régulières, couleurs bt709,
son présent et au bon niveau, crête sous -1 dBTP, aucune image noire ou figée trop longue,
aucun silence trop long, et (avec --script) que la voix dit bien le texte prévu.
Chaque ligne est ✓ ou ✗. Corrige tous les ✗ avant de montrer la vidéo : l'utilisateur ne juge que le goût.
"""
import argparse, json, os, re, shutil, subprocess, sys, unicodedata
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from audio import FF, CIBLES, mesure

ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--format', default='')
ap.add_argument('--cible', default='reseaux', choices=CIBLES); ap.add_argument('--script')
ap.add_argument('--lang', default='fr', help='langue de la voix (fr, en… ; wo = wolof : contrôle voix/script sauté)')
ap.add_argument('--fige', type=float, default=4.0, help='durée max sans aucun mouvement (s)')
a = ap.parse_args()
res = []
def ok(c, txt): res.append(c); print(('✓ ' if c else '✗ ') + txt)

r = subprocess.run([FF, '-hide_banner', '-i', a.video], capture_output=True, text=True).stderr
d = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', r); dur = int(d[1]) * 3600 + int(d[2]) * 60 + float(d[3])
v = re.search(r'Video: (\w+).*?, (\w+)(?:\(([^)]*)\))?, (\d{3,5})x(\d{3,5})', r)
fps = float(re.search(r'(\d+(?:\.\d+)?) fps', r)[1]); has_a = 'Audio:' in r
W, H = int(v[4]), int(v[5])
FMT = {'9:16': (1080, 1920), '16:9': (1920, 1080), '4:5': (1080, 1350)}
if a.format: ok((W, H) == FMT[a.format], f"taille {W}×{H} (attendu {FMT[a.format][0]}×{FMT[a.format][1]} pour {a.format})")
else: ok(W % 2 == 0 and H % 2 == 0 and min(W, H) >= 720, f"taille {W}×{H}")
ok(v[1] == 'h264' and v[2].startswith('yuv420p'), f"vidéo {v[1]} {v[2]} (h264 yuv420p lisible partout)")
ok('bt709' in (v[3] or '') or 'bt709' in r, "couleurs marquées bt709" + ('' if 'bt709' in r else " (ajoute -colorspace bt709 -color_primaries bt709 -color_trc bt709)"))
ok(abs(fps - round(fps)) < 0.02 and 24 <= fps <= 60, f"{fps:g} images/s")
ok(dur > 1, f"durée {dur:.2f} s")

# images noires et images figées
r2 = subprocess.run([FF, '-hide_banner', '-nostats', '-i', a.video, '-vf', f'blackdetect=d=0.4:pix_th=0.06,freezedetect=n=0.002:d={a.fige}', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
blacks = re.findall(r'black_start:([\d.]+) black_end:([\d.]+)', r2)
blacks = [(float(s), float(e)) for s, e in blacks if not (float(s) < 0.05 or float(e) > dur - 0.6)]
ok(not blacks, "aucune image noire au milieu" + ('' if not blacks else ' : ' + ', '.join(f'{s:.1f}–{e:.1f} s' for s, e in blacks)))
fz = re.findall(r'freeze_start: ([\d.]+)', r2)
ok(not fz, f"rien de figé plus de {a.fige:g} s" + ('' if not fz else ' : à ' + ', '.join(f'{float(x):.1f} s' for x in fz)))

if not has_a: ok(False, "aucune piste son")
else:
    I, TP = CIBLES[a.cible]; m = mesure(a.video)
    ok(abs(m['input_i'] - I) <= 1.5, f"volume {m['input_i']:.1f} LUFS (cible {I:g}, tolérance 1,5)")
    ok(m['input_tp'] <= TP + 0.3, f"crête {m['input_tp']:.1f} dBTP (max {TP:g})")
    r3 = subprocess.run([FF, '-hide_banner', '-nostats', '-i', a.video, '-vn', '-af', 'silencedetect=n=-45dB:d=1.6', '-f', 'null', '-'], capture_output=True, text=True).stderr
    sil = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r3)]
    sil = [s for s in sil if 0.5 < s < dur - 2.5]
    ok(not sil, "aucun silence de plus de 1,6 s" + ('' if not sil else ' : à ' + ', '.join(f'{s:.1f} s' for s in sil)))

if a.script and has_a and a.lang in ('wo', 'wof'):
    print('· voix en wolof : contrôle voix/script sauté (Whisper ne connaît pas le wolof), écoute la voix en entier')
elif a.script and has_a:
    try:
        import numpy as np
        from faster_whisper import WhisperModel
        raw = subprocess.run([FF, '-v', 'error', '-i', a.video, '-vn', '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout
        seg, _ = WhisperModel('small', device='cpu', compute_type='int8').transcribe(np.frombuffer(raw, np.float32), language=a.lang)
        n = lambda t: re.findall(r"[a-z0-9]+", ''.join(c for c in unicodedata.normalize('NFD', t.lower()) if unicodedata.category(c) != 'Mn'))
        heard, want = n(' '.join(s.text for s in seg)), n(open(a.script).read())
        import difflib
        ratio = difflib.SequenceMatcher(None, heard, want).ratio()
        ok(ratio >= 0.85, f"la voix suit le script à {ratio * 100:.0f} % (noms de marque mis à part)")
    except ImportError:
        print('· faster-whisper absent : contrôle voix/script sauté')

print(f"\n{sum(res)}/{len(res)} contrôles OK" + ('' if all(res) else ' — corrige les ✗ avant de livrer.'))
sys.exit(0 if all(res) else 1)
