export const FOODS=[
 {id:'poulet',word:'le poulet',part:'du poulet'},
 {id:'salade',word:'la salade',part:'de la salade'},
 {id:'steak',word:'la viande',part:'de la viande'},
 {id:'tomates',word:'les tomates',part:'des tomates'},
 {id:'fromage',word:'le fromage',part:'du fromage'},
 {id:'oeufs',word:'les œufs',part:'des œufs'}
];
export const UTENSILS=[{id:'couteau',word:'le couteau'},{id:'fourchette',word:'la fourchette'},{id:'cuillere',word:'la cuillère'},{id:'verre',word:'le verre'},{id:'assiette',word:'l’assiette'}];
export const PEOPLE=[{name:'Le garçon',voice:'male',x:17.3,bread:14.2},{name:'Le papa',voice:'male',x:40.5,bread:37.2},{name:'La maman',voice:'female',x:63.2,bread:60},{name:'La fille',voice:'female',x:86.5,bread:83.2}];
export const key=ids=>FOODS.filter(f=>ids.includes(f.id)).map(f=>f.id).join('+');
export const sentence=ids=>{const list=FOODS.filter(f=>ids.includes(f.id)).map(f=>f.part);return 'Dans mon sandwich, je voudrais '+(list.length===1?list[0]:list.slice(0,-1).join(', ')+' et '+list.at(-1))+'.';};
export const matches=(selected,expected)=>selected.length===expected.length&&expected.every(id=>selected.includes(id));
export function newOrders(random=Math.random){const choices=[];for(let mask=1;mask<64;mask++){const ids=FOODS.filter((f,i)=>mask&(1<<i)).map(f=>f.id);if(ids.length>=3&&ids.length<=4&&!(ids.includes('poulet')&&ids.includes('steak'))&&ids.some(id=>id==='salade'||id==='tomates'))choices.push(ids);}for(let i=choices.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}return choices.slice(0,4);}
