# Outils complémentaires du studio

## Déjà dans le studio
| Outil | Rôle | Dans le kit |
|---|---|---|
| ffmpeg | Coupes, export, son | Installé à chaque session (scripts/coupe.py, audio.py, qa.py) |
| Whisper | Sous-titres mot par mot, coupe des rushs | Version faster-whisper (même modèle Whisper), installée par pip. whisper.cpp n'est utile que pour le moteur ci-dessous, qui l'installe lui-même |
| Moteur de rendu Chrome | Vidéos et motion design | scripts/engine.html + render.mjs |

## Ajouté : video-agent-skills (Melvyn Malherbe, licence MIT)
Copie du dépôt github.com/Melvynx/video-agent-skills (version dans VERSION), sans les vidéos d'exemple de l'auteur. Licence et copyright conservés dans `video-agent-skills/LICENSE`.

Ce qu'il apporte en plus : le look « écran partagé papier + caméra » (`short-editing`), un découpage ultra serré (pauses > 0,3 s retirées), des scripts de la semaine (`studio-script`), le découpage d'une longue vidéo en shorts (`clips`), une bibliothèque de B-roll (`broll`), l'animation collage façon documentaire (`vox`), l'analyse du style de montage d'une vidéo (`steal`, pour s'inspirer d'un rythme, jamais pour copier une marque ou une personne).

Utilisation : sur ordinateur avec Claude Code, `npx skills add Melvynx/video-agent-skills -a claude-code`, puis `/studio-setup`. Depuis le studio sur téléphone, demande « utilise le skill short-editing des outils complémentaires » : Claude lit `outils/video-agent-skills/skills/<nom>/SKILL.md` et installe son moteur (Node, Chrome, ffmpeg, whisper.cpp) dans la session. Ce moteur est plus lourd que le nôtre : compte quelques minutes d'installation la première fois.

## Optionnel, non installé : Treg (treg.to)
Service payant en ligne, avec compte : télécharger des vidéos, auditer un compte Instagram, publier sur YouTube, Instagram et TikTok. Il demande une clé personnelle, donc chacun le connecte lui-même (`/studio-setup treg`). Télécharge seulement tes propres vidéos ou celles dont tu as l'accord.
