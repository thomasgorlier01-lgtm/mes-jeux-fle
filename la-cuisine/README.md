# Dans la cuisine — deux niveaux

Faire glisser un objet jusqu’à sa destination, ou sélectionner l’objet puis toucher sa destination. Un objet déjà posé peut être déplacé à nouveau. Un dépôt hors scène ou un geste annulé restaure le placement précédent. Vérifier, corriger librement et passer à la suite. Dix objets distincts par partie au niveau 1, vingt-cinq au niveau 2, sans chronomètre ni vies. Les poignées ouvrent et ferment le frigo et le four.

- Niveau 1 : les vingt éléments initiaux (couverts, vaisselle, aliments et quatre animaux).
- Niveau 2 : les vingt éléments initiaux et seize nouveaux aliments : kiwi, mangue, papaye, citron, abricot, pêche, riz, pâtes, frites, yaourt, glace, poisson, chips, soupe, raisin, pizza. Chaque série du niveau 2 contient les seize nouveaux aliments et neuf éléments du niveau 1.

Le panier fixe occupe la gauche de la table. Deux zones distinctes permettent de placer un aliment dans son intérieur ou devant. Le fond du panier et sa paroi avant sont deux couches de la même illustration, afin de masquer naturellement le bas de son contenu. La zone « sur la table » se trouve sur la partie droite libre. Aucun meuble n’a été déplacé.

Chaque série comprend un placement derrière la fenêtre (oiseau), entre la plante et le four, devant un élément du mobilier, dans le panier et devant le panier. Les positions du frigo incluent quatre quadrants, sur, devant et à côté. Évier : dans seulement. Four : dans, devant ou sur seulement. Banque totale : 150 consignes.

Les zones calent les objets sur une surface, indépendamment de la bonne réponse. Les emplacements sont accessibles au clavier après sélection. Les deux planches de vingt et seize objets sont découpées uniquement à l’affichage. Images originales conservées dans `assets/`.

Audio provisoire : voix française SpeechSynthesis du navigateur. Les essais d’enregistrement local ont produit des fichiers sans échantillons ; aucun enregistrement naturel n’est donc revendiqué. L’inventaire des futures phrases est conservé dans le dossier de préparation du projet.

Validation : seize tests couvrent les destinations, les restrictions, les deux niveaux, les erreurs, les séries, les deux zones du panier et le parcours applicatif en DOM simulé. Le navigateur intégré a également parcouru les vingt-cinq consignes du niveau 2 jusqu’à l’écran de fin. Un placement par clic dans la scène a été vérifié. Contrôles de mise en page à 1024×768, 768×1024 et 390×844 : tous les éléments et commandes tiennent à l’écran, sans débordement horizontal. Cela ne remplace pas un essai tactile sur un iPad physique. Capture dans `docs/niveau-2-panier.jpg`.

Le mode classe « À toi de placer ! » a été proposé et reste à développer séparément ; les deux choix actuels correspondent aux niveaux du mode autonome.

Pour développer : servir le dossier parent en HTTP et ouvrir `/la-cuisine/`. Vérifier avec `node --test tests/*.test.mjs`.

## Ajout au dossier La nourriture

Le jeu est la septième entrée de `la-nourriture/`. Le compteur et la description du dossier dans l’accueil principal indiquent sept jeux. L’ouverture en iframe, le retour au dossier, l’entrée et la sortie du plein écran par le bouton commun ont été vérifiés sans perte de progression.

Le glisser-déposer et le placement par deux clics ont été exercés dans le navigateur intégré, dans l’iframe : palette vers cuisine, déplacement d’un objet déjà posé, dépôt hors scène, erreur puis correction. Les gestes souris, doigt et stylet, les petits appuis, le clic résiduel, l’annulation et la perte de capture sont couverts par les tests de Pointer Events ; le tactile physique reste à vérifier sur appareil. Le DOM simulé vérifie aussi le dépôt au doigt et le rétablissement d’un placement. Aucun essai tactile physique n’est revendiqué. Capture : `docs/glisser-deposer.jpg`.

## Tolérance des placements

La sélection des destinations et la validation ont des marges communes, distinctes des limites graphiques du mobilier. La marge générale est de 2,5 % de la largeur et 3 % de la hauteur de la scène ; elle est adaptée au frigo, au panier et à certaines surfaces. Sur le four, la marge passe à 3,5 % en largeur et 4,5 % en hauteur. Les quatre quadrants du frigo et les positions dans/devant le panier restent distincts à leurs centres.

Le véritable point de dépôt ou de clic est conservé dans le placement. La vérification utilise ce point pour éviter un refus dû au calage sur une zone voisine. Après réussite, le placement se stabilise sur la destination de la consigne. Les essais de régression incluent l’assiette sur toute la surface du four et ses bords, le rejet des positions dans/devant le four, une marge calée sur une zone voisine et les marges du mobilier. Un essai dans le navigateur a refusé un objet dans le four pour une consigne sur le four, puis accepté son déplacement près du bord de la surface. Capture : `docs/tolerance-positions.jpg`.
