# Style « éditorial crème » (sans visage) — scène `ed`

Inspiré de vidéos d'agence étudiées image par image : fond crème avec halo sable, titres serif (Lora) avec mots en italique, petites capitales espacées, un personnage détouré qui présente, des cartes blanches qui arrivent une à une, et des volets olive / sable entre les chapitres. Pas de sous-titres : le texte à l'écran est le contenu, la voix off le porte.

## Grammaire mesurée
- Un écran = un titre (2–6 mots) + 1 à 5 éléments qui arrivent toutes les 0,4–0,9 s, calés sur la voix. L'écran reste 2,5 à 6 s, puis change.
- Les mots du titre passent du gris pâle à l'encre, un par un (0,07 s d'écart). Le mot important est en *italique* ; parfois souligné au marqueur sable (`__mot__`) ou barré en rouge (`~~mot~~`).
- Le personnage entre en fondu « fantôme » (transparent et flou → net), toujours en bas, à gauche ou à droite ; le contenu se place de l'autre côté.
- Changement de chapitre : volet (sable en haut, olive en bas) qui monte en 0,5 s (`"wipe":"olive"` ou `"tan"`), ou fondu au crème (`"fadeOut":true`).
- **Couleurs : toujours celles de la personne, jamais celles de la vidéo étudiée.** Mets dans le config `"ed":{"primary":"#…","secondary":"#…"}` : couleur principale de la marque (pastilles, fonds pleins, volets) et couleur secondaire (accents, soulignés, gros numéros). Tout le reste (fond crème teinté, encre, gris, lignes, halo, fond sombre) se calcule à partir de ces deux couleurs.
  - L'utilisateur donne ses codes couleur → utilise-les tels quels.
  - Sinon, tire-les de son logo, d'une photo de son produit ou d'une image de sa vidéo : `python3 <studio>/scripts/palette.py logo.png [photo.jpg]` affiche le bloc `"ed"` à coller. Montre le résultat à l'utilisateur avant de fabriquer.
  - Sans marque ni logo : palette par défaut crème #F6EFE7, encre #2B2420, olive #4E5E40, sable #C9AE8A, brun #3B2A22.
  - Une clé donnée explicitement (`bg`, `ink`, `olive`, `tan`, `brown`, `card`, `red`) remplace la teinte calculée. Le rouge sert seulement à barrer ou tamponner.
  - Sur un fond plein (`"olive":true`) ou sombre (`"dark":true`), titres et sur-titres passent automatiquement en clair.
- Ouverture possible sur fond sombre (`"dark":true`, « QUESTION DU JOUR »), fin sur le logo (`logo`).

## Éléments (`"els":[{"kind":…,"at":…}]`, positions x / y en fraction de l'écran)
| kind | champs | rôle |
|---|---|---|
| `header` | `brand`, `right`, `prog` (0–1), `center` | marque en capitales espacées + ligne de progression |
| `kicker` | `text`, `y`, `al` | « — ÉTAPE 1 · INSCRIPTION » |
| `title` | `text`, `sub`, `size`, `y`, `al`, `w`, `col`, `icol` | titre serif qui se révèle mot à mot |
| `text` | `text`, `y`, `size` | phrase courte en sans |
| `char` | `src` (PNG détouré), `x`, `y`, `h`, `flip` | personnage qui présente |
| `cards` | `items:[{icon,title,sub,ic,num,right}]`, `x`, `y`, `w`, `step` | cartes blanches à pastille |
| `counter` | `from`, `to`, `label`, `pill` | gros chiffre qui défile + pastille « validé » (montants fournis par le client) |
| `numlist` | `items`, `step`, `gap` | liste 1-2-3 à pastilles olive |
| `pills` | `items:[{text,kind:"x"|"check",fill,icon}]` | lignes cochées ou barrées |
| `tag` | `text`, `icon`, `col` | étiquette arrondie |
| `calendar` | `days`, `label`, `foot`, `dur` | calendrier qui se remplit |
| `people` / `network` | `n`, `icon` | groupe de personnes / réseau autour d'une icône |
| `donut` | `pct`, `label` | anneau de pourcentage (chiffre réel uniquement) |
| `phone` | `src`, `notes:[{text,x,y,at}]` | téléphone avec capture + bulles |
| `tracks` | `head`, `dur` | pistes de montage images + voix |
| `bignum` | `n`, `step`, `title`, `of`, `done` | gros « 01 » sable + « ÉTAPE 01 / 04 » |
| `bigcheck`, `lock`, `clock`, `icons` | — | pictogrammes animés (icônes : play, send, user, check, x, mic, video, calendar, lock, chat, pin, edit, star, box, question, bolt, heart) |
| `qr`, `img`, `stamp`, `tape`, `panel`, `logo` | — | QR code, image, tampon « PAS DE DM », étiquette, panneau olive avec prix, logo final |

## Ce qu'il faut demander
- Le **personnage** : 3 à 5 poses PNG détourées du même personnage (présente, réfléchit, bras croisés, assis). Sans personnage, place le contenu au centre.
- Les captures réelles (profil, produit, application) pour `phone` et `img`.
- Le QR code et le numéro de contact seulement s'ils sont fournis.

Exemple complet : `exemple-editorial.json`.
