
# Vidéos explicatives et produit pour commerçants

La production se fait avec ce studio. Ici : quoi dire, quoi montrer, dans quel ordre, pour que le client comprenne et commande.

## 1. Questions à poser
- Le produit : nom, prix en FCFA, 3 avantages concrets, la question qu'on te pose le plus.
- Le client type : qui achète, où (ville, quartier), quand (le soir, le week-end).
- Comment on commande : numéro WhatsApp, lien, livraison (délai, zones, prix).
- Les photos réelles : produit seul sur fond clair, produit utilisé, boutique, emballage, captures de vraies conversations ou commandes **avec l'accord des clients** (sinon une conversation d'exemple marquée « exemple »).

## 2. Quatre formats qui vendent
### A. Présentation produit (30 s)
| Temps | Voix | Scène |
|---|---|---|
| 0–3 s | Le problème du client (« Tu transpires sous ton voile toute la journée ? ») | `face` `signature` `punch:true` |
| 3–8 s | Le produit | `cards` `product` (photo, nom, prix, « Nouveau ») |
| 8–18 s | 3 avantages | `cards` `checklist` puis `face` plain |
| 18–24 s | Preuve (avis réel, démonstration, chiffre réel) | `cutaway` photo du produit utilisé ou `cards` `counter` |
| 24–30 s | Comment commander | `cards` `chat` (exemple de commande) + `end` avec le numéro ou @compte |

### B. Mode d'emploi (45 s)
`pip` « Première étape », « Deuxième étape »… avec la personne en vignette, puis `cards` `steps`.

### C. Réponse à une question fréquente (30 s)
Hook = la question telle que les clients l'écrivent (« C'est livré à Pikine ? ») → réponse en `cards` `nodes` (zones de livraison) → `end`.

### D. Avant / après
`cards` `compare` (sans le produit / avec), puis `face` plain avec l'avis.

## 3. Règles qui comptent pour un commerce
- Le **prix** apparaît en grand, en FCFA, avec une espace : « 6 500 FCFA ».
- **Une action** à la fin, une seule : « Écris "VENTILO" sur WhatsApp ».
- Prénoms et lieux locaux dans les exemples (Awa, Fatou, Moussa ; ton quartier, ta ville).
- Couleurs de la boutique partout (brand.primary), logo à la fin.
- Format 9:16 pour statut WhatsApp, TikTok, Reels ; 4:5 pour une pub dans le fil Facebook/Instagram.

## 4. Honnêteté (sinon la pub est refusée et la confiance perdue)
- Pas de faux avis, de faux « 500 vendus », de fausse réduction ou de compte à rebours inventé.
- Les captures de conversations sont réelles et anonymisées, ou marquées « exemple ».
- Les photos de produits sont les vraies (pas d'image d'une autre marque).

## 5. Après la publication
Note chaque semaine : vues, messages reçus, commandes. Garde le format qui amène des **messages**, pas celui qui amène seulement des vues.

## 6. Sans se montrer
Pour un commerçant qui ne veut pas apparaître :
- **Produit** : `object` theme `studio` (photo détourée du produit qui flotte + prix ou chiffre réel) puis `cards` `product` et `cta` (« Écris “VENTILO” sur WhatsApp »).
- **Mode d'emploi** : `phoneui` (captures de l'appli ou de la commande WhatsApp, étapes) ou `avatar` avec la mascotte de la boutique.
- **Promo** : `kinetic` theme `pub` (gros mots, prix en pastille, coche « Livré demain »).
Voix : celle du vendeur (plus de confiance) ou voix IA `tts.py`.
