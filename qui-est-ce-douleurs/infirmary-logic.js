// Coordinates belong to the portrait image, not the surrounding page.
export const LOCATIONS={tete:'à la tête',oeil:'à l’œil',oreille:'à l’oreille',nez:'au nez',bras:'au bras',ventre:'au ventre',main:'à la main',doigt:'au doigt',genou:'au genou',jambe:'à la jambe',pied:'au pied'};
export const PAINS=Object.keys(LOCATIONS);
export const sentence=(pronoun,pain)=>`${pronoun} a mal ${LOCATIONS[pain]}.`;
export function shuffled(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function newInfirmary(random=Math.random){
 const choices=[];for(let a=0;a<PAINS.length-2;a++)for(let b=a+1;b<PAINS.length-1;b++)for(let d=b+1;d<PAINS.length;d++)choices.push([PAINS[a],PAINS[b],PAINS[d]]);
 const rounds=shuffled(choices,random).slice(0,10).map((pains,i)=>({pronoun:i%2?'Elle':'Il',avatar:i%2?'fille':'garcon',pains:shuffled(pains,random)}));
 return{rounds,round:0,lives:3,phase:'playing',placements:[],lastAttempt:null};
}
export function isInZone(point,zone){return Number.isFinite(point.x)&&Number.isFinite(point.y)&&((point.x-zone.x)/zone.rx)**2+((point.y-zone.y)/zone.ry)**2<=1;}
export function matchingPlacements(placements,pains,zones){
 const fixed=placements.filter(p=>p.locked&&pains.includes(p.pain));const used=new Set(fixed.map(p=>p.pain));const free=placements.filter(p=>!p.locked);let best=[];
 function search(i,taken,matches){if(i===free.length){if(matches.length>best.length)best=matches.slice();return;}search(i+1,taken,matches);for(const pain of pains){if(taken.has(pain)||!zones[pain]?.some(z=>isInZone(free[i],z)))continue;taken.add(pain);matches.push({id:free[i].id,pain});search(i+1,taken,matches);matches.pop();taken.delete(pain);}}
 search(0,new Set(used),[]);return [...fixed.map(p=>({id:p.id,pain:p.pain})),...best];
}
export function fingerprint(placements){return JSON.stringify(placements.map(p=>[p.id,p.x,p.y,p.type]));}
export function verifyInfirmary(state,zones){
 if(state.phase!=='playing'||state.placements.length!==3)return state;
 const stamp=fingerprint(state.placements);if(stamp===state.lastAttempt)return state;
 const matches=matchingPlacements(state.placements,state.rounds[state.round].pains,zones);
 const correct=new Map(matches.map(m=>[m.id,m.pain]));
 const placements=state.placements.map(p=>correct.has(p.id)?{...p,locked:true,pain:correct.get(p.id),wrong:false}:{...p,wrong:true});
 const success=matches.length===3,lives=state.lives-(success?0:1);
 return{...state,placements,lives,lastAttempt:stamp,phase:success?(state.round===9?'won':'correct'):(lives?'playing':'lost')};
}
export function nextPatient(state){if(state.phase!=='correct')return state;return{...state,round:state.round+1,phase:'playing',placements:[],lastAttempt:null};}
