# Je compose ma salade

Suite des activités sur la nourriture, avec les personnages peints aux grandes oreilles déjà validés.

## Deux étapes indépendantes

1. **Je reconnais les quantités** : dix questions tirées parmi les dix-huit associations ingrédient/quantité. Trois assiettes identiques affichent une absence, une petite portion ou une grande portion. L’ordre est mélangé à chaque question.
2. **Je compose ma salade** : dix commandes tirées sans répétition parmi 240 combinaisons. Deux ingrédients présents, l’un en petite quantité et l’autre en grande quantité ; un troisième explicitement absent avec « mais pas de/d’ ». Les autres ingrédients doivent également rester absents. Un réfrigérateur propose les six ingrédients ; clic, choix illustré de quantité, puis validation de l’ensemble. Modifications libres avant validation.

Tomates, carottes, concombre, œufs, fromage et brocoli, sur une base fixe de salade verte. Les portions gardent la même échelle : une ou cinq unités graphiques, jamais une simple différence de taille. Les unités réutilisées peuvent contenir plusieurs morceaux (deux moitiés d’œuf par exemple) ; le jeu travaille les quantités qualitatives et non le dénombrement.

Un garçon et une fille alternent. Bulles écrites avec lecture intégrale et fragments cliquables, voix françaises neutres Thomas/Amélie sans transformation. Réécoute sans pénalité, décodage Web Audio précis des extraits. Cinq cœurs pour toute la série de dix questions. Une même réponse incorrecte répétée sans modification ne coûte pas de nouveau cœur. À zéro, réponse consultable puis nouvelle partie. Dix bonnes réponses mènent à la réussite. Pas de chronomètre. Plein écran commun conservant l’état.

Réemploi des images de `cantine-menus`, `pique-nique-famille` et du lecteur audio commun. Deux nouveaux sprites transparents seulement : rondelles de concombre et carotte. Aucune introduction de sel, sucre, sucré/salé ou « sans » dans cette activité.

## Vérification

`node tests/logic.mjs` : 200 parties, unicité des commandes, alternance, trois quantités, accord du texte et de l’audio, refus des ingrédients en trop, vérification exacte, absence de double pénalité, cinq vies globales et fin de partie.
