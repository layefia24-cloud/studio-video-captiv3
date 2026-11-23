#!/usr/bin/env python3
"""Voix off IA gratuite en français ou en wolof avec OmniVoice (k2-fsa, licence Apache 2.0, plus de 600 langues).

Usage :
  python3 tts.py voix.txt                       (français, voix féminine par défaut -> work/voix_ia.wav)
  python3 tts.py voix.txt --lang wo --words     (wolof)
Puis :  python3 prepare.py work/voix_ia.wav --audio-only            (crée work/voix.wav normalisée)
  - français : ajoute --words à prepare.py pour les mots minutés (faster-whisper) ;
  - wolof : faster-whisper ne connaît pas le wolof, donc garde le work/words.json écrit ici par --words
    (temps estimés à partir du texte, phrase par phrase).

Faire choisir la voix à l'utilisateur (6 échantillons sur le début de SON texte, ~2 à 3 min sans carte graphique) :
  python3 tts.py voix.txt --catalogue femme      (ou homme)  -> voix/01_….wav + voix/01_….pt, etc.
  Fais écouter les .wav, l'utilisateur choisit un numéro, puis :
  python3 tts.py voix.txt --voix voix/03_….pt    -> toute la voix off avec exactement la voix choisie.
  Garde le .pt choisi : la même voix resservira pour toutes ses vidéos.

Choisir la voix soi-même (la même voix est gardée sur toutes les phrases) :
  (rien)                         voix féminine française par défaut : "female, young adult, moderate pitch", --seed 0
  --instruct "female, low pitch" voix décrite, attributs en anglais séparés par des virgules :
                                 male / female ; child, teenager, young adult, middle-aged, elderly ;
                                 very low pitch … very high pitch ; whisper. Moins stable en wolof : écoute avant de livrer.
  --seed 7                       autre voix pour la même description
  --ref ma_voix.wav --ref-text "texte exact dit dans l'extrait"
                                 voix clonée depuis un extrait de 3 à 10 s, de préférence dans la même langue.
                                 UNIQUEMENT avec l'accord de la personne dont c'est la voix.
  --garder-voix voix_marque.pt   enregistre la voix obtenue ; --voix voix_marque.pt la réutilise sur les vidéos suivantes.

Dépendances : pip install omnivoice soundfile   (installe aussi PyTorch, plusieurs Go)
              ou :  bash setup.sh
Au premier lancement, le modèle (~3,1 Go) est téléchargé depuis huggingface.co dans ~/.cache/huggingface/.
Si Hugging Face est bloqué : export HF_ENDPOINT="https://hf-mirror.com", sinon voix enregistrée par l'utilisateur.
Sans carte graphique, compte environ 5 s de calcul par seconde de voix (--steps 16 : deux fois plus rapide).
Écris les nombres en lettres. Une voix IA doit rester générique : jamais la voix d'une vraie personne sans son accord écrit.
"""
import argparse, os, re, sys

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('texte', help='fichier texte (ou le texte lui-même)')
ap.add_argument('--out', default='work/voix_ia.wav')
ap.add_argument('--lang', default='fr', help='fr (français), wo (wolof), ou tout code pris en charge par OmniVoice')
ap.add_argument('--instruct', default='female, young adult, moderate pitch', help='description de la voix (en anglais), ex. "male, low pitch"')
ap.add_argument('--ref', help='extrait audio de 3 à 10 s à cloner (avec accord de la personne)')
ap.add_argument('--ref-text', help="texte exact dit dans l'extrait --ref")
ap.add_argument('--voix', help='voix enregistrée avec --garder-voix (.pt)')
ap.add_argument('--garder-voix', help='enregistre la voix utilisée dans ce fichier .pt')
ap.add_argument('--speed', type=float, default=1.0, help='> 1 plus rapide, < 1 plus lent')
ap.add_argument('--pause', type=float, default=0.25, help='silence entre les phrases (s)')
ap.add_argument('--steps', type=int, default=32, help='étapes de calcul (16 = deux fois plus rapide, un peu moins net)')
ap.add_argument('--seed', type=int, default=0, help='change la voix choisie automatiquement')
ap.add_argument('--words', action='store_true', help='écrit aussi words.json (temps des mots estimés) à côté de --out')
ap.add_argument('--catalogue', choices=['femme', 'homme'], help='écrit 6 échantillons de voix dans --out (dossier, par défaut voix/) pour faire choisir')
ap.add_argument('--model', default='k2-fsa/OmniVoice')
a = ap.parse_args()
if a.ref and not a.ref_text:
    sys.exit("--ref demande --ref-text (le texte exact dit dans l'extrait)")

txt = open(a.texte, encoding='utf-8').read().strip() if os.path.exists(a.texte) else a.texte.strip()
parts = [p.strip() for p in re.split(r'(?<=[.!?…])\s+|\n+', txt) if p.strip()]
if not parts:
    sys.exit('texte vide')

try:
    import numpy as np, soundfile as sf, torch
    from omnivoice import OmniVoice, VoiceClonePrompt
except ImportError:
    sys.exit('OmniVoice absent : lance  bash setup.sh  (ou pip install omnivoice soundfile)')

