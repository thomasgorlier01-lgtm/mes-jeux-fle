# Qui est-ce ? Corps de monstres

Jeu statique sans dépendance. Ouvrir via HTTP (par exemple `python3 -m http.server`).

- **Classe** : 24 cartes, grille 6 × 4 sur grand écran ; clic pour retourner et rétablir ; remise à zéro. Aucun score ni cœur.
- **Autonomie** : 10 cibles tirées sans répétition parmi les 24 ; 5 vies pour toute la partie ; aucune limite de temps. Chaque erreur sur une nouvelle carte coûte une vie. Une carte déjà erronée est désactivée pour éviter de perdre plusieurs vies par double clic. Les cartes sont rétablies à la question suivante.
- **Audio** : description complète en français (voix système Thomas), AAC M4A intégré et lecture à 0,75 avec conservation de la hauteur. Clic sur toute la description ; répétition gratuite. Synthèse vocale française de secours si le fichier ne peut pas être lu. La lecture cesse au changement de mode, à la bonne réponse et au redémarrage.
- **Plein écran** : script commun du portail, avec solution agrandie de secours et conservation de la partie.

`characters.json` constitue la matrice des attributs et des descriptions. `data.js` contient la même matrice pour le navigateur. Les 24 personnages sont ceux de la planche fournie par l’utilisateur le 16 novembre 2026. `assets/monstres-reference.jpg` conserve le dessin d’origine ; chaque carte affiche sa case dans une fenêtre SVG, sans générer ni redessiner le personnage. Les numéros de la planche restent visibles.

Les descriptions ont été réécrites après observation agrandie des 24 personnages : yeux, bras, jambes, cheveux, barbe/moustache et accessoires autorisés (chapeaux, casquettes, lunettes, boucles d’oreilles). Les mentions de peau, fleurs, nœuds papillon et vêtements sont exclues. Les couleurs de cheveux intermédiaires et les longueurs peu nettes ne sont pas utilisées comme indices. Les tailles du nez et des oreilles ne sont pas utilisées comme indices dans cette version : la planche ne présente pas deux catégories assez distinctes pour tous les personnages. Les anciennes illustrations géométriques ne sont plus utilisées.

Les noms et numéros servent uniquement au repérage ; ils ne sont jamais employés comme indice dans une question.

## Vérification effectuée avant publication

Chaque fiche possède des `traits` relus sur l’image et des `clues` réellement annoncés dans sa description. Une valeur multiple dans `traits` signale un détail visuel ambigu : le contrôle conserve toutes ses possibilités. Aucun détail ambigu n’est sélectionné comme indice pour sa propre carte.

Le contrôle compare les indices de chaque description aux **24 fiches**, et impose exactement une correspondance : son propre personnage. Une simple différence de texte entre les descriptions ne suffit pas. Les exclusions nécessaires sont explicites, par exemple « Il n’a ni barbe ni moustache » pour le 19, ou « mais pas de barbe » pour les personnages à moustache seule.

Corrections anatomiques après relecture en grand : le 15 possède **4 bras**, le 22 possède **4 jambes**. Les 24 descriptions et les audios `NN-audit-v4.m4a` ont été reconstruits. `audio/transcripts-v4.json` conserve pour chaque fichier le texte exact et son empreinte SHA-256.

Pour reconstruire les textes et lancer le contrôle :

```sh
node tools/build-descriptions.mjs
node tests/check-descriptions.mjs
```

Les tests vérifient le relevé des yeux/bras/jambes, le périmètre des indices, l’accord entre texte et indices, l’unicité parmi les 24 et deux cas d’ambiguïté qui doivent être détectés (16/19 et 12/21).

Navigateur : retournement et rétablissement, remise à zéro, dix réponses distinctes jusqu’à la victoire, cinq erreurs jusqu’à la défaite, redémarrage, déclenchement audio, changements de modes et plein écran. Mise en page contrôlée aux formats étroit et grand écran. Le matériel iPad réel n’a pas été utilisé pour ces tests.
