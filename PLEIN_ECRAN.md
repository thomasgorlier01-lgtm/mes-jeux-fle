# Plein écran commun aux jeux

Un petit bouton à quatre coins permet d’entrer en plein écran et de revenir à l’affichage normal, sans réinitialiser la partie. L’icône et son libellé s’actualisent aussi lorsqu’on quitte avec Échap.

Le portail possède le même bouton dans la barre du jeu ouvert. Tous les futurs jeux ouverts dans ce lecteur en bénéficient ; pour leur page autonome, inclure également le script.

Pour un jeu sous un dossier du portail :

```html
<script src="../fullscreen.js?v=1" defer></script>
```

Pour un dépôt autonome, copier le même script à sa racine et utiliser `./fullscreen.js?v=1`.

Un élément portant `data-fullscreen-slot` peut choisir l’emplacement du bouton. À défaut, le script utilise les commandes de l’en-tête. Le script ne lance jamais le plein écran automatiquement.

Sur les navigateurs ne proposant pas le plein écran natif, le bouton active un affichage agrandi dans la fenêtre et permet également d’en sortir.

Références : [entrée en plein écran](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen), [sortie du plein écran](https://developer.mozilla.org/en-US/docs/Web/API/Document/exitFullscreen).
