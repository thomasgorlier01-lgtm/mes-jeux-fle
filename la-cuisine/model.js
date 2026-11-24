import {OBJECTS,ZONES,MISSIONS} from './data.js';
export {OBJECTS,ZONES,MISSIONS};
export const getObject=id=>OBJECTS.find(o=>o.id===id);
export const getZone=id=>ZONES.find(z=>z.id===id);
export function shuffle(list,random=Math.random){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function newRound(random=Math.random){return shuffle(OBJECTS,random).slice(0,10).map(o=>{const options=MISSIONS.filter(m=>m.object===o.id);return options[Math.floor(random()*options.length)];});}
export function contains(zone,x,y){const [l,t,r,b]=zone.bounds;return x>=l&&x<=r&&y>=t&&y<=b;}
export function check(mission,placement,doors){
 if(!placement)return 'missing';
 const zone=getZone(mission.zone);
 if(zone.door&&!doors[zone.door])return 'closed';
 return placement.object===mission.object&&contains(zone,placement.x,placement.y)?'correct':'incorrect';
}
export function snap(x,y){
 // A tap chooses a generous destination. The object is seated on its surface.
 const matches=ZONES.filter(z=>contains(z,x,y));
 return matches.length?matches.sort((a,b)=>Math.hypot(x-a.point[0],y-a.point[1])-Math.hypot(x-b.point[0],y-b.point[1]))[0]:null;
}
