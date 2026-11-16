# L’atelier des visages

Jeu de compréhension orale et de lecture en français, dans le canevas de l’atelier des vêtements : dix portraits par partie, trois essais, alternance garçon-fille, score, solution après trois erreurs, plein écran et interface adaptée au mobile.

1. Visages * : yeux bleus, verts, marron ou noirs ; cheveux blonds, bruns, noirs ou roux ; nez, oreilles et bouche de deux tailles.
2. Visages ** : mêmes traits, avec deux ou trois accessoires à chaque portrait : lunettes, chapeau/casquette/bonnet et boucles d’oreilles, en sept couleurs.
3. Visages *** : cinq états de la bouche (content, triste, fâché, malade avec thermomètre, surpris), chacun en deux tailles. Un ou deux accessoires présents par portrait, opposés à une absence dans une phrase avec « mais », dans les deux ordres. Les accessoires absents doivent rester retirés.

Garçons et filles : cheveux courts ou longs, avec des modèles distincts et les deux longueurs proposées à chaque partie. Visage vierge au départ. Choix par images ; aucun nom ni indication « petit/grand » affiché dans les menus. Les descriptions et les libellés accessibles restent écrits.

Les cheveux longs comprennent les longueurs derrière le visage et la frange au premier plan. Oreilles et boucles sont au-dessus des cheveux ; le nez et la bouche restent dégagés. Les vignettes utilisent un cadre commun pour distinguer visuellement les tailles.

Les calques peints ont été générés avec l’outil intégré de création d’images à partir du personnage garçon validé de l’atelier des vêtements. Les lunettes et les trois couvre-chefs reprennent les illustrations validées du même jeu. Les PNG générés sont découpés en sprites et livrés en WebP transparents. Canevas de portrait : 800 × 900.

Tests : `node --test tests/core.test.mjs`. Site statique sans compilation, données de jeu conservées uniquement dans le navigateur. Aucun compte d’élève requis.


## Audio des trois niveaux

Bouton haut-parleur « Écouter la description » sur chaque portrait ; le texte peut aussi être cliqué. Pendant la lecture, le bouton devient « Arrêter l’écoute ». Réécoute illimitée, sans retirer de cœur ni modifier le visage. Le changement de niveau ou de portrait, le retour à l’accueil et la vérification arrêtent la lecture en cours.

Voix françaises neutres préenregistrées : Thomas pour Léo, Amélie pour Lina, sans effet de hauteur. Les enregistrements reprennent le texte réellement affiché : tailles, couleurs et coiffures aux niveaux 1 à 3, accessoires aux niveaux 2 et 3, émotions et négations avec « mais » au niveau 3. Les descriptions pédagogiques validées et les règles du jeu restent inchangées.

162 extraits stockés dans deux fichiers audio accompagnés d’un index de début/fin. `speech.js` compose le plan de lecture à partir du texte existant, `audio.js` le lit avec des pauses aux virgules et aux points. Aucun service vocal du navigateur n’est nécessaire. Les fichiers audio feront partie des ressources à inclure lors de la future préparation hors ligne.
