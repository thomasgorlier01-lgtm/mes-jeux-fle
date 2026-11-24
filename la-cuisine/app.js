import {OBJECTS,ZONES,newRound,getObject,getZone,check,snap,shuffle} from './model.js';
const $=id=>document.getElementById(id);
let rounds=[],index=0,selected=null,placement=null,solved=false,doors={frigo:false,four:false};
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
function sprite(o){const s=document.createElement('span');s.className='sprite';s.style.setProperty('--col',o.col);s.style.setProperty('--row',o.row);const img=new Image();img.src='assets/objets.png';img.alt='';img.draggable=false;s.append(img);return s;}
function renderPalette(){
 $('palette').replaceChildren(...shuffle(OBJECTS).map(o=>{const b=document.createElement('button');b.type='button';b.className='object';b.dataset.object=o.id;b.setAttribute('aria-label',o.label);b.setAttribute('aria-pressed','false');b.title=o.label;b.append(sprite(o));b.addEventListener('click',()=>{if(solved)return;selected=o.id;placement=null;speak(o.label,b);renderPlacement();feedback('Touche maintenant sa place dans la cuisine.');});return b;}));
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
 if(zone?.id==='frigo-cote'||zone?.id==='plante-cote')size=Math.min(size,4);
 p.style.width=size+'%';p.replaceChildren(sprite(o));
 const behindTable=placement.y>=.55&&placement.y<=.64&&placement.x>.25&&placement.x<.71;
 const inSink=zone?.id==='evier';
 p.className=(behindTable||inSink?'':'front ')+(solved?'valid':'');
 if(zone?.door&&!doors[zone.door])p.hidden=true;
}
function place(x,y){
 if(!selected||solved)return;
 const zone=snap(x,y);
 if(zone?.door&&!doors[zone.door]){selected=null;renderPlacement();feedback('Ouvre d’abord le '+zone.door+', puis choisis de nouveau l’objet.');return;}
 // Anchor taps to furniture surfaces while keeping the choice of zone independent of the answer.
 placement={object:selected,x:zone?zone.point[0]:x,y:zone?zone.point[1]:y};
 renderPlacement();feedback('Tu peux déplacer l’objet ou vérifier ton choix.');
}
function renderMission(){
 stopAudio();selected=null;placement=null;solved=false;
 $('instruction').textContent=rounds[index].text;$('progress').textContent=(index+1)+' / '+rounds.length;
 $('next').hidden=true;$('check').hidden=false;
 feedback('Choisis un objet, puis touche sa place dans la cuisine.');renderPlacement();
}
function start(){rounds=newRound();index=0;doors={frigo:false,four:false};$('finish').close();$('home').hidden=true;$('game').hidden=false;$('home-button').hidden=false;renderPalette();renderDoors();renderMission();}
function home(){stopAudio();$('finish').close();$('home').hidden=false;$('game').hidden=true;$('home-button').hidden=true;$('start').focus();}
for(const zone of ZONES){const b=document.createElement('button');b.type='button';b.className='destination';b.dataset.zone=zone.id;b.style.left=zone.point[0]*100+'%';b.style.top=zone.point[1]*100+'%';b.setAttribute('aria-label',zone.label);b.tabIndex=-1;b.addEventListener('click',e=>{e.stopPropagation();place(...zone.point);});$('destinations').append(b);}
$('scene').addEventListener('click',e=>{if(!selected||solved)return;const r=$('scene').getBoundingClientRect();place(Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),Math.max(0,Math.min(1,(e.clientY-r.top)/r.height)));});
for(const id of ['frigo','four'])$(id+'-toggle').addEventListener('click',e=>{e.stopPropagation();doors[id]=!doors[id];renderDoors();});
$('listen').onclick=()=>speak(rounds[index].text,$('listen'));
$('cancel').onclick=()=>{selected=null;placement=null;renderPlacement();feedback('Choisis un objet, puis touche sa place dans la cuisine.');};
$('check').onclick=()=>{
 const result=check(rounds[index],placement,doors);
 if(result==='closed'){feedback('Ouvre le '+getZone(rounds[index].zone).door+' pour placer l’objet à l’intérieur.','error');return;}
 if(result!=='correct'){feedback('Essaie encore. Écoute la consigne et change l’objet ou sa place.','error');return;}
 solved=true;stopAudio();feedback('Bravo, il est à la bonne place !','success');$('check').hidden=true;$('next').hidden=false;$('next').textContent=index===rounds.length-1?'Terminer':'Suivant';renderPlacement();
};
$('next').onclick=()=>{if(index===rounds.length-1){stopAudio();$('finish').showModal();$('restart').focus();}else{index++;renderMission();$('listen').focus();}};
$('start').onclick=start;$('restart').onclick=start;$('home-button').onclick=home;$('finish-home').onclick=home;
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});
