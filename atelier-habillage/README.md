# L’atelier des vêtements

Jeu de français : lire une description et habiller le personnage en cliquant sur un vêtement puis sur sa couleur.

- 10 tenues par partie, alternance Léo / Lina.
- 3 essais pour chaque tenue. Une erreur retire un cœur ; une tenue correcte rapporte un point.
- Après trois erreurs, l’élève peut afficher la solution, puis continuer.
- Une seule vignette par type de vêtement, sans nom affiché. Les couleurs apparaissent dans un petit menu au clic.
- 18 types de vêtements et accessoires, 7 couleurs. Aux pieds : baskets, sandales ou bottes. Lunettes et gants inclus.
- Une robe remplace le haut et le bas. La veste reste au-dessus du haut ou de la robe, les chaussures au-dessus des chaussettes.
- Tous les calques ont le même cadre transparent : 1280 × 1920 pixels.

Les deux personnages sont les fichiers validés du kit peint, sans modification. Le bonnet a un pompon ; les bottes ont des semelles et talons bien distincts des chaussettes. Les lunettes et gants sont de nouveaux accessoires peints. Les vignettes de départ ont des couleurs pastel différentes ; elles ne font pas partie de la tenue attendue. Le bleu est une déclinaison du même modèle peint. Les petites vignettes servent seulement à la garde-robe ; le personnage utilise les PNG complets.

## Trois niveaux

1. Premiers vêtements : t-shirt, pantalon, jupe, baskets et chapeau classique uniquement.
2. Toute la garde-robe : la version complète avec les 18 catégories.
3. Lis bien les négations : même garde-robe, mais les phrases positives et négatives sont mélangées. Les accessoires explicitement absents doivent rester retirés.

Chaque niveau contient dix tenues et conserve les trois essais par tenue. Le bouton « Les niveaux » permet de revenir à l’accueil. Les calques des t-shirts et robes ont été élargis pour couvrir les côtés des bras ; les pulls et chemises sont inchangés.

## Utilisation

Site statique sans installation ni compilation : servir ce dossier avec un serveur HTTP ou GitHub Pages. Les fichiers doivent conserver leur organisation.

Tests de règles : `node --test tests/core.test.mjs` (Node 20 ou supérieur).

Les illustrations sont les créations fournies pour ce projet. Aucun service externe ne reçoit les réponses de l’élève. La police distante est facultative : une police locale prend le relais si elle ne charge pas.