if torch.cuda.is_available(): dev, dt = 'cuda:0', torch.float16
elif getattr(torch.backends, 'mps', None) and torch.backends.mps.is_available(): dev, dt = 'mps', torch.float16
else: dev, dt = 'cpu', torch.float32
torch.manual_seed(a.seed); np.random.seed(a.seed)
print(f'Chargement du modèle OmniVoice ({dev})…', flush=True)
m = OmniVoice.from_pretrained(a.model, device_map=dev, dtype=dt)
sr = m.sampling_rate
opts = dict(language=a.lang, speed=a.speed, num_step=a.steps)

CATALOGUE = {
    'femme': [('01_jeune_moyenne', 'female, young adult, moderate pitch', 0),
              ('02_jeune_aigue', 'female, young adult, high pitch', 0),
              ('03_jeune_grave', 'female, young adult, low pitch', 0),
              ('04_adulte_moyenne', 'female, middle-aged, moderate pitch', 0),
              ('05_adulte_grave', 'female, middle-aged, low pitch', 0),
              ('06_jeune_moyenne_bis', 'female, young adult, moderate pitch', 7)],
    'homme': [('01_jeune_moyenne', 'male, young adult, moderate pitch', 0),
              ('02_jeune_grave', 'male, young adult, low pitch', 0),
              ('03_adulte_moyenne', 'male, middle-aged, moderate pitch', 1),
              ('04_adulte_grave', 'male, middle-aged, very low pitch', 0),
              ('05_senior', 'male, elderly, moderate pitch', 0),
              ('06_jeune_moyenne_bis', 'male, young adult, moderate pitch', 3)],
}
if a.catalogue:
    # Échantillon = début du texte de l'utilisateur (1 à 2 phrases, 25 mots au plus).
    ech, n = [], 0
    for p in parts:
        if ech and n + len(p.split()) > 25: break
        ech.append(p); n += len(p.split())
    ech = ' '.join(ech)
    d = a.out if a.out != 'work/voix_ia.wav' else 'voix'
    os.makedirs(d, exist_ok=True)
    def voisee(x):
        # Part du temps où la voix est « parlée » (pas chuchotée) : un tirage raté tombe sous 40 %.
        try:
            import librosa
            y = librosa.resample(x, orig_sr=sr, target_sr=16000)
            return float(librosa.pyin(y, fmin=60, fmax=600, sr=16000)[1].mean())
        except Exception:
            return 1.0
    for nom, ins, seed in CATALOGUE[a.catalogue]:
        print('Échantillon', nom, '…', flush=True)
        for essai in range(3):
            torch.manual_seed(seed + 10 * essai); np.random.seed(seed + 10 * essai)
            s = np.asarray(m.generate(text=ech, instruct=ins, **opts)[0], dtype=np.float32)
            if voisee(s) >= 0.4: break
            print('  voix chuchotée, nouvel essai', flush=True)
        sf.write(os.path.join(d, nom + '.wav'), np.asarray(s, dtype=np.float32), sr)
        m.create_voice_clone_prompt(ref_audio=(torch.from_numpy(np.asarray(s, dtype=np.float32)), sr), ref_text=ech).save(os.path.join(d, nom + '.pt'))
    print(f'{len(CATALOGUE[a.catalogue])} voix dans {d}/ : fais écouter les .wav, puis  tts.py <texte> --voix {d}/<numéro choisi>.pt')
    sys.exit(0)

# Voix : enregistrée, clonée, ou fixée à partir de la première phrase pour rester identique sur toute la vidéo.
prompt, out, first = None, [], None
if a.voix:
    prompt = VoiceClonePrompt.load(a.voix)
elif a.ref:
    prompt = m.create_voice_clone_prompt(ref_audio=a.ref, ref_text=a.ref_text)
else:
    print(f'[1/{len(parts)}]', parts[0], flush=True)
    first = m.generate(text=parts[0], instruct=a.instruct, **opts)[0]
    prompt = m.create_voice_clone_prompt(ref_audio=(torch.from_numpy(first), sr), ref_text=parts[0])
if a.garder_voix:
    prompt.save(a.garder_voix); print('Voix enregistrée :', a.garder_voix)

segs, t = [], 0.0
for i, p in enumerate(parts):
    if i == 0 and first is not None:
        s = first
    else:
        print(f'[{i + 1}/{len(parts)}]', p, flush=True)
        s = m.generate(text=p, voice_clone_prompt=prompt, **opts)[0]
    s = np.asarray(s, dtype=np.float32)
    segs.append((p, t, t + len(s) / sr)); t += len(s) / sr + a.pause
    out += [s, np.zeros(int(sr * a.pause), dtype=np.float32)]

os.makedirs(os.path.dirname(a.out) or '.', exist_ok=True)
sf.write(a.out, np.concatenate(out), sr)
print('Voix écrite :', a.out, f'({t:.1f} s, langue {a.lang})')

if a.words:
    # Temps des mots estimés : chaque phrase est répartie selon la longueur des mots (le début et la fin de phrase sont exacts).
    W = []
    for p, t0, t1 in segs:
        ws = p.split(); pad = min(0.12, (t1 - t0) * 0.05)
        a0, a1 = t0 + pad, t1 - pad; tot = sum(len(w) + 1 for w in ws); c = a0
        for w in ws:
            d = (a1 - a0) * (len(w) + 1) / tot
            W.append([w, round(c, 2), round(c + d, 2)]); c += d
    import json
    wp = os.path.join(os.path.dirname(a.out) or '.', 'words.json')
    json.dump(W, open(wp, 'w'), ensure_ascii=False)
    print('mots :', len(W), '->', wp)
