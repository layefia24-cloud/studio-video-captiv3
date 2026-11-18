# Analyse des références face caméra + motion design

Étude de 14 vidéos face caméra montées en motion design (agences de marketing africaines, studios de montage, créateurs). Pour chacune : ce qui la rend efficace et la scène du moteur qui la reproduit. On s'inspire des procédés, on ne copie jamais la marque, le logo ou les visuels d'un autre.

## 1. Style « agence explicative » (vert, fond clair) — 6 références
Une femme assise face caméra, décor coloré, et une alternation très régulière :
- **Face caméra** avec sous-titres de 1 à 3 mots au centre de la poitrine. Le mot-clé est plus gros, en gras, dans la couleur de marque (vert) ou blanc ; le reste en petit au-dessus.
- **Plein écran fond crème quadrillé** avec des cartes blanches arrondies : téléphone avec une appli de boutique, notifications « Nouvelle commande », schéma en nœuds (une entreprise → 3 clients), cartes « Idée 1 / Idée 2 », fiche client avec photos rondes, compteur 0 → 12, tests A/B de 3 approches, discussion WhatsApp, carte produit avec prix en FCFA, iceberg, empreinte digitale, globe.
- **Rythme** : un changement de plan toutes les 2 à 3 s (22 coupes en 46 s).
- **Transitions** : un voile de lumière orange/rouge sur la face caméra (light leak) qui relance l'attention.
- **Fin** : logo de l'agence sur fond vert foncé, puis barre de recherche TikTok qui tape le @compte.
- **Pourquoi ça marche** : chaque idée abstraite devient un objet concret (une carte, un chiffre, un client). Le spectateur comprend sans lire.
→ Moteur : `face` plain + `cards` (`checklist`, `steps`, `nodes`, `counter`, `product`, `chat`, `persona`, `compare`) + `cutaway` + `fx:"leak"` + `end`.

## 2. Style « tutoriel en étapes » (blanc, typo serif) — 1 référence
Un créateur explique 5 étapes. Le plein écran blanc porte une grande typo serif italique (« Quatrième étape ») avec un énorme chiffre fantôme gris derrière, une barre de progression en points, et la face caméra réduite dans une vignette arrondie en bas. Les outils apparaissent en petites cartes (logo + nom). Peu de coupes : la vignette garde la présence humaine.
→ Moteur : `pip` (`number`, `big`, `small`, `dots`) + `cards` `steps`.

## 3. Style « signature » (mots italiques orange, halo) — 1 référence
Femme face caméra dans un bureau rouge. Des mots en grand italique blanc et orange apparaissent à hauteur de poitrine, un halo orange s'allume derrière elle, des photos flottent à côté de sa tête, un anneau d'images tourne autour d'elle, des points d'interrogation 3D apparaissent sur une question.
→ Moteur : `face` `signature` (`small`, `big`, `ring`, `floats`, `ghost`).

## 4. Style « éditorial » (mots jaunes, images d'architecture) — 1 référence
Homme face caméra, éclairage chaud. Mots-clés jaunes très gras avec léger halo ; coupes vers des photos plein écran (bâtiments) avec un mot blanc centré ; un mot géant écrit verticalement (« LONDON ») derrière une photo ; fin dans un cadre sombre avec la vidéo réduite.
→ Moteur : `face` `editorial` (`vertical`) + `cutaway`.

## 5. Style « vague violette » — 1 référence
Fond sombre, formes courbes violettes qui entrent par les coins, pastille violette (« NEED TO »), grand mot serif italique violet, téléphone avec capture d'écran d'un profil, très grands « #1 ».
→ Moteur : `face` `violet` (`small` en pastille, `big`, `phone`).

## 6. Style « néon » — 1 référence
Mot en rouge néon qui clignote à l'apparition, image noir et blanc ou bandes noires, carte blanche avec un très grand pourcentage.
→ Moteur : `face` `neon` + `cards` `counter`.

## 7. Style « écran coupé éditorial » — 1 référence
Moitié haute : fond papier clair, rayons de lumière, objet décoratif (horloge), phrase serif + mot gras dont les lettres apparaissent floues puis nettes, mot fantôme géant qui glisse. Moitié basse : la personne.
→ Moteur : `split` (`small`, `big`, `ghost`).

## 8. Motion design sans visage (interfaces, icônes) — 2 références
Fond gris clair, cartes d'interface très propres, mascotte pixel, phrases centrées où un seul mot est en gras. Utile en plan de coupe entre deux passages face caméra.
→ Moteur : `cards` + sous-titres.

## Ce qui revient dans toutes les vidéos qui retiennent
1. Un mouvement dès la première image.
2. Un mot fort à la fois, synchronisé sur la voix.
3. Une nouveauté visuelle toutes les 2 à 3 s (photo, carte, zoom, couleur).
4. Une seule palette de marque, appliquée partout.
5. Des objets concrets et locaux (prix en FCFA, WhatsApp, marché, clients avec prénoms).
6. Une fin qui dit où suivre ou acheter.
