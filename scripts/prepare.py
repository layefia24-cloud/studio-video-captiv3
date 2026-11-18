#!/usr/bin/env python3
"""Prépare une vidéo face caméra pour le moteur :
  1) extrait les images (540x960, 30 i/s) dans work/frames/0001.jpg…
  2) (option --masks) détoure la personne image par image dans work/masks/0001.png
     -> sert aux effets « mot derrière la personne » (styles signature / editorial).
  3) (option --words) transcrit la voix mot à mot dans work/words.json (faster-whisper).

Usage :
  python3 prepare.py ma_video.mp4 [--start 2.0] [--duration 20] [--masks] [--words] [--lang fr] [--out work]
  python3 prepare.py voix.wav --audio-only --words      (vidéo sans visage : voix off seule)
Dépendances : ffmpeg ; pip install rembg onnxruntime (masques) ; pip install faster-whisper (mots).
Les masques prennent ~1 s par image sur un ordinateur portable : limite --duration aux passages utiles.
"""
import argparse, os, subprocess, json, glob

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('--start', type=float, default=0); ap.add_argument('--duration', type=float)
ap.add_argument('--audio-only', action='store_true', help='entrée = fichier audio (voix off), sans images');ap.add_argument('--masks', action='store_true'); ap.add_argument('--words', action='store_true')
ap.add_argument('--lang', default='fr'); ap.add_argument('--model', default='small'); ap.add_argument('--out', default='work')
a = ap.parse_args()
fr = os.path.join(a.out, 'frames'); n = 0
if not a.audio_only:
    os.makedirs(fr, exist_ok=True)
    cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', str(a.start), '-i', a.video]
    if a.duration: cmd += ['-t', str(a.duration)]
    cmd += ['-vf', 'fps=30,scale=540:960:force_original_aspect_ratio=increase,crop=540:960', '-q:v', '2', os.path.join(fr, '%04d.jpg')]
    subprocess.run(cmd, check=True)
    n = len(glob.glob(os.path.join(fr, '*.jpg'))); print('images :', n)
os.makedirs(a.out, exist_ok=True)
au = os.path.join(a.out, 'voix_norm.wav' if os.path.abspath(a.video)==os.path.abspath(os.path.join(a.out,'voix.wav')) else 'voix.wav')
cmd = ['ffmpeg', '-v', 'error', '-y', '-ss', str(a.start), '-i', a.video] + (['-t', str(a.duration)] if a.duration else []) + ['-vn', '-ac', '1', '-ar', '48000', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', au]
subprocess.run(cmd); print('voix :', au)
if a.masks and not a.audio_only:
    from rembg import remove, new_session
    from PIL import Image
    s = new_session('u2net_human_seg'); md = os.path.join(a.out, 'masks'); os.makedirs(md, exist_ok=True)
    for i, f in enumerate(sorted(glob.glob(os.path.join(fr, '*.jpg')))):
        m = remove(Image.open(f), session=s, only_mask=True, post_process_mask=True).convert('L')
        o = Image.new('RGBA', m.size, (255, 255, 255, 0)); o.putalpha(m); o.save(os.path.join(md, os.path.basename(f)[:-4] + '.png'))
        if i % 30 == 0: print('masques', i, '/', n, flush=True)
if a.words:
    from faster_whisper import WhisperModel
    m = WhisperModel(a.model, device='cpu', compute_type='int8')
    import numpy as np
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', au, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'], capture_output=True, check=True).stdout
    seg, _ = m.transcribe(np.frombuffer(raw, np.float32), language=a.lang, word_timestamps=True)
    W = []
    for s_ in seg:
        for w in s_.words:
            t = w.word.strip()
            if W and (t.startswith("'") or t.startswith('-')): W[-1][0] += t; W[-1][2] = round(w.end, 2)
            elif t in '?!:' and W: W[-1][0] += ' ' + t
            else: W.append([t, round(w.start, 2), round(w.end, 2)])
    json.dump(W, open(os.path.join(a.out, 'words.json'), 'w'), ensure_ascii=False)
    print('mots :', len(W), '->', os.path.join(a.out, 'words.json'))
    print(' '.join(f"{w}@{s}" for w, s, e in W))
json.dump({'count': n}, open(os.path.join(a.out, 'info.json'), 'w'))
