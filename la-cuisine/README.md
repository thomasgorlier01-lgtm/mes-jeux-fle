# Dans la cuisine — première version jouable

Sélectionner un objet puis toucher son emplacement. Vérifier, corriger librement, puis passer à la consigne suivante. Dix objets distincts tirés parmi vingt par partie ; banque de 71 consignes. Sans chronomètre ni vies dans cette première version. Les portes du frigo et du four s’ouvrent et se ferment avec leurs poignées.

Frigo : dans (quatre quadrants), devant, sur, à côté. Évier : dans uniquement. Four : dans, devant, sur. Chaque série comprend « devant », « derrière la fenêtre » et « entre la plante et le four ». Les autres prépositions sont travaillées avec la table, les chaises, la plante et la fenêtre. Les coordonnées désignent le point de contact des objets avec le mobilier ; le placement se cale dans une zone, indépendamment de la bonne réponse. Les emplacements sont également accessibles au clavier après sélection d’un objet.

Illustrations originales pastel dans `assets/`. L’image ouverte sert de fond ; des zones de l’image fermée recouvrent les appareils. Les vingt éléments sont découpés à l’affichage depuis la planche transparente, sans multiplier les fichiers. Certaines relations visuelles (devant/derrière et petites zones latérales) restent à apprécier sur un vrai iPad.

Audio provisoire : SpeechSynthesis du navigateur avec une voix française disponible. Aucun enregistrement prétendument naturel n’est livré : les essais de `say` dans cet environnement ont produit des fichiers sans échantillons audio. L’inventaire des futurs enregistrements est conservé dans `preparation/la-cuisine/` dans le projet de travail.

Validation : cinq tests du modèle et un parcours applicatif en DOM simulé couvrent les 71 consignes, les destinations, les séries, les restrictions évier/four et les erreurs. Le scénario Playwright de dix manches a été préparé mais Chrome ne démarre pas dans l’environnement (SIGABRT/EPERM avant ouverture de page). Aucun contrôle visuel ou tactile réel n’est donc revendiqué. Le plein écran réutilise `../fullscreen.js`.

Lancer le dossier parent avec un serveur HTTP, puis ouvrir `/la-cuisine/`. `node --test tests/model.test.mjs` vérifie le modèle. Le lien direct permet un essai avant ajout au portail FLE Lab.
