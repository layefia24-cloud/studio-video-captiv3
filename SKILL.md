---
name: studio-video-captiv
description: Studio de montage vidéo complet (STUDIO CAPTIV) pour fabriquer des Reels, TikTok, Shorts et vidéos 16:9 face caméra ou sans visage, avec voix IA gratuite, sous-titres et motion design, en suivant le look book et ses codes (L1–L17, P1–P17, A1–A10, B1–B20, SS). À utiliser dès qu'on demande une vidéo, un montage, une animation, un code du look book (« mets du P03 »), un plan de vidéo ou un guide des références.
---

# Studio vidéo CAPTIV

Ce skill contient tout le studio : le moteur de rendu (`scripts/`), le look book en codes (`references/codes.md`) et la méthode de travail. Il marche depuis un projet Claude sur téléphone comme sur ordinateur. Les vignettes de tous les codes sont dans `references/vignettes/` (`P3.jpg`, `B14.jpg`, `SS.jpg`…).

## 1. La méthode (toujours dans cet ordre)
1. **Brief** : l'utilisateur dit quoi, pour qui, quel format. Pose **toutes** tes questions en une fois, sous forme de choix (durée, format 9:16 ou 16:9, face caméra ou sans visage, voix, style, images disponibles, mot-clé d'appel). Demande les ressources réelles dont tu as besoin (vidéo, photos du produit, logo) : ne génère pas d'images.
2. **Plan** : un document avec le script complet, le minutage et ce qu'on voit à chaque scène. Rien n'est fabriqué à cette étape.
3. **Guide des références avec aperçus** : pour chaque scène, 3 options codées (A recommandée, B, C). Montre toujours l'image de chaque option, jamais un code seul :
   - écris `guide.json` (une entrée par scène : `id`, `vo`, `options` avec `code`, `label` et la `scene` du moteur remplie avec le vrai contenu de l'utilisateur ; sans `scene`, la vignette du code est prise dans `references/vignettes/`) ;
   - lance `python3 <studio>/scripts/guide.py guide.json --out apercus` (quelques secondes) ;
   - il produit `apercus/guide.html` (page autonome : aperçus, choix A/B/C, bouton « Copier mes choix »), `apercus/planche_<séquence>.jpg` et `apercus/scene_<id>.jpg` ;
   - si tu sais faire un document éditable avec images, mets-y une planche par séquence sous son tableau de choix (liste déroulante « Mon choix ») ; sinon envoie `guide.html` (ou les planches) et demande la réponse sous la forme « 1.1 : A, 1.2 : C… ».
   Pour une option Stageshow sans aperçu possible, montre l'équivalent du moteur et écris « aperçu approché ».
4. **Fabrication** quand l'utilisateur dit « Allez-y » : voix, sous-titres, scènes choisies. Contrôle des images fixes avant le rendu complet.
5. **Retouches en une phrase** (« pour la scène 6, mets du P03 », « mets cette image au hook ») : ne refais que ce qui change.

Pour un freelance, le plan et le guide servent à faire valider le client avant la fabrication.

## 2. Les codes du look book
Lis `references/codes.md` dès qu'un code apparaît. Il donne pour chacun des 64 looks la scène du moteur, ou le remplacement à proposer (↪) quand le moteur ne sait pas le faire : demande l'accord avant de fabriquer un remplacement.

## 3. Installer le moteur (une fois par session)
- `ffmpeg`, Node 18+, Chrome ou Chromium (passe le chemin avec `--chrome` ou `CHROME_PATH` s'il n'est pas trouvé ; sinon installe-le, par exemple `npx puppeteer browsers install chrome-headless-shell`).
- Dans `scripts/` : `npm i` (installe puppeteer-core).
- Python 3 : `pip install faster-whisper` (mots minutés), `pip install kokoro-onnx soundfile` (le modèle se télécharge au premier usage) pour la voix IA, `pip install rembg onnxruntime` pour détourer un produit ou une personne.
- Si une installation est bloquée par le réseau, dis-le clairement à l'utilisateur au lieu de contourner.

## 4. Fabriquer
1. **Voix** : IA gratuite `python3 <studio>/scripts/tts.py script.txt` (voix française ff_siwis ; écris les noms anglais comme ils se prononcent, par exemple « Hydra Glo », « i-bouk ») ou voix de l'utilisateur. Puis `python3 <studio>/scripts/prepare.py voix.wav --audio-only --words` → `work/voix.wav` + `work/words.json`.
2. **Vidéo face caméra** : `python3 <studio>/scripts/prepare.py video.mp4 --words [--masks]` → images, voix, mots minutés, masques.
3. **Sous-titres** : affiche le texte du script, pas la transcription (qui écorche les noms de marque) ; recale les mots du script sur les temps de `words.json`.
4. **config.json** : scènes calées sur les mots, un changement visible toutes les 1,5 à 3 s. Réglages : `references/config.md` (face caméra et sans visage), `references/lookbook.md` (format court), `references/premium.md` (premium et scènes produit). Exemples : `scripts/example-config.json`, `scripts/example-sans-visage.json`, `references/exemple-premium-16x9.json`.
5. **Contrôle** : `node <studio>/scripts/render.mjs --config config.json --stills 1,5,12 --out apercu` ; regarde chaque image (texte lisible, rien hors cadre, visage dégagé).
6. **Rendu** : `node <studio>/scripts/render.mjs --config config.json --out video.mp4 --audio work/voix.wav`. Envoie la vidéo à l'utilisateur.

## 5. Selon la cible
- Créateur ou influenceur : `references/cible-createurs.md`.
- Entrepreneur, entreprise, commerçant (produit ou service) : `references/cible-commercants.md`.
- Freelance qui vend ce service : `references/cible-freelance.md`.
Styles étudiés : `references/styles.md` (face caméra), `references/styles-sans-visage.md`, `references/styles-supplementaires.md`.

## 6. Honnêteté (non négociable)
- Pas de faux avis, faux témoignages, fausses captures de ventes ou de paiements ; un chiffre d'exemple est marqué « exemple ».
- Pas de fausse urgence ni de faux prix barrés ; un compte à rebours seulement pour un vrai délai.
- Les promesses d'un produit viennent de son étiquette ou du client, jamais inventées.
- Marque, visage ou voix d'un tiers seulement avec son accord ; voix clonée seulement avec le consentement de la personne.

Avant de livrer : `references/checklist.md`.
