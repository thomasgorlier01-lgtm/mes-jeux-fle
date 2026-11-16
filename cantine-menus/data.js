export const FOODS=[
 {id:'poulet',group:'proteine',phrase:'du poulet'},
 {id:'steak',group:'proteine',phrase:'de la viande'},
 {id:'poisson',group:'proteine',phrase:'du poisson grillé'},
 {id:'pommes-de-terre',group:'feculent',phrase:'des pommes de terre'},
 {id:'pates',group:'feculent',phrase:'des pâtes'},
 {id:'frites',group:'feculent',phrase:'des frites'},
 {id:'salade',group:'legume',phrase:'de la salade'},
 {id:'tomates',group:'legume',phrase:'des tomates'},
 {id:'carottes',group:'legume',phrase:'des carottes'},
 {id:'brocoli',group:'legume',phrase:'du brocoli'},
 {id:'yaourt',group:'dessert',phrase:'un yaourt'},
 {id:'glace',group:'dessert',phrase:'une glace à la fraise'},
 {id:'gateau',group:'dessert',phrase:'un morceau de gâteau au chocolat'},
 {id:'kiwi',group:'dessert',phrase:'un kiwi'},
 {id:'pomme',group:'dessert',phrase:'une pomme'},
 {id:'banane',group:'dessert',phrase:'une banane'},
 {id:'orange',group:'dessert',phrase:'une orange'},
 {id:'eau',group:'boisson',phrase:'de l’eau'},
 {id:'lait',group:'boisson',phrase:'du lait'},
 {id:'jus-orange',group:'boisson',phrase:'un jus d’orange'},
 {id:'jus-pomme',group:'boisson',phrase:'un jus de pomme'}
];
export const GROUPS=['proteine','feculent','legume','dessert','boisson'];
export const foodById=id=>FOODS.find(f=>f.id===id);
