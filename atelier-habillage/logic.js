export const SLOTS = ['coiffure','lunettes','haut','bas','robe','chaussettes','chaussures','veste','gants'];
const TEMPLATES = [
 ['casquette','tshirt','short','chaussettes','baskets','veste'],
 ['chapeau_classique','chemise','jupe','chaussettes','sandales'],
 ['bonnet','pull','pantalon','chaussettes','baskets'],
 ['chapeau_cowboy','robe','chaussettes','bottes','veste'],
 ['chapeau_classique','tshirt','jupe','chaussettes','sandales'],
 ['casquette','chemise','short','chaussettes','baskets','veste'],
 ['chapeau_cowboy','pull','pantalon','chaussettes','bottes'],
 ['bonnet','robe','chaussettes','sandales'],
 ['casquette','tshirt','pantalon','chaussettes','sandales','veste'],
 ['chapeau_classique','chemise','jupe','chaussettes','bottes']
];
export const signature = selection => Object.values(selection).sort().join('|');
export function shuffle(input, random=Math.random) {
 const array=[...input]; for(let i=array.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[array[i],array[j]]=[array[j],array[i]]}return array;
}
export function generateRounds(catalog,random=Math.random){
 const templates=shuffle(TEMPLATES,random),colors=shuffle(Object.keys(catalog.palette),random); let counter=0;
 return templates.map((template,index)=>{
  const categories=[...template];
  if([0,1,4,7].includes(index))categories.push('lunettes');
  if([2,3,6,9].includes(index))categories.push('gants');
  const expected={};
  for(const category of categories){const choices=catalog.elements.filter(x=>x.categorie===category);const color=colors[counter++%colors.length];const item=choices.find(x=>x.couleur===color)||choices[0];expected[item.emplacement]=item.id;}
  return {avatar:index%2===0?'garcon':'fille',expected};
 });
}
export function startGame(catalog,random=Math.random){return {rounds:generateRounds(catalog,random),round:0,score:0,lives:3,selection:{},phase:'playing',lastAttempt:null,feedback:'',feedbackType:''};}
export function selectItem(state,catalog,id){
 if(state.phase!=='playing')return state;
 const item=catalog.elements.find(x=>x.id===id);if(!item)return state;
 const selection={...state.selection};
 if(selection[item.emplacement]===id)delete selection[item.emplacement];
 else {selection[item.emplacement]=id;if(item.emplacement==='robe'){delete selection.haut;delete selection.bas;}else if(item.emplacement==='haut'||item.emplacement==='bas')delete selection.robe;}
 return {...state,selection,feedback:'',feedbackType:''};
}
export function clearOutfit(state){return state.phase==='playing'?{...state,selection:{},feedback:'',feedbackType:''}:state;}
export function canCheck(state){return state.phase==='playing'&&signature(state.selection)!==state.lastAttempt;}
export function checkOutfit(state){
 if(!canCheck(state))return state;
 const current=signature(state.selection),correct=current===signature(state.rounds[state.round].expected);
 if(correct)return {...state,score:state.score+1,phase:'success',feedback:'Bravo ! C’est exactement la bonne tenue.',feedbackType:'success',lastAttempt:current};
 const lives=state.lives-1;
 return {...state,lives,lastAttempt:current,phase:lives===0?'out-of-lives':'playing',feedback:lives===0?'Tes trois essais sont terminés. Tu peux regarder la solution.':'Pas tout à fait. Relis la description et change ta tenue avant de réessayer.',feedbackType:'error'};
}
export function revealSolution(state){return state.phase==='out-of-lives'?{...state,selection:{...state.rounds[state.round].expected},phase:'solution',feedback:'Voici la tenue décrite. Observe-la avant de continuer.',feedbackType:'solution'}:state;}
export function nextRound(state){
 if(!['success','solution'].includes(state.phase))return state;
 if(state.round===state.rounds.length-1)return {...state,phase:'finished'};
 return {...state,round:state.round+1,lives:3,selection:{},phase:'playing',lastAttempt:null,feedback:'',feedbackType:''};
}
const WORDS={
 tshirt:['un t-shirt','m'],pull:['un pull','m'],chemise:['une chemise','f'],veste:['une veste','f'],pantalon:['un pantalon','m'],short:['un short','m'],jupe:['une jupe','f'],robe:['une robe','f'],chaussettes:['des chaussettes','fp'],baskets:['des baskets','fp'],sandales:['des sandales','fp'],bottes:['des bottes','fp'],casquette:['une casquette','f'],chapeau_cowboy:['un chapeau de cow-boy','m'],chapeau_classique:['un chapeau classique','m'],bonnet:['un bonnet','m'],lunettes:['des lunettes','fp'],gants:['des gants','mp']
};
export function colorAdjective(color,gender){
 const feminine=gender.startsWith('f'),plural=gender.endsWith('p');
 if(color==='marron')return 'marron';
 const root=feminine?({vert:'verte',violet:'violette',bleu:'bleue'}[color]||color):color;
 return root+(plural?'s':'');
}
export function describeItem(item){const [word,gender]=WORDS[item.categorie];return `${word} ${colorAdjective(item.couleur,gender)}`;}
export function describeRound(round,catalog){
 const items=SLOTS.filter(slot=>round.expected[slot]).map(slot=>catalog.elements.find(x=>x.id===round.expected[slot]));
 const parts=items.map(describeItem);const list=parts.length>1?parts.slice(0,-1).join(', ')+' et '+parts.at(-1):parts[0];
 return `${round.avatar==='garcon'?'Il':'Elle'} porte ${list}.`;
}
