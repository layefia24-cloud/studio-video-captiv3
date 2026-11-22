# Référence de config.json

Tous les chemins sont relatifs au dossier du projet (là où tu lances `render.mjs`).

```json
{
  "width": 1080, "height": 1920, "fps": 30,
  "brand": {
    "primary": "#16a34a",   "accent": "#ffd400",
    "dark": "#0b3d2e",      "light": "#f4f8f2",
    "font": "Poppins",      "display": "Fraunces",
    "logo": "img/logo.png", "handle": "@moncompte", "name": "MA MARQUE",
    "grad": ["#ffb36b", "#ff5e7e", "#c77dff"]
  },
  "source": { "frames": "work/frames", "masks": "work/masks", "count": 900, "fps": 30, "offset": 0 },
  "words": "work/words.json",
  "captions": { "on": true, "y": 0.72, "maxWords": 3 },
  "fonts": [ { "family": "MaPolice", "src": "img/MaPolice.ttf", "weight": "700" } ],
  "watermark": "",
  "scenes": [ ... ]
}
```

- `source.count` : nombre d'images dans `work/frames` (lu dans `work/info.json`).
- `width/height` : 1080×1920 (9:16). Pour 4:5 : 1080×1350 ; carré : 1080×1080.
- Polices fournies : Poppins (400, 500, 700, italiques) et Fraunces (600, italique). Ajoute les tiennes dans `fonts`.

## Champs communs à toutes les scènes
| champ | rôle |
|---|---|
| `t0`, `t1` | début et fin en secondes (temps de la vidéo finale) |
| `type` | `face`, `cutaway`, `cards`, `pip`, `split`, `end` |
| `fx` | `"leak"` (lumière orange) ou `"flash"` (éclair blanc) au début de la scène |
| `srcOffset` | décale l'image source : image = t + srcOffset (par défaut `source.offset`) |
| `captions` | `false` pour couper les sous-titres sur cette scène ; `true` pour les afficher sur une scène `cards`/`cutaway` |
| `hl` | liste de mots à mettre en grand dans les sous-titres (`["whatsapp","gratuit"]`) |
| `capY` | hauteur des sous-titres (0 à 1) |

## type "face"
`style` : `plain` | `signature` | `editorial` | `violet` | `neon`
| champ | rôle |
|---|---|
| `big`, `small`, `size` | mot principal, petite phrase au-dessus, taille (en % de largeur, ~12 à 20) |
| `wy` | hauteur du mot principal (0.72 à 0.8 = poitrine) |
| `fy` | cadrage vertical de la personne (0 = haut, 1 = bas ; 0.45 par défaut) |
| `punch` | `true` : léger zoom à l'entrée |
| `ghost`, `ghostAt` | mot géant derrière la personne (nécessite `--masks`) |
| `vertical`, `verticalAt`, `vx` | mot écrit verticalement derrière la personne (nécessite `--masks`) |
| `ring`, `ringAt` | liste de photos en arc autour de la tête (derrière la personne) |
| `floats` | `[{"src":"img/a.jpg","side":"l","at":0.1,"y":0.2,"x":0.22,"w":26}]` photos qui flottent |
| `phone` | `{"src":"img/capture.jpg","at":0.15,"x":0.82,"y":0.48,"w":0.34}` téléphone qui monte |
| `hideY`, `hideH` | floute une bande (ex. sous-titres déjà incrustés) à la hauteur `hideY` |

En `plain`, les sous-titres karaoké s'affichent ; `big` (optionnel) ajoute un mot fixe.

## type "cutaway"
`src` (photo), `big` (mot blanc), `label` (pastille en haut), `size`, `wy`.

## type "cards"
`layout` + `title` (pastille en haut) + `caption` (phrase en bas) + `bg` (`light` ou `dark`) + `stagger` (délai entre éléments, 0.18 s).
| layout | champs |
|---|---|
| `checklist` | `items`: ["texte", …] (coches vertes qui arrivent une à une) |
| `steps` | `items`: ["texte", …] (cartes sombres numérotées 01, 02…) |
| `nodes` | `center`: "Ta boutique", `items`: ["Awa","Fatou",…], `checked`: [1,3] |
| `counter` | `items`: [{"label":"ventes","value":12,"from":0,"prefix":"","suffix":""}] |
| `product` | `src`, `name`, `price`, `tag`, `cta` |
| `chat` | `name`, `items`: [{"text":"Bonjour"},{"from":"me","text":"Oui !"}] |
| `persona` | `name`, `people`: [{"name":"Awa","src":"img/awa.jpg"}], `items`: ["25-40 ans"] |
| `compare` | `items`: [{"title":"Avant","lines":[…]},{"title":"Après","lines":[…]}] |

