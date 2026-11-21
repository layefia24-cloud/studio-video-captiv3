# Effets derrière toi (X1–X31) et objets illustrés (O1–O21)

Une scène `"type":"fx"` montre la vidéo face caméra avec un effet qui se joue **derrière** la personne. Elle est détourée grâce aux masques de `prepare.py --masks`, donc l'effet ne couvre jamais son visage.

## Les règles qui rendent ces effets « chers »
- **Un effet par vidéo.** Cinq effets dans une même vidéo, ça fait une bande démo. Un seul effet, ça fait un style. Les démos du look book sont l'exception.
- **Sur le mot.** L'effet frappe au moment exact où la personne dit son nom : cale `at` sur `words.json`, jamais à l'estime.
- **Derrière, pas dessus.** Si quelque chose touche le visage, remonte-le (`y`) ou rapetisse-le.
- **Les vraies vidéos de la personne** remplissent les cartes : `C.reels` = 6 à 12 images verticales (des captures de ses vidéos, avec visage ou gros texte, ce qui se lit le mieux en petit).
- **Les couleurs et polices de sa marque** uniquement. Ombres douces, coins arrondis, aplats.
- **Des bruitages discrets** (`sfx.py`) : whoosh pour une chute, pop pour une apparition, clic pour un clic, ding pour une coche.
- **6 images de contrôle** (`--stills`) avant le rendu, puis l'accord de l'utilisateur.
- **Peu de place au-dessus de la tête ?** Les effets se rangent sur les côtés et derrière la tête. Pour le style « objets illustrés », passe sur fond crème avec `"bg":"creme","zoomP":0.8` : la personne descend et libère le haut de l'image.

## Réglages communs (scène `fx`)
```json
{"t0": 2.3, "t1": 4.4, "type": "fx", "hl": ["dossier"],
 "fx": {"kind": "dossier", "at": 0.05, "out": 1.8},
 "bg": "orig", "zoomP": 1, "cap": "haut"}
```
- `fx.at` : début de l'effet (en s, depuis le début de la scène). `fx.out` : l'effet s'envole et disparaît (facultatif).
- `bg` : `orig` (le vrai décor, par défaut), `creme`, `marque` ou `nuit` (la personne est détourée sur un fond uni).
- `cap` : `haut` = la phrase dite, alignée à gauche, avec les mots de `hl` en serif italique couleur (sur la vidéo, elle se place en bas, vers 70 % de la hauteur ; `capY` pour la déplacer), `bas` = sous-titres classiques, `false` = aucun.

## Les codes

