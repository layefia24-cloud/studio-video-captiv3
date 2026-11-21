# Montage pro : la chaîne, les contrôles, les pièges

Le studio monte comme un monteur professionnel : des étapes toujours dans le même ordre, et chaque étape vérifie son propre travail avant que l'utilisateur ne voie une seule image. L'utilisateur ne juge que le goût ; tout ce qui se mesure est vérifié par les scripts.

## 1. La chaîne (toujours dans cet ordre)

| # | Étape | Outil | Contrôle qui doit passer |
|---|---|---|---|
| 1 | **Réception** : copier le rush, ne jamais modifier l'original. Lire le format dans la vidéo elle-même (vertical, horizontal, i/s). | `prepare.py` / `coupe.py` | taille et i/s lus, pas devinés |
| 2 | **Coupe brute** (face caméra) : blancs, « euh », faux départs et phrases redites retirés ; on garde la dernière prise complète. | `coupe.py` puis `--fabriquer` | l'utilisateur valide la liste ; nombre d'images = somme des morceaux |
| 3 | **Son** : voix mesurée puis réglée sur toute la piste. | `audio.py` | -14 LUFS (réseaux) ou -16 LUFS (YouTube 16:9), crête ≤ -1 dBTP |
| 4 | **Couleur** : seulement sur une vraie vidéo caméra, avant les graphismes (donc dessous). Jamais sur un enregistrement d'écran. | `ffmpeg -i coupe.mp4 -vf eq=contrast=1.05:saturation=1.1 …` avant `prepare.py` | les couleurs des cartes ne bougent pas |
| 5 | **Graphismes et sous-titres** : plan → fabrication → relecture. | `guide.py`, `render.mjs --stills` | images de contrôle regardées une par une |
| 6 | **Bruitages** : placés d'après les graphismes tels qu'ils sont posés (un graphisme déplacé = bruitages refaits). | `sfx.py` | crête ≤ -1 dBTP |
| 7 | **Musique de fond** : seulement si demandée, après les bruitages. | `audio.py --musique` | 20 dB sous la voix, fondu de fin de 2 s |
| 8 | **Contrôle final** puis envoi. | `qa.py` | tous les ✓ |
| 9 | **Retouches** : uniquement de goût. Ne refaire que ce qui change ; ce que l'utilisateur a changé lui-même reste changé. | — | `qa.py` à nouveau |

Une vidéo longue finie peut repartir à l'étape 1 pour en tirer des extraits 9:16 (on recadre sur le visage et on refait les sous-titres).

## 2. Les règles qui font la différence

**Coupe**
- Garder un peu d'air autour de chaque morceau : 0,08 s avant le premier mot, 0,12 s après le dernier, sans jamais mordre sur un mot coupé. Deux morceaux ne se chevauchent jamais.
- Les bords des coupes tombent sur une image entière.
- Garder la personnalité : les expressions, les rires et les tics de langage utiles restent. On coupe l'hésitation, pas la personne.
- Montrer la liste des coupes et attendre l'accord avant de fabriquer.

**Son**
- Toujours mesurer, jamais un réglage fixe. Un gain sur toute la piste puis un limiteur sur les seules crêtes : un compresseur trop fort « respire » à chaque pause.
- Un effet posé morceau par morceau claque à chaque coupe : le réglage se fait sur la piste entière, avec des micro-fondus de 6 ms aux coupes.
- Une deuxième voix plus faible (téléphone, haut-parleur) est remontée si elle est plus de 3 dB sous la voix principale.

**Vidéo explicative face caméra : changer de plan à chaque phrase**
Faire tourner les mises en page sur des coupes franches, une par phrase environ : *serré* (visage en gros plan, zoom 1,15), *large* (cadre d'origine), *écran partagé* (visage + carte ou image), *plein écran* (graphisme seul, voix qui continue), *carte* (texte sur fond de marque). Jamais deux fois la même mise en page d'affilée. Pour le visage, choisir l'image la plus nette, yeux ouverts, bouche fermée.

**Bruitages**
- Le son de l'objet réel sur un événement visible : un clic quand un doigt touche, un « pop » quand une carte arrive, un « whoosh » sur un passage, une caisse sur un prix.
- Le visage et les sous-titres restent silencieux : pas de bruitage pour chaque mot.
- Un même son répété reste sur une seule piste ; des sons empilés ne dépassent jamais -1 dBTP.

**Musique**
- Seulement si l'utilisateur la veut. Elle commence sur son entrée franche (pas sur 3 s de silence) et finit en fondu de 2 s.
- Musique libre de droits ou fournie par l'utilisateur, jamais un morceau commercial.

**Confidentialité**
Avant de livrer une démo d'écran, chercher ce qui ne doit pas apparaître : e-mail, numéro de téléphone, solde, clé, nom d'un client. Le flouter ou le remplacer, et le dire à l'utilisateur.

## 3. Formats de sortie

| Usage | Taille | Réglages |
|---|---|---|
| Reels, TikTok, Shorts | 1080×1920, 30 i/s | H.264 yuv420p, bt709, AAC 48 kHz |
| Fil Facebook / Instagram | 1080×1350 | idem |
| YouTube, formation 16:9 | 1920×1080 | idem, voix à -16 LUFS |

Nom du fichier : `client_sujet_v1.mp4`. Les i/s sont ceux de la source : ne jamais forcer `-r` sur une coupe, ça duplique des images aux coupes sans prévenir.

## 4. Pièges déjà rencontrés
- **Image en « yuvj420p »** (plage complète) : certaines applications l'affichent délavée. Toujours sortir en `yuv420p` avec les marqueurs bt709 (`qa.py` le vérifie).
- **Police remplacée en silence** : si une police n'est pas chargée, le navigateur en prend une autre sans prévenir. Les polices sont livrées dans `scripts/fonts/` ; vérifie le rendu sur une image de contrôle.
- **Transcription qui écorche les noms de marque** : les sous-titres viennent du script, pas de la transcription.
- **Durée qui ne tombe pas juste** : compter les images rendues, pas lire la durée du fichier (le son peut dépasser de quelques millisecondes).

## 5. Le fichier de suivi
Pour un projet long, garde un `suivi.json` dans le dossier de la vidéo : étape atteinte, choix validés (A/B/C), fichiers produits, retouches demandées. Une nouvelle session le relit et reprend là où l'autre s'est arrêtée.
