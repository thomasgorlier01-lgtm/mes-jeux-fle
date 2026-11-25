import {OBJECTS,ZONES,MISSIONS} from './data.js?v=2';
export {OBJECTS,ZONES,MISSIONS};
export const getObject=id=>OBJECTS.find(o=>o.id===id);
export const getZone=id=>ZONES.find(z=>z.id===id);
export function shuffle(list,random=Math.random){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function newRound(random=Math.random){
 const choose=list=>list[Math.floor(random()*list.length)];
 const required=[choose(MISSIONS.filter(m=>m.zone==='fenetre')),choose(MISSIONS.filter(m=>m.zone==='plante-four-entre'))];
 required.push(choose(MISSIONS.filter(m=>getZone(m.zone).label.startsWith('devant ')&&!required.some(r=>r.object===m.object))));
 const used=new Set(required.map(m=>m.object));
 const rest=shuffle(OBJECTS.filter(o=>!used.has(o.id)),random).slice(0,7).map(o=>choose(MISSIONS.filter(m=>m.object===o.id)));
 return shuffle([...required,...rest],random);
}
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
