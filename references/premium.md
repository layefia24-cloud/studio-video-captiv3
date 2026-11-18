# Module premium (premium.js) — talking head haut de gamme, 16:9 et 9:16

Chargé automatiquement par `engine.html`. Pour du 16:9 : `"width":1920,"height":1080` (ou 1280×720).
Une vidéo face caméra verticale est alors affichée en entier au centre, sur un fond flou (`"fit":"cover"` pour la rogner).

## Réglages globaux
```json
"palette": {"acc":"#fbbf24","accDark":"#92400e","white":"#fff7ea","black":"#0b0703"},
"special": "script",                 // script | serif | bold : police des *mots* spéciaux
"captions": {"style":"mix","band":true,"y":0.82,"size":3.1,"maxWords":7}
```
Palette : prends une couleur du décor (lampe, vêtement) ou de la marque, une version vive (`acc`), une sombre (`accDark`), un blanc et un noir teintés de cette couleur.

## Scènes
| type | champs | rôle |
|---|---|---|
| `pface` | `hook`, `hookAt`, `callout:{name,role,at}`, `faceX`, `fit`, `ui` | visage + sous-titres en bande, hook, encart nom |
| `pside` | `src`, `label`, `over`, `bars` | carte vidéo verticale à gauche, visage à droite |
| `chapter` | `kicker`, `title`, `sub`, `imgs`, `bars` | carte de chapitre |
| `podium` | `items:[{rank,value,src,h,order}]`, `title`, `bars` | classement en colonnes |
| `cubes` | `items`, `active`, `title`, `bars` | cubes lumineux (principes) |
| `ptext` | `lines:[{text,big,at}]`, `bars` | texte plein écran contrasté |
| `window` | `hello`, `text`, `placeholder`, `cps`, `bars` | fenêtre d'assistant qui tape |
| `ba` | `before`, `after`, `la`, `lb`, `ratio`, `title` | avant / après avec flèche |
| `pobject` | `src`, `text`, `light`, `w`, `round` | objet seul centré, ombre portée |
| `countdown` | `from` (s), `rate`, `sub`, `bars` | compte à rebours lumineux (seulement pour un vrai délai) |
| `deck` | `cards`, `title`, `bars` | mur de cartes en perspective |

`bars` : `blue`, `violet`, `gold`, `red`, `green` (fond de barres lumineuses).
Les cartes `ui` (app, prompt, notif, counter, strike, step, timer…) marchent aussi sur `pface`.

## Scènes produit et éducatives (v2.3)
Toutes acceptent `light:true` (fond clair dans la `palette`), `fx`/`out` `blur`, et des cartes `ui` par-dessus (`frame`, `photo`, `pobject`, `ba`).
| type | champs | rôle (code) |
|---|---|---|
| `frame` | `src`, `fw` (largeur 0–1), `fy`, `logo`, `logoW`, `logoY`, `title`, `ty`, `tsize`, `titleAt`, `sub`, `sy`, `subAt`, `ui` | photo entière dans un cadre arrondi, fond = la même photo floutée ; pastilles `ui` `pill` autour (P3 sans visage) |
| `photo` | `src`, `fy`, `z0`→`z1` (zoom), `gray`, `dim`, `top`, `logo`, `big`, `by`, `bsize`, `title`, `ty`, `tsize`, `sub`, `sy`, `ssize`, `ui` | photo plein écran cinématique, titre, logo, mot géant (P16, hook photo) |
| `xlist` | `items`, `mark:"x"`/`"check"`, `title`, `at`, `step`, `isize` | croix rouges ou coches vertes qui tombent une à une (erreurs, gestes, ingrédients) |
| `palette` | `colors:[principale, secondaire, accent]`, `title`, `sub` | barres 60 / 30 / 10 % (P15) |
| `daynight` | `title`, `sub` | le ciel passe du jour à la nuit, lune et étoiles (routine du soir) |
| `arrows` | `items` (zones), `title` | colonnes avec chevrons qui montent (masser de bas en haut) |
| `curve` | `pts` (0–1), `peak` (indice), `labels:[{i,text,red}]`, `title` | courbe qui monte puis chute en rouge après `peak` (abandon, perte) |
| `flip` | `words` (mois…), `title`, `wsize`, `card`, `cardSub` | mots qui défilent puis s'arrêtent sur le dernier (procrastination) |
| `clip` | `dir`, `count`, `fps`, `start`, `w`, `cy`, `title`, `sub` | séquence d'images (capture Stageshow) dans un cadre (SS) |
| `week` | `items:[{d,t,on,hot}]`, `title`, `y` | planning en lignes qui se cochent (calendrier, tableau) |

Options ajoutées aux scènes existantes :
- `ptext` : `light`, `bsize` (ligne `big`), `lsize` (autres lignes), `gap`.
- `ba` : `light`, `gray` (avant en noir et blanc), `lsize`, `tsize`, `ui`.
- `pobject` : `oy` (hauteur de l'objet), `logo`, `logoW`, `logoY`, `big`, `by`, `bsize`, `ty`, `tsize`, `textAt`, `sub`, `sy`, `ssize`, `ui`.
- `short` : `ghost:{text,at,y,size,c1,c2}` (chiffre ou mot doré géant derrière la personne, avec `masks`), `ring` (cartes en arc).

Palettes conseillées : crème et or `{"acc":"#B8862F","accDark":"#7a5223","white":"#F8F1E7","black":"#2a1d12"}` ; bleu nuit et or `{"acc":"#E5B53A","accDark":"#1E3A8A","white":"#F5F7FF","black":"#0A1430"}` ; papier `{"acc":"#1E3A8A","accDark":"#1E3A8A","white":"#F4F1EA","black":"#14181F"}`.

## Règles de design
- Un sans pour 80 % du texte (poids 300–400), une police spéciale pour un mot par phrase.
- Grille 3×3 : sujet au centre, texte dans les tiers ; deux éléments = un dans chaque moitié.
- 60 % couleur principale, 30 % secondaire, 10 % accent ; une seule couleur vive.
- Hook = visage (yeux sur le tiers haut) + phrase + preuve visuelle.
- La moitié du montage en plein écran, entrées et sorties floues.

Modèle : `exemple-premium-16x9.json`.
