import {FOODS,UTENSILS,PEOPLE,key,sentence,matches,newOrders} from './logic.js?v=2';
const $=id=>document.getElementById(id);
let mode='home',series=0,selectedWord=null,solved=new Map(),round=0,orders=[],plates=[[],[],[],[]],locked=false,audioData={},playingButton=null;
let audioContext=null,audioSource=null,audioGeneration=0;
const audioBuffers=new Map();
const ready=fetch('assets/audio-v2.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(d=>audioData=d).catch(()=>message('L’audio n’a pas pu être chargé. Recharge la page pour réessayer.',false));
function stopAudio(){
 audioGeneration++;
 if(audioSource){audioSource.onended=null;try{audioSource.stop();}catch{}audioSource.disconnect();audioSource=null;}
 if(playingButton)playingButton.classList.remove('playing');playingButton=null;
}
async function speak(id,button){
 stopAudio();const generation=audioGeneration;
 try{
  // Unlock sound during the click, then decode the complete compact audio file.
  // Playing a buffer slice avoids imprecise media seeks and cannot read a neighbour.
  if(!audioContext)audioContext=new (window.AudioContext||window.webkitAudioContext)();
  const resumed=audioContext.resume();
  await ready;await resumed;if(generation!==audioGeneration)return;
  const entry=audioData[id];if(!entry)throw Error('Extrait absent');
  playingButton=button;button?.classList.add('playing');
  if(!audioBuffers.has(entry.file))audioBuffers.set(entry.file,fetch(entry.file).then(r=>{if(!r.ok)throw Error('Audio inaccessible');return r.arrayBuffer();}).then(bytes=>audioContext.decodeAudioData(bytes)).catch(e=>{audioBuffers.delete(entry.file);throw e;}));
  const buffer=await audioBuffers.get(entry.file);if(generation!==audioGeneration)return;
  const source=audioContext.createBufferSource();source.buffer=buffer;source.connect(audioContext.destination);audioSource=source;
  source.onended=()=>{if(audioSource===source){audioSource=null;source.disconnect();playingButton?.classList.remove('playing');playingButton=null;}};
  source.start(0,entry.start,Math.min(entry.end,buffer.duration)-entry.start);
 }catch{if(generation===audioGeneration){stopAudio();message('Impossible de lire ce son. Clique à nouveau sur 🔊 pour réessayer.',false);}}
}
function message(text,success){$('feedback').textContent=text;$('feedback').className=success===true?'success':success===false?'error':'';}
function rect(id,x,y,w,h){const b=document.createElement('button');b.type='button';b.className='target';b.dataset.id=id;b.style.cssText=`left:${x}%;top:${y}%;width:${w}%;height:${h}%`;b.setAttribute('aria-label',([...UTENSILS,...FOODS].find(v=>v.id===id)?.word||id));b.onclick=()=>answer(id,x,y-h/2-2);return b;}
function foodButtons(){const box=$('ingredients');box.replaceChildren();FOODS.forEach((food,i)=>{const b=document.createElement('button');b.className='food';b.dataset.id=food.id;b.style.cssText=`left:${31.5+i*12.2}%;top:85%;`;b.setAttribute('aria-label',food.word);b.innerHTML=`<img src="assets/${food.id}.webp" alt="">`;b.onclick=()=>{if(mode==='words')answer(food.id,31.5+i*12.2,96);else toggle(food.id);};box.append(b);});}
function initView(){stopAudio();$('home').hidden=true;$('play').hidden=false;$('labels').replaceChildren();$('targets').replaceChildren();$('fillings').replaceChildren();$('next').hidden=true;$('dialogue').hidden=mode!=='orders';$('words').hidden=mode!=='words';$('verify').hidden=mode!=='orders';$('clear').hidden=mode!=='orders';$('speaker').hidden=mode!=='orders';document.body.classList.toggle('command-mode',mode==='orders');message('');foodButtons();}
function startWords(){mode='words';series=0;solved=new Map();selectedWord=null;plates=[[],[],[],[]];initView();renderSeries();}
function renderSeries(){stopAudio();selectedWord=null;solved=new Map();$('labels').replaceChildren();$('targets').replaceChildren();$('next').hidden=true;$('words').replaceChildren();const list=series?FOODS:UTENSILS;
 list.forEach(w=>{const b=document.createElement('button');b.className='word';b.dataset.id=w.id;b.innerHTML=`<span aria-hidden="true">🔊</span><span>${w.word}</span><span class="state"></span>`;b.onclick=()=>{speak('word-'+w.id,b);if(solved.has(w.id))return;selectedWord=w.id;document.querySelectorAll('.word').forEach(x=>x.classList.toggle('selected',x===b));message('Clique maintenant sur l’image correspondante.');};$('words').append(b);});
 $('progress').textContent=series?'Les aliments · 0 / 6':'Les objets de table · 0 / 5';$('instruction').textContent='Clique sur un mot pour l’entendre, puis retrouve-le sur la nappe.';message('Choisis un mot à écouter.');
 if(!series){[['fourchette',9.4,85.7,5,20],['couteau',13.1,85.7,4.3,20],['cuillere',17.8,85.7,5,20]].forEach(args=>$('targets').append(rect(...args)));[7.1,30.3,53.1,76.2].forEach(x=>$('targets').append(rect('verre',x,61.8,5.6,13)));PEOPLE.forEach(p=>$('targets').append(rect('assiette',p.x,62.6,19.5,14)));}
 // Foods stay visible in both series, with the same scene throughout.
 document.querySelectorAll('.food').forEach(b=>{b.disabled=!series;b.classList.remove('chosen');});
}
function answer(id,x,y){if(mode!=='words'||!selectedWord)return;if(selectedWord!==id){message('Essaie encore : écoute le mot et regarde bien l’image.',false);return;}const w=[...UTENSILS,...FOODS].find(x=>x.id===id);solved.set(id,true);const label=document.createElement('span');label.className='label';label.textContent=w.word;const slot=labelSlot(id,x,y);label.dataset.x=slot.x;label.dataset.y=slot.y;label.style.cssText=`left:${slot.x}%;top:${slot.y}%`;$('labels').append(label);layoutLabels();const b=$('words').querySelector(`[data-id="${id}"]`);b.classList.remove('selected');b.classList.add('solved');b.querySelector('.state').textContent='✓';selectedWord=null;message('Oui, c’est bien « '+w.word+' » !',true);const total=series?6:5;$('progress').textContent=(series?'Les aliments':'Les objets de table')+` · ${solved.size} / ${total}`;if(solved.size===total){$('next').hidden=false;$('next').textContent=series?'Préparer les sandwichs →':'Découvrir les aliments →';message(series?'Bravo, tu as retrouvé tous les aliments !':'Bravo, tu as retrouvé tous les objets de table !',true);}}
function startOrders(){mode='orders';round=0;orders=newOrders();plates=[[],[],[],[]];locked=false;initView();renderOrder();}
function renderOrder(){stopAudio();locked=false;$('next').hidden=true;$('verify').hidden=false;$('verify').disabled=false;$('clear').hidden=false;$('clear').disabled=false;const p=PEOPLE[round];$('progress').textContent=`${p.name} · Sandwich ${round+1} / 4`;$('commandText').textContent=sentence(orders[round]);$('command').setAttribute('aria-label','Écouter : '+sentence(orders[round]));requestAnimationFrame(updateTail);$('speaker').style.cssText=`left:${p.x}%;top:62.2%;`;$('instruction').textContent='Clique sur les aliments pour les ajouter. Clique à nouveau pour les enlever.';message('Écoute la commande, puis prépare le sandwich.');renderPlates();}
function toggle(id){if(locked)return;const arr=plates[round],index=arr.indexOf(id);if(index>=0)arr.splice(index,1);else if(arr.length<4)arr.push(id);else{message('Tu peux mettre quatre ingrédients au maximum. Clique sur un ingrédient pour l’enlever.',false);return;}message('Tu peux réécouter la commande avant de vérifier.');renderPlates();}
function renderPlates(){$('fillings').replaceChildren();plates.forEach((ids,person)=>{const sorted=FOODS.filter(f=>ids.includes(f.id));sorted.forEach((f,i)=>{const im=document.createElement('img');im.className='filling';im.src=`assets/garniture-${f.id}.webp`;im.alt='';// Offset each filling so every requested ingredient remains visible.
 im.style.cssText=`left:${PEOPLE[person].bread+(i%2)*4.8-1.3}%;top:${59.7+Math.floor(i/2)*4.3}%;`;im.dataset.food=f.id;im.dataset.person=person;$('fillings').append(im);});});document.querySelectorAll('.food').forEach(b=>{b.classList.toggle('chosen',plates[round].includes(b.dataset.id));b.setAttribute('aria-pressed',String(plates[round].includes(b.dataset.id)));b.disabled=locked;});}
$('discover').onclick=startWords;$('sandwich').onclick=startOrders;
$('back').onclick=()=>{stopAudio();mode='home';$('play').hidden=true;$('home').hidden=false;document.body.classList.remove('command-mode');};
$('question').onclick=()=>speak('question',$('question'));$('command').onclick=()=>speak(PEOPLE[round].voice+':'+key(orders[round]),$('command'));
$('clear').onclick=()=>{if(!locked){plates[round]=[];renderPlates();message('Le sandwich est vide. Tu peux recommencer.');}};
$('verify').onclick=()=>{if(matches(plates[round],orders[round])){locked=true;stopAudio();renderPlates();$('verify').hidden=true;$('clear').disabled=true;$('next').hidden=false;$('next').textContent=round===3?'Rejouer avec d’autres commandes ↻':'Le sandwich suivant →';message(round===3?'Bravo ! Toute la famille a le bon sandwich.':'Bravo, le sandwich correspond à la commande !',true);}else message('Ce n’est pas encore le bon sandwich. Réécoute : il manque un ingrédient ou il y en a un en trop.',false);};
$('next').onclick=()=>{if(mode==='words'){if(!series){series=1;renderSeries();}else startOrders();}else if(round===3)startOrders();else{round++;renderOrder();}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});

