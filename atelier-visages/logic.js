export const LEVELS=[{id:1,title:'Visages *'},{id:2,title:'Visages **'},{id:3,title:'Visages ***'}];
export const SLOTS=['yeux','cheveux','nez','oreilles','bouche','chapeau','lunettes','boucles'];
const BASIC=['yeux','cheveux','nez','oreilles','bouche'];
export const signature=s=>Object.entries(s).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>k+':'+v).join('|');
const shuffle=(a,r)=>{a=[...a];for(let i=a.length-1;i;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
export const availableCategories=(catalog,level)=>catalog.categories.filter(x=>level>1||BASIC.includes(x.id));
export const availableItems=(catalog,category,avatar,level=1)=>catalog.elements.filter(x=>x.categorie===category&&(!x.avatar||x.avatar===avatar)&&(!x.levels||x.levels.includes(level)));
export function generateRounds(catalog,random=Math.random,level=1){
 if(!LEVELS.some(x=>x.id===level))throw Error('Niveau inconnu');
 const colors=shuffle(['blonds','bruns','noirs','roux'],random),eyes=shuffle(['bleus','verts','marron','noirs'],random),sizes=shuffle(['petit','grand'],random),seen=new Set(),accessoryOrder=shuffle(['chapeau','lunettes','boucles'],random),lengths={garcon:shuffle(['courts','longs','courts','longs','courts'],random),fille:shuffle(['longs','courts','longs','courts','longs'],random)};
 return Array.from({length:10},(_,i)=>{
  const avatar=i%2?'fille':'garcon',length=lengths[avatar][Math.floor(i/2)];
  const expected={yeux:'yeux_'+eyes[i%4],cheveux:'cheveux_'+avatar+'_'+length+'_'+colors[(i+Math.floor(i/4))%4],nez:'nez_'+sizes[i%2],oreilles:'oreilles_'+sizes[Math.floor(i/2)%2],bouche:'bouche_'+sizes[Math.floor(i/3)%2]};
  if(level===3){const emotion=['content','triste','fache','malade','surpris'][i%5];expected.bouche='bouche_'+sizes[Math.floor(i/3)%2]+'_'+emotion;}
  if(level>1){const count=level===2?(i%3===0?3:2):(i%3===0?1:2);const extras=Array.from({length:count},(_,n)=>accessoryOrder[(i+Math.floor(i/3)+n)%3]);for(const slot of extras){const items=availableItems(catalog,slot,avatar,level);expected[slot]=items[Math.floor(random()*items.length)].id;}}

  // Guard uniqueness independently of accessories.
  while(seen.has(signature(expected))){const choices=availableItems(catalog,'yeux',avatar),index=choices.findIndex(x=>x.id===expected.yeux);expected.yeux=choices[(index+1)%choices.length].id;}seen.add(signature(expected));
  const negativeSlots=level===3?shuffle(['chapeau','lunettes','boucles'].filter(slot=>!expected[slot]),random).slice(0,2):[];
  return {avatar,level,expected,negativeSlots,negativeFirst:Math.floor(i/2)%2===0};
 });
}
export const startGame=(catalog,random=Math.random,level=1)=>({level,rounds:generateRounds(catalog,random,level),round:0,score:0,lives:3,selection:{},phase:'playing',lastAttempt:null,feedback:'',feedbackType:''});
export function selectItem(state,catalog,id){if(state.phase!=='playing')return state;const item=catalog.elements.find(x=>x.id===id);if(!item||!availableCategories(catalog,state.level).some(x=>x.id===item.categorie)||!availableItems(catalog,item.categorie,state.rounds[state.round].avatar,state.level).some(x=>x.id===id))return state;const selection={...state.selection};if(selection[item.categorie]===id)delete selection[item.categorie];else selection[item.categorie]=id;return {...state,selection,feedback:'',feedbackType:''};}
export const clearOutfit=state=>state.phase==='playing'?{...state,selection:{},feedback:'',feedbackType:''}:state;
export const canCheck=state=>state.phase==='playing'&&signature(state.selection)!==state.lastAttempt;
export function checkOutfit(state){if(!canCheck(state))return state;const current=signature(state.selection);if(current===signature(state.rounds[state.round].expected))return {...state,score:state.score+1,phase:'success',lastAttempt:current,feedback:'Bravo ! C’est exactement le bon visage.',feedbackType:'success'};const lives=state.lives-1;return {...state,lives,lastAttempt:current,phase:lives?'playing':'out-of-lives',feedback:lives?'Pas tout à fait. Relis la description et change le visage avant de réessayer.':'Tes trois essais sont terminés. Tu peux regarder la solution.',feedbackType:'error'};}
export const revealSolution=state=>state.phase==='out-of-lives'?{...state,selection:{...state.rounds[state.round].expected},phase:'solution',feedback:'Voici le visage décrit. Observe-le avant de continuer.',feedbackType:'solution'}:state;
export function nextRound(state){if(!['success','solution'].includes(state.phase))return state;if(state.round===9)return {...state,phase:'finished'};return {...state,round:state.round+1,lives:3,selection:{},phase:'playing',lastAttempt:null,feedback:'',feedbackType:''};}
export const describeItem=item=>item.description;
const list=a=>a.length>1?a.slice(0,-1).join(', ')+' et '+a.at(-1):a[0];
export function describeRound(round,catalog){
 const p=round.avatar==='garcon'?'Il':'Elle',get=slot=>catalog.elements.find(x=>x.id===round.expected[slot])?.description,basics=BASIC.map(get),positiveSlots=['chapeau','lunettes','boucles'].filter(s=>round.expected[s]),accessories=positiveSlots.map(get);
 const description=`${p} a ${list(basics)}.`;
 if(round.level!==3)return description+(accessories.length?` ${p} porte ${list(accessories)}.`:'');
 const negatives={chapeau:'n’a pas de chapeau',lunettes:'n’a pas de lunettes',boucles:'n’a pas de boucles d’oreilles'};
 const present=`a ${list(accessories)}`,absent=negatives[round.negativeSlots[0]],contrast=round.negativeFirst?`${p} ${absent}, mais ${p.toLowerCase()} ${present}.`:`${p} ${present}, mais ${p.toLowerCase()} ${absent}.`;
 const emotion=catalog.elements.find(x=>x.id===round.expected.bouche)?.emotion,words={content:round.avatar==='fille'?'contente':'content',triste:'triste',fache:round.avatar==='fille'?'fâchée':'fâché',malade:'malade',surpris:round.avatar==='fille'?'surprise':'surpris'};
 const sentences=[description,`${p} est ${words[emotion]}.`,contrast];
 if(round.negativeSlots[1])sentences.push(`${p} ${negatives[round.negativeSlots[1]]}.`);
 return sentences.join(' ');
}
