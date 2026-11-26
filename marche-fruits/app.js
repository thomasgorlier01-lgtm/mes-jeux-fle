import {marketBasketLayout,mountMarketBasketZoom} from '../market-basket.js?v=1';
import {shuffleVocabulary} from '../word-order.js?v=1';
import {FRUITS,fruitById,limit,orderItems,orderText,orderAudio,matches,adjust,newOrders} from './logic.js?v=1';
import {SpeechPlayer} from './audio.js?v=1';
const $=id=>document.getElementById(id);
const speech=new SpeechPlayer(text=>message(text,false));
const CRATE_X=[35.7,49.3,63.1,76.8,90.7];
let mode='home',series=0,selectedWord=null,solved=new Set(),allLabels=new Set(),basket={},round=0,orders=[],locked=false;
const basketUnits=()=>orderItems(basket).flatMap(({id,count})=>Array.from({length:count},()=>({id,image:`assets/${id}.webp`})));
const basketZoom=mountMarketBasketZoom({host:document.querySelector('.topline'),image:document.querySelector('#scene .background').getAttribute('src'),getItems:basketUnits});
function message(text,success){$('feedback').textContent=text;$('feedback').className=success===true?'success':success===false?'error':'';}
function showPlay(nextMode){speech.stop();mode=nextMode;$('home').hidden=true;$('play').hidden=false;$('words').hidden=mode!=='words';$('dialogue').hidden=mode!=='orders';$('cart').hidden=mode!=='orders';$('verify').hidden=mode!=='orders';$('next').hidden=true;document.body.classList.toggle('command-mode',mode==='orders');message('');renderTargets();renderBasket();renderLabels();}
function renderTargets(){
 $('targets').replaceChildren();FRUITS.forEach((f,i)=>{const b=document.createElement('button');b.className='crate';b.dataset.id=f.id;b.type='button';b.style.cssText=`left:${CRATE_X[i%5]}%;top:${i<5?39.2:65.7}%;width:12.7%;height:20%;`;b.setAttribute('aria-label',f.word);b.onclick=()=>mode==='words'?answer(f.id):changeQuantity(f.id,1);$('targets').append(b);});
}
function startWords(){series=0;solved=new Set();allLabels=new Set();basket={};selectedWord=null;showPlay('words');renderSeries();}
function renderSeries(){
 speech.stop();selectedWord=null;solved=new Set();$('words').replaceChildren();$('next').hidden=true;
 shuffleVocabulary(FRUITS.slice(series*5,series*5+5)).forEach(f=>{const b=document.createElement('button');b.className='word';b.dataset.id=f.id;b.innerHTML=`<span aria-hidden="true">🔊</span><span>${f.word}</span><span class="state"></span>`;b.onclick=()=>{speech.play(['word-'+f.id],b);if(solved.has(f.id))return;selectedWord=f.id;document.querySelectorAll('.word').forEach(x=>x.classList.toggle('selected',x===b));message('Clique sur le fruit correspondant dans l’étal.');};$('words').append(b);});
 $('progress').textContent=`Série ${series+1} / 2 · 0 / 5`;$('instruction').textContent='Clique sur un mot pour l’entendre, puis retrouve le fruit dans sa cagette.';message('Choisis un mot à écouter.');renderLabels();
}
function answer(id){
 if(!selectedWord)return;if(selectedWord!==id){message('Essaie encore. Réécoute le mot, puis regarde les fruits.',false);return;}
 solved.add(id);allLabels.add(id);const b=$('words').querySelector(`[data-id="${id}"]`);b.classList.remove('selected');b.classList.add('solved');b.querySelector('.state').textContent='✓';selectedWord=null;renderLabels();$('progress').textContent=`Série ${series+1} / 2 · ${solved.size} / 5`;message('Oui, c’est bien « '+fruitById(id).word+' » !',true);
 if(solved.size===5){$('next').hidden=false;$('next').textContent=series?'Faire les courses →':'Découvrir les cinq autres fruits →';message(series?'Bravo ! Tu as retrouvé les dix fruits.':'Bravo ! Tu as retrouvé les cinq premiers fruits.',true);}
}
function renderLabels(){
 $('labels').replaceChildren();if(mode!=='words')return;
 FRUITS.forEach((f,i)=>{if(!allLabels.has(f.id))return;const label=document.createElement('span');label.className='label market-label';label.textContent=f.word;label.dataset.id=f.id;label.style.cssText=`left:${CRATE_X[i%5]}%;top:${i<5?51.7:79.1}%;`;$('labels').append(label);});
}
function startOrders(){orders=newOrders();round=0;basket={};locked=false;showPlay('orders');renderOrder();}
function renderOrder(){
 speech.stop();basket={};locked=false;$('next').hidden=true;$('verify').hidden=false;$('verify').disabled=false;$('clear').disabled=false;$('progress').textContent=`Commande ${round+1} / 10`;$('commandText').textContent=orderText(orders[round]);$('command').setAttribute('aria-label','Écouter : '+orderText(orders[round]));$('instruction').textContent='Clique sur les fruits pour les ajouter. Utilise + et − pour corriger les quantités.';message('Écoute la commande et prépare le panier.');renderBasket();requestAnimationFrame(updateTail);
}
function changeQuantity(id,delta,restoreFocus=false){
 if(locked)return;const next=adjust(basket,id,delta);
 if(!next){message('Il y a déjà quatre fruits différents. Retire un fruit avec − pour le remplacer.',false);return;}
 if((next[id]||0)===(basket[id]||0)){message(fruitById(id).portion?'Cette portion est déjà dans le panier. Utilise − pour la retirer.':'Tu peux prendre un, deux ou trois fruits de ce type.',false);return;}
 basket=next;renderBasket();message('Tu peux réécouter la commande avant de vérifier.');
 if(restoreFocus){let target=$('cart-items').querySelector(`[data-id="${id}"] [data-delta="${delta}"]`);if(!target||target.disabled)target=$('cart-items').querySelector(`[data-id="${id}"] [data-delta="-1"]`)||$('targets').querySelector(`[data-id="${id}"]`);target?.focus({preventScroll:true});}
}
function renderBasket(){
 const items=orderItems(basket);$('basket-fruits').replaceChildren();$('cart-items').replaceChildren();$('empty').hidden=items.length>0;$('clear').disabled=locked||items.length===0;
 const slots=marketBasketLayout(basketUnits().length);let unitIndex=0;
 items.forEach(({id,count})=>{
  for(let n=0;n<count;n++){const img=document.createElement('img');img.className='basket-fruit';img.src=`assets/${id}.webp`;img.alt='';img.dataset.id=id;const spot=slots[unitIndex++];img.style.cssText=`left:${spot.x}%;top:${spot.y}%;width:${spot.w}%;height:${spot.h}%;z-index:4;`;$('basket-fruits').append(img);}
  const f=fruitById(id),row=document.createElement('div');row.className='cart-item';row.dataset.id=id;const img=document.createElement('img');img.src=`assets/${id}.webp`;img.alt=f.word;row.append(img);const controls=document.createElement('div');controls.className='quantity';
  const minus=document.createElement('button');minus.textContent='−';minus.dataset.delta='-1';minus.setAttribute('aria-label','Retirer : '+f.word);minus.disabled=locked;minus.onclick=()=>changeQuantity(id,-1,true);
  const output=document.createElement('output');output.textContent=f.portion?'✓':String(count);output.setAttribute('aria-label',f.portion?'Une portion : '+f.word:`${count} : ${f.word}`);
  const plus=document.createElement('button');plus.textContent='+';plus.dataset.delta='1';plus.setAttribute('aria-label','Ajouter : '+f.word);plus.disabled=locked||count>=limit(id);plus.onclick=()=>changeQuantity(id,1,true);controls.append(minus,output,plus);row.append(controls);$('cart-items').append(row);
 });
 basketZoom.button.hidden=mode!=='orders';basketZoom.refresh();
 document.querySelectorAll('.crate').forEach(b=>{b.classList.toggle('chosen',mode==='orders'&&!!basket[b.dataset.id]);b.disabled=mode==='orders'&&locked;if(mode==='orders')b.setAttribute('aria-pressed',String(!!basket[b.dataset.id]));else b.removeAttribute('aria-pressed');});
}
function updateTail(){if(mode!=='orders')return;const scene=$('scene').getBoundingClientRect(),bubble=$('command').getBoundingClientRect();$('command').style.setProperty('--tail',Math.max(20,Math.min(bubble.width-30,scene.left+scene.width*.15-bubble.left))+'px');}
$('discover').onclick=startWords;$('shopping').onclick=startOrders;
$('back').onclick=()=>{speech.stop();mode='home';$('play').hidden=true;$('home').hidden=false;document.body.classList.remove('command-mode');};
$('command').onclick=()=>speech.play(orderAudio(orders[round]),$('command'));
$('clear').onclick=()=>{if(!locked){basket={};renderBasket();message('Le panier est vide. Tu peux recommencer.');}};
$('verify').onclick=()=>{if(matches(basket,orders[round])){locked=true;speech.stop();renderBasket();$('verify').hidden=true;$('next').hidden=false;$('next').textContent=round===9?'Rejouer avec d’autres commandes ↻':'La commande suivante →';message(round===9?'Bravo ! Les dix paniers sont corrects.':'Bravo ! Les fruits et les quantités sont corrects.',true);}else message('Ce n’est pas encore le bon panier. Réécoute et vérifie les fruits et les quantités.',false);};
$('next').onclick=()=>{if(mode==='words'){if(series===0){series=1;renderSeries();}else startOrders();}else if(round===9)startOrders();else{round++;renderOrder();}};
new ResizeObserver(updateTail).observe($('scene'));document.addEventListener('visibilitychange',()=>{if(document.hidden)speech.stop();});