function updateTail(){if(mode!=='orders')return;const a=$('scene').getBoundingClientRect(),b=$('command').getBoundingClientRect();$('command').style.setProperty('--tail',Math.max(22,Math.min(b.width-30,a.left+a.width*PEOPLE[round].x/100-b.left))+'px');}
new ResizeObserver(updateTail).observe($('scene'));

// Reserved positions separate the utensil labels; repeated plates/glasses keep
// the label next to the object the pupil actually clicked.
function labelSlot(id,x,y){
 const fixed={fourchette:{x:6,y:76},couteau:{x:13,y:96},cuillere:{x:23,y:76}};
 if(fixed[id])return fixed[id];
 if(id==='verre')return {x,y:50};
 if(id==='assiette')return {x,y:71};
 return {x,y:96};
}
function layoutLabels(){
 const scene=$('scene').getBoundingClientRect();if(!scene.width)return;
 const placed=[];
 for(const label of $('labels').children){
  let x=Number(label.dataset.x)*scene.width/100,y=Number(label.dataset.y)*scene.height/100;
  const width=label.offsetWidth,height=label.offsetHeight;
  x=Math.max(width/2+4,Math.min(scene.width-width/2-4,x));
  y=Math.max(height/2+3,Math.min(scene.height-height/2-3,y));
  let box;
  for(let attempt=0;attempt<12;attempt++){
   box={left:x-width/2,right:x+width/2,top:y-height/2,bottom:y+height/2};
   const hit=placed.find(p=>box.left<p.right+4&&box.right>p.left-4&&box.top<p.bottom+4&&box.bottom>p.top-4);
   if(!hit)break;
   y=hit.top-height/2-5;
   if(y<height/2+3){y=hit.bottom+height/2+5;x=Math.min(scene.width-width/2-4,hit.right+width/2+5);}
  }
  label.style.left=x/scene.width*100+'%';label.style.top=y/scene.height*100+'%';placed.push(box);
 }
}
new ResizeObserver(layoutLabels).observe($('scene'));
