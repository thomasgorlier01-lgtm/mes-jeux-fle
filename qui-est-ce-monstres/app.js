import { CHARACTERS } from './data.js?v=4';
import { newGame, answer } from './logic.js?v=5';
const $ = id => document.getElementById(id);
let mode = 'class', state = null, locked = false, timer = null, player = null, audioToken = 0;
const cards = new Map();
function stopAudio() { audioToken++; if (player) { player.pause(); player.currentTime = 0; player = null; } if ('speechSynthesis' in window) speechSynthesis.cancel(); $('description').setAttribute('aria-busy', 'false'); }
function stopTransition() { clearTimeout(timer); timer = null; locked = false; stopAudio(); }
function message(text, type = '') { $('message').textContent = text; $('message').className = type; }
for (const c of CHARACTERS) {
  const button = document.createElement('button'); button.className = 'card'; button.type = 'button'; button.dataset.id = c.id;
  const ns='http://www.w3.org/2000/svg';
  const image = document.createElementNS(ns,'svg'); image.classList.add('portrait'); image.setAttribute('viewBox',c.crop.join(' ')); image.setAttribute('aria-hidden','true'); image.setAttribute('focusable','false');
  const clip=document.createElementNS(ns,'clipPath'); clip.id=`portrait-clip-${c.id}`; const rect=document.createElementNS(ns,'rect'); ['x','y','width','height'].forEach((key,i)=>rect.setAttribute(key,c.crop[i])); clip.append(rect); image.append(clip);
  const artwork=document.createElementNS(ns,'image'); artwork.setAttribute('clip-path',`url(#${clip.id})`); artwork.setAttribute('href','assets/monstres-reference.jpg?v=2'); artwork.setAttribute('width','1926'); artwork.setAttribute('height','1260'); image.append(artwork);
  const name = document.createElement('span'); name.className='name'; name.textContent=c.name;
  button.append(image, name); button.setAttribute('aria-label', `Retourner la carte ${c.name}`); button.setAttribute('aria-pressed','false');
  button.addEventListener('click', () => choose(c.id)); cards.set(c.id,button); $('grid').append(button);
}
function cleanCards() { cards.forEach((b,id) => { b.className='card'; b.disabled=false; b.setAttribute('aria-label', `${mode==='class'?'Retourner la carte':'Choisir'} ${CHARACTERS[id-1].name}`); if(mode==='class') b.setAttribute('aria-pressed','false'); else b.removeAttribute('aria-pressed'); }); $('remaining').textContent='24 cartes visibles'; }
function renderStats() { $('progress').textContent=`Question ${Math.min(state.round+1,10)}/10`; $('progress-bar').style.width=`${state.round*10}%`; $('hearts').innerHTML=Array.from({length:5},(_,i)=>`<span${i>=state.lives?' class="lost"':''}>♥</span>`).join(' '); $('hearts').setAttribute('aria-label',`${state.lives} ${state.lives===1?'vie':'vies'}`); }
function showRound() { cleanCards(); renderStats(); $('description-text').textContent=state.targets[state.round].description; $('description').disabled=false; $('audio-status').textContent='Touche la description pour l’écouter autant de fois que tu veux.'; }
function startSolo() { stopTransition(); state=newGame(CHARACTERS); showRound(); message('Observe bien les 24 monstres.'); }
function setMode(value) { stopTransition(); mode=value; $('class-mode').setAttribute('aria-pressed',String(mode==='class')); $('solo-mode').setAttribute('aria-pressed',String(mode==='solo')); $('class-panel').hidden=mode!=='class'; $('solo-panel').hidden=mode!=='solo'; $('note').textContent=mode==='class'?'24 personnages · Cartes réversibles':'10 descriptions · 5 vies · Sans chronomètre'; cleanCards(); if(mode==='solo') startSolo(); }
function choose(id) {
  const card=cards.get(id);
  if(mode==='class') { const turned=card.classList.toggle('turned'); card.setAttribute('aria-pressed',String(turned)); card.setAttribute('aria-label',`${turned?'Rétablir':'Retourner'} la carte ${CHARACTERS[id-1].name}`); $('remaining').textContent=`${[...cards.values()].filter(c=>!c.classList.contains('turned')).length} cartes visibles`; return; }
  if(locked || state.status!=='playing') return;
  const target=state.targets[state.round]; const result=answer(state,id); if(result==='ignored')return;
  if(result==='wrong') { card.classList.add('wrong'); card.disabled=true; renderStats(); message('Essaie encore. Écoute et observe les détails.', 'bad'); if(state.status==='lost') finish(target); return; }
  stopAudio(); locked=true; $('description').disabled=true; card.classList.add('correct'); cards.forEach(b=>b.disabled=true); renderStats(); message(`Bravo ! Tu as trouvé ${target.name}.`, 'ok');
  if(state.status==='won') { finish(target); return; }
  timer=setTimeout(()=>{locked=false;showRound();message('À toi de trouver le suivant !');},1100);
}
function finish(target) { stopTransition(); locked=true; cards.forEach(b=>b.disabled=true); if(state.status==='won') { $('progress').textContent='10/10 · Bravo !'; $('description-text').textContent='Tu as retrouvé les 10 monstres !'; message('🎉 Victoire ! Tu peux rejouer.', 'ok'); } else { cards.get(target.id).classList.add('answer'); $('description-text').textContent=`Le monstre à trouver était ${target.name}. ${target.description}`; message('Les cinq cœurs sont utilisés. Rejoue pour essayer à nouveau !','bad'); } $('description').disabled=state.status==='won'; $('audio-status').textContent=state.status==='won'?'Les dix descriptions sont résolues.':'La carte verte montre la réponse. Tu peux réécouter sa description.'; }
async function listen() {
  if(!state || state.status==='won') return; stopAudio(); const token=audioToken; const target=state.targets[state.round]; const audio=new Audio(`audio/${String(target.id).padStart(2,'0')}-audit-v4.m4a`); audio.playbackRate=.75; audio.preservesPitch=true; player=audio; $('description').setAttribute('aria-busy','true'); $('audio-status').textContent='Lecture en cours…';
  const ended=()=>{if(token!==audioToken)return; $('description').setAttribute('aria-busy','false');$('audio-status').textContent='Touche la description pour réécouter.';}; audio.onended=ended;
  const fallback=()=>{if(token!==audioToken)return;audio.onerror=null;audio.pause();if('speechSynthesis' in window){const u=new SpeechSynthesisUtterance(target.description);u.lang='fr-FR';u.rate=.75;u.voice=speechSynthesis.getVoices().find(v=>v.lang==='fr-FR')||null;u.onend=ended;u.onerror=()=>{$('audio-status').textContent='Lecture audio indisponible. Réessaie en touchant la description.';$('description').setAttribute('aria-busy','false');};speechSynthesis.speak(u);}else{$('audio-status').textContent='Lecture audio indisponible. Réessaie en touchant la description.';$('description').setAttribute('aria-busy','false');}};
  audio.onerror=fallback; try { await audio.play(); } catch { fallback(); }
}
$('class-mode').addEventListener('click',()=>setMode('class'));
$('solo-mode').addEventListener('click',()=>setMode('solo'));
$('reset').addEventListener('click',cleanCards);
$('restart').addEventListener('click',startSolo);
$('description').addEventListener('click',listen);
window.addEventListener('pagehide',stopTransition);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});
setMode('class');
