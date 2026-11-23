# S'inspirer d'un style de montage (remake)

L'utilisateur envoie une **vidéo d'inspiration** (un montage qu'il aime) et **sa vidéo brute** (face caméra). On en tire la **recette de style** (rythme, types d'animations, typographie, place à l'écran, devant ou derrière la personne) et on la rejoue **à sa façon** : ses couleurs, sa niche, ses images, sa marque, sur ses mots. On ne copie jamais la marque, le logo, les images ou le visage de quelqu'un d'autre.

## Deux façons de faire (question du formulaire)
| Mode | Ce qu'on garde de l'inspiration | Ce qui vient de l'utilisateur |
|---|---|---|
| **S'inspirer et personnaliser** ★ (par défaut) | le rythme (un changement toutes les 1 à 2 s), la typo (fin + gras italique), la famille d'animations et leur place | ses couleurs (`palette.py` → `colors`), des effets choisis pour sa niche, ses images, ses chiffres réels, son logo |
| **Copie fidèle du mouvement** | chaque animation, dans le même ordre et au même endroit | seulement les mots, les images et la marque |

Pour « s'inspirer », écris d'abord la **recette** en 5 lignes dans `style.md` (rythme, typo, 3 à 5 effets signature, ambiance, fin), puis choisis pour chaque phrase l'effet qui **sert son propos dans sa niche** : un arc de ses produits plutôt que des drapeaux pour une boutique, une icône hologramme qui parle de son métier, ses vrais chiffres dans le compteur. Un effet de l'inspiration qui n'a pas de sens pour sa niche se remplace par un code du look book (`references/effets.md`). Garde `style.md` : l'utilisateur pourra réutiliser sa recette sur toutes ses vidéos (« même style que la dernière fois »).

Couleurs : `python3 <studio>/scripts/palette.py logo.png` affiche le bloc `"colors"` à mettre dans la scène (`chaud` = lueur et mot fort, `froid` = mot glacé, points d'interrogation, hologramme, compteur, vague, `duo` = mot en deux couleurs). Les couleurs données par l'utilisateur priment toujours. Sans logo, demande-les dans le formulaire.

Outil d'analyse : **reanimate** (`outils/reanimate/`, licence MIT). Moteur : la scène `"type":"remake"` (`scripts/remake.js`).

## 1. Installer (une fois par session)
```bash
bash <studio>/scripts/setup.sh
cd <studio>/outils/reanimate/scripts && bun install --silent      # Bun : npm i -g bun s'il manque
export REANIMATE_CHROME=$(find /opt/pw-browsers ~/.cache/puppeteer ~/.cache/ms-playwright -type f \( -name chrome -o -name chrome-headless-shell \) 2>/dev/null | head -1)
```
Pour une vidéo, reanimate n'a besoin que de `frames.ts`, `sheet.ts` et `compare.ts` : pas de téléchargement de Playwright. `REANIMATE_CHROME` sert aux planches (`sheet.ts`).

## 2. Analyser l'inspiration image par image
```bash
R=<studio>/outils/reanimate/scripts
bun $R/frames.ts --in inspiration.mp4 --probe
bun $R/frames.ts --in inspiration.mp4 --out ref/frames --fps 10 [--crop x,y,w,h]   # recadre si la vidéo est dans un cadre « After », un téléphone…
bun $R/sheet.ts filmstrip --frames ref/frames --out ref/sheets --cols 8 --per-sheet 40 --width 200
```
Regarde **toutes** les planches. Puis écris `spec.md` : une ligne par élément animé.

| Début → fin (s) | Élément | Place (x, y en fraction de l'image) | Devant / derrière | Entrée → sortie | Style |
|---|---|---|---|---|---|
| 0,0 → 1,1 | points d'interrogation | autour de la tête | devant | pop décalés → fondu | bleu glacé, 1 blanc |
| 0,3 → 1,1 | mot fort « NAN » | .5, .58 | devant | flou + zoom 1,18→1 → flou | dégradé orange |

Mesure aussi : la tête de la personne (haut et centre) dans l'inspiration **et** dans la vidéo brute, pour décaler les positions ; les zooms (sauts de cadrage) ; le dégradé sombre du bas et le logo.

## 3. Préparer la vidéo brute
```bash
python3 <studio>/scripts/prepare.py brute.mp4 --duration <fin utile> --masks --words --model medium
```
Coupe la fin parasite (écran CapCut, noir). Les masques permettent de passer un calque **derrière** la personne. Vérifie `work/words.json` : un mot mal transcrit (« d'en » pour « dans ») se corrige à la main.

## 4. Associer chaque animation à un mot
En mode « s'inspirer », garde le rythme et la famille d'effets mais choisis l'effet de chaque phrase pour la niche (voir plus haut). En mode « copie fidèle », garde l'ordre et la durée de l'inspiration, mais cale chaque calque sur **le mot de l'utilisateur** qui joue le même rôle : le hook sur le hook, le chiffre sur le chiffre, l'appel à l'action sur l'appel à l'action. Remplace les visuels par les siens : ses photos dans la carte vidéo, l'arc et le carrousel ; ses noms de fichiers ou ses chiffres réels dans les étiquettes ; sa marque dans le logo.

Écris un petit script Python qui lit `work/words.json` et génère `config.json` (exemple complet : `references/exemple-remake.py`).

## 5. La scène `remake`
```json
{"t0":0,"t1":16,"type":"remake","fy":0.45,"zoomY":0.33,"textScale":1.25,
 "colors":{"chaud":"#E8A83A","duo":["#1FA3B5","#E8A83A"],"froid":"#1FA3B5"},
 "zoom":[[0,1],[2.4,1.07],[4.6,1]],
 "grade":{"warm":0.55,"bottom":0.92,"from":0.6},
 "logo":{"text":"STUDIO","sub":"C A P T I V","y":0.865},
 "layers":[{"kind":"text","text":"téléphone","at":1.5,"out":2.5,"style":"glow","y":0.615}]}
```
- `colors` : couleurs de la marque (sortie de `palette.py`) ; sans ce bloc, orange, bleu ciel et bleu → magenta de l'exemple.
- `zoom` : sauts de cadrage `[temps, zoom]` (coupes nettes, comme un changement de plan).
- `grade.warm` : ambiance chaude en haut ; `grade.bottom` : dégradé noir en bas (sous le logo).
- `logo` : `text` + `sub`, ou `src` (PNG de la marque).
- Chaque calque : `kind`, `at`, `out` (secondes depuis `t0`), `z` (`"back"` = derrière la personne ; par défaut devant, sauf arc, carrousel, hologramme, lumière, vague et étiquettes).

| `kind` | Ce qu'on voit | Réglages |
|---|---|---|
| `text` | Mot qui entre flou en zoomant et sort flou | `text`, `x`, `y`, `size`, `style`, `al`, `z` |
| `qmarks` | Points d'interrogation bleu glacé autour de la tête | `items` [[x, y, taille, rotation]…] |
| `pip` | Carte vidéo arrondie qui glisse de la droite, change d'image en filé, sort à gauche | `imgs`, `swaps` [temps…], `x`, `y`, `w`, `h` |
| `ring` | Arc de vignettes (drapeaux ou photos) qui se déploie et tourne autour de la tête | `imgs`, `n`, `cx`, `cy`, `r`, `a0`, `a1`, `size`, `speed` |
| `nodes` | Molécule 3D grise qui tourne (réseau, liens) | `x`, `y`, `s` |
| `stats` | Petites étiquettes qui apparaissent l'une après l'autre | `items` [[texte, x, y, délai]…], `size` |
| `carousel` | Bande de photos courbe qui tourne au-dessus de la tête | `imgs`, `cy`, `r`, `w`, `h`, `speed` |
| `holo` | Icône hologramme bleue avec faisceau | `icon` (`bulle`, `personne`), `x`, `y`, `s` |
| `flare` | Lumière orange qui monte derrière la personne | `x`, `y` |
| `counter` | Compteur géant avec rayons bleus | `from`, `to`, `suffix`, `y`, `size` |
| `wave` | Vague bleue qui monte derrière la personne | `y` |

Styles de `text` : `thin` (italique fin), `bold`, `glow` (blanc + lueur orange qui éclaire le corps), `orange` (dégradé orange), `purple`, `metal` (argent), `ice` (bleu glacé), `duo` (bleu → magenta), `big` (géant blanc, souvent derrière la tête), `label` (petite étiquette).

## 6. Vérifier contre l'inspiration
```bash
node <studio>/scripts/render.mjs --config config.json --stills 0.3,1.8,3.9,5.8,8.6,11.5,13.2,15.2 --out apercu
node <studio>/scripts/render.mjs --config config.json --out remake.mp4 --audio work/voix.wav
bun $R/frames.ts --in remake.mp4 --out clone/frames --fps 10
bun $R/sheet.ts compare --ref ref/frames --clone clone/frames --out compare --every 5
bun $R/compare.ts --ref ref/frames --clone clone/frames --out compare
```
La planche `compare` met l'inspiration et le remake côte à côte, image par image. Les pixels ne peuvent pas être identiques (autre personne, autre décor, autres mots) : vérifie que **chaque animation de l'inspiration a son équivalent**, au même endroit, avec la même entrée et la même sortie, et que les moments forts tombent sur les bons mots. Corrige, refais les images de contrôle, recommence (2 à 4 tours).

Limites honnêtes à dire à l'utilisateur :
- un mot « derrière les mains » seulement (pas derrière tout le corps) demande un détourage des mains : on le met devant ;
- les rendus 3D (molécule, hologramme, objets brillants) sont des équivalents dessinés, pas les mêmes modèles 3D ;
- la musique et les bruitages de l'inspiration ne sont pas copiés : ajoute les siens avec `sfx.py`.
