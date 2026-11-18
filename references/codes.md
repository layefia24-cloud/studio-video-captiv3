# Index des codes du look book

L'utilisateur choisit souvent une animation par son **code** (« mets du P03 », « la scène 5 en B14 »). Ce fichier donne, pour chaque code, la recette du moteur. Cherche d'abord le code ici, puis règle la scène avec `lookbook.md` (format court) ou `premium.md` (premium et nouvelles scènes).

Chaque code a sa vignette dans `vignettes/<code>.jpg` (ex. `vignettes/P3.jpg`, `vignettes/P3-produit.jpg`, `vignettes/L4.jpg`) : montre-la à l'utilisateur quand tu proposes ce code.

## Lire un code
- **Lettre = onglet du look book** : `L` = Format court (17 looks), `P` = Premium 16:9 (17 looks), `A` = Face caméra verticale (10 looks), `B` = Motion design éducatif (20 looks), `SS` = interfaces Stageshow.
- **Numéro** : `P3`, `P03` et `p3` désignent le même look. Dans le look book, l'onglet Format court numérote ses fiches sans lettre (« 4. Badge d'étape ») : c'est `L4`.
- **Fidélité** : ✅ le moteur refait le look ; ≈ le moteur s'en approche (dis-le à l'utilisateur) ; ↪ le moteur ne sait pas le faire, propose le remplacement indiqué et demande s'il convient avant de fabriquer.
- Les looks premium (`P`) marchent en 16:9 comme en 9:16. Les looks `L` et `A` sont pensés pour le 9:16.
- Un look **face caméra** demande une vidéo de la personne (`source`) ; sans vidéo, utilise la version **sans visage** indiquée.

