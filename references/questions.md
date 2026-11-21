# Questions du brief, sous forme de formulaire

L'utilisateur répond en touchant des choix, jamais en tapant de longues réponses.

## Comment poser les questions
1. **Outil de questions à choix** (AskUserQuestion, s'il est disponible) : 1 à 4 questions par écran, 2 à 4 options par question, **ta recommandation en premier** avec « (recommandé) » dans son libellé, une courte description par option. L'utilisateur peut toujours écrire « Autre ».
2. Plus de 4 questions : fais plusieurs écrans à la suite, les plus importantes d'abord. Ne repose jamais une question dont la réponse est déjà dans le brief.
3. **Sans cet outil** : un mini-formulaire numéroté en une seule fois, options en lettres, recommandation marquée ★, et la consigne « Réponds en une ligne, par exemple : 1A 2C 3B 4A ». Si l'utilisateur répond « ok » ou « comme tu veux », prends toutes les recommandations.
4. Après les réponses, demande seulement les **ressources** à joindre (photos, logo, vidéo, voix), en une liste courte.

## Première question, toujours : le type de vidéo
Si le brief ne le dit pas clairement, commence par cette question seule, puis adapte tout le reste (questions, styles proposés, ressources demandées) à la réponse.

| Type | Pour qui | Familles de styles à proposer (montre les vignettes) | Ressources à demander |
|---|---|---|---|
| **Face caméra avec motion design** | créateurs, influenceurs, coachs qui se filment | Reels : L1 + L2 + L4 + L17 (★), L13 / L14 (variantes couleur), A2, A3, A5, un effet X derrière la personne (X1–X16) ou le style objets illustrés (O1–O6) ; YouTube 16:9 : P1 + P2 + P8 + P10 | la vidéo filmée (verticale ou 16:9) |
| **Sans visage éducative** | ceux qui ne veulent pas se montrer, formations, explications | Éditorial crème E (★ : E2 + E3 + E5 + E9 + E15), motion design B (B4, B12, B13, B14, B15), texte plein écran P8 | un personnage détouré (facultatif), le logo |
| **Démo d'interface (application ou site web)** | SaaS, applications, boutiques en ligne, formations en ligne | Stageshow SS (★), téléphone E11, cartes d'interface L2, A10, B10, B18 | captures d'écran ou enregistrement de l'écran, liste des étapes à montrer |
| **Pub en motion design (produit ou service)** | e-commerçants, entreprises, prestataires | Produit : P3 sans visage (★, photo dans un cadre + pastilles), P9, P16, B9, B16, E11 ; Service : E3, E4, E5, P17 ; appel à l'action L17 ou E15 | photos du produit ou du service, logo, l'offre exacte (prix seulement s'il est donné) |

Les couleurs du style s'adaptent toujours à la marque de la personne (logo, couleurs, ou image de sa vidéo) : demande-les (question 8 bis) et applique-les avec `palette.py` (`"ed"` pour l'éditorial crème, `"palette"` pour les autres styles).

Après la réponse, propose **3 options de style adaptées** (la recommandée en premier, avec sa vignette), puis pose les autres questions de la banque.

## Banque de questions (prends celles qui manquent, dans cet ordre)
| # | Question | Options habituelles |
|---|---|---|
| 1 | Pour qui est la vidéo ? | Ma propre page · Mon entreprise / ma boutique · Un client (freelance) |
| 2 | Quel format ? | Vertical 9:16 (Reels, TikTok) ★ · 16:9 (YouTube) · Les deux |
| 3 | Quelle durée ? | 15–20 s · 30–45 s ★ · 60 s et plus |
| 4 | Avec ou sans visage ? | Face caméra (vidéo fournie) · Sans visage, motion design ★ · Mélange |
| 5 | Quel but ? | Éduquer puis présenter l'offre ★ · Vendre directement · Faire connaître |
| 6 | Quelle voix ? | Voix IA gratuite en français ★ · Voix IA en wolof · Ma voix enregistrée · Sans voix (texte) |
| 7 | Quel style ? (montre les vignettes) | 3 styles du look book adaptés au sujet, avec leur code |
| 8 | Quel appel à l'action ? | Mot-clé en commentaire ★ · Lien en bio · Message WhatsApp |
| 8 bis | Quelles couleurs ? | Celles de mon logo ★ (tirées avec `palette.py`) · Je donne mes codes couleur · Celles du style |
| 9 | Combien de versions ? | 1 · 2 versions à comparer ★ |
| 10 | Quelles images as-tu ? | Photos du produit · Logo · Captures d'écran · Aucune (scènes texte) |

Pour la question 7, montre la vignette de chaque style proposé (`vignettes/<code>.jpg`) avant ou avec la question.


## Questions du script (après le type de vidéo)
| # | Question | Choix (★ = recommandé) |
|---|---|---|
| S1 | Le but de la vidéo ? | Faire écrire sur WhatsApp ★ · Faire commenter · Faire acheter · Faire s'abonner |
| S2 | Le ton ? | Conversationnel, comme à une amie ★ · Expert posé · Énergique · Humour |
| S3 | Quel hook garder ? | A (★ le mieux noté) · B · C — avec la phrase, le texte écran et le visuel de chacun |
| S4 | Quelle fin ? | Choix A ou B en un mot ★ · Question miroir · Prendre position · Mot-clé en commentaire (seulement si tu envoies vraiment quelque chose) · Défi |