## type "pip"
`number` (chiffre fantôme), `big` (serif italique), `small`, `dots`: [étape, total].

## type "split"
`small` (serif), `big` (gras, lettres qui apparaissent), `ghost` (mot fantôme qui glisse).

## type "end"
`tagline`, `bg`. Utilise `brand.logo` (ou `brand.name`) et `brand.handle`.

---
# Vidéos sans visage

Au niveau de la config : `"faceless": true` (sous-titres karaoké automatiques sur les scènes sans texte propre), `"theme": "tech"` (thème par défaut), `"themeOverride": {"tech": {"acc": "#00c2ff"}}`. Pas de `source` nécessaire.

Thèmes : `poster`, `dark`, `pub`, `tech`, `cream`, `white`, `bento`, `beige`, `studio`, `mono`. Sur toute scène : `theme`, `acc` (couleur d'accent), `header` (pastille ou, en `cream`/`beige`, titre « mot | *italique* »).

Dans les textes, `*mot*` = mot-clé coloré (en pastille sur `pub`/`tech`, en italique serif sur `cream`/`beige`/`white`).

## type "kinetic"
| champ | rôle |
|---|---|
| `lines` | `[{"text":"n'a pas de *vie* ?","size":10,"at":0.5,"y":0.8,"blur":true,"strike":true,"box":false}]` (empilées automatiquement si pas de `y`) |
| `circle`, `cx`, `cy` | disque de couleur d'accent derrière l'image |
| `img`, `imgW`, `imgX`, `imgY`, `bw` | image PNG détourée (noir et blanc si `bw`) |
| `ghost` | mot géant qui défile en bas (2 rangées) |
| `stamp`, `stampText`, `stampAt`, `stampY` | coche ronde « ÇA MARCHE » |
| `timer` | cercle chronomètre jusqu'à N secondes |

## type "graph"
`curve` (`linear`, `easeOut`, `easeIn`, `easeInOut`, `spring`), `label` (pastille du panneau), `caption` (phrase sous le panneau).

## type "bento"
`tiles`: `[{"kind":"stat","value":3,"label":"réglages","title":"Courbes","dark":true,"color":"#22c55e"},{"kind":"bar","value":82,"wide":true},{"kind":"clock"},{"kind":"dots","value":9},{"kind":"img","src":"img/x.jpg","tall":true},{"kind":"text","text":"*57 %* batterie"}]`

## type "avatar"
`pose` (PNG du personnage), `side` (`l`, `r`, `c`), `h` (hauteur 0.62), `kicker`, `title`, `sub`, `size`, `items` (cartes cochées), `phone` (capture), `badge` (`["5","JOURS"]`).

## type "object"
`src` (PNG/JPG de l'objet), `w`, `y`, `label` (titre), `counter` (nombre animé), `suffix`, `cSize`, `counterY`, `ribbon` (ruban), `caption`.

## type "phoneui"
`src` (capture verticale), `fy`, `step` (« ÉTAPE 2 »), `title`, `tap` (`{"x":0.5,"y":0.8,"at":0.6}` position relative dans l'écran), `tags` (`[{"text":"La voix","side":"l","y":0.45}]`).

## type "cta"
`small` (« Commente »), `big` (« « MOTION » »), `sub`, `icons` (ex. « ♥ »).

## Voix IA
`python3 scripts/tts.py script.txt` → `work/voix_ia.wav` (voix française `ff_siwis`, licence Apache 2.0), puis `python3 scripts/prepare.py work/voix_ia.wav --audio-only --words`.

---
# Format court (module short.js)
Scènes `short`, `stage`, `post`, `timeline`, `annot`, `profile`, cartes `ui`, sous-titres `"style":"mix"`, looks `studio` / `green` / `violet`, transitions `fx`/`out` `"blur"` : voir `lookbook.md`.
