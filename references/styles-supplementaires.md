# Styles supplémentaires — recettes et scènes du moteur

## Face caméra verticale
| Look | Recette | Moteur |
|---|---|---|
| Cartes vertes sur fond menthe | La personne parle, cartes blanches / vert foncé (listes cochées, téléphone, nœuds) sur fond menthe ; une seule couleur | `stage` `bg:"paper"` + `acc` vert ; `cards` `checklist` / `nodes` |
| Mot-clé géant sur la personne | Un mot très gros sur le torse, le reste petit au-dessus | sous-titres karaoké avec `hl` |
| Cadre « After », mots XXL derrière | Vidéo dans un cadre arrondi, mots géants derrière le sujet | `face` `editorial` / `signature` + `--masks` |
| Vitrine freelance | Petit cadre « montage pas cher » + grand cadre « notre travail » | deux rendus côte à côte au montage |
| Présentatrice studio, mot jaune | Un mot jaune au centre, flashs de lumière orange, gros plans | `short` + `fx:"leak"`, `punch` |
| Créatrice en direct | Icônes, compteurs, repères de carte qui surgissent | cartes `ui` `pill`, `counter`, `avatar` |
| Noir et orange | Texte blanc très gras, mot barré, mot géant orange | `kinetic` thème `pub`, `strike` |
| Papier blanc, étapes en serif | Grand numéro pâle derrière, serif italique, vignette de la personne | `pip` |
| Éditorial en haut, visage en bas | Typo serif révélée lettre par lettre en haut, personne en bas | `split` |
| Logiciel en vert | Captures d'interface sur vert foncé, pourcentage qui monte | `phoneui` ou Stageshow |

## Motion design éducatif et e-commerce (sans visage)
| Look | Recette | Moteur |
|---|---|---|
| Téléphone en main + boutique | Vraie main qui fait défiler, sous-titre vert, flèche vers le bouton | vidéo filmée + `phoneui` (`tap`) |
| Site sur ordinateur + flèche | Ordinateur, site qui défile, grosse flèche rouge | `object` (capture détourée) + `cta` |
| Sombre et orange, listes numérotées | Fond noir, titre gras, pastille orange numérotée | `kinetic` thème `tech` / `pub` |
| Éditorial violet | Serif italique géant, image détourée, aplats violets | `kinetic` thème `poster` + `acc` violet |
| Gris minimal | Fond gris clair, cartes empilées, phrase centrée | `kinetic` thème `mono` |
| Bento de widgets | Tuiles noires et blanches qui glissent | `bento` |
| Courbe | Graphique qui se trace, appel à écrire un mot | `graph` + `cta` |
| Crème et orange | Cadre crème, ombres de fenêtre, objet 3D, gros chiffre | `object` thème `studio` / `cream` |
| Affiche rouge et noir | Cercle rouge, personnage noir et blanc, mot géant rogné | `kinetic` thème `poster` |
| Appli de paiement | Téléphone avec solde et notifications | `phoneui` ou Stageshow |
| 3D réaliste (maquettes, vue éclatée, objet héros, jouets) | Objet ou décor 3D, étapes numérotées, slogan | logiciel 3D ou IA vidéo ; le moteur ajoute titres et étiquettes par-dessus (`object`, `stage`) |

## Fausses interfaces (Stageshow)
Pour une démo d'application réaliste (assistant, paiement, facture, inscription, conversation), utilise Stageshow (MIT) : copie l'exemple le plus proche, traduis les textes, filme-le et place la vidéo dans une scène `pside`, `stage` ou `cutaway`.
