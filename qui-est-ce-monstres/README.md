# Qui est-ce ? Les 24 monstres

Jeu statique sans dépendance. Ouvrir via HTTP (par exemple `python3 -m http.server`).

- **Classe** : 24 cartes, grille 6 × 4 sur grand écran ; clic pour retourner et rétablir ; remise à zéro. Aucun score ni cœur.
- **Autonomie** : 10 cibles tirées sans répétition parmi les 24 ; 3 vies pour toute la partie ; aucune limite de temps. Chaque erreur sur une nouvelle carte coûte une vie. Une carte déjà erronée est désactivée pour éviter de perdre plusieurs vies par double clic. Les cartes sont rétablies à la question suivante.
- **Audio** : description complète en français (voix système Thomas), AAC M4A intégré et lecture à 0,75 avec conservation de la hauteur. Clic sur toute la description ; répétition gratuite. Synthèse vocale française de secours si le fichier ne peut pas être lu. La lecture cesse au changement de mode, à la bonne réponse et au redémarrage.
- **Plein écran** : script commun du portail, avec solution agrandie de secours et conservation de la partie.

`characters.json` constitue la matrice des attributs et des descriptions. `data.js` contient la même matrice pour le navigateur. Les illustrations SVG sont dessinées à partir de ces attributs, sans images distantes. Les cheveux longs descendent jusqu’à la taille ; les cheveux courts restent au-dessus des oreilles. Nez : rayons horizontaux 5 / 16 ; oreilles : 8 / 21. Bras et jambes sont séparés et comptables. Les accessoires ne font pas partie de l’anatomie.

Les noms et numéros servent uniquement au repérage ; ils ne sont jamais employés comme indice dans une question.

## Vérification effectuée avant publication

24 descriptions distinctes et 24 combinaisons d’attributs uniques. Nombres d’yeux, bras et jambes, tailles de nez et d’oreilles contrôlés directement dans les SVG ; 24 fichiers audio non vides et décodables. 100 parties gagnantes simulées et test de défaite après trois erreurs.

Navigateur : retournement et rétablissement, remise à zéro, dix réponses distinctes jusqu’à la victoire, trois erreurs jusqu’à la défaite, redémarrage, déclenchement audio, changements de modes et plein écran. Mise en page contrôlée aux formats étroit et grand écran. Le matériel iPad réel n’a pas été utilisé pour ces tests.
