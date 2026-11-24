import {newGrammar,verifyGrammar,nextGrammar,expectedCare,grammarFingerprint,careTargets,solvedPains,VOCABULARY,PREPOSITIONS,fullSentence} from './grammar-logic.js?v=5';
import {newInfirmary,verifyInfirmary,nextPatient,fingerprint} from './infirmary-logic.js?v=4';
import {BODY_ZONES} from './body-zones.js?v=6';
import {renderClues,stopClue,listen} from './sound.js?v=5';
export function createInfirmary(){
 const $=id=>document.getElementById(id),stage=$('patient-stage'),layer=$('patient-placements');
 let level=1,state=null,active=false,selected=null,tool='plaster',serial=0,drag=null,lastDragEnded=0;
 const patient=()=>state.rounds[state.round];
 const grammar=()=>level>=2;
 const careCount=()=>grammar()?expectedCare(state):3;
 const stamp=()=>grammar()?grammarFingerprint(state):fingerprint(state.placements);
 const playing=()=>active&&state?.phase==='playing';
 function announce(s,kind=''){$('care-message').textContent=s;$('care-message').className='care-message '+kind;}
 function point(event){const r=stage.getBoundingClientRect();return{x:(event.clientX-r.left)/r.width,y:(event.clientY-r.top)/r.height};}
 const inside=p=>p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1;
 function markDirty(){state.lastAttempt=null;}
 function updateActions(){
  const n=state.placements.length;$('placed-count').textContent=`${n} / ${careCount()} soin${careCount()>1?'s':''} placé${careCount()>1?'s':''}`;
  $('verify-care').hidden=['correct','won','lost'].includes(state.phase);
  $('verify-care').disabled=!playing()||n!==careCount()||(grammar()&&!patient().pains.every(p=>PREPOSITIONS.includes(state.choices[p])))||stamp()===state.lastAttempt;
  $('next-patient').hidden=state.phase!=='correct';
  $('advance-care').hidden=state.phase!=='won'||level===3;
  $('remove-care').disabled=!playing()||!state.placements.some(p=>p.id===selected&&!p.locked);
  document.querySelectorAll('.care-tool').forEach(b=>{b.disabled=!playing()||n>=careCount();b.setAttribute('aria-pressed',String(b.dataset.type===tool));});
 }
 function renderPlacements(){
  layer.replaceChildren();for(const p of state.placements){const button=document.createElement('button');button.type='button';button.className=`care-placement ${p.type}-mark${p.locked?' locked':''}${p.wrong?' misplaced':''}${p.id===selected?' selected':''}`;button.style.left=`${p.x*100}%`;button.style.top=`${p.y*100}%`;button.dataset.id=p.id;button.setAttribute('aria-label',`${p.type==='wrap'?'Bandage':'Pansement'} ${p.locked?'bien placé':p.wrong?'à déplacer':'à déplacer ou retirer'}`);button.setAttribute('aria-pressed',String(p.id===selected));button.disabled=p.locked||!playing();button.addEventListener('pointerdown',event=>beginDrag(event,p.id,p.type));button.addEventListener('click',event=>{event.stopPropagation();selected=p.id;renderPlacements();updateActions();});button.addEventListener('keydown',event=>keyMove(event,p.id));layer.append(button);}
 }
 function renderGrammarClues(){
  const host=$('patient-clues'),zones=BODY_ZONES[patient().avatar],solved=new Set(solvedPains(state,zones));host.replaceChildren();
  for(const pain of patient().pains){
   const v=VOCABULARY[pain],li=document.createElement('li');li.className='grammar-row'+(state.grammarErrors.includes(pain)?' grammar-error':'')+(state.grammarLocked.includes(pain)?' grammar-correct':'');li.dataset.pain=pain;
   const phrase=document.createElement('div');phrase.className='grammar-sentence';const start=document.createElement('span');start.textContent=patient().pronoun+' a mal';
   const select=document.createElement('select');select.className='preposition';select.dataset.pain=pain;select.setAttribute('aria-label',`Préposition pour ${v.noun}`);select.setAttribute('aria-invalid',String(state.grammarErrors.includes(pain)));
   for(const value of ['',...PREPOSITIONS]){const option=document.createElement('option');option.value=value;option.textContent=value||'…';select.append(option);}select.value=state.choices[pain]||'';select.disabled=state.grammarLocked.includes(pain)||!playing();
   select.addEventListener('change',()=>{stopClue();state.choices[pain]=select.value;state.grammarErrors=state.grammarErrors.filter(p=>p!==pain);li.classList.remove('grammar-error');select.setAttribute('aria-invalid','false');markDirty();updateActions();});
   const noun=document.createElement('strong');noun.textContent=v.noun+'.';phrase.append(start,select,noun);li.append(phrase);
   const audio=document.createElement('button');audio.type='button';audio.className='grammar-listen';audio.dataset.pain=pain;audio.disabled=!solved.has(pain);audio.textContent=solved.has(pain)?'🔊 '+fullSentence(patient().pronoun,pain):'🔊 Écouter après validation';audio.setAttribute('aria-label',solved.has(pain)?'Écouter : '+fullSentence(patient().pronoun,pain):'Audio disponible après une réponse correcte');audio.addEventListener('click',()=>listen(patient().pronoun,pain,audio));li.append(audio);host.append(li);
  }
 }
 function render(){
  const current=patient();$('patient-progress').textContent=`Personnage ${state.round+1} / 10`;
  $('patient-hearts').replaceChildren();for(let i=0;i<3;i++){const h=document.createElement('span');h.className='heart'+(i>=state.lives?' lost':'');h.textContent='♥';h.setAttribute('aria-hidden','true');$('patient-hearts').append(h);}$('patient-hearts').setAttribute('aria-label',`${state.lives} vie${state.lives===1?'':'s'}`);
  const src=`assets/patient-${current.avatar}.webp?v=4`;if($('patient-image').getAttribute('src')!==src)$('patient-image').src=src;
  $('patient-stage').setAttribute('aria-description',`${current.pronoun==='Il'?'Garçon':'Fille'}, personnage ${state.round+1}. Place ${careCount()} soin${careCount()>1?'s':''} sur les douleurs indiquées.`);
  $('infirmary').querySelector('h3').textContent=current.pronoun==='Il'?'Où a-t-il mal ?':'Où a-t-elle mal ?';
  if(grammar())renderGrammarClues();else renderClues($('patient-clues'),current.pronoun,current.pains);
  $('infirmary').classList.toggle('grammar-level',grammar());
  $('infirmary').classList.toggle('care-ended',['correct','won','lost'].includes(state.phase));
  document.querySelectorAll('[data-care-level]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.careLevel)===level)));
  $('instructions').textContent=level===1?'Écoute les trois douleurs, place les soins puis vérifie.':level===2?'Choisis la préposition, place le soin puis vérifie.':'Choisis les trois prépositions, place les soins puis vérifie.';
  $('care-level-instructions').textContent=level===1?'Écoute les trois douleurs et place les soins.':(level===2?'Complète la phrase, place le soin puis vérifie.':'Complète les trois phrases, place les soins puis vérifie.')+(grammar()&&current.pains.some(p=>VOCABULARY[p].bilateral)?' Pour les yeux ou les oreilles : un soin de chaque côté.':'');
  $('care-audio-hint').textContent=grammar()?'La phrase complète peut être écoutée après une réponse correcte.':'Touche une phrase pour l’écouter.';
  $('note').textContent=`L’infirmerie · Niveau ${level} · 10 personnages · 3 cœurs pour toute la partie`;
  renderPlacements();updateActions();
 }
 function selectTool(type){if(!playing())return;tool=type;selected=null;renderPlacements();updateActions();}
 function place(p,type,id=null){
  if(!playing()||!inside(p))return;
  if(id!==null){const item=state.placements.find(p=>p.id===id);if(!item||item.locked)return;Object.assign(item,{x:p.x,y:p.y,wrong:false});selected=id;}
  else{if(state.placements.length>=careCount()){announce('Tous les soins sont placés. Déplace-les ou clique sur Vérifier.');return;}const item={id:++serial,type,x:p.x,y:p.y,locked:false,wrong:false};state.placements.push(item);selected=item.id;}
  markDirty();announce('Tu peux déplacer tes soins avant de vérifier.');renderPlacements();updateActions();
 }
 function cancelDrag(){if(!drag)return;drag.ghost?.remove();drag=null;document.body.classList.remove('dragging-care');}
 function beginDrag(event,id,type){
  if(!playing()||event.button>0||state.placements.find(p=>p.id===id)?.locked)return;
  if(id===null&&state.placements.length>=careCount())return;
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
  if(!playing()||drag)return;stopClue();const result=grammar()?verifyGrammar(state,BODY_ZONES[patient().avatar]):verifyInfirmary(state,BODY_ZONES[patient().avatar]);if(result===state)return;state=result;selected=null;render();
  if(state.phase==='correct')announce(grammar()?'Bravo ! Toutes les réponses sont correctes.':'Bravo ! Les trois soins sont bien placés.','ok');
  else if(state.phase==='won')announce('Bravo ! Tu as soigné les dix personnages !','ok');
  else if(state.phase==='lost'){
   const zones=BODY_ZONES[patient().avatar];
   if(grammar()){state.placements=careTargets(patient(),zones).map(t=>({id:++serial,type:'plaster',x:t.zones[0].x,y:t.zones[0].y,locked:true,pain:t.key}));state.choices=Object.fromEntries(patient().pains.map(p=>[p,VOCABULARY[p].prep]));state.grammarLocked=[...patient().pains];state.grammarErrors=[];render();}
   else{state.placements=patient().pains.map(pain=>({id:++serial,type:'plaster',x:zones[pain][0].x,y:zones[pain][0].y,locked:true,pain}));renderPlacements();}
   announce('Les trois cœurs sont utilisés. Voici la correction. Tu peux écouter les phrases et rejouer.','bad');
  }else if(grammar()){announce('Un cœur en moins. Corrige les prépositions ou les soins entourés en rose. Les bonnes réponses sont conservées.','bad');}else{const good=state.placements.filter(p=>p.locked).length;announce(`Un cœur en moins. ${good===0?'Déplace les soins entourés en rose.':`${good} soin${good>1?'s sont':' est'} bien placé${good>1?'s':''}. Corrige les autres.`}`,'bad');}
 }
 function restart(){cancelDrag();lastDragEnded=0;stopClue();state=grammar()?newGrammar(level):newInfirmary();selected=null;tool='plaster';render();announce(grammar()?'Choisis les prépositions puis place les soins.':'Écoute les trois douleurs et place les soins.');}
 for(const b of document.querySelectorAll('.care-tool')){b.addEventListener('pointerdown',e=>beginDrag(e,null,b.dataset.type));b.addEventListener('click',()=>selectTool(b.dataset.type));}
 stage.addEventListener('click',event=>{if(event.target.closest('.care-placement')||!playing()||performance.now()-lastDragEnded<250)return;place(point(event),tool);});
 stage.addEventListener('keydown',event=>{if(event.target!==stage||!playing())return;if(event.key==='Enter'||event.key===' '){event.preventDefault();place({x:.5,y:.5},tool);layer.querySelector(`[data-id="${selected}"]`)?.focus();}});
 document.addEventListener('pointermove',moveDrag,{passive:false});document.addEventListener('pointerup',finishDrag);document.addEventListener('pointercancel',cancelDrag);
 document.addEventListener('keydown',event=>{if(event.key==='Escape')cancelDrag();});
 window.addEventListener('blur',cancelDrag);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelDrag();});
 $('remove-care').addEventListener('click',remove);$('verify-care').addEventListener('click',check);
 $('next-patient').addEventListener('click',()=>{stopClue();state=grammar()?nextGrammar(state):nextPatient(state);selected=null;render();announce(grammar()?'À toi de compléter et de soigner le personnage suivant.':'Écoute les trois nouvelles douleurs.');});
 $('restart-care').addEventListener('click',restart);
 function setLevel(value){if(![1,2,3].includes(value)||value===level)return;level=value;restart();}
 for(const button of document.querySelectorAll('[data-care-level]'))button.addEventListener('click',()=>setLevel(Number(button.dataset.careLevel)));
 $('advance-care').addEventListener('click',()=>setLevel(level+1));
 return{show(){active=true;if(!state)restart();else{render();}},hide(){active=false;cancelDrag();stopClue();}};
}
