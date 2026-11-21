---
name: studio-video-captiv
description: Studio de montage vidéo complet (STUDIO CAPTIV) pour fabriquer des Reels, TikTok, Shorts et vidéos 16:9 face caméra ou sans visage, avec voix IA gratuite, sous-titres et motion design, en suivant le look book et ses codes (L1–L17, P1–P17, A1–A10, B1–B20, E1–E15, X1–X31, O1–O21, SS). À utiliser dès qu'on demande une vidéo, un montage, une animation, un code du look book (« mets du P03 »), un plan de vidéo ou un guide des références.
---

# Studio vidéo CAPTIV

Ce skill contient tout le studio : le moteur de rendu (`scripts/`), le look book en codes (`references/codes.md`) et la méthode de travail. Il marche depuis un projet Claude sur téléphone comme sur ordinateur. Les vignettes de tous les codes sont dans `references/vignettes/` (`P3.jpg`, `B14.jpg`, `SS.jpg`…).

## 1. La méthode (toujours dans cet ordre)
1. **Brief** : l'utilisateur dit quoi, pour qui, quel format. Pose tes questions **sous forme de formulaire à choix**, jamais en texte libre : avec l'outil de questions à choix s'il existe (4 questions maximum par écran, ta recommandation en premier), sinon un mini-formulaire numéroté auquel on répond « 1A 2C 3B ». **La première question est toujours le type de vidéo** (face caméra avec motion design, sans visage éducative, démo d'interface d'application ou de site, pub en motion design pour un produit ou un service), puis tu proposes les 3 styles les mieux adaptés. Méthode et banque de questions : `references/questions.md`. Puis demande les ressources réelles (vidéo, photos du produit, logo) : ne génère pas d'images.
2. **Script captivant** (dès qu'il y a une voix ou un texte à écrire) : suis `references/script-captivant.md`. Écris toujours **3 hooks** de frameworks différents (phrase dite + texte écran de 3 à 6 mots + hook visuel avec un code du look book), note-les sur 10, puis la lock-in zone, un corps qui relance la curiosité jusqu'à la fin, et une **fin qui fait commenter** (une seule action). Vérifie avec `python3 <studio>/scripts/script_check.py script.txt --duree <s>` et corrige les ✗. Fais choisir le hook dans le formulaire à choix (ta recommandation en premier).
3. **Plan** : un document avec le script complet, le minutage et ce qu'on voit à chaque scène. Rien n'est fabriqué à cette étape.
4. **Guide des références avec aperçus** : pour chaque scène, 3 options codées (A recommandée, B, C). Montre toujours l'image de chaque option, jamais un code seul :
   - écris `guide.json` (une entrée par scène : `id`, `vo`, `options` avec `code`, `label` et la `scene` du moteur remplie avec le vrai contenu de l'utilisateur ; sans `scene`, la vignette du code est prise dans `references/vignettes/`) ;
   - lance `python3 <studio>/scripts/guide.py guide.json --out apercus` (quelques secondes) ;
   - il produit `apercus/guide.html` (page autonome : aperçus, choix A/B/C, bouton « Copier mes choix »), `apercus/planche_<séquence>.jpg` et `apercus/scene_<id>.jpg` ;
   - si tu sais faire un document éditable avec images, mets-y une planche par séquence sous son tableau de choix (liste déroulante « Mon choix ») ; sinon envoie `guide.html` (ou les planches) et demande la réponse sous la forme « 1.1 : A, 1.2 : C… ».
   Pour une option Stageshow sans aperçu possible, montre l'équivalent du moteur et écris « aperçu approché ».
5. **Fabrication** quand l'utilisateur dit « Allez-y » : voix, sous-titres, scènes choisies. Contrôle des images fixes avant le rendu complet.
6. **Retouches en une phrase** (« pour la scène 6, mets du P03 », « mets cette image au hook ») : ne refais que ce qui change.

Pour un freelance, le plan et le guide servent à faire valider le client avant la fabrication.

## 2. Les codes du look book
Lis `references/codes.md` dès qu'un code apparaît. Il donne pour chacun des 132 looks la scène du moteur, ou le remplacement à proposer (↪) quand le moteur ne sait pas le faire : demande l'accord avant de fabriquer un remplacement.

## 3. Installer le moteur (une fois par session)
Lance `bash <studio>/scripts/setup.sh`. Il passe seulement par npm et pip, et prévoit des solutions de secours :
- navigateur : Chrome déjà présent, sinon Chrome téléchargé, sinon Chromium livré par npm (`@sparticuz/chromium`) ;
- ffmpeg : celui du système, sinon celui livré par pip (`imageio-ffmpeg`) ;
- voix IA (`kokoro-onnx`) et mots minutés (`faster-whisper`), facultatifs ;
- avec `--omni` : voix IA **française et wolof** OmniVoice (`omnivoice`, PyTorch, plusieurs Go), seulement si l'utilisateur veut du wolof ou une autre voix française.
Affiche à l'utilisateur les lignes ✓ / ✗ du script. Si npm ou pip sont bloqués, dis-lui d'activer l'accès réseau sortant dans les réglages de Claude (Paramètres → Capacités) puis d'ouvrir une **nouvelle** session : un réglage changé ne s'applique pas à une session déjà ouverte. Ne contourne jamais un blocage réseau.
Le modèle de la voix IA Kokoro se télécharge depuis GitHub au premier usage, celui d'OmniVoice (~3,3 Go) depuis huggingface.co ; s'il est bloqué, propose à l'utilisateur d'enregistrer sa propre voix.

## 4. Fabriquer
La chaîne complète, ses contrôles et les règles de pro (coupe, son, plans qui changent à chaque phrase, bruitages, musique, formats, pièges) : `references/montage-pro.md`. Lis-le avant ta première vidéo de la session.

0. **Rush face caméra brut** (filmé au téléphone, avec hésitations) : `python3 <studio>/scripts/coupe.py rush.mp4` → montre `work/coupes.txt` et attends l'accord, puis `python3 <studio>/scripts/coupe.py rush.mp4 --fabriquer` → `work/coupe.mp4` (vérifiée image par image). La suite part de `coupe.mp4`.
1. **Voix** : écris `voix.txt` = le hook choisi + la lock-in + le corps + la fin, sans les balises. Face caméra : c'est le texte que la personne lit en se filmant. Sinon, voix IA gratuite `python3 <studio>/scripts/tts.py voix.txt` (voix française ff_siwis ; écris les noms anglais comme ils se prononcent, par exemple « Hydra Glo », « i-bouk ») ou voix de l'utilisateur. Puis `python3 <studio>/scripts/prepare.py voix.wav --audio-only --words` → `work/voix.wav` + `work/words.json`.
   **Wolof** (ou autre voix française) : `python3 <studio>/scripts/tts_omni.py voix.txt --lang wo --words --out work/voix_ia.wav` (`--lang fr` pour le français), puis `prepare.py work/voix_ia.wav --audio-only` **sans** `--words` : Whisper ne connaît pas le wolof, on garde le `work/words.json` estimé par `tts_omni.py`. Même voix sur toute la vidéo ; `--garder-voix marque.pt` / `--voix marque.pt` pour la réutiliser. Fais écouter la voix avant le rendu complet. Sous-titres en wolof : texte du script tel quel, orthographe donnée par l'utilisateur.
2. **Vidéo face caméra** : `python3 <studio>/scripts/prepare.py video.mp4 --words [--masks]` → images, voix, mots minutés, masques.
3. **Sous-titres** : affiche le texte du script, pas la transcription (qui écorche les noms de marque) ; recale les mots du script sur les temps de `words.json`.
4. **config.json** : scènes calées sur les mots, un changement visible toutes les 1,5 à 3 s. Réglages : `references/config.md` (face caméra et sans visage), `references/lookbook.md` (format court), `references/premium.md` (premium et scènes produit), `references/editorial.md` (style éditorial crème sans visage, scène `ed`), `references/effets.md` (effets derrière la personne X1–X16 et objets illustrés O1–O6, scène `fx`, avec `prepare.py --masks`). Les couleurs viennent toujours de la marque de la personne : `python3 <studio>/scripts/palette.py logo.png` donne le bloc de couleurs à mettre dans le config. Exemples : `scripts/example-config.json`, `scripts/example-sans-visage.json`, `references/exemple-premium-16x9.json`.
5. **Contrôle** : `node <studio>/scripts/render.mjs --config config.json --stills 1,5,12 --out apercu` ; regarde chaque image (texte lisible, rien hors cadre, visage dégagé).
6. **Son final** : `python3 <studio>/scripts/audio.py work/voix.wav --out son.wav` (-14 LUFS, crête -1 dBTP ; `--cible youtube` pour du 16:9 long). Bruitages : `python3 <studio>/scripts/sfx.py son.wav bruitages.json --out son.wav`. Musique seulement si demandée : `--musique fond.mp3` (20 dB sous la voix).
7. **Rendu** : `node <studio>/scripts/render.mjs --config config.json --out video.mp4 --audio son.wav`.
8. **Contrôle qualité** : `python3 <studio>/scripts/qa.py video.mp4 --format 9:16 --script script.txt` (`--lang wo` pour une voix en wolof). Corrige chaque ✗ et relance avant d'envoyer : l'utilisateur ne doit juger que le goût, jamais un défaut mesurable. Puis envoie la vidéo.

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
