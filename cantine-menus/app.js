import {FOODS,GROUPS,foodById} from './data.js?v=1';
import {emptyTray,choose,describe,audioKeys,matches,newMenus} from './logic.js?v=1';
import {SpeechPlayer} from './audio.js?v=1';
const $=id=>document.getElementById(id);
const speech=new SpeechPlayer(text=>message(text,false));
const buttons=new Map();let menus=[],round=0,selection=emptyTray(),locked=false,playing=false;
const avatar=()=>round%2?'fille':'garcon';
function message(text,success){$('feedback').textContent=text;$('feedback').className=success===true?'success':success===false?'error':'';}
function buildMenu(){
 buttons.clear();$('menu').replaceChildren();
 for(const [group,title] of [['plat','Le plat'],['dessert','Le dessert'],['boisson','Pour boire']]){
  const section=document.createElement('section');section.className='food-group';section.dataset.group=group;const h=document.createElement('h3');h.textContent=title;section.append(h);const grid=document.createElement('div');grid.className='food-grid';
  FOODS.filter(f=>group==='plat'?['proteine','feculent','legume'].includes(f.group):f.group===group).forEach(f=>{const b=document.createElement('button');b.className='food-choice';b.type='button';b.dataset.id=f.id;b.dataset.group=f.group;b.setAttribute('aria-label',f.phrase);b.setAttribute('aria-pressed','false');const img=document.createElement('img');img.src=`assets/${f.id}.webp`;img.alt='';img.draggable=false;b.append(img);b.onclick=()=>pick(f.id);grid.append(b);buttons.set(f.id,b);});section.append(grid);$('menu').append(section);
 }
}
function startGame(){speech.stop();menus=newMenus();round=0;playing=true;$('home').hidden=true;$('play').hidden=false;buildMenu();renderRound();}
function renderRound(){
 speech.stop();selection=emptyTray();locked=false;$('next').hidden=true;$('verify').hidden=false;$('progress').textContent=`Plateau ${round+1} / 10`;
 const child=avatar();$('character-title').textContent=child==='garcon'?'Le garçon commande':'La fille commande';$('character').src=`assets/${child}-plateau.webp`;$('character').alt=child==='garcon'?'Le garçon tient son plateau.':'La fille tient son plateau.';$('scene').dataset.avatar=child;
 const sentences=describe(menus[round]);$('commandText').replaceChildren(...sentences.map(text=>{const span=document.createElement('span');span.textContent=text;return span;}));$('command').setAttribute('aria-label','Écouter : '+sentences.join(' '));$('listen-child').setAttribute('aria-label',child==='garcon'?'Écouter la commande du garçon':'Écouter la commande de la fille');
 renderSelection();message('Écoute la commande, puis choisis les cinq éléments du plateau.');
}
function pick(id,fromTray=false){if(!playing||locked)return;selection=choose(selection,id);renderSelection();message('Tu peux réécouter la commande avant de vérifier.');if(fromTray)buttons.get(id)?.focus({preventScroll:true});}
function renderSelection(){
 for(const zone of ['plate-foods','dessert-zone','drink-zone'])$(zone).replaceChildren();
 for(const group of GROUPS){const id=selection[group];if(!id)continue;const food=foodById(id),button=document.createElement('button');button.type='button';button.className='tray-item';button.dataset.id=id;button.dataset.group=group;button.setAttribute('aria-label','Retirer '+food.phrase);button.disabled=locked;const img=document.createElement('img');img.src=`assets/${id}.webp`;img.alt='';button.append(img);button.onclick=()=>pick(id,true);$(group==='dessert'?'dessert-zone':group==='boisson'?'drink-zone':'plate-foods').append(button);}
 const count=Object.values(selection).filter(Boolean).length;$('tray-count').textContent=`${count} / 5 éléments`;$('clear').disabled=locked||count===0;
 for(const [id,b]of buttons){b.setAttribute('aria-pressed',String(selection[foodById(id).group]===id));b.disabled=locked;}
}
function listen(){if(playing)speech.play(audioKeys(menus[round],avatar()),$('command'));}
$('start').onclick=startGame;$('command').onclick=listen;$('listen-child').onclick=listen;
$('back').onclick=()=>{speech.stop();playing=false;$('play').hidden=true;$('home').hidden=false;};
$('clear').onclick=()=>{if(!locked){selection=emptyTray();renderSelection();message('Le plateau est vide. Tu peux recommencer.');}};
$('verify').onclick=()=>{if(matches(selection,menus[round])){locked=true;speech.stop();renderSelection();$('verify').hidden=true;$('next').hidden=false;$('next').textContent=round===9?'Rejouer avec d’autres menus ↻':'Le plateau suivant →';message(round===9?'Bravo ! Les dix plateaux sont prêts.':'Bravo ! Le plateau correspond à la commande.',true);}else message(Object.values(selection).some(x=>!x)?'Le plateau n’est pas encore complet. Réécoute et ajoute les éléments manquants.':'Pas encore. Réécoute la commande et corrige les aliments du plateau.',false);};
$('next').onclick=()=>{if(round===9)startGame();else{round++;renderRound();}};
document.addEventListener('visibilitychange',()=>{if(document.hidden)speech.stop();});
