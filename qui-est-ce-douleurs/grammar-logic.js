import {shuffled,matchingPlacements,fingerprint} from './infirmary-logic.js?v=5';
export const PREPOSITIONS=['au','à la','à l’','aux'];
export const VOCABULARY={
 tete:{noun:'tête',prep:'à la'},oeil:{noun:'œil',prep:'à l’',family:'oeil'},oreille:{noun:'oreille',prep:'à l’',family:'oreille'},
 nez:{noun:'nez',prep:'au'},bras:{noun:'bras',prep:'au'},ventre:{noun:'ventre',prep:'au'},main:{noun:'main',prep:'à la'},doigt:{noun:'doigt',prep:'au'},
 genou:{noun:'genou',prep:'au'},jambe:{noun:'jambe',prep:'à la'},pied:{noun:'pied',prep:'au'},epaule:{noun:'épaule',prep:'à l’'},
 yeux:{noun:'yeux',prep:'aux',family:'oeil',bilateral:'oeil'},oreilles:{noun:'oreilles',prep:'aux',family:'oreille',bilateral:'oreille'},dents:{noun:'dents',prep:'aux'}
};
export const fullSentence=(pronoun,pain)=>{const v=VOCABULARY[pain];return `${pronoun} a mal ${v.prep}${v.prep==='à l’'?'':' '}${v.noun}.`;};
function compatible(pains){return new Set(pains.map(p=>VOCABULARY[p].family||p)).size===pains.length;}
export function newGrammar(level=2,random=Math.random){
 if(![2,3].includes(level))throw Error('Niveau de prépositions invalide');
 const keys=Object.keys(VOCABULARY);let sets=[];
 if(level===2){const groups=shuffled(PREPOSITIONS,random).map(prep=>shuffled(keys.filter(k=>VOCABULARY[k].prep===prep),random));for(let i=0;i<10;i++)sets.push([groups[i%4].pop()]);sets=shuffled(sets,random);}
 else{const all=[];for(let i=0;i<keys.length-2;i++)for(let j=i+1;j<keys.length-1;j++)for(let k=j+1;k<keys.length;k++){const pains=[keys[i],keys[j],keys[k]];if(compatible(pains)&&new Set(pains.map(p=>VOCABULARY[p].prep)).size>=2)all.push(pains);}
  const candidates=shuffled(all,random),seen=new Set();for(let i=0;i<10;i++){let best=0;for(let j=1;j<candidates.length;j++){if(candidates[j].filter(p=>!seen.has(p)).length>candidates[best].filter(p=>!seen.has(p)).length)best=j;}const [pains]=candidates.splice(best,1);pains.forEach(p=>seen.add(p));sets.push(shuffled(pains,random));}sets=shuffled(sets,random);
 }
 return{level,rounds:sets.map((pains,i)=>({pains,pronoun:i%2?'Elle':'Il',avatar:i%2?'fille':'garcon'})),round:0,lives:3,phase:'playing',placements:[],choices:{},grammarLocked:[],grammarErrors:[],lastAttempt:null};
}
export function careTargets(round,zones){return round.pains.flatMap(pain=>{const plural=VOCABULARY[pain]?.bilateral;return plural?[0,1].map(side=>({key:`${pain}:${side}`,pain,zones:[zones[plural][side]]})):[{key:pain,pain,zones:zones[pain]}];});}
export function expectedCare(state){return state.rounds[state.round].pains.reduce((n,p)=>n+(VOCABULARY[p]?.bilateral?2:1),0);}
export function grammarFingerprint(state){return JSON.stringify([fingerprint(state.placements),state.rounds[state.round].pains.map(p=>state.choices[p]||'')]);}
export function solvedPains(state,zones){const locked=new Set(state.placements.filter(p=>p.locked).map(p=>p.pain));return state.rounds[state.round].pains.filter(p=>state.grammarLocked.includes(p)&&careTargets({pains:[p]},zones).every(t=>locked.has(t.key)));}
export function verifyGrammar(state,zones){
 if(state.phase!=='playing'||state.placements.length!==expectedCare(state)||!state.rounds[state.round].pains.every(p=>PREPOSITIONS.includes(state.choices[p])))return state;
 const stamp=grammarFingerprint(state);if(stamp===state.lastAttempt)return state;
 const targets=careTargets(state.rounds[state.round],zones),targetZones=Object.fromEntries(targets.map(t=>[t.key,t.zones]));
 const matches=matchingPlacements(state.placements,targets.map(t=>t.key),targetZones),matched=new Map(matches.map(m=>[m.id,m.pain]));
 const placements=state.placements.map(p=>matched.has(p.id)?{...p,pain:matched.get(p.id),locked:true,wrong:false}:{...p,wrong:true});
 const pains=state.rounds[state.round].pains,grammarLocked=pains.filter(p=>state.choices[p]===VOCABULARY[p].prep),grammarErrors=pains.filter(p=>!grammarLocked.includes(p));
 const success=matches.length===targets.length&&!grammarErrors.length,lives=state.lives-(success?0:1);
 return{...state,placements,grammarLocked,grammarErrors,lives,lastAttempt:stamp,phase:success?(state.round===9?'won':'correct'):(lives?'playing':'lost')};
}
export function nextGrammar(state){if(state.phase!=='correct')return state;return{...state,round:state.round+1,phase:'playing',placements:[],choices:{},grammarLocked:[],grammarErrors:[],lastAttempt:null};}
