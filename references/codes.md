# Index des codes du look book

L'utilisateur choisit souvent une animation par son **code** (« mets du P03 », « la scène 5 en B14 »). Ce fichier donne, pour chaque code, la recette du moteur. Cherche d'abord le code ici, puis règle la scène avec `lookbook.md` (format court) ou `premium.md` (premium et nouvelles scènes).

Chaque code a sa vignette dans `vignettes/<code>.jpg` (ex. `vignettes/P3.jpg`, `vignettes/P3-produit.jpg`, `vignettes/L4.jpg`) : montre-la à l'utilisateur quand tu proposes ce code.

## Lire un code
- **Lettre = onglet du look book** : `L` = Format court (17 looks), `P` = Premium 16:9 (17 looks), `A` = Face caméra verticale (10 looks), `B` = Motion design éducatif (20 looks), `E` = Éditorial crème (15 looks, sans visage), `X` = Effets derrière toi (31 looks, face caméra), `O` = Objets illustrés (21 looks, face caméra), `SS` = interfaces Stageshow.
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

## E · Éditorial crème (sans visage, scène `ed`, voir `editorial.md`)
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| E1 | Question du jour sur fond sombre | `ed` `dark:true` + `kicker` + `title` centré | ✅ |
| E2 | Titre serif mot à mot + italique | `title` (`*mot*`, `__souligné__`, `~~barré~~`) | ✅ |
| E3 | Personnage qui présente des cartes | `char` + `cards` | ✅ (personnage fourni) |
| E4 | Compteur + pastille « validé » | `counter` (`pill`) | ✅ |
| E5 | Liste 1-2-3 à pastilles | `numlist` | ✅ |
| E6 | Lignes barrées / cochées | `pills` (`kind:"x"` / `"check"`) | ✅ |
| E7 | Calendrier qui se remplit | `calendar` | ✅ |
| E8 | Groupe / réseau de personnes | `people`, `network` | ✅ |
| E9 | Gros numéro d'étape « 01 » | `bignum` | ✅ |
| E10 | Pistes de montage images + voix | `tracks` | ✅ |
| E11 | Téléphone + bulles | `phone` (`notes`) | ✅ |
| E12 | Anneau de pourcentage | `donut` | ✅ |
| E13 | Pictogrammes (horloge, cadenas, coche, interdits) | `clock`, `lock`, `bigcheck`, `icons` (`no:true`) | ✅ |
| E14 | Volet olive / sable entre chapitres | `"wipe":"olive"` ou `"tan"` sur la scène | ✅ |
| E15 | Logo final + signature | `logo` | ✅ |

