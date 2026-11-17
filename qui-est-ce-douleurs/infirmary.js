import {newInfirmary,verifyInfirmary,nextPatient,fingerprint} from './infirmary-logic.js?v=4';
import {BODY_ZONES} from './body-zones.js?v=4';
import {renderClues,stopClue} from './sound.js?v=4';
export function createInfirmary(){
 const $=id=>document.getElementById(id),stage=$('patient-stage'),layer=$('patient-placements');
 let state=null,active=false,selected=null,tool='plaster',serial=0,drag=null,lastDragEnded=0;
 const patient=()=>state.rounds[state.round];
 const playing=()=>active&&state?.phase==='playing';
 function announce(s,kind=''){$('care-message').textContent=s;$('care-message').className='care-message '+kind;}
 function point(event){const r=stage.getBoundingClientRect();return{x:(event.clientX-r.left)/r.width,y:(event.clientY-r.top)/r.height};}
 const inside=p=>p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1;
 function markDirty(){state.lastAttempt=null;}
 function updateActions(){
  const n=state.placements.length;$('placed-count').textContent=`${n} / 3 soins placés`;
  $('verify-care').hidden=['correct','won','lost'].includes(state.phase);
  $('verify-care').disabled=!playing()||n!==3||fingerprint(state.placements)===state.lastAttempt;
  $('next-patient').hidden=state.phase!=='correct';
  $('remove-care').disabled=!playing()||!state.placements.some(p=>p.id===selected&&!p.locked);
  document.querySelectorAll('.care-tool').forEach(b=>{b.disabled=!playing()||n>=3;b.setAttribute('aria-pressed',String(b.dataset.type===tool));});
 }
 function renderPlacements(){
  layer.replaceChildren();for(const p of state.placements){const button=document.createElement('button');button.type='button';button.className=`care-placement ${p.type}-mark${p.locked?' locked':''}${p.wrong?' misplaced':''}${p.id===selected?' selected':''}`;button.style.left=`${p.x*100}%`;button.style.top=`${p.y*100}%`;button.dataset.id=p.id;button.setAttribute('aria-label',`${p.type==='wrap'?'Bandage':'Pansement'} ${p.locked?'bien placé':p.wrong?'à déplacer':'à déplacer ou retirer'}`);button.setAttribute('aria-pressed',String(p.id===selected));button.disabled=p.locked||!playing();button.addEventListener('pointerdown',event=>beginDrag(event,p.id,p.type));button.addEventListener('click',event=>{event.stopPropagation();selected=p.id;renderPlacements();updateActions();});button.addEventListener('keydown',event=>keyMove(event,p.id));layer.append(button);}
 }
 function render(){
  const current=patient();$('patient-progress').textContent=`Personnage ${state.round+1} / 10`;
  $('patient-hearts').replaceChildren();for(let i=0;i<3;i++){const h=document.createElement('span');h.className='heart'+(i>=state.lives?' lost':'');h.textContent='♥';h.setAttribute('aria-hidden','true');$('patient-hearts').append(h);}$('patient-hearts').setAttribute('aria-label',`${state.lives} vie${state.lives===1?'':'s'}`);
  const src=`assets/patient-${current.avatar}.webp?v=4`;if($('patient-image').getAttribute('src')!==src)$('patient-image').src=src;
  $('patient-stage').setAttribute('aria-description',`${current.pronoun==='Il'?'Garçon':'Fille'}, personnage ${state.round+1}. Place trois soins sur les douleurs indiquées.`);
  $('infirmary').querySelector('h3').textContent=current.pronoun==='Il'?'Où a-t-il mal ?':'Où a-t-elle mal ?';
  renderClues($('patient-clues'),current.pronoun,current.pains);renderPlacements();updateActions();
 }
 function selectTool(type){if(!playing())return;tool=type;selected=null;renderPlacements();updateActions();}
 function place(p,type,id=null){
  if(!playing()||!inside(p))return;
  if(id!==null){const item=state.placements.find(p=>p.id===id);if(!item||item.locked)return;Object.assign(item,{x:p.x,y:p.y,wrong:false});selected=id;}
  else{if(state.placements.length>=3){announce('Les trois soins sont placés. Déplace-les ou clique sur Vérifier.');return;}const item={id:++serial,type,x:p.x,y:p.y,locked:false,wrong:false};state.placements.push(item);selected=item.id;}
  markDirty();announce('Tu peux déplacer tes soins avant de vérifier.');renderPlacements();updateActions();
 }
 function cancelDrag(){if(!drag)return;drag.ghost?.remove();drag=null;document.body.classList.remove('dragging-care');}
 function beginDrag(event,id,type){
  if(!playing()||event.button>0||state.placements.find(p=>p.id===id)?.locked)return;
  if(id===null&&state.placements.length>=3)return;
  cancelDrag();event.preventDefault();event.stopPropagation();drag={id,type,pointer:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false,ghost:null};
 }
 function moveDrag(event){
  if(!drag||event.pointerId!==drag.pointer)return;
  if(Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<5&&!drag.moved)return;
  event.preventDefault();drag.moved=true;
  if(!drag.ghost){drag.ghost=document.createElement('span');drag.ghost.className=`care-drag-ghost ${drag.type}-mark`;drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);document.body.classList.add('dragging-care');}
  drag.ghost.style.left=event.clientX+'px';drag.ghost.style.top=event.clientY+'px';
 }
 function finishDrag(event){if(!drag||event.pointerId!==drag.pointer)return;const d=drag,p=point(event);cancelDrag();if(d.moved){lastDragEnded=performance.now();place(p,d.type,d.id);}else if(d.id!==null){selected=d.id;renderPlacements();updateActions();}else selectTool(d.type);}
 function keyMove(event,id){
  const item=state.placements.find(p=>p.id===id);if(!playing()||!item||item.locked)return;
  if(['Delete','Backspace'].includes(event.key)){event.preventDefault();selected=id;remove();return;}
  const delta={ArrowLeft:[-.012,0],ArrowRight:[.012,0],ArrowUp:[0,-.008],ArrowDown:[0,.008]}[event.key];if(!delta)return;
  event.preventDefault();place({x:Math.min(.98,Math.max(.02,item.x+delta[0])),y:Math.min(.98,Math.max(.02,item.y+delta[1]))},item.type,id);layer.querySelector(`[data-id="${id}"]`)?.focus();
 }
 function remove(){if(!playing())return;state.placements=state.placements.filter(p=>p.id!==selected||p.locked);selected=null;markDirty();renderPlacements();updateActions();announce('Choisis un soin puis place-le à nouveau.');}
 function check(){
  if(!playing()||drag)return;stopClue();const result=verifyInfirmary(state,BODY_ZONES[patient().avatar]);if(result===state)return;state=result;selected=null;render();
  if(state.phase==='correct')announce('Bravo ! Les trois soins sont bien placés.','ok');
  else if(state.phase==='won')announce('Bravo ! Tu as soigné les dix personnages !','ok');
  else if(state.phase==='lost'){
   const zones=BODY_ZONES[patient().avatar];state.placements=patient().pains.map((pain,i)=>({id:++serial,type:'plaster',x:zones[pain][0].x,y:zones[pain][0].y,locked:true,pain}));renderPlacements();announce('Les trois cœurs sont utilisés. Voici les trois endroits à soigner. Tu peux réécouter les phrases et rejouer.','bad');
  }else{const good=state.placements.filter(p=>p.locked).length;announce(`Un cœur en moins. ${good===0?'Déplace les soins entourés en rose.':`${good} soin${good>1?'s sont':' est'} bien placé${good>1?'s':''}. Corrige les autres.`}`,'bad');}
 }
 function restart(){cancelDrag();lastDragEnded=0;stopClue();state=newInfirmary();selected=null;tool='plaster';render();announce('Écoute les trois douleurs et place les soins.');}
 for(const b of document.querySelectorAll('.care-tool')){b.addEventListener('pointerdown',e=>beginDrag(e,null,b.dataset.type));b.addEventListener('click',()=>selectTool(b.dataset.type));}
 stage.addEventListener('click',event=>{if(event.target.closest('.care-placement')||!playing()||performance.now()-lastDragEnded<250)return;place(point(event),tool);});
 stage.addEventListener('keydown',event=>{if(event.target!==stage||!playing())return;if(event.key==='Enter'||event.key===' '){event.preventDefault();place({x:.5,y:.5},tool);layer.querySelector(`[data-id="${selected}"]`)?.focus();}});
 document.addEventListener('pointermove',moveDrag,{passive:false});document.addEventListener('pointerup',finishDrag);document.addEventListener('pointercancel',cancelDrag);
 document.addEventListener('keydown',event=>{if(event.key==='Escape')cancelDrag();});
 window.addEventListener('blur',cancelDrag);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelDrag();});
 $('remove-care').addEventListener('click',remove);$('verify-care').addEventListener('click',check);
 $('next-patient').addEventListener('click',()=>{stopClue();state=nextPatient(state);selected=null;render();announce('Écoute les trois nouvelles douleurs.');});
 $('restart-care').addEventListener('click',restart);
 return{show(){active=true;if(!state)restart();else{render();}},hide(){active=false;cancelDrag();stopClue();}};
}
