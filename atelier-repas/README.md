# À table !

Jeu de lecture à la cantine. Un garçon et une fille alternent, chacun tenant un plateau avec les deux mains, une grande assiette, une fourchette, un couteau et une cuillère. La question emploie « il » ou « elle ». La commande sépare le plat, le dessert et la boisson : « Je voudrais du poulet, du riz, des tomates et du fromage. Je voudrais un kiwi en dessert. Je voudrais boire de l’eau. »

Trois niveaux :
1. Le repas : quatre aliments dans l’assiette, parmi douze illustrations (poulet, steak, poisson, riz, pâtes, pommes de terre, frites, carottes, tomates, salade, œufs, fromage).
2. Le repas et le dessert : mêmes aliments, plus un dessert sur une petite assiette distincte (kiwi, yaourt, gâteau au chocolat ou glace vanille-chocolat).
3. Le repas, le dessert et la boisson : ajout d’une boisson distincte (eau, jus d’orange, jus de pomme, thé, Coca-Cola ou verre de lait). Pas de jus de fruits.

Cliquer sur une image l’ajoute au plateau ; cliquer à nouveau dessus ou sur son image dans le plateau la retire. Aucun nom n’est affiché sous les aliments ; les boutons conservent un libellé accessible. Les aliments du repas occupent quatre emplacements distincts dans la grande assiette ; dessert et boisson ont leurs propres zones.

Dix plateaux différents par partie, tous les aliments du niveau représentés au cours d’une partie, cinq garçons et cinq filles. Vérification exacte sans élément manquant ni supplémentaire. Trois essais par plateau, sans double pénalité pour un essai inchangé. Bonne réponse : un point et passage automatique au suivant. Après trois erreurs : solution à observer puis passage manuel. Changer de niveau ou recommencer annule le passage automatique en attente.

Les illustrations des enfants reprennent les personnages validés de l’atelier des vêtements, adaptés avec le plateau en mains à partir de leurs références. Les images sont générées avec l’outil intégré puis découpées en sprites transparents WebP. La table de la première ébauche est remplacée par un plateau de cantine ; assiettes et couverts sont dessinés dans l’interface.

Site statique, sans compte ni transmission des réponses. Plein écran, clavier, mobile, messages accessibles. Tests : `node --test tests/core.test.mjs`.

L’assiette du plat est réduite et les portions occupent davantage son intérieur. Le dessert et le verre restent dans la surface du plateau, avec des couverts agrandis, poignées vers le personnage et pointes vers le bas de l’image.