| Code | `kind` | Ce qu'on voit | Réglages utiles | Idéal pour |
|---|---|---|---|---|
| X1 | `enveloppe` | Une enveloppe tombe en tournant derrière la tête, rebondit, le rabat s'ouvre et 5 vidéos sortent en éventail | `at`, `out`, `y` | révéler un portfolio |
| X2 | `dossier` | Un dossier apparaît, un curseur clique, le dossier s'écrase, 7 vidéos jaillissent et se posent autour de la personne | `click`, `spill`, `label` | montrer l'étendue d'un travail |
| X3 | `polaroid` | Un appareil instantané flashe, imprime deux photos qui partent sur les côtés et se développent en vignettes | `print` | créateurs photo, lifestyle |
| X4 | `tapis` | Un tapis roulant passe derrière la personne ; les vidéos défilent et reçoivent une coche au milieu | `y` | volume, régularité, système |
| X5 | `fichiers` | Une fenêtre « Mes vidéos » pleine de `final_FINAL.mp4` ; le curseur clique et chaque fichier se joue dans un aperçu | `names`, `clicks` [[t, ligne]…], `title` | coulisses, humour de monteur |
| X6 | `orbite` | Un anneau fin se dessine, puis de grandes vignettes tournent autour de la tête, derrière puis devant | `n`, `speed`, `taille` | l'effet viral classique |
| X7 | `mur` | Un mur de vignettes avec leur titre en serif italique | `labels` | catalogue, offre complète |
| X8 | `cadre` | Fond lilas, la personne dans un cadre photo, sa tête en sort | `top`, `rot`, `bg` | annonce, révélation |
| X9 | `telephone` | La vidéo devient un Reel dans un téléphone sur fond pastel | `c1`, `c2`, `handle` | parler des réseaux |
| X10 | `titres` | Mur de unes : des feuilles de papier avec de gros titres et des étiquettes colorées | `words` | lister ce qu'on propose |
| X11 | `traversant` | La caméra plonge dans le visage puis coupe net | `d`, `y` | passer à l'idée suivante |
| X12 | `immeuble` | La caméra recule : la personne est dans une fenêtre d'immeuble la nuit | `d` | « tout le monde fait ça » |
| X13 | `decor` | Fond vert remplacé : ciel de coucher de soleil, soleil derrière la tête, montagnes, pastille « CHROMA KEY ON » | `c1`, `c2` | changer d'ambiance |
| X14 | `vertigo` | Un couloir de cadres file vers l'arrière derrière la personne | `speed` | un déclic |
| X15 | `verre` | Texte chromé en relief : 1re ligne derrière, 2e devant | `top`, `bottom` | mot-clé, appel à commenter |
| X16 | `halo` | Un anneau doré lumineux derrière la tête | `y`, `col` | « la bonne idée » |
| X17 | `ui` | UI World : des panneaux d'interface (calques, réglages, compteur, aperçu, timeline) flottent autour, le curseur clique « Appliquer » | — | parler d'un outil, d'une app |
| X18 | `zoomcam` | Viseur de caméra : REC, timecode, mise au point sur le visage, zoom 2.0x | `z`, `y` | insister sur une phrase |
| X19 | `checklist` | Une carte blanche dont les cases se cochent et se barrent, compteur 03/17 | `items`, `total`, `title` | une liste, un programme |
| X20 | `courbe2` | Fond bleu nuit, des barres et une courbe grimpent derrière la personne | `values`, `label` | une progression (chiffres réels) |
| X21 | `papier` | Des bandes de papier déchiré traversent l'écran, avec un titre | `label` | changer de chapitre |
| X22 | `doodle` | Gribouillis vivants : halo, flèches, étoiles et bulle dessinés à la main qui tremblent | `text` | humour, légèreté |
| X23 | `magazine` | La personne fait la une d'un magazine (titre, badge rond, code-barres) | `title`, `badge`, `cover` | se présenter, une annonce |
| X24 | `fin` | Carte de fin en verre « COMMENTE [MOT] » sur rayons lumineux, grand mot final | `mot`, `top`, `sous`, `big` | la fin qui fait commenter |
| X25 | `questions` | Des points d'interrogation flottent autour de la tête | — | une question, un doute |
| X26 | `arc` | Un arc de drapeaux (ou d'icônes colorées) se déploie autour de la tête | `n`, `cols` | international, réseau |
| X27 | `photos` | De grandes photos surgissent au-dessus de la tête puis s'ouvrent en éventail | `n`, `taille`, `y` | montrer des réalisations |
| X28 | `motgeant` | Un mot géant lumineux derrière la personne, avec un halo coloré | `mot`, `glow`, `c1`, `c2` | un chiffre, un mot fort |
| X29 | `chiffres` | Des chiffres flottent autour de la personne | `items` [[chiffre, légende]…] | des preuves (réelles) |
| X30 | `neon` | Une icône néon qui s'allume en clignotant derrière la personne | `icon` (personne, maison, coche, coeur), `col` | une idée, une valeur |
| X31 | `forme` | Une grande forme colorée ondule derrière la personne | `col`, `y` | couleur de marque, transition douce |
| O1 | `compteur` | Un compteur qui défile dans une carte (abonnés, vues…) | `value`, `label` | un chiffre réel |
| O2 | `coffre` | Un coffre-fort qui s'ouvre sur un mot | `open`, `text` | « le secret » |
| O3 | `tampon` | Un tampon qui s'écrase (VALIDÉ, FAUX…) | `text`, `x`, `y` | trancher, valider |
| O4 | `barres` | Des barres qui montent, la dernière en couleur | `values`, `label` | une progression |
| O5 | `marches` | Des marches numérotées 1 à 5 | `n` | une méthode en étapes |
| O6 | `bulle` | Une bulle de question qui s'écrit | `text` | interpeller |

| O7 | `grostitre` | Gros titre rouge condensé qui claque (deux lignes : sépare-les par une barre verticale) | `text`, `col` | la phrase choc |
| O8 | `stickers` | Trois autocollants épinglés avec icône et mot | `items` [[icône, mot]…] | ce qu'on obtient |
| O9 | `courbe` | Une courbe pointillée monte dans une carte, un point rouge la parcourt | `label` | une croissance |
| O10 | `stats` | Carte sombre de statistiques (vues sur 30 jours) qui défile | `value`, `title`, `periode`, `label` | une preuve chiffrée réelle |
| O11 | `profil` | Carte de profil : photo, nom, 3 chiffres, compteur rouge | `handle`, `stats`, `compteur` | parler d'un compte |
| O12 | `chat` | Fenêtre de chat « Que veux-tu créer ? », une ligne s'écrit, étiquette rouge | `question`, `text`, `pill` | « tu n'as qu'à demander » |
| O13 | `construit` | Un téléphone + un panneau « Claude construit ta vidéo » dont les étapes se cochent | `steps`, `title` | montrer le travail fait pour toi |
| O14 | `motcle` | Les commentaires + des lettres-tuiles qui forment le mot-clé | `mot` | appel à commenter |
| O15 | `choix` | Des options en pastilles, le curseur clique la bonne | `options`, `choix`, `clic` | un choix, une comparaison |
| O16 | `objection` | Bulle numérotée « 1 D'ABORD » avec l'objection qui s'écrit et un grand « ? » | `n`, `tag`, `small`, `text` | traiter une objection |
| O17 | `multiprise` | Des câbles numérotés descendent et se branchent dans une multiprise | `n`, `labels` | outils, étapes à brancher |
| O18 | `terminal` | Un terminal : des commandes s'écrivent, coches vertes | `lines` | coulisses techniques |
| O19 | `compteurmeca` | Compteur mécanique à chiffres | `value`, `digits`, `label` | un nombre qui change |
| O20 | `taches` | Liste de tâches qui se cochent + horloge | `items`, `title` | un plan qui avance |
| O21 | `tableau` | Tableau de bord bleu nuit en verre lumineux | `items`, `title` | équipe, objectifs |

Les objets O se jouent aussi sur la vraie vidéo, mais leur style d'origine est le **personnage illustré** : fond crème (`"bg":"creme","zoomP":0.8`), la personne détourée en bas, l'objet au-dessus de sa tête, la phrase en haut à gauche avec un mot en serif italique rouge. Un objet par phrase, et un objet différent à chaque phrase.

Honnêteté : un compteur ou des barres ne montrent que des chiffres réels de la personne ; sinon, écris « exemple ».

## Options de scène
| Option | Effet |
|---|---|
| `"titre":{"n":"01","text":"Orbite"}` | Carte de titre en haut : pastille jaune numérotée + titre blanc qui s'écrit (style démo d'effets) |
| `"cap":"duo"` | Sous-titres deux styles au niveau de la poitrine : mots fins en italique blanc + mot fort en gras dégradé (`duo`: [couleur1, couleur2]) |
| `"cap":"tuiles"` | Mots-clés en tuiles jaunes posées sur le bureau (style cabine) |
| `"bg":"cabine","cabine":{"col","label","voyants":[2,4],"vlab"}` | Décor « cabine » : fond pastel perforé, bureau, étiquette noire en haut à gauche, voyants en haut à droite |
| `"bg":"nuit2"` | Fond bleu nuit (tableaux de bord lumineux) |
| `"reperes":{"g":"// 02 · les vues","d":"VUES · 30 J"}` | Petits repères en haut de l'image (chapitre, compteur) |
| `"annot":[{"type":"cercle","x","y","r","at"},{"type":"fleche","de":[x,y],"a":[x,y],"at"}]` | Cercles et flèches dessinés à la main |
| `"trame":0.0` | Transition en trame de points noirs au temps donné |
| `"zoomP":0.85` (+ `zoomY`, `objY`) | La personne réduite et posée en bas ; les objets descendent pour remplir le haut |
| `fx.taille` | Agrandit les vignettes (orbite, enveloppe, dossier, Polaroid, tapis, photos) |

## Les vignettes
`references/vignettes/X1.jpg` … `X31.jpg`, `O1.jpg` … `O21.jpg`. Démos complètes : `references/exemple-effets.json` (X1–X5), `exemple-effets-echo.json` (X6–X19 avec titres de séquence et sous-titres duo), `exemple-objets-tete.json` (X24–X30), `exemple-objets-illustres.json` (O, cabines, nuit, repères, annotations, trame).
