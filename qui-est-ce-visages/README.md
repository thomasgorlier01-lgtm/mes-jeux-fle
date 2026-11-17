# Qui est-ce ? Visages

Les illustrations sont extraites sans retouche des deux planches PDF validées (15 et 24 portraits). Chaque cellule conserve son numéro d’origine.

## En classe

Choix de la planche de 15 ou 24 ; clic pour retourner une carte, second clic pour la rétablir, remise à zéro. Sans score ni vie.

## En autonomie

Dix cibles sans répétition, cinq cœurs pour toute la partie, sans chronomètre. Une carte incorrecte déjà sélectionnée ne coûte pas de nouvelle vie pendant la même question. Nouvelle partie et changement de niveau arrêtent l’audio et les transitions.

1. Quinze portraits : yeux, taille du nez/de la bouche/des oreilles et longueur des cheveux.
2. Vingt-quatre portraits : mêmes indices, couleurs connues des cheveux, moustache et barbe, lunettes, chapeau, boucles d’oreilles. Aucun accessoire n’est décrit par sa couleur.
3. Même planche, « chauve » et une opposition positive/négative avec « mais ».

Aux niveaux 1/2, la calvitie n’est jamais mentionnée. Les couleurs grises et blanches ne sont pas ajoutées au vocabulaire ; une barbe ou moustache de ces couleurs est simplement nommée. Les indices ambigus visuellement ne servent pas de preuve pour leur carte et restent permissifs chez les candidats.

Chaque description est une liste d’indices. Chaque bouton lit uniquement sa ligne, sous forme de phrase complète, gratuitement et autant de fois que souhaité. Une opposition avec « mais » reste sur la même ligne. Audio français enregistré localement, voix neutres Thomas et Amélie, sans transformation de hauteur. Les deux petits fichiers sont décodés puis lus à des bornes précises, sans dépendance aux voix du navigateur.

Le bouton plein écran commun conserve la partie ; retour par le même bouton ou Échap, mode agrandi de secours.

## Vérification

`node tests/logic.mjs` compare les indices de chaque description à tous les candidats de sa planche. Les 63 descriptions correspondent chacune à exactement un portrait. Les numéros et le genre ne servent jamais d’indice d’unicité. Les essais couvrent les cinq vies, les dix cibles distinctes, les erreurs répétées, la fin de partie et les extraits audio.
