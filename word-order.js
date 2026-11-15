// Keep vocabulary independent of the left-to-right order in the illustration.
const previousOrders=new Map();
export function shuffleVocabulary(items,random=Math.random){
 if(items.length<2)return [...items];
 const signature=items.map(x=>x.id).join('|'),previous=previousOrders.get(signature);
 const isSuitable=result=>result.every((x,i)=>x.id!==items[i].id)&&result.map(x=>x.id).join('|')!==previous;
 const remember=result=>{previousOrders.set(signature,result.map(x=>x.id).join('|'));return result;};
 for(let attempt=0;attempt<24;attempt++){
  const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  if(isSuitable(result))return remember(result);
 }
 for(let offset=1;offset<items.length;offset++){const result=items.slice(offset).concat(items.slice(0,offset));if(isSuitable(result))return remember(result);}
 return remember(items.slice(1).concat(items[0]));
}
