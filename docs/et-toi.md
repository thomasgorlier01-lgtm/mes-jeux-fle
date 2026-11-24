# Et toi ? — correction des scènes et des menus

Demande du 24 novembre 2026 :
- Pique-nique : un enfant avec son sandwich devant lui. Les deux enfants et les pains sont repris dans la scène d’origine, sans modifier l’image. Les garnitures déjà disponibles sont superposées aux tranches de pain.
- Marché : les fruits sont déposés dans le panier de la scène d’origine. La face avant du panier masque naturellement le bas des fruits. Les quantités sont représentées par plusieurs fruits.
- Café : une nouvelle scène montre trois amis assis à la même terrasse. Trois places indépendantes ; une boisson par personne, boissons identiques possibles. Choisir successivement remplit les places vides. Cliquer une place permet de corriger sa commande ; cliquer sa boisson la retire. Nouvel élève vide les trois places.
- À table : les trois niveaux d’origine sont conservés aux positions 1, 2 et 3. Et toi ? est ajouté en activité 4.
- Autres jeux : Et toi ? reste numéroté 3.
- Menu : la carte utilise une grille propre et des règles suffisamment spécifiques pour éviter le chevauchement du numéro, du titre et du sous-titre constaté dans la capture.

Les scènes du pique-nique et du marché sont affichées via un SVG de cadrage ; les images d’origine restent inchangées. La terrasse est enregistrée dans cafe-boissons/assets/amis-terrasse.png. Le modèle de commande des trois amis est dans oral-order-model.js.

Vérifications réalisées : syntaxe des modules, cohérence des configurations, règles de positionnement et tests du modèle de commande (doublons, changements indépendants, retrait, remise à zéro, indices invalides). La connexion à l’environnement local a été interrompue pendant ce travail ; le contrôle final en navigateur reste à refaire lorsque cet environnement est disponible. Ne pas considérer ces vérifications de code comme un test visuel effectué.
