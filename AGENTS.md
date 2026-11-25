# Préférence de l’utilisateur pour les jeux

Tout nouveau jeu ou toute refonte de jeu dans ce dossier doit proposer un petit bouton à icône pour entrer en plein écran et en sortir, sans recharger la page ni modifier la partie en cours.

Réutiliser `fullscreen.js` avec un chemin relatif approprié. Les jeux du portail doivent aussi fonctionner dans une iframe autorisant le plein écran. Conserver le retour par le même bouton, la synchronisation avec Échap et un affichage agrandi de secours si le navigateur ne propose pas le plein écran natif.

## Retour aux jeux de français

Chaque jeu ouvert directement ou dans un nouvel onglet propose « ← Tous les jeux » vers l’accueil du portail. Utiliser `portal-back.js`, chargé par `fullscreen.js` ou inclus directement. Pour un fichier HTML autonome, placer le lien dans l’en-tête. Conserver le retour du lecteur quand le jeu est intégré au portail.
