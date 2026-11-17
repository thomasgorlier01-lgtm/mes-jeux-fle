import audioData from './audio-data.js?v=4';
import {sentence} from './infirmary-logic.js?v=4';
let player=null,token=0,stopTimer=null,activeButton=null;
export function stopClue(){token++;clearTimeout(stopTimer);if(player){player.pause();player.onended=null;player.onerror=null;player=null;}window.speechSynthesis?.cancel();if(activeButton){activeButton.setAttribute('aria-busy','false');activeButton.classList.remove('speaking');activeButton=null;}}
export async function listen(pronoun,pain,button){
 stopClue();const ownToken=token,record=audioData[`${pronoun.toLowerCase()}-${pain}`];if(!record)return;
 activeButton=button;button?.setAttribute('aria-busy','true');button?.classList.add('speaking');
 const done=()=>{if(ownToken===token)stopClue();};
 let fallbackStarted=false;
 const fallback=()=>{if(ownToken!==token||fallbackStarted)return;fallbackStarted=true;player?.pause();if(!window.speechSynthesis){button.title='Audio indisponible. Réessaie.';done();return;}const voice=new SpeechSynthesisUtterance(record.text);voice.lang='fr-FR';voice.rate=.85;voice.onend=done;voice.onerror=done;window.speechSynthesis.speak(voice);};
 const audio=new Audio(new URL(record.file,import.meta.url));player=audio;audio.currentTime=record.start;
 audio.onloadedmetadata=()=>{if(ownToken===token&&Math.abs(audio.currentTime-record.start)>.15)audio.currentTime=record.start;};
 audio.ontimeupdate=()=>{if(ownToken===token&&audio.currentTime>=record.end)done();};audio.onended=done;audio.onerror=fallback;
 audio.onplaying=()=>{if(ownToken===token){clearTimeout(stopTimer);stopTimer=setTimeout(done,Math.max(80,(record.end-audio.currentTime)*1000));}};
 try{await audio.play();}catch{if(ownToken===token)fallback();}
}
export function renderClues(container,pronoun,pains){
 container.replaceChildren();for(const pain of pains){const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.className='clue';button.dataset.pain=pain;button.setAttribute('aria-label','Écouter : '+sentence(pronoun,pain));const icon=document.createElement('span');icon.textContent='🔊';icon.setAttribute('aria-hidden','true');const words=document.createElement('span');words.textContent=sentence(pronoun,pain);button.append(icon,words);button.addEventListener('click',()=>listen(pronoun,pain,button));li.append(button);container.append(li);}}
window.addEventListener('pagehide',stopClue);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopClue();});