## L · Format court (onglet « Format court »)
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| L1 | Studio sombre + sous-titres mixtes | `short` + `captions.style:"mix"`, `look:"studio"` | ✅ |
| L2 | Carte d'interface sous le texte | `ui` `app` / `prompt` / `notif` / `video` / `comment` sur `short` ou `stage` | ✅ |
| L3 | Compteur d'argent, prix barré | `ui` `counter` (montants fournis par le client) ; `strike` (`old`, `new`) | ✅ |
| L4 | Badge d'étape en losange | `ui` `step` (`n`, `title`) ; sans visage : `stage` + `step:{n,title}` | ✅ |
| L5 | Plein écran bleu « Apple » | `stage` `bg:"blue"` + `layout` `single` / `stack` | ✅ |
| L6 | Écran partagé haut / bas | `stage` `split:0.5` | ✅ |
| L7 | Papier crème explicatif | `stage` `bg:"paper"`, `annot` (traits, grille, barres) | ✅ |
| L8 | Mur et carrousel de cartes | `stage` `layout:"wall"` ou `"carousel"` + `cards` | ✅ |
| L9 | Publication surlignée inclinée | `post` (`title` avec le *montant* surligné, `tilt`, `zoomTo`) | ✅ |
| L10 | Timeline verticale | `timeline` (`steps`) | ✅ |
| L11 | Profil construit ligne à ligne | `profile` (`bio` s'écrit ligne par ligne) | ✅ |
| L12 | Chrono circulaire | `ui` `timer` (`from`, `rate`, `unit`) | ✅ |
| L13 | Variante vert néon | `"look":"green"` | ✅ |
| L14 | Variante violet script | `"look":"violet"` (`hl` passe en script) | ✅ |
| L15 | Avant / après (deux cadres verticaux) | `ba` (`before`, `after`, `la`, `lb`, `ratio:1.6`) ; avec deux vidéos : deux rendus côte à côte au montage | ≈ |
| L16 | Transitions floues | `"fx":"blur"` (entrée) et `"out":"blur"` (sortie) sur toute scène | ✅ |
| L17 | Appel à commenter le mot-clé | `ui` `comment` (`text`:"MOT", `w`:0.62) | ✅ |

## P · Premium 16:9 (onglet « Premium 16:9 »)
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| P1 | Sous-titres premium dans le tiers bas | `pface` + `captions:{style:"mix",band:true}` | ✅ |
| P2 | Losanges de chapitre | `chapter` (`kicker`, `title`) ou `ui` `step` | ✅ |
| P3 | Carte verticale dans un cadre arrondi | avec visage : `pside` (`src`, `label`) ; sans visage ou produit : `frame` (`src`, `title`, `logo`, `ui` autour) | ✅ |
| P4 | Podium de classement | `podium` (`items:[{rank,value,src,h}]`) | ✅ |
| P5 | Compte à rebours lumineux | `countdown` (`from`, `rate`) — seulement pour un vrai délai | ✅ |
| P6 | Fenêtre d'assistant qui tape | `window` (`hello`, `text`) | ✅ |
| P7 | Cubes lumineux des principes | `cubes` (`items`, `active`) | ✅ |
| P8 | Texte plein écran contrasté | `ptext` (`lines`, une ligne `big`) ; sur fond clair : `light:true` | ✅ |
| P9 | Un seul objet centré, ombre portée | `pobject` (`src` détouré, `text`, `light`, `logo`, `big`) | ✅ |
| P10 | Avant / après avec flèche | `ba` (`gray:true` grise l'avant ; `light:true` fond clair) | ✅ |
| P11 | Mur de cartes en perspective | `deck` (`cards`, `title`) | ✅ |
| P12 | Hook visage + texte + visuel | `pface` (`hook`, `callout:{name,role}`) | ✅ |
| P13 | Graphiques et chiffres | `graph`, `curve` (courbe qui monte puis chute), `podium` ou `ui` `counter` | ✅ |
| P14 | Interface néon | ↪ `phoneui` sur thème `tech`, ou démo Stageshow `hero-grid` | ↪ |
| P15 | Couleurs 60-30-10 | `palette` (`colors` : principale, secondaire, accent) | ✅ |
| P16 | B-roll cinématique + texte | `photo` (photo plein écran, zoom lent, titre, mot géant) ou `cutaway` | ✅ |
| P17 | Frise du processus | `timeline` ou `stage` `layout:"row"` ; liste qui se coche : `xlist` `mark:"check"` | ✅ |

## A · Face caméra verticale (onglet « Face caméra verticale »)
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| A1 | Cartes vertes sur fond menthe | `cards` `layout:"checklist"` / `"nodes"`, thème `white` + `acc` vert ; sans visage : `xlist` `mark:"check"` `light:true` | ✅ |
| A2 | Mot-clé géant sur la personne | `face` (sous-titres karaoké) + `hl` | ✅ |
| A3 | Mot XXL derrière la personne | `face` `style:"editorial"` / `"signature"` (masques `--masks`) ; sur `short` : `ghost` + `masks` | ✅ |
| A4 | Vitrine freelance (petit / grand cadre) | ≈ `ba` avec deux images ; avec deux vidéos : deux rendus côte à côte au montage | ≈ |
| A5 | Présentatrice, mot jaune, flash orange | `short` + `punch` + `"fx":"leak"`, mot en `hl` | ✅ |
| A6 | Icônes et chiffres qui surgissent | `ui` `pill`, `counter`, `avatar` sur `short` | ✅ |
| A7 | Plein écran noir et orange | `kinetic` thème `pub`, `strike:true` sur la ligne barrée | ✅ |
| A8 | Papier blanc, étape en serif + vignette | `pip` (`number`, `big`, `small`) | ✅ |
| A9 | Éditorial en haut, visage en bas | `split` (`small`, `big`, `ghost`) | ✅ |
| A10 | Logiciel en vert | `phoneui` (capture, `tap`) ou démo Stageshow | ≈ |

## B · Motion design éducatif (onglet « Motion design éducatif »)
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| B1 | Téléphone en main + boutique | ≈ `phoneui` avec la capture de la boutique et `tap` ; une vraie main filmée reste plus fidèle | ≈ |
| B2 | Téléphone 3D « disco » | ↪ `pobject` (produit détouré) + `ui` `pill` ; la 3D demande un logiciel 3D ou une IA vidéo | ↪ |
| B3 | Site sur ordinateur + flèche | ≈ `object` (capture détourée) + `cta` | ≈ |
| B4 | Sombre et orange, listes numérotées | `kinetic` thème `tech` ou `pub` | ✅ |
| B5 | Silhouettes de nuit | ↪ `daynight` (ciel qui passe du jour à la nuit, lune, étoiles) + titre | ↪ |
| B6 | Maquettes pédagogiques 3D | ↪ `timeline` ou `stage` `bg:"paper"` avec étapes numérotées | ↪ |
| B7 | Vue éclatée d'un objet | ↪ `annot` (photo + étiquettes reliées par des traits) | ↪ |
| B8 | Mécanique de jouets | ↪ `bento` tuiles `bar` / `stat`, ou `palette` pour une répartition | ↪ |
| B9 | Objet héros publicitaire | ≈ `pobject` (gros plan) puis `photo` avec `big` (slogan) | ≈ |
| B10 | Interface d'appli flottante | ≈ cartes `ui` `app` / `notif` sur `stage` clair, ou démo Stageshow | ≈ |
| B11 | Circuit, ballon, musée | ↪ `timeline` (chronologie) ou `deck` | ↪ |
| B12 | Éditorial violet | `kinetic` thème `poster` + `acc` violet | ✅ |
| B13 | Gris minimal | `kinetic` thème `mono` ; liste : `xlist` `light:true` | ✅ |
| B14 | Bento de widgets | `bento` (`tiles`) | ✅ |
| B15 | Courbe qui se trace | `graph` + `cta`, ou `curve` (montée puis chute en rouge) | ✅ |
| B16 | Crème et orange minimal | `object` thème `cream` / `studio`, ou `pobject` `light:true` | ✅ |
| B17 | Affiche rouge et noir | `kinetic` thème `poster` (`circle`, `img`, `bw`) | ✅ |
| B18 | Appli de paiement verte | `phoneui` ou démo Stageshow `payout-flow` | ≈ |
| B19 | Plage 3D, rangée de téléphones | ↪ `stage` `layout:"row"` avec des captures | ↪ |
| B20 | Désert 3D, maisons sur pilotis | ↪ `photo` (vraie photo de décor, zoom lent) + un mot blanc | ↪ |

## SS · Interfaces Stageshow
Codes : `SS · <exemple>`, par exemple `SS · ai-chat`. Stageshow (MIT) est un projet séparé : copie l'exemple, traduis les textes, filme-le (capture CDP image par image) et place la vidéo dans une scène `clip` (`dir`, `count`, `fps`, `title`), `pside` ou `cutaway`. Sans Stageshow installé, prends l'équivalent du moteur.

| Code | Ce qu'il montre | Équivalent du moteur |
|---|---|---|
| SS · ai-chat, ai-cards | Une demande à une IA et sa réponse | `window` (P6) ou `ui` `prompt` |
| SS · chart-scrub, dark-hero | Une courbe de résultats | `graph`, `curve` |
| SS · payout-flow, subscriptions | Un paiement reçu, un retrait | `ui` `notif` (montants fournis par le client) |
| SS · table-edit, story | Une facture, un tableau modifié | `week`, `cards` |
| SS · form-error, upload, share | Une inscription, un envoi de fichier | `ui` `prompt` |
| SS · messages, imessage, telegram | Une conversation client | `cards` `layout:"chat"` |
| SS · phone-touch, dynamic-island, swipe | Une appli de téléphone | `phoneui` (`tap`) |
| SS · bento, staggered-bento, hero-grid | Une grille de fonctions | `bento` |

Les fausses interfaces servent à expliquer, jamais à tromper : pas de faux paiements, avis ou soldes présentés comme réels.
