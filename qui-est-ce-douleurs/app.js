import {createInfirmary} from './infirmary.js?v=6';
import {renderClues,stopClue} from './sound.js?v=5';
import characters from './data.js?v=3';
import {startGame,chooseCharacter,nextRound} from './logic.js?v=4';
const $=id=>document.getElementById(id),grid=$('grid');let state,timer=null,mode=null;
const eliminated=new Set();
const infirmary=createInfirmary();
const painSlug=p=>({tête:"tete",œil:"oeil"}[p]||p);
for(const c of characters){const button=document.createElement('button');button.className='personnage';button.type='button';button.dataset.id=c.id;button.setAttribute('aria-label','Personnage '+c.id);const image=new Image();image.src=c.image+'?v=3';image.alt='';image.decoding='async';image.draggable=false;const back=document.createElement('span');back.className='card-back';back.textContent=c.id;back.setAttribute('aria-hidden','true');button.append(image,back);button.addEventListener('click',()=>choose(c.id));grid.append(button);}
function render(){const ended=['lost','finished'].includes(state.phase);$('progress').textContent=ended?'Partie terminée':`Question ${state.round+1}/10`;$('score').textContent=`⭐ ${state.score} point${state.score>1?'s':''}`;$('hearts').replaceChildren();for(let i=0;i<5;i++){const heart=document.createElement('span');heart.className='heart'+(i>=state.lives?' lost':'');heart.textContent='♥';heart.style.color='#ca6073';heart.setAttribute('aria-hidden','true');$('hearts').append(heart);}$('hearts').setAttribute('aria-label',`${state.lives} vie${state.lives===1?'':'s'}`);if(state.phase==='finished'){$('description').textContent='Bravo, tu as terminé les dix descriptions !';}else{const round=state.rounds[state.round],character=characters.find(c=>c.id===round.id);renderClues($('description'),character.pronoun,round.pains.map(painSlug));}$('hint').textContent=ended?`Ton score : ${state.score}/10. Rejoue pour découvrir d’autres descriptions.`:'Observe les pansements et les bandages.';
for(const button of grid.children){const id=Number(button.dataset.id),wrong=state.wrongIds.includes(id),correct=state.phase==='correct'&&id===state.rounds[state.round].id,answer=state.phase==='lost'&&id===state.rounds[state.round].id;button.className='personnage'+(wrong?' wrong':'')+(correct?' correct':'')+(answer?' answer':'');button.disabled=state.phase!=='playing'||wrong;button.querySelector('.marker')?.remove();if(wrong||correct||answer){const marker=document.createElement('span');marker.className='marker'+(wrong?' wrong-marker':'');marker.textContent=wrong?'×':'✓';marker.setAttribute('aria-hidden','true');button.append(marker);}}
const msg=$('message');msg.className='message';if(state.phase==='correct'){msg.textContent='Bravo ! +1 point';msg.classList.add('ok');}else if(state.phase==='lost'){msg.textContent=`Tu as perdu tes cinq cœurs. C’était le personnage n° ${state.rounds[state.round].id}.`;msg.classList.add('bad');}else if(state.phase==='finished'){msg.textContent='Une nouvelle partie t’attend !';msg.classList.add('ok');}else if(state.lastChoice!==null){msg.textContent='Essaie encore : tu perds un cœur.';msg.classList.add('bad');}else msg.textContent='';}
function choose(id){if(mode==='class'){eliminated.has(id)?eliminated.delete(id):eliminated.add(id);renderClass();return;}stopClue();const previous=state;state=chooseCharacter(state,id);if(previous===state)return;render();if(state.phase==='correct')timer=setTimeout(()=>{state=nextRound(state);render();},900);}
function start(){clearTimeout(timer);timer=null;state=startGame(characters);render();}
function renderClass(){
 for(const button of grid.children){const id=Number(button.dataset.id),turned=eliminated.has(id);button.className='personnage'+(turned?' turned':'');button.disabled=false;button.setAttribute('aria-pressed',String(turned));button.setAttribute('aria-label',`${turned?'Rétablir':'Retourner'} la carte du personnage n° ${id}`);button.querySelector('.marker')?.remove();}
 const count=characters.length-eliminated.size;$('remaining').textContent=`${count} carte${count===1?'':'s'} visible${count===1?'':'s'}`;
}
function setMode(value){
 if(mode===value)return;clearTimeout(timer);timer=null;stopClue();infirmary.hide();mode=value;document.body.classList.toggle('class-view',mode==='class');
 $('class-mode').setAttribute('aria-pressed',String(mode!=='solo'));$('solo-mode').setAttribute('aria-pressed',String(mode==='solo'));
 $('class-tools').hidden=mode!=='class';$('solo-panel').hidden=mode!=='solo';$('solo-stats').hidden=mode!=='solo';
 $('portrait-game').hidden=!['class','solo'].includes(mode);$('class-menu').hidden=mode!=='menu';$('infirmary').hidden=mode!=='infirmary';
 const instructions={menu:'Choisissez une activité pour jouer ensemble.',class:'Choisissez un personnage en secret, posez vos questions et retournez les cartes éliminées.',infirmary:'Écoute les trois douleurs, place les soins puis vérifie.',solo:'Lis ou écoute les douleurs, puis clique sur le bon personnage.'};
 $('instructions').textContent=instructions[mode];
 const notes={menu:'Deux activités en classe : poser des questions ou soigner un personnage.',class:'15 personnages · Un clic pour retourner, un autre pour rétablir · À la fin, décrivez le personnage trouvé.',infirmary:'10 personnages · 3 douleurs par personnage · 3 cœurs pour toute la partie',solo:'10 descriptions par partie · 1 point par bonne réponse · 5 cœurs pour toute la partie'};
 $('note').textContent=notes[mode];
 if(mode==='class'){eliminated.clear();renderClass();}else if(mode==='solo'){for(const b of grid.children){b.removeAttribute('aria-pressed');b.setAttribute('aria-label','Personnage '+b.dataset.id);}start();}else if(mode==='infirmary')infirmary.show();
}
$('class-mode').addEventListener('click',()=>setMode('menu'));
$('choose-cards').addEventListener('click',()=>setMode('class'));
$('choose-infirmary').addEventListener('click',()=>setMode('infirmary'));
$('solo-mode').addEventListener('click',()=>setMode('solo'));
$('reset').addEventListener('click',()=>{eliminated.clear();renderClass();});
$('restart').addEventListener('click',()=>{stopClue();start();});
window.addEventListener('pagehide',()=>clearTimeout(timer));
setMode('menu');
