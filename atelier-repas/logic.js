export const signature=ids=>[...ids].sort().join('|');
export function shuffle(a,random=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export const availableFoods=(foods,level=1)=>foods.filter(f=>(f.level||1)<=level);
export function generateRounds(foods,random=Math.random,level=1){
 if(![1,2,3].includes(level))throw Error('Niveau inconnu');
 const groups=Object.fromEntries(['proteine','accompagnement','legume'].map(g=>[g,shuffle(foods.filter(f=>f.group===g).map(f=>f.id),random)])),seen=new Set(),desserts=shuffle(foods.filter(f=>f.group==='dessert').map(f=>f.id),random),drinks=shuffle(foods.filter(f=>f.group==='boisson').map(f=>f.id),random);
 return Array.from({length:10},(_,i)=>{const base=Object.values(groups).map(group=>group[i%group.length]),extras=i%3===0?['fromage']:i%3===1?shuffle(groups.legume.filter(id=>!base.includes(id)),random):['oeufs','fromage'];let ids;
  for(const extra of [...extras,...shuffle(foods.filter(f=>!f.level).map(f=>f.id),random)]){if(base.includes(extra))continue;const candidate=[...base,extra];if(!seen.has(signature(candidate))){ids=shuffle(candidate,random);break;}}
  if(!ids)throw Error('Impossible de créer une assiette unique');seen.add(signature(ids));if(level>1)ids.push(desserts[i%desserts.length]);if(level>2)ids.push(drinks[i%drinks.length]);return {avatar:i%2?'fille':'garcon',level,expected:ids};
 });
}
export const question=round=>`Que veut-${round.avatar==='fille'?'elle':'il'} ${round.level===3?'manger et boire':'manger'} ?`;
export function describeRound(round,foods){
 const items=round.expected.map(id=>foods.find(f=>f.id===id));
 const meal=items.filter(f=>!f.level).map(f=>f.phrase);
 const list=parts=>parts.length>1?parts.slice(0,-1).join(', ')+' et '+parts.at(-1):parts[0];
 const sentences=[`Je voudrais ${list(meal)}.`];
 for(const dessert of items.filter(f=>f.group==='dessert'))sentences.push(`Je voudrais ${dessert.phrase} en dessert.`);
 for(const drink of items.filter(f=>f.group==='boisson'))sentences.push(`Je voudrais boire ${drink.phrase}.`);
 return sentences.join(' ');
}
export const startGame=(foods,random=Math.random,level=1)=>({level,rounds:generateRounds(foods,random,level),round:0,score:0,lives:3,selection:[],phase:'playing',lastAttempt:null,feedback:'',feedbackType:''});
export function toggleFood(state,foods,id){if(state.phase!=='playing'||!availableFoods(foods,state.level).some(f=>f.id===id))return state;return {...state,selection:state.selection.includes(id)?state.selection.filter(x=>x!==id):[...state.selection,id],feedback:'',feedbackType:''};}
export const clearPlate=state=>state.phase==='playing'?{...state,selection:[],feedback:'',feedbackType:''}:state;
export const canCheck=state=>state.phase==='playing'&&signature(state.selection)!==state.lastAttempt;
export function checkPlate(state){if(!canCheck(state))return state;const attempt=signature(state.selection);if(attempt===signature(state.rounds[state.round].expected))return {...state,score:state.score+1,phase:'success',lastAttempt:attempt,feedback:'Bravo ! C’est exactement le bon plateau.',feedbackType:'success'};const lives=state.lives-1;return {...state,lives,lastAttempt:attempt,phase:lives?'playing':'out-of-lives',feedback:lives?'Pas tout à fait. Relis la phrase et change les aliments avant de réessayer.':'Tes trois essais sont terminés. Tu peux regarder la solution.',feedbackType:'error'};}
export const revealSolution=state=>state.phase==='out-of-lives'?{...state,selection:[...state.rounds[state.round].expected],phase:'solution',feedback:'Voici les aliments demandés. Observe le plateau avant de continuer.',feedbackType:'solution'}:state;
export function nextRound(state){if(!['success','solution'].includes(state.phase))return state;if(state.round===9)return {...state,phase:'finished'};return {...state,round:state.round+1,lives:3,selection:[],phase:'playing',lastAttempt:null,feedback:'',feedbackType:''};}
