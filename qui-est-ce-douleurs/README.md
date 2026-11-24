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

## L’infirmerie — deuxième activité en classe

En classe ouvre désormais un menu proposant Qui est-ce ? et L’infirmerie. Cette nouvelle activité utilise deux personnages sans blessures, un garçon puis une fille, en alternance sur dix manches. Les dix combinaisons de trois douleurs sont distinctes dans chaque partie et tirées au hasard parmi les onze parties du corps disponibles. Chaque douleur est écrite sur une ligne et possède un enregistrement audio français réécoutable librement. Ces mêmes audios sont aussi accessibles dans les descriptions du mode autonome.

Les soins sont glissés librement depuis la réserve (pansement ou bandage). Ils restent au point de dépôt, sans déplacement automatique, et peuvent être déplacés ou retirés avant vérification. L’élève peut aussi choisir un soin puis toucher le personnage. Au clavier, Entrée sur le personnage place un soin, les flèches le déplacent et Supprimer le retire. Trois soins sont nécessaires pour vérifier.

La validation utilise des zones elliptiques liées aux proportions exactes du portrait. Les deux yeux et les deux oreilles sont acceptés, ainsi que les deux côtés pour les membres. Les genoux sont distincts des jambes ; les paumes des doigts. Le pansement et le bandage sont tous deux acceptés : la partie du corps est l’objectif évalué. Une erreur retire un seul cœur pour la vérification entière. Les soins corrects sont verrouillés, les autres entourés en rose et modifiables. Recliquer sans rien modifier ne retire pas un autre cœur. Trois cœurs pour les dix manches, conformément à la demande explicite de l’utilisateur pour L’infirmerie ; le Qui est-ce autonome conserve ses cinq cœurs. À zéro cœur, les positions correctes sont montrées et les phrases restent réécoutables.

Chaque manche réussie attend le bouton Personnage suivant, afin de laisser du temps aux échanges en classe. La dixième réussite termine la partie. Nouvelle partie renouvelle les combinaisons et rétablit trois cœurs. Les changements d’activité arrêtent l’audio et les glissements en cours. Le plein écran est placé dans un emplacement toujours visible, y compris lorsque les statistiques du mode autonome sont masquées.

Images : assets/patient-garcon.webp et assets/patient-fille.webp, portraits identiquement recadrés à 570 × 1024 ; assets/pansement.webp réutilise le pansement blanc validé. Les bandages sont dessinés par le style de l’interface. Audios : 22 phrases complètes, voix française Thomas, regroupées dans audio/il.m4a et audio/elle.m4a avec les bornes précises dans audio-data.js. Génération reproductible dans preparation/qui-est-ce-douleurs/build-infirmary-audio.py du projet local. Un secours vocal est proposé si la lecture du fichier échoue.

Contrôles supplémentaires : tests de logique des zones, des deux côtés, des combinaisons et des vies ; dix manches réellement jouées dans le navigateur ; glissement tactile, lecture des segments audio, corrections partielles, fin de partie, reprise, clavier, plein écran et dispositions 1366, 1024 et 390 pixels. Sauvegarde avant cet ajout : tmp/backup-douleurs-infirmerie-20261118.

## Niveaux 2 et 3 — les prépositions (23 novembre 2026)

Le niveau 1 reste l’activité d’écoute et de placement d’origine. Le niveau 2 propose une phrase et une douleur par manche ; le niveau 3 en propose trois. Chaque niveau comporte dix manches, une alternance garçon/fille, des combinaisons renouvelées et trois cœurs pour la partie.

Les élèves sélectionnent au, à la, à l’ ou aux dans les phrases puis placent les soins. Les quatre formes apparaissent dans chaque partie. Le vocabulaire comprend tête, œil, oreille, nez, bras, ventre, main, doigt, genou, jambe, pied, épaule, yeux, oreilles et dents. Le cou et le dos sont exclus. Pour les yeux et les oreilles au pluriel, un soin est nécessaire de chaque côté. Pour les dents, le soin se place près de la bouche. Les combinaisons évitent œil/yeux ou oreille/oreilles simultanément pour un même personnage.

Le bouton Vérifier s’active une fois toutes les prépositions choisies et tous les soins déposés. La grammaire et les placements sont évalués indépendamment : les bonnes prépositions et les bons soins sont verrouillés ; les erreurs restent modifiables. Une vérification incorrecte retire un seul cœur, quel que soit le nombre d’erreurs. Le clic répété sans modification est ignoré. Les positions restent celles choisies par l’élève, avec les tolérances de l’activité d’origine.

Chaque phrase complète devient écoutable après validation correcte de la préposition et du placement correspondant. À zéro cœur, la correction est montrée et les phrases deviennent réécoutables. Les huit enregistrements supplémentaires (épaule, yeux, oreilles, dents ; Il et Elle) complètent les fichiers existants sans les remplacer. Après dix réussites, le niveau suivant est proposé. Le choix des niveaux reste accessible directement.

Vérifications : 18 tests de logique, deux parties complètes de dix manches dans le navigateur, erreurs de grammaire et de placement séparées, pluriels avec deux soins, disponibilité différée de l’audio, anciens modes, clavier et plein écran. iPad 1024×768 et 768×1024 : corps entier et bouton Vérifier visibles, sélection de préposition et déplacement tactile contrôlés. Sauvegarde locale avant modification : tmp/douleurs-avant-prepositions-20261123.

## Tolérance des placements — 24 novembre 2026

Pour la jambe, les cuisses et les mollets sont acceptés des deux côtés, avec une marge plus large. Pour le doigt, le pouce ainsi que les quatre autres doigts sont acceptés sur les deux mains. Les zones sont communes aux trois niveaux et aux deux personnages. La précision demandée pour le genou est conservée. Le placement reste libre, sans déplacement automatique du soin.

Contrôles : points relevés sur les portraits, validation sans perte de cœur dans les trois niveaux, 23 tests de logique réussis ; essais réels dans le navigateur sur les deux cuisses, les deux mollets, les deux pouces et plusieurs autres doigts. Sauvegarde avant modification : tmp/douleurs-avant-tolerance-20261124.
