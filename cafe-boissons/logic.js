export const DRINKS=[
 {id:'eau',word:'un verre d’eau'},
 {id:'lait',word:'un verre de lait'},
 {id:'jus-orange',word:'un jus d’orange'},
 {id:'jus-pomme',word:'un jus de pomme'},
 {id:'cafe',word:'un café'},
 {id:'the',word:'un thé'},
 {id:'chocolat',word:'un chocolat chaud'},
 {id:'cola',word:'un coca'}
];
export const PARENTS=[{id:'father',name:'Le papa',x:15},{id:'mother',name:'La maman',x:38.5}];
export const sentence=id=>'Bonjour, je voudrais '+DRINKS.find(d=>d.id===id).word+'.';
export const matches=(served,expected)=>PARENTS.every(p=>served[p.id]===expected[p.id]);
function shuffled(items,random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function newRounds(random=Math.random){
 const ids=shuffled(DRINKS.map(d=>d.id),random);
 const rounds=Array.from({length:4},(_,i)=>({father:ids[i*2],mother:ids[i*2+1]}));
 const used=new Set(rounds.map(r=>r.father+'|'+r.mother));
 const extra=[];for(const father of ids)for(const mother of ids)if(!used.has(father+'|'+mother))extra.push({father,mother});
 rounds.push(extra[Math.floor(random()*extra.length)]);
 return shuffled(rounds,random);
}
