import characters from './data.js?v=3';
import {startGame,chooseCharacter,nextRound} from './logic.js?v=3';
const $=id=>document.getElementById(id),grid=$('grid');let state,timer=null,mode=null;
const eliminated=new Set();
for(const c of characters){const button=document.createElement('button');button.className='personnage';button.type='button';button.dataset.id=c.id;button.setAttribute('aria-label','Personnage '+c.id);const image=new Image();image.src=c.image+'?v=3';image.alt='';image.decoding='async';image.draggable=false;const back=document.createElement('span');back.className='card-back';back.textContent=c.id;back.setAttribute('aria-hidden','true');button.append(image,back);button.addEventListener('click',()=>choose(c.id));grid.append(button);}
function render(){const ended=['lost','finished'].includes(state.phase);$('progress').textContent=ended?'Partie terminée':`Question ${state.round+1}/10`;$('score').textContent=`⭐ ${state.score} point${state.score>1?'s':''}`;$('hearts').replaceChildren();for(let i=0;i<5;i++){const heart=document.createElement('span');heart.className='heart'+(i>=state.lives?' lost':'');heart.textContent='♥';heart.style.color='#ca6073';heart.setAttribute('aria-hidden','true');$('hearts').append(heart);}$('hearts').setAttribute('aria-label',`${state.lives} vie${state.lives===1?'':'s'}`);$('description').textContent=state.phase==='finished'?'Bravo, tu as terminé les dix descriptions !':state.rounds[state.round].description;$('hint').textContent=ended?`Ton score : ${state.score}/10. Rejoue pour découvrir d’autres descriptions.`:'Observe les pansements et les bandages.';
for(const button of grid.children){const id=Number(button.dataset.id),wrong=state.wrongIds.includes(id),correct=state.phase==='correct'&&id===state.rounds[state.round].id,answer=state.phase==='lost'&&id===state.rounds[state.round].id;button.className='personnage'+(wrong?' wrong':'')+(correct?' correct':'')+(answer?' answer':'');button.disabled=state.phase!=='playing'||wrong;button.querySelector('.marker')?.remove();if(wrong||correct||answer){const marker=document.createElement('span');marker.className='marker'+(wrong?' wrong-marker':'');marker.textContent=wrong?'×':'✓';marker.setAttribute('aria-hidden','true');button.append(marker);}}
const msg=$('message');msg.className='message';if(state.phase==='correct'){msg.textContent='Bravo ! +1 point';msg.classList.add('ok');}else if(state.phase==='lost'){msg.textContent=`Tu as perdu tes cinq cœurs. C’était le personnage n° ${state.rounds[state.round].id}.`;msg.classList.add('bad');}else if(state.phase==='finished'){msg.textContent='Une nouvelle partie t’attend !';msg.classList.add('ok');}else if(state.lastChoice!==null){msg.textContent='Essaie encore : tu perds un cœur.';msg.classList.add('bad');}else msg.textContent='';}
function choose(id){if(mode==='class'){eliminated.has(id)?eliminated.delete(id):eliminated.add(id);renderClass();return;}const previous=state;state=chooseCharacter(state,id);if(previous===state)return;render();if(state.phase==='correct')timer=setTimeout(()=>{state=nextRound(state);render();},900);}
function start(){clearTimeout(timer);timer=null;state=startGame(characters);render();}
function renderClass(){
 for(const button of grid.children){const id=Number(button.dataset.id),turned=eliminated.has(id);button.className='personnage'+(turned?' turned':'');button.disabled=false;button.setAttribute('aria-pressed',String(turned));button.setAttribute('aria-label',`${turned?'Rétablir':'Retourner'} la carte du personnage n° ${id}`);button.querySelector('.marker')?.remove();}
 const count=characters.length-eliminated.size;$('remaining').textContent=`${count} carte${count===1?'':'s'} visible${count===1?'':'s'}`;
}
function setMode(value){
 if(mode===value)return;clearTimeout(timer);timer=null;mode=value;document.body.classList.toggle('class-view',mode==='class');
 $('class-mode').setAttribute('aria-pressed',String(mode==='class'));$('solo-mode').setAttribute('aria-pressed',String(mode==='solo'));
 $('class-tools').hidden=mode!=='class';$('solo-panel').hidden=mode!=='solo';$('solo-stats').hidden=mode!=='solo';
 $('instructions').textContent=mode==='class'?'Choisissez un personnage en secret, posez vos questions et retournez les cartes éliminées.':'Lis la description, puis clique sur le bon personnage.';
 $('note').textContent=mode==='class'?'15 personnages · Un clic pour retourner, un autre pour rétablir · À la fin, décrivez le personnage trouvé.':'10 descriptions par partie · 1 point par bonne réponse · 5 cœurs pour toute la partie';
 if(mode==='class'){eliminated.clear();renderClass();}else{for(const b of grid.children){b.removeAttribute('aria-pressed');b.setAttribute('aria-label','Personnage '+b.dataset.id);}start();}
}
$('class-mode').addEventListener('click',()=>setMode('class'));
$('solo-mode').addEventListener('click',()=>setMode('solo'));
$('reset').addEventListener('click',()=>{eliminated.clear();renderClass();});
$('restart').addEventListener('click',start);
window.addEventListener('pagehide',()=>clearTimeout(timer));
setMode('class');
