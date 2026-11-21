#!/usr/bin/env python3
"""Voix off IA gratuite (Kokoro, licence Apache 2.0) pour les vidéos sans visage.

Usage :
  python3 tts.py texte.txt --out work/voix_ia.wav [--voice ff_siwis] [--speed 1.05] [--lang fr-fr]
Puis :  python3 prepare.py work/voix_ia.wav --audio-only --words   (crée work/voix.wav normalisée + work/words.json)     (mots minutés pour les sous-titres)

Dépendances : pip install kokoro-onnx soundfile
Au premier lancement, les fichiers du modèle (~330 Mo) sont téléchargés dans ~/.cache/kokoro/.
Voix françaises : ff_siwis (féminine). Voix anglaises : af_heart, am_michael, etc.
Écris les nombres en lettres ou avec espaces (« 6 500 francs CFA ») pour une bonne prononciation.
Une voix IA doit rester une voix générique : ne jamais imiter la voix d'une vraie personne sans son accord écrit.
"""
import argparse, os, urllib.request, re
ap = argparse.ArgumentParser()
ap.add_argument('texte'); ap.add_argument('--out', default='work/voix_ia.wav')
ap.add_argument('--voice', default='ff_siwis'); ap.add_argument('--speed', type=float, default=1.05); ap.add_argument('--lang', default='fr-fr')
ap.add_argument('--pause', type=float, default=0.25, help='silence entre les phrases (s)')
a = ap.parse_args()
cache = os.path.expanduser('~/.cache/kokoro'); os.makedirs(cache, exist_ok=True)
base = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/'
for f in ['kokoro-v1.0.onnx', 'voices-v1.0.bin']:
    p = os.path.join(cache, f)
    if not os.path.exists(p):
        print('Téléchargement de', f, '…'); urllib.request.urlretrieve(base + f, p)
from kokoro_onnx import Kokoro
import soundfile as sf, numpy as np
k = Kokoro(os.path.join(cache, 'kokoro-v1.0.onnx'), os.path.join(cache, 'voices-v1.0.bin'))
txt = open(a.texte, encoding='utf-8').read().strip() if os.path.exists(a.texte) else a.texte
parts = [p.strip() for p in re.split(r'(?<=[.!?…])\s+|\n+', txt) if p.strip()]
out, sr = [], 24000
for p in parts:
    s, sr = k.create(p, voice=a.voice, speed=a.speed, lang=a.lang)
    out.append(s); out.append(np.zeros(int(sr * a.pause), dtype=s.dtype))
os.makedirs(os.path.dirname(a.out) or '.', exist_ok=True)
sf.write(a.out, np.concatenate(out), sr)
print('Voix écrite :', a.out, f'({sum(len(x) for x in out)/sr:.1f} s)')
