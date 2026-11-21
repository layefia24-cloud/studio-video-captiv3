#!/usr/bin/env python3
"""Bruitages discrets, générés sans aucun fichier à télécharger, posés sur la voix.

  python3 sfx.py voix.wav bruitages.json --out voix_sfx.wav

bruitages.json : [[1.20, "pop"], [3.40, "whoosh"], [5.00, "clic", -4]]   (temps en s, son, réglage en dB facultatif)
Sons : clic (un doigt touche), pop (une carte arrive), whoosh (un passage), ding (une coche, une réussite),
       tic (un compteur, une lettre qui s'écrit).
Place-les d'après les graphismes tels qu'ils sont posés : le son de l'objet sur un événement visible,
rien pour le visage ni pour chaque mot des sous-titres. Le résultat ne dépasse jamais -1 dBTP.
"""
import argparse, json, os, subprocess, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from audio import FF, mesure
SR = 48000
rng = np.random.default_rng(7)
def env(n, a, d):
    t = np.arange(n) / SR; return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def lp(x, k):  # passe-bas simple (moyenne glissante)
    return np.convolve(x, np.ones(k) / k, mode='same')
def son(nom):
    if nom == 'clic':
        n = int(.03 * SR); x = rng.standard_normal(n) - lp(rng.standard_normal(n), 6); return .5 * x * env(n, .0005, .006)
    if nom == 'pop':
        n = int(.12 * SR); t = np.arange(n) / SR; f = 900 * np.exp(-t * 28) + 180
        return .55 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .002, .035)
    if nom == 'whoosh':
        n = int(.42 * SR); t = np.arange(n) / SR; x = rng.standard_normal(n)
        x = lp(x, 18) * 3; e = np.sin(np.pi * t / t[-1]) ** 2; return .35 * x * e
    if nom == 'ding':
        n = int(.9 * SR); t = np.arange(n) / SR
        return .2 * (np.sin(2 * np.pi * 1318 * t) + .5 * np.sin(2 * np.pi * 1976 * t)) * env(n, .003, .22)
    if nom == 'tic':
        n = int(.02 * SR); t = np.arange(n) / SR; return .35 * np.sin(2 * np.pi * 2600 * t) * env(n, .0005, .004)
    raise SystemExit(f"son inconnu : {nom} (clic, pop, whoosh, ding, tic)")

ap = argparse.ArgumentParser(); ap.add_argument('voix'); ap.add_argument('liste'); ap.add_argument('--out', default='voix_sfx.wav')
ap.add_argument('--niveau', type=float, default=-20, help='niveau des bruitages en dB (défaut -20)')
a = ap.parse_args()
v = np.frombuffer(subprocess.run([FF, '-v', 'error', '-i', a.voix, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32).copy()
fx = np.zeros_like(v)
for item in json.load(open(a.liste)):
    t, nom = float(item[0]), item[1]; db = float(item[2]) if len(item) > 2 else 0
    s = son(nom) * 10 ** ((a.niveau + 14 + db) / 20); i = int(t * SR)
    if i >= len(fx): continue
    s = s[:len(fx) - i]; fx[i:i + len(s)] += s
out = v + fx
tmp = a.out + '.tmp.f32'; out.astype(np.float32).tofile(tmp)
subprocess.run([FF, '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', tmp, '-af',
                'aresample=192000,alimiter=limit=0.84:attack=3:release=50:level=false,aresample=48000', a.out], check=True)
os.remove(tmp)
m = mesure(a.out)
print(f"{'✓' if m['input_tp'] <= -0.7 else '✗'} {a.out} : {m['input_i']:.1f} LUFS, crête {m['input_tp']:.1f} dBTP")
