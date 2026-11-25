import {OBJECTS,ZONES,MISSIONS} from './data.js?v=4';
export {OBJECTS,ZONES,MISSIONS};
export const getObject=id=>OBJECTS.find(o=>o.id===id);
export const getObjects=(level=1)=>OBJECTS.filter(o=>(o.level||1)<=level);
export const getZone=id=>ZONES.find(z=>z.id===id);
export function shuffle(list,random=Math.random){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function newRound(random=Math.random,level=1){
 const count=level===2?25:10;
 const objects=getObjects(level),allowed=new Set(objects.map(o=>o.id));
 const missions=MISSIONS.filter(m=>allowed.has(m.object));
 const choose=list=>list[Math.floor(random()*list.length)];
 const required=[choose(missions.filter(m=>m.zone==='fenetre')),choose(missions.filter(m=>m.zone==='plante-four-entre'))];
 for(const zone of ['panier-dans','panier-devant'])required.push(choose(missions.filter(m=>m.zone===zone&&!required.some(r=>r.object===m.object)&&(level===1||getObject(m.object).level===2))));
 required.push(choose(missions.filter(m=>getZone(m.zone).label.startsWith('devant ')&&m.zone!=='panier-devant'&&!required.some(r=>r.object===m.object))));
 const used=new Set(required.map(m=>m.object));
 const rest=[];
 if(level===2){for(const o of shuffle(objects.filter(o=>o.level===2&&!used.has(o.id)),random)){used.add(o.id);rest.push(choose(missions.filter(m=>m.object===o.id)));}}
 const extra=shuffle(objects.filter(o=>!used.has(o.id)),random).slice(0,count-required.length-rest.length);
 rest.push(...extra.map(o=>choose(missions.filter(m=>m.object===o.id))));
 return shuffle([...required,...rest],random);
}
export function contains(zone,x,y){const [l,t,r,b]=zone.bounds;return x>=l&&x<=r&&y>=t&&y<=b;}
export function accepts(zone,x,y){
 // These are acceptance margins, not additional destinations. Near an edge,
 // either neighbouring zone can be reasonable; deep inside another zone cannot.
 let mx=.025,my=.03;
 if(/^frigo-[hb][gd]$/.test(zone.id)){mx=.012;my=.025;}
 if(zone.id==='four-sur'){mx=.035;my=.045;}
 if(zone.id==='four-devant'||zone.id==='frigo-devant')my=.04;
 if(zone.id.startsWith('panier-')){mx=.018;my=.014;}
 const [l,t,r,b]=zone.bounds;
 let top=t-my,bottom=b+my;
 if(zone.id==='table-sous'||zone.id==='chaises-entre')bottom=.985;
 if(zone.id==='table-devant')top=.965;
 return Number.isFinite(x)&&Number.isFinite(y)&&x>=Math.max(0,l-mx)&&x<=Math.min(1,r+mx)&&y>=Math.max(0,top)&&y<=Math.min(1,bottom);
}
export function check(mission,placement,doors){
 if(!placement)return 'missing';
 const zone=getZone(mission.zone);
 if(zone.door&&!doors[zone.door])return 'closed';
 // Validate the learner's actual tap/drop, so snapping towards a neighbour
 // never turns a reasonable border placement into an error.
 const input=placement.input||placement;
 return placement.object===mission.object&&accepts(zone,input.x,input.y)?'correct':'incorrect';
}
export function snap(x,y){
 // A tap chooses a generous destination. The object is seated on its surface.
 const matches=ZONES.filter(z=>accepts(z,x,y));
 return matches.length?matches.sort((a,b)=>Math.hypot((x-a.point[0])*1672/941,y-a.point[1])-Math.hypot((x-b.point[0])*1672/941,y-b.point[1]))[0]:null;
}
