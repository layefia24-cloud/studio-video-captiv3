
# Vendre le motion design face caméra (freelance)

La production se fait avec ce studio. Ce skill-ci couvre tout le reste : ce qu'on vend, comment on le présente, comment on livre.

## 1. L'offre (3 niveaux)
| Offre | Contenu | Pour qui |
|---|---|---|
| **Découverte** | 1 vidéo face caméra animée (≤ 45 s), 1 style, 1 série de retouches | Premier contact, tester |
| **Pack** | 4 vidéos, même style (identité), 2 formats (9:16 + 4:5), 2 séries de retouches | Créateurs, commerces réguliers |
| **Mensuel** | 8 à 12 vidéos par mois, calendrier, modèle de config réutilisé, rapport mensuel | Marques, agences |

Les prix dépendent de ton marché : demande au client son budget, regarde ce que pratiquent les monteurs de ta ville, et facture le temps réel (une vidéo prend 1 à 3 h avec le moteur). Écris toujours tes prix en FCFA, paiement par mobile money accepté, acompte de 50 % avant de commencer.

## 2. Trouver les premiers clients
1. **Démo avant/après** : prends une vidéo face caméra publique du prospect (ou filme-toi), fabrique 10 à 15 s animées, et envoie les deux côte à côte en privé. Montrer vaut mieux que dire.
2. **Portfolio** : 3 vidéos dans 3 styles (agence explicative, signature, éditorial). Fais-les sur toi-même ou sur des clients qui ont donné leur accord.
3. **Message court** (WhatsApp) : « J'ai animé un passage de ta vidéo pour te montrer ce que ça donne. Si ça te plaît, je t'en fais une complète. » + la démo.
Ne publie jamais le travail d'un client sans son accord, et n'utilise pas la vidéo d'un prospect publiquement.

## 3. Le brief (à remplir avec le client)
- Objectif de la vidéo (vendre, expliquer, faire connaître) et action attendue à la fin.
- Cible (âge, ville, problème).
- Fichiers : vidéo face caméra (lumière de face, voix claire, verticale), logo png, couleurs, @compte, 3 à 8 photos réelles (produits, boutique, clients avec accord).
- Style choisi parmi le portfolio + 1 vidéo de référence que le client aime.
- Délai, nombre de retouches incluses, formats de sortie.

## 4. Production (méthode rapide)
1. `prepare.py` (frames + mots + masques si besoin).
2. Découpe en scènes (une toutes les 2 à 3 s) avec le skill du client : `motion-createurs` ou `motion-commercants`.
3. Images fixes de contrôle → envoie 3 captures au client **avant** le rendu final (ça évite les grosses retouches).
4. Rendu final + checklist (`references/checklist.md` du moteur).
5. Garde le `config.json` du client : c'est son modèle, les vidéos suivantes iront 3 fois plus vite.

## 5. Livraison
- Fichier mp4 1080×1920 nommé `client_sujet_v1.mp4` (+ 4:5 si inclus).
- Une phrase de légende proposée + 3 hashtags.
- Retouches : liste écrite par le client, en une fois, dans les 48 h.

## 6. Ce qu'on ne fait pas
Faux avis, faux résultats, faux comptes à rebours, logos ou visuels d'une autre marque, promesse de vues ou de ventes garanties.

## 7. Proposer aussi le sans visage
Beaucoup de clients refusent de se filmer : ajoute à ton offre des vidéos sans visage (texte cinétique, explicatif `graph`, grille `bento`, objets 3D, personnage illustré du client). Dans le brief, demande alors : le script ou les points clés, la voix (enregistrée ou IA), les PNG détourés (produit, personnage) et les captures d'écran. Mets 3 styles sans visage dans ton portfolio (ex. `pub`, `cream`, `studio`).
