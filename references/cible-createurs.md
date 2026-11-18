
# Vidéos face caméra pour créateurs de contenu

But : une vidéo qu'on regarde jusqu'au bout, qu'on enregistre et qui donne envie de suivre. Le montage se fabrique ensuite avec ce studio (moteur + config). Lis-le pour la partie technique.

## 1. Questions à poser (une seule fois)
- Le sujet de la vidéo et l'**idée unique** à retenir (une phrase).
- La personne qui regarde : qui, quel problème, quel niveau.
- La plateforme (TikTok, Reels, Shorts) et la durée visée (30 à 60 s conseillé).
- Le style de la chaîne : couleurs, logo, @compte, styles déjà utilisés (pour rester reconnaissable).

## 2. Structure du script (45 s environ)
| Temps | Rôle | Scène conseillée |
|---|---|---|
| 0–3 s | **Hook** : une question, un contre-pied ou un chiffre surprenant | `face` `signature` ou `neon` avec `punch:true` |
| 3–8 s | **Promesse** : ce que la personne va savoir à la fin | `face` `plain` + `cards` `checklist` (titre « 3 choses ») |
| 8–35 s | **Contenu** : 3 idées, une toutes les 7 à 9 s, chacune illustrée | alterner `face` → `cards`/`cutaway`/`pip` → `face` |
| 25 s | **Relance** : « et la 3e, presque personne ne la connaît » | `face` `editorial` |
| 35–42 s | **Chute** : une phrase qu'on a envie de répéter | `split` ou `face` `signature` |
| 42–45 s | **Appel** : s'abonner, enregistrer, commenter un mot | `end` avec le @compte |

Règles d'écriture : phrases de 6 à 12 mots ; pas d'introduction (« Salut tout le monde » coupe la vidéo) ; « tu » plutôt que « vous » ; un exemple concret par idée.

## 3. Choisir le style selon le ton
- **Éducatif, calme** : `pip` + `cards` sur fond clair (style tutoriel en étapes).
- **Inspirant, émotion** : `signature` (italique dégradé, halo, photos en arc).
- **Analyse, chiffres** : `editorial` (jaune) + `cards` `counter`.
- **Tech, réseaux** : `violet` (vague, téléphone avec capture).
- **Alerte, erreur à éviter** : `neon`.
Garde **un style principal par chaîne** : il devient ta signature et on te reconnaît avant d'entendre ta voix.

## 4. Série et régularité
Propose au créateur une série : même hook, même structure, même fin, un sujet différent chaque fois (« Le conseil du mardi »). Le `config.json` d'une vidéo réussie sert de modèle : on ne change que les mots, les photos et les temps.

## 5. Mesurer
Après 48 h : taux de rétention à 3 s (le hook), durée moyenne regardée, enregistrements. Si la rétention chute à un moment précis, ajoute une nouveauté visuelle juste avant ce moment.

## 6. Limites honnêtes
Aucun montage ne garantit des vues. On n'invente pas de témoignages ni de chiffres ; on ne copie pas la marque ou les visuels d'un autre créateur.

## 7. Version sans visage
Si le créateur ne veut pas se filmer, utilise ce studio :
- **Éducatif** : `graph` ou `cards` theme `cream` (« 8 outils | *motion design* ») + « Commente “MOT” ».
- **Inspirant** : `kinetic` theme `dark` avec `ghost`, ou `poster` avec `circle` + photo détourée.
- **Présence sans visage** : `avatar` avec ses propres poses illustrées (même personnage dans chaque vidéo = signature de chaîne).
Voix : la sienne (meilleure confiance) ou voix IA `tts.py`.
