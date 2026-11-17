import {FOODS,QUANTITIES,portion} from './data.js';
export function shuffled(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export const signature=selection=>FOODS.map(f=>`${f.id}:${selection[f.id]||0}`).join('|');
export function roundsFor(step,random=Math.random){
 const pool=[];
 if(step===1)for(const f of FOODS)for(const q of QUANTITIES)pool.push({food:f.id,quantity:q});
 else for(const a of FOODS)for(const b of FOODS)for(const c of FOODS)if(new Set([a.id,b.id,c.id]).size===3)for(const q of [1,5])pool.push({first:a.id,second:b.id,absent:c.id,expected:{[a.id]:q,[b.id]:q===1?5:1}});
 const seen=new Set();
 return shuffled(pool,random).filter(r=>{const key=step===1?r.food+'|'+r.quantity:signature(r.expected);if(seen.has(key))return false;seen.add(key);return true;}).slice(0,10).map((r,i)=>({...r,avatar:i%2?'fille':'garcon',options:shuffled(QUANTITIES,random)}));
}
export const newGame=(step,random=Math.random)=>({step,rounds:roundsFor(step,random),round:0,lives:5,status:'playing',phase:'answer',selection:{},wrong:[],lastAttempt:null});
export function describe(round,step){return step===1?(round.quantity===0?`Il n’y a ${portion(round.food,0)}.`:`Il y a ${portion(round.food,round.quantity)}.`):`Je voudrais ${portion(round.first,round.expected[round.first])}, ${portion(round.second,round.expected[round.second])}, mais ${portion(round.absent,0)}.`;}
export function choose(state,id,q){if(state.status!=='playing'||state.phase!=='answer'||!FOODS.some(f=>f.id===id)||!QUANTITIES.includes(q))return;state.selection={...state.selection,[id]:q};}
export function check(state,quantity){
 if(state.status!=='playing'||state.phase!=='answer')return'ignored';
 const r=state.rounds[state.round];
 if(state.step===1){if(!QUANTITIES.includes(quantity)||state.wrong.includes(quantity))return'ignored';if(quantity===r.quantity){state.phase='correct';return'correct';}state.wrong.push(quantity);}
 else {const sig=signature(state.selection);if(sig===state.lastAttempt)return'ignored';if(sig===signature(r.expected)){state.phase='correct';return'correct';}state.lastAttempt=sig;}
 state.lives--;if(!state.lives)state.status='lost';return'wrong';
}
export function next(state){if(state.phase!=='correct'||state.status!=='playing')return;if(state.round===9){state.status='won';return;}state.round++;state.phase='answer';state.selection={};state.wrong=[];state.lastAttempt=null;}
export function audioKeys(round,step){const prefix=round.avatar+'-';if(step===1)return[prefix+`recognize-${round.food}-${round.quantity}`];return[prefix+'request',prefix+`portion-${round.first}-${round.expected[round.first]}`,prefix+`portion-${round.second}-${round.expected[round.second]}`,prefix+`absent-${round.absent}`];}
