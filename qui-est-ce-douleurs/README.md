# Qui est-ce ? Les douleurs

Deux modes utilisent les mêmes quinze portraits numérotés et les mêmes combinaisons de trois douleurs.

## En classe

Mode affiché à l’ouverture. Un élève choisit un personnage en secret, hors de l’interface. Les autres produisent leurs questions à l’oral et retournent manuellement les cartes éliminées. Un second clic rétablit chaque carte ; le bouton Tout rétablir prépare une nouvelle partie. Le nombre de cartes visibles est annoncé. Les numéros restent visibles sur les dos des cartes. À la fin, les élèves décrivent le personnage trouvé. Pas de vies, score, description automatique ni personnage secret sélectionné par l’ordinateur.

## En autonomie

Dix personnages différents à retrouver en lisant une phrase qui réunit leurs trois douleurs. Cinq cœurs pour la partie entière ; une erreur retire un cœur, sans double pénalité sur une même carte. Un point par bonne réponse. À zéro cœur, le bon personnage est indiqué. Nouvelle partie change les questions et remet le score et les cinq cœurs à leur valeur initiale.

Les pronoms suivent la planche : numéros impairs Il, numéros pairs Elle. Chaque combinaison est unique, indépendamment du pronom. Changer de mode annule la transition automatique en cours. Entrer en autonomie démarre une nouvelle partie ; revenir en classe rétablit les quinze cartes.

## Images et accessibilité

Les portraits proviennent du document validé Qui_est_ce_douleurs_15_personnages_index_blanc.pdf. Les pansements du nez et du ventre ont été remplacés par un pansement blanc plus contrasté ; celui du nez est légèrement élargi, sans couvrir les yeux ou la bouche. Les autres attributs et numéros sont conservés. Une sauvegarde avant modification est conservée dans tmp/backup-douleurs-20261118.

Navigation au clavier, états des cartes et du mode accessibles, compteur annoncé et bouton plein écran commun au portail. Site statique, sans compte ni compilation. Tests : node --test tests/core.test.mjs et contrôle navigateur des deux modes.
