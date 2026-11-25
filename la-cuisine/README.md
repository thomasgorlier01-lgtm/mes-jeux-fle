# Dans la cuisine — deux niveaux

Sélectionner un objet puis toucher sa destination. Vérifier, corriger librement et passer à la suite. Dix objets distincts par partie, sans chronomètre ni vies. Les poignées ouvrent et ferment le frigo et le four.

- Niveau 1 : les vingt éléments initiaux (couverts, vaisselle, aliments et quatre animaux).
- Niveau 2 : les vingt éléments initiaux et seize nouveaux aliments : kiwi, mangue, papaye, citron, abricot, pêche, riz, pâtes, frites, yaourt, glace, poisson, chips, soupe, raisin, pizza. Chaque série comprend au moins cinq nouveaux aliments.

Le panier fixe occupe la gauche de la table. Deux zones distinctes permettent de placer un aliment dans son intérieur ou devant. Le fond du panier et sa paroi avant sont deux couches de la même illustration, afin de masquer naturellement le bas de son contenu. La zone « sur la table » se trouve sur la partie droite libre. Aucun meuble n’a été déplacé.

Chaque série comprend un placement derrière la fenêtre (oiseau), entre la plante et le four, devant un élément du mobilier, dans le panier et devant le panier. Les positions du frigo incluent quatre quadrants, sur, devant et à côté. Évier : dans seulement. Four : dans, devant ou sur seulement. Banque totale : 150 consignes.

Les zones calent les objets sur une surface, indépendamment de la bonne réponse. Les emplacements sont accessibles au clavier après sélection. Les deux planches de vingt et seize objets sont découpées uniquement à l’affichage. Images originales conservées dans `assets/`.

Audio provisoire : voix française SpeechSynthesis du navigateur. Les essais d’enregistrement local ont produit des fichiers sans échantillons ; aucun enregistrement naturel n’est donc revendiqué. L’inventaire des futures phrases est conservé dans le dossier de préparation du projet.

Validation : neuf tests couvrent les destinations, les restrictions, les deux niveaux, les erreurs, les séries, les deux zones du panier et le parcours applicatif en DOM simulé. Le navigateur intégré a également parcouru les dix consignes du niveau 2 jusqu’à l’écran de fin. Un placement par clic dans la scène a été vérifié. Contrôles de mise en page à 1024×768, 768×1024 et 390×844 : tous les éléments et commandes tiennent à l’écran, sans débordement horizontal. Cela ne remplace pas un essai tactile sur un iPad physique. Capture dans `docs/niveau-2-panier.jpg`.

Le mode classe « À toi de placer ! » a été proposé et reste à développer séparément ; les deux choix actuels correspondent aux niveaux du mode autonome.

Pour développer : servir le dossier parent en HTTP et ouvrir `/la-cuisine/`. Vérifier avec `node --test tests/*.test.mjs`.
