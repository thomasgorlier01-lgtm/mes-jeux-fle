export const FOODS=[
 {id:'tomates',name:'les tomates',of:'de tomates',image:'tomates.webp'},
 {id:'carottes',name:'les carottes',of:'de carottes',image:'carottes.webp'},
 {id:'concombre',name:'le concombre',of:'de concombre',image:'concombre.webp'},
 {id:'oeufs',name:'les œufs',of:'d’œufs',image:'oeufs.webp'},
 {id:'fromage',name:'le fromage',of:'de fromage',image:'fromage.webp'},
 {id:'brocoli',name:'le brocoli',of:'de brocoli',image:'brocoli.webp'}
];
export const QUANTITIES=[0,1,5];
export const foodById=id=>FOODS.find(f=>f.id===id);
export const portion=(id,q)=>`${q===0?'pas':q===1?'un peu':'beaucoup'} ${foodById(id).of}`;