## X · Effets derrière toi (face caméra, scène `fx`, voir `effets.md`)
Toujours avec une vidéo de la personne détourée (`prepare.py --masks`). Un effet par vidéo (sauf démo d'effets avec `titre`).
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| X1 | Une enveloppe tombe en tournant derrière la tête, rebondit, le rabat s'ouvre et 5 vidéos sortent en éventail | `fx` `enveloppe` | ✅ |
| X2 | Un dossier apparaît, un curseur clique, le dossier s'écrase, 7 vidéos jaillissent et se posent autour de la personne | `fx` `dossier` | ✅ |
| X3 | Un appareil instantané flashe, imprime deux photos qui partent sur les côtés et se développent en vignettes | `fx` `polaroid` | ✅ |
| X4 | Un tapis roulant passe derrière la personne ; les vidéos défilent et reçoivent une coche au milieu | `fx` `tapis` | ✅ |
| X5 | Une fenêtre « Mes vidéos » pleine de `final_FINAL.mp4` ; le curseur clique et chaque fichier se joue dans un aperçu | `fx` `fichiers` | ✅ |
| X6 | Un anneau fin se dessine, puis de grandes vignettes tournent autour de la tête, derrière puis devant | `fx` `orbite` | ✅ |
| X7 | Un mur de vignettes avec leur titre en serif italique | `fx` `mur` | ✅ |
| X8 | Fond lilas, la personne dans un cadre photo, sa tête en sort | `fx` `cadre` | ✅ |
| X9 | La vidéo devient un Reel dans un téléphone sur fond pastel | `fx` `telephone` | ✅ |
| X10 | Mur de unes : des feuilles de papier avec de gros titres et des étiquettes colorées | `fx` `titres` | ✅ |
| X11 | La caméra plonge dans le visage puis coupe net | `fx` `traversant` | ✅ |
| X12 | La caméra recule : la personne est dans une fenêtre d'immeuble la nuit | `fx` `immeuble` | ✅ |
| X13 | Fond vert remplacé : ciel de coucher de soleil, soleil derrière la tête, montagnes, pastille « CHROMA KEY ON » | `fx` `decor` | ✅ |
| X14 | Un couloir de cadres file vers l'arrière derrière la personne | `fx` `vertigo` | ✅ |
| X15 | Texte chromé en relief : 1re ligne derrière, 2e devant | `fx` `verre` | ✅ |
| X16 | Un anneau doré lumineux derrière la tête | `fx` `halo` | ✅ |
| X17 | UI World : des panneaux d'interface (calques, réglages, compteur, aperçu, timeline) flottent autour, le curseur clique « Appliquer » | `fx` `ui` | ✅ |
| X18 | Viseur de caméra : REC, timecode, mise au point sur le visage, zoom 2.0x | `fx` `zoomcam` | ✅ |
| X19 | Une carte blanche dont les cases se cochent et se barrent, compteur 03/17 | `fx` `checklist` | ✅ |
| X20 | Fond bleu nuit, des barres et une courbe grimpent derrière la personne | `fx` `courbe2` | ✅ |
| X21 | Des bandes de papier déchiré traversent l'écran, avec un titre | `fx` `papier` | ✅ |
| X22 | Gribouillis vivants : halo, flèches, étoiles et bulle dessinés à la main qui tremblent | `fx` `doodle` | ✅ |
| X23 | La personne fait la une d'un magazine (titre, badge rond, code-barres) | `fx` `magazine` | ✅ |
| X24 | Carte de fin en verre « COMMENTE [MOT] » sur rayons lumineux, grand mot final | `fx` `fin` | ✅ |
| X25 | Des points d'interrogation flottent autour de la tête | `fx` `questions` | ✅ |
| X26 | Un arc de drapeaux (ou d'icônes colorées) se déploie autour de la tête | `fx` `arc` | ✅ |
| X27 | De grandes photos surgissent au-dessus de la tête puis s'ouvrent en éventail | `fx` `photos` | ✅ |
| X28 | Un mot géant lumineux derrière la personne, avec un halo coloré | `fx` `motgeant` | ✅ |
| X29 | Des chiffres flottent autour de la personne | `fx` `chiffres` | ✅ |
| X30 | Une icône néon qui s'allume en clignotant derrière la personne | `fx` `neon` | ✅ |
| X31 | Une grande forme colorée ondule derrière la personne | `fx` `forme` | ✅ |

## O · Objets illustrés (face caméra sur fond crème, cabine ou nuit, scène `fx`)
La personne détourée en bas (`"bg":"creme","zoomP":0.85`), un objet au-dessus de sa tête, la phrase en haut à gauche avec un mot en serif italique. Fonds : `creme`, `cabine` (pastel perforé), `nuit2`. Options : `reperes`, `annot`, `trame`, `cap:"tuiles"` (voir `effets.md`).
| Code | Look | Recette | Fidélité |
|---|---|---|---|
| O1 | Un compteur qui défile dans une carte (abonnés, vues…) | `fx` `compteur` | ✅ |
| O2 | Un coffre-fort qui s'ouvre sur un mot | `fx` `coffre` | ✅ |
| O3 | Un tampon qui s'écrase (VALIDÉ, FAUX…) | `fx` `tampon` | ✅ |
| O4 | Des barres qui montent, la dernière en couleur | `fx` `barres` | ✅ |
| O5 | Des marches numérotées 1 à 5 | `fx` `marches` | ✅ |
| O6 | Une bulle de question qui s'écrit | `fx` `bulle` | ✅ |
| O7 | Gros titre rouge condensé qui claque (deux lignes : sépare-les par une barre verticale) | `fx` `grostitre` | ✅ |
| O8 | Trois autocollants épinglés avec icône et mot | `fx` `stickers` | ✅ |
| O9 | Une courbe pointillée monte dans une carte, un point rouge la parcourt | `fx` `courbe` | ✅ |
| O10 | Carte sombre de statistiques (vues sur 30 jours) qui défile | `fx` `stats` | ✅ |
| O11 | Carte de profil : photo, nom, 3 chiffres, compteur rouge | `fx` `profil` | ✅ |
| O12 | Fenêtre de chat « Que veux-tu créer ? », une ligne s'écrit, étiquette rouge | `fx` `chat` | ✅ |
| O13 | Un téléphone + un panneau « Claude construit ta vidéo » dont les étapes se cochent | `fx` `construit` | ✅ |
| O14 | Les commentaires + des lettres-tuiles qui forment le mot-clé | `fx` `motcle` | ✅ |
| O15 | Des options en pastilles, le curseur clique la bonne | `fx` `choix` | ✅ |
| O16 | Bulle numérotée « 1 D'ABORD » avec l'objection qui s'écrit et un grand « ? » | `fx` `objection` | ✅ |
| O17 | Des câbles numérotés descendent et se branchent dans une multiprise | `fx` `multiprise` | ✅ |
| O18 | Un terminal : des commandes s'écrivent, coches vertes | `fx` `terminal` | ✅ |
| O19 | Compteur mécanique à chiffres | `fx` `compteurmeca` | ✅ |
| O20 | Liste de tâches qui se cochent + horloge | `fx` `taches` | ✅ |
| O21 | Tableau de bord bleu nuit en verre lumineux | `fx` `tableau` | ✅ |

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
