# Look book — référence du moteur (module short.js)

Le module s'active tout seul : `engine.html` charge `short.js`. Polices fournies : Inter, Instrument Serif (italique), Great Vibes (licence OFL).

## Réglages globaux (config.json)
```json
"look": "studio",                       // studio | green | violet | warm
"captions": {"style":"mix","y":0.62,"size":4.7,"maxWords":6,
             "hl":["mot","émotion"],      // serif italique (script en look violet)
             "strong":["trois","48"]},   // gras plus grand
"uiScale": 1.15,                        // taille des cartes ui
"hideY": 0.78, "hideH": 0.045           // floute des sous-titres déjà incrustés
```
Sous-titres `mix` : le groupe (4 à 7 mots, 2 lignes) apparaît en gris flou, chaque mot devient net et blanc quand il est dit.

## Scène `short` (face caméra)
`punch` (zoom d'entrée), `push` (zoom lent, 0.05), `zoom`, `fy` (cadrage), `look`, `blurFace` (px), `captions:false`, `capY`, `capSize`, `hl`, `strong`, `ui:[…]`.

## Cartes `ui` (sur `short` et `stage`)
Champs communs : `kind`, `at` (s, depuis le début de la scène), `out` (s, sortie), `x`, `y` (0 à 1), `w`.
| kind | champs |
|---|---|
| `app` | `icon` (image) ou `iconText` + `iconBg`, `title`, `sub`, `rating`, `btn` |
| `prompt` | `text` (s'écrit), `cps`, `placeholder`, `brand`, `chips:[{"name":"video_1.mp4","src":"img/a.jpg"}]` |
| `notif` | `items:[{"title","sub","amount"}]` ou `{"from":0,"to":75000,"prefix":"+","suffix":" F"}`, `gap` |
| `comment` | `text` (mot-clé tapé), `cps`, `placeholder` |
| `video` | `src`, `title`, `channel` |
| `counter` | `from`, `to`, `prefix`, `suffix`, `dur`, `size`, `label` (texte *riche*), `glow`, `confetti` |
| `strike` | `old`, `new`, `sub`, `size` |
| `step` | `n`, `title` (*riche*), `sub`, `ghost` (mot flou derrière), `align:"left"` + `label` (pastille sombre en haut à gauche), `d` (taille du losange) |
| `timer` | `from`, `to`, `rate` (unités/s), `hold`, `unit`, `r` |
| `avatar` | `src`, `label`, `r` |
| `pill` | `text`, `bg`, `col` |
| `list` | `items` (*riches*), `step`, `gap`, `size`, `ink:"dark"` sur fond clair |

Texte *riche* : `"Le *mot* important"` → le mot entre astérisques passe en serif italique.

## Scène `stage` (plein écran)
| champ | rôle |
|---|---|
| `bg` | `blue` (Apple), `paper` (crème), `dark`, `green`, `violet` |
| `split` | 0.5 = panneau en haut, visage en bas |
| `layout` + `cards` | `single`, `stack`, `row`, `carousel` (`every` s), `wall` (`cols`, `speed`) ; `cards` = liste d'images |
| `cw`, `ratio`, `cx`, `cyy` | largeur, proportions, position des cartes |
| `title`, `ty`, `tsize` | titre riche (petit sans + serif italique) |
| `big`, `count:{from,to,suffix}`, `bigAt`, `by`, `bsize` | grand chiffre (qui peut rouler) |
| `sub`, `sy`, `ssize`, `foot` | sous-titre et pied de page |
| `bullets`, `bx`, `byy`, `bulletsAt`, `bstep` | liste ✦ |
| `step:{n,title,y}` | losange + titre en haut à gauche |
| `push` | zoom lent (0.04) |

## Autres scènes
- `post` : `name`, `meta`, `avatar`, `title` (le *montant* est surligné en vert), `body`, `likes`, `comments`, `hlAt`, `tilt`, `zoomTo`, `title2`, `bg`.
- `timeline` : `steps:[{"title","sub","img","date","ratio"}]`, `bg` ; la caméra descend d'une étape à l'autre.
- `annot` : `src`, `ratio`, `cw`, `title`, `grid:true` (tiers), `labels:[{"text","sub","px","py","lx","ly"}]`, `bar:[{"v":60,"label":"60 %"}]`.
- `profile` : `avatar`, `handle`, `name`, `posts`, `followers`, `following`, `bio:[…]` (s'écrit ligne par ligne), `grid:[images]`, `title`, `bg`.

## Transitions
Sur toute scène : `"fx":"blur"` (entrée floue 0,3 s) et `"out":"blur"` (sortie floue 0,22 s).

## Les 17 looks → réglages
| # | Look | Réglage |
|---|---|---|
| 1 | Studio sombre + sous-titres mixtes | `short` + `captions.style:"mix"` |
| 2 | Carte d'interface sous le texte | `ui` `app` / `prompt` / `notif` / `video` / `comment` |
| 3 | Compteur d'argent, prix barré | `ui` `counter`, `strike` |
| 4 | Badge d'étape en losange | `ui` `step` |
| 5 | Plein écran bleu | `stage` `bg:"blue"` |
| 6 | Écran partagé | `stage` `split:0.5` |
| 7 | Papier explicatif | `stage` `bg:"paper"`, `annot` |
| 8 | Mur, carrousel | `layout:"wall"` / `"carousel"` |
| 9 | Publication surlignée | `post` |
| 10 | Timeline | `timeline` |
| 11 | Profil ligne à ligne | `profile` |
| 12 | Chrono | `ui` `timer` |
| 13 | Vert néon | `look:"green"` |
| 14 | Violet script | `look:"violet"` |
| 15 | Avant / après | au montage final (deux rendus côte à côte) |
| 16 | Transitions floues | `fx` / `out` `blur` |
| 17 | Appel à commenter | `ui` `comment` |
