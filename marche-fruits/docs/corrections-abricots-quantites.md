# Abricots et achats libres

La scène corrigée est enregistrée sous `assets/scene-abricots-v2.webp` : les abricots de la cagette inférieure ont une couleur dorée, un sillon et une moitié avec un noyau visible. Les oranges de la rangée supérieure restent identifiables. L’ancienne scène et les icônes individuelles sont conservées.

Dans l’activité 3 « Et toi ? », les clics sur les fruits ajoutent une unité, jusqu’à trois par type. Les boutons − et + corrigent les quantités. Chaque fruit du panier peut aussi être retiré par un clic. Les noms sont masqués dans les choix et dans la récapitulation, et les messages visibles restent sans noms de fruits. Les libellés accessibles sont conservés. Les activités de découverte et les commandes guidées gardent leurs mots et consignes.

Options du composant partagé : `pickerAction: 'add'`, `hideNames: true`. Elles sont activées uniquement au marché. Les autres activités conservent la sélection/retrait et les libellés visibles.

Vérifications navigateur : quatre clics plafonnent à 3 abricots ; − ramène à 2 ; deux pommes sont ajoutées sans masquer les quantités ; aucun nom de fruit visible dans les choix ni dans la récapitulation ; « Nouvel élève » vide le panier ; deux clics sur la cagette d’abricots ajoutent deux unités dans les courses guidées ; contrôle du composant partagé au pique-nique (noms visibles, second clic retire). Analyse de syntaxe réussie. Aperçu dans `quantites-sans-noms.jpg`.
