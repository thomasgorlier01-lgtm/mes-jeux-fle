export const FRUITS=[
 {id:'pomme',word:'la pomme',one:'une pomme',plural:'pommes'},
 {id:'poire',word:'la poire',one:'une poire',plural:'poires'},
 {id:'banane',word:'la banane',one:'une banane',plural:'bananes'},
 {id:'orange',word:'l’orange',one:'une orange',plural:'oranges'},
 {id:'fraise',word:'la fraise',one:'une fraise',plural:'fraises'},
 {id:'raisin',word:'le raisin',one:'du raisin',portion:true},
 {id:'kiwi',word:'le kiwi',one:'un kiwi',plural:'kiwis'},
 {id:'peche',word:'la pêche',one:'une pêche',plural:'pêches'},
 {id:'abricot',word:'l’abricot',one:'un abricot',plural:'abricots'},
 {id:'cerises',word:'les cerises',one:'des cerises',portion:true}
];
export const fruitById=id=>FRUITS.find(f=>f.id===id);
export const limit=id=>fruitById(id).portion?1:3;
export const phrase=(id,count)=>{const f=fruitById(id);return count===1||f.portion?f.one:(count===2?'deux ':'trois ')+f.plural;};
export const orderItems=order=>FRUITS.filter(f=>order[f.id]).map(f=>({id:f.id,count:order[f.id]}));
export const orderText=order=>{const parts=orderItems(order).map(x=>phrase(x.id,x.count));return 'Bonjour, je voudrais '+parts.slice(0,-1).join(', ')+' et '+parts.at(-1)+'.';};
export const orderAudio=order=>['intro',...orderItems(order).map((x,i)=>`${i===3?'last':'item'}-${x.id}-${x.count}`)];
export const matches=(selected,expected)=>FRUITS.every(f=>(selected[f.id]||0)===(expected[f.id]||0));
export function adjust(basket,id,delta){const next={...basket};const value=Math.max(0,Math.min(limit(id),(next[id]||0)+delta));if(!next[id]&&value>0&&Object.keys(next).length>=4)return null;if(value)next[id]=value;else delete next[id];return next;}
function shuffled(items,random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function newOrders(random=Math.random){
 const combinations=[];for(let a=0;a<7;a++)for(let b=a+1;b<8;b++)for(let c=b+1;c<9;c++)for(let d=c+1;d<10;d++)combinations.push([a,b,c,d]);
 let chosen;for(let attempt=0;attempt<20;attempt++){chosen=shuffled(combinations,random).slice(0,10);if(new Set(chosen.flat()).size===10)break;}
 if(new Set(chosen.flat()).size<10)chosen=Array.from({length:10},(_,i)=>Array.from({length:4},(_,j)=>(i+j)%10).sort((a,b)=>a-b));
 return chosen.map(indices=>Object.fromEntries(indices.map(i=>{const f=FRUITS[i];return [f.id,f.portion?1:1+Math.floor(random()*3)];})));
}
