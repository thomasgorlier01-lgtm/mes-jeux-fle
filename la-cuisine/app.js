import {ZONES,newRound,getObject,getObjects,getZone,check,snap,shuffle} from './model.js?v=6';
import {createPointerDrag} from './drag.js?v=5';
const $=id=>document.getElementById(id);
let rounds=[],index=0,level=1,selected=null,placement=null,solved=false,doors={frigo:false,four:false};
let speaking=null,audioGeneration=0;
function stopAudio(){audioGeneration++;if('speechSynthesis'in window)speechSynthesis.cancel();speaking?.classList.remove('playing');speaking=null;}
function speak(text,button){
 stopAudio();
 if(!('speechSynthesis'in window)){feedback('La lecture audio n’est pas disponible sur ce navigateur.','error');return;}
 const generation=audioGeneration,utterance=new SpeechSynthesisUtterance(text);utterance.lang='fr-FR';utterance.rate=.85;
 const voices=speechSynthesis.getVoices();utterance.voice=voices.find(v=>v.lang==='fr-FR'&&/Thomas|Audrey|Amélie|premium|enhanced/i.test(v.name))||voices.find(v=>v.lang==='fr-FR')||voices.find(v=>v.lang.startsWith('fr'))||null;
 speaking=button;button?.classList.add('playing');
 utterance.onend=()=>{if(generation!==audioGeneration)return;button?.classList.remove('playing');if(speaking===button)speaking=null;};
 utterance.onerror=e=>{if(generation!==audioGeneration||['interrupted','canceled'].includes(e.error))return;button?.classList.remove('playing');feedback('Le son n’a pas pu être lu. Touche à nouveau la consigne.','error');};
 speechSynthesis.speak(utterance);
}
function feedback(text,type=''){const f=$('feedback');f.textContent=text;f.className=type;}
function sprite(o){const s=document.createElement('span');s.className='sprite';s.style.setProperty('--col',o.col);s.style.setProperty('--row',o.row);const img=new Image();img.src=o.sheet||'assets/objets.png';img.style.width=(o.cols||5)*100+'%';img.style.height=(o.rows||4)*100+'%';img.alt='';img.draggable=false;s.append(img);return s;}
let dragPrevious=null,dragGhost=null;
function removeDragGhost(){dragGhost?.remove();dragGhost=null;document.body.classList.remove('drag-active');}
function restoreDrag(){if(dragPrevious){selected=dragPrevious.selected;placement=dragPrevious.placement;}dragPrevious=null;removeDragGhost();renderPlacement();}
const drag=createPointerDrag({
 canStart:()=>!solved,
 begin(id){dragPrevious={selected,placement};selected=id;placement=null;stopAudio();dragGhost=document.createElement('div');dragGhost.className='drag-ghost';dragGhost.setAttribute('aria-hidden','true');dragGhost.style.width=Math.max(56,Math.min(96,$('scene').getBoundingClientRect().width*getObject(id).size/100))+'px';dragGhost.append(sprite(getObject(id)));document.body.append(dragGhost);document.body.classList.add('drag-active');renderPlacement();feedback('Dépose l’objet à sa place dans la cuisine.');},
 move(x,y){if(dragGhost){dragGhost.style.left=x+'px';dragGhost.style.top=y+'px';}},
 drop(x,y){const r=$('scene').getBoundingClientRect();if(x<r.left||x>r.left+r.width||y<r.top||y>r.top+r.height){restoreDrag();feedback('Dépose l’objet dans la cuisine ou clique sur sa place.');return;}dragPrevious=null;removeDragGhost();place((x-r.left)/r.width,(y-r.top)/r.height);},
 cancel(){restoreDrag();feedback('Tu peux faire glisser un objet ou le placer en deux clics.');}
});
function renderPalette(){
 $('palette').replaceChildren(...shuffle(getObjects(level)).map(o=>{const b=document.createElement('button');b.type='button';b.className='object';b.dataset.object=o.id;b.setAttribute('aria-label',o.label);b.setAttribute('aria-pressed','false');b.title=o.label;b.append(sprite(o));drag.bind(b,()=>o.id);b.addEventListener('click',e=>{if(solved||drag.ignoresClick(e))return;selected=o.id;placement=null;speak(o.label,b);renderPlacement();feedback('Touche maintenant sa place dans la cuisine.');});return b;}));
}
function renderDoors(){
 for(const id of ['frigo','four']){$(id+'-closed').hidden=doors[id];const b=$(id+'-toggle'),label=(doors[id]?'Fermer':'Ouvrir')+' le '+id;b.setAttribute('aria-expanded',String(doors[id]));b.setAttribute('aria-label',label);b.firstElementChild.textContent=label;}
 renderPlacement();
}
function renderPlacement(){
 $('scene').classList.toggle('selecting',!!selected&&!solved);
 for(const b of $('palette').children){b.setAttribute('aria-pressed',String(b.dataset.object===selected));b.disabled=solved;}
 $('placement').hidden=!placement;
 $('check').disabled=!placement||solved;$('cancel').disabled=solved||!selected;
 for(const b of $('destinations').children)b.tabIndex=selected&&!solved?0:-1;
 if(!placement)return;
 const o=getObject(placement.object),zone=snap(placement.x,placement.y),p=$('placement');
 p.style.left=placement.x*100+'%';p.style.top=placement.y*100+'%';
 let size=o.size;if(placement.y<.1)size=Math.min(size,4);
 if(zone?.id==='frigo-cote'||zone?.id==='plante-cote'||zone?.id==='plante-four-entre')size=Math.min(size,4);
 if(zone?.id==='panier-dans')size=Math.min(size,5);
 if(zone?.id==='panier-devant')size=Math.min(size,6);
 p.style.width=size+'%';p.replaceChildren(sprite(o));
 const behindTable=placement.y>=.55&&placement.y<=.64&&placement.x>.25&&placement.x<.71;
 const inSink=zone?.id==='evier';
 p.className=(behindTable||inSink?'':'front ')+(zone?.id==='panier-devant'?'basket-front ':'')+(solved?'valid':'movable');
 if(zone?.door&&!doors[zone.door])p.hidden=true;
}
function place(x,y){
 if(!selected||solved)return;
 const zone=snap(x,y);
 if(zone?.door&&!doors[zone.door]){selected=null;renderPlacement();feedback('Ouvre d’abord le '+zone.door+', puis choisis de nouveau l’objet.');return;}
 // Anchor taps to furniture surfaces while keeping the choice of zone independent of the answer.
 placement={object:selected,x:zone?zone.point[0]:x,y:zone?zone.point[1]:y,input:{x,y}};
 renderPlacement();feedback('Tu peux déplacer l’objet ou vérifier ton choix.');
}
function renderMission(){
 drag.cancel();
 stopAudio();selected=null;placement=null;solved=false;
 $('instruction').textContent=rounds[index].text;$('progress').textContent=(index+1)+' / '+rounds.length;
 $('next').hidden=true;$('check').hidden=false;
 feedback('Glisse un objet ou clique dessus, puis sur sa place.');renderPlacement();
}
function start(selectedLevel=level){level=selectedLevel===2?2:1;rounds=newRound(Math.random,level);index=0;doors={frigo:false,four:false};$('finish').close();$('home').hidden=true;$('game').hidden=false;$('game').classList.toggle('level-two',level===2);$('level-badge').textContent='Niveau '+level;$('home-button').hidden=false;renderPalette();renderDoors();renderMission();}
function home(){drag.cancel();stopAudio();$('finish').close();$('home').hidden=false;$('game').hidden=true;$('home-button').hidden=true;$('start').focus();}
for(const zone of ZONES){const b=document.createElement('button');b.type='button';b.className='destination';b.dataset.zone=zone.id;b.style.left=zone.point[0]*100+'%';b.style.top=zone.point[1]*100+'%';b.setAttribute('aria-label',zone.label);b.tabIndex=-1;b.addEventListener('click',e=>{e.stopPropagation();place(...zone.point);});$('destinations').append(b);}
$('scene').addEventListener('click',e=>{if(!selected||solved||drag.ignoresClick(e))return;const r=$('scene').getBoundingClientRect();place(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height)));});
drag.bind($('placement'),()=>placement?.object);
$('placement').addEventListener('click',e=>e.stopPropagation());
for(const id of ['frigo','four'])$(id+'-toggle').addEventListener('click',e=>{e.stopPropagation();doors[id]=!doors[id];renderDoors();});
$('listen').onclick=()=>speak(rounds[index].text,$('listen'));
$('cancel').onclick=()=>{selected=null;placement=null;renderPlacement();feedback('Glisse un objet ou clique dessus, puis sur sa place.');};
$('check').onclick=()=>{
 const result=check(rounds[index],placement,doors);
 if(result==='closed'){feedback('Ouvre le '+getZone(rounds[index].zone).door+' pour placer l’objet à l’intérieur.','error');return;}
 if(result!=='correct'){feedback('Essaie encore. Écoute la consigne et change l’objet ou sa place.','error');return;}
 const target=getZone(rounds[index].zone);placement={...placement,x:target.point[0],y:target.point[1]};
 solved=true;stopAudio();feedback('Bravo, il est à la bonne place !','success');$('check').hidden=true;$('next').hidden=false;$('next').textContent=index===rounds.length-1?'Terminer':'Suivant';renderPlacement();
};
$('next').onclick=()=>{if(index===rounds.length-1){stopAudio();$('finish-message').textContent='Tu as terminé les '+rounds.length+' consignes.';$('finish').showModal();$('restart').focus();}else{index++;renderMission();$('listen').focus();}};
$('start').onclick=()=>start(1);$('start-2').onclick=()=>start(2);$('restart').onclick=()=>start(level);$('home-button').onclick=home;$('finish-home').onclick=home;
document.addEventListener('visibilitychange',()=>{if(document.hidden){drag.cancel();stopAudio();}});
