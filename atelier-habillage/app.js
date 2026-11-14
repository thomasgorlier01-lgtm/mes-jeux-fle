import catalog from './catalog.js?v=niveaux2';
import {LEVELS,availableCategories,startGame,selectItem,clearOutfit,checkOutfit,revealSolution,nextRound,canCheck,describeRound,describeItem} from './logic.js?v=niveaux2';
const $=id=>document.getElementById(id);
let state=startGame(catalog),openedCategory=null,currentLayers='',currentLevel=2,isHome=true;
const stage=$('stage'),categoryButtons=new Map(),menu=$('color-menu');
function closeColors(restoreFocus=false){const old=openedCategory;openedCategory=null;menu.hidden=true;for(const button of categoryButtons.values())button.setAttribute('aria-expanded','false');if(restoreFocus&&old)categoryButtons.get(old)?.focus();}
function positionColors(){if(menu.hidden||!openedCategory)return;const rect=categoryButtons.get(openedCategory).getBoundingClientRect(),width=menu.offsetWidth,height=menu.offsetHeight;const left=Math.max(12,Math.min(rect.left+rect.width/2-width/2,innerWidth-width-12));const below=rect.bottom+9;const top=below+height<innerHeight-12?below:Math.max(12,rect.top-height-9);menu.style.left=left+'px';menu.style.top=top+'px';}
function openColors(category){
 if(state.phase!=='playing')return;
 if(openedCategory===category.id){closeColors();return;}closeColors();openedCategory=category.id;
 const selected=catalog.elements.find(x=>x.id===state.selection[category.emplacement]&&x.categorie===category.id);
 $('color-options').replaceChildren();
 for(const item of catalog.elements.filter(x=>x.categorie===category.id)){
  const button=document.createElement('button');button.className='color-option';button.type='button';button.dataset.item=item.id;button.setAttribute('aria-label',describeItem(item));button.setAttribute('aria-pressed',String(selected?.id===item.id));
  const img=new Image();img.src=item.thumbnail;img.alt='';img.width=128;img.height=128;
  const dot=document.createElement('span');dot.className='color-swatch';dot.style.background=item.hex;dot.setAttribute('aria-hidden','true');button.append(img,dot);
  button.addEventListener('click',()=>{if(state.selection[item.emplacement]!==item.id)state=selectItem(state,catalog,item.id);closeColors(true);render()});$('color-options').append(button);
 }
 $('remove-item').hidden=!selected;$('remove-item').onclick=()=>{if(selected)state=selectItem(state,catalog,selected.id);closeColors(true);render()};
 categoryButtons.get(category.id).setAttribute('aria-expanded','true');menu.hidden=false;positionColors();($('color-options').querySelector('[aria-pressed="true"]')||$('color-options').firstElementChild).focus();
}
function wardrobe(){
 categoryButtons.clear();$('garment-picker').replaceChildren();$('garment-picker').dataset.level=currentLevel;
 for(const category of availableCategories(catalog,currentLevel)){
  const button=document.createElement('button');button.className='garment-choice';button.type='button';button.dataset.category=category.id;button.setAttribute('aria-label',category.nom+' : choisir la couleur');button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','color-menu');button.setAttribute('aria-expanded','false');button.setAttribute('aria-pressed','false');
  const img=new Image();img.src=category.preview;img.alt='';img.width=128;img.height=128;img.decoding='async';const check=document.createElement('span');check.className='garment-check';check.textContent='✓';check.setAttribute('aria-hidden','true');button.append(img,check);button.addEventListener('click',()=>openColors(category));categoryButtons.set(category.id,button);$('garment-picker').append(button);
 }
}
function drawCharacter(){
 const round=state.rounds[state.round],key=round.avatar+'|'+Object.values(state.selection).sort().join('|');if(key===currentLayers)return;currentLayers=key;
 const base=catalog.silhouettes.find(x=>x.id===round.avatar),layers=[{...base,z:0},...Object.values(state.selection).map(id=>catalog.elements.find(x=>x.id===id))].sort((a,b)=>a.z-b.z);
 stage.replaceChildren();for(const layer of layers){const img=new Image();img.src=layer.image;img.alt='';img.draggable=false;img.decoding='async';stage.append(img)}
 stage.setAttribute('aria-label',`${round.avatar==='garcon'?'Léo':'Lina'}, ${Object.values(state.selection).length?'avec '+Object.values(state.selection).map(id=>describeItem(catalog.elements.find(x=>x.id===id))).join(', '):'en débardeur et petit caleçon'}`);
}
function render(){
 $('level-home').hidden=!isHome;$('score-card').hidden=isHome;$('progress-track').hidden=isHome;$('choose-level').hidden=isHome;$('restart').hidden=isHome;
 if(isHome){$('game').hidden=true;$('finish').hidden=true;$('intro').textContent='Choisis ton niveau pour commencer.';return;}
 $('intro').textContent=`Niveau ${currentLevel} · ${LEVELS.find(x=>x.id===currentLevel).title}`;
 const finished=state.phase==='finished',round=state.rounds[state.round];$('game').hidden=finished;$('finish').hidden=!finished;
 $('score').textContent=`${state.score} / ${state.rounds.length}`;$('progress-bar').style.width=`${(finished?10:state.round)/state.rounds.length*100}%`;
 if(finished){$('finish-summary').textContent=`Tu as trouvé ${state.score} tenue${state.score>1?'s':''} sur ${state.rounds.length}. Une nouvelle partie t’attend avec d’autres couleurs !`;$('play-again').focus();return;}
 $('round').textContent=`TENUE ${state.round+1} / ${state.rounds.length}`;$('character-title').textContent=`Habille ${round.avatar==='garcon'?'Léo':'Lina'}`;
 $('lives').replaceChildren();for(let i=0;i<3;i++){const heart=document.createElement('span');heart.className='heart'+(i>=state.lives?' lost':'');heart.textContent=i<state.lives?'♥':'♡';heart.setAttribute('aria-hidden','true');$('lives').append(heart)}$('lives').setAttribute('aria-label',`${state.lives} essai${state.lives>1?'s':''} restant${state.lives>1?'s':''}`);
 $('description').textContent=describeRound(round,catalog);$('feedback').textContent=state.feedback;$('feedback').dataset.type=state.feedbackType;
 $('check').hidden=state.phase!=='playing';$('check').disabled=!canCheck(state);$('clear').disabled=state.phase!=='playing'||!Object.keys(state.selection).length;
 $('reveal').hidden=state.phase!=='out-of-lives';$('next').hidden=!['success','solution'].includes(state.phase);$('next').textContent=state.round===9?'Voir mon résultat →':'Personnage suivant →';
 for(const category of availableCategories(catalog,currentLevel)){const button=categoryButtons.get(category.id),selected=catalog.elements.find(x=>x.id===state.selection[category.emplacement]&&x.categorie===category.id);button.setAttribute('aria-pressed',String(!!selected));button.disabled=state.phase!=='playing';button.querySelector('img').src=selected?selected.thumbnail:category.preview;}
 drawCharacter();
}
function startLevel(level){closeColors();currentLevel=level;isHome=false;state=startGame(catalog,Math.random,level);currentLayers='';wardrobe();render();$('character-title').scrollIntoView({block:'nearest',behavior:'smooth'});}
function restart(){startLevel(currentLevel);}
$('check').addEventListener('click',()=>{closeColors();state=checkOutfit(state);render();const card=document.querySelector('.character-card');card.classList.remove('shake','celebrate');void card.offsetWidth;card.classList.add(state.phase==='success'?'celebrate':'shake');if(state.phase==='success')$('next').focus();else if(state.phase==='out-of-lives')$('reveal').focus();});
$('reveal').addEventListener('click',()=>{state=revealSolution(state);render();$('next').focus()});
$('next').addEventListener('click',()=>{closeColors();state=nextRound(state);render();if(state.phase!=='finished'){$('check').focus();$('character-title').scrollIntoView({block:'nearest',behavior:'smooth'})}});
$('clear').addEventListener('click',()=>{closeColors();state=clearOutfit(state);render()});$('restart').addEventListener('click',restart);$('play-again').addEventListener('click',restart);
$('close-colors').addEventListener('click',()=>closeColors(true));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){event.preventDefault();closeColors(true)}});
document.addEventListener('pointerdown',event=>{if(!menu.hidden&&!menu.contains(event.target)&&!event.target.closest('.garment-choice'))closeColors()});window.addEventListener('resize',positionColors);window.addEventListener('scroll',positionColors,{passive:true});
$('choose-level').addEventListener('click',()=>{closeColors();isHome=true;render();document.querySelector('[data-level="1"]').focus()});
document.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>startLevel(Number(button.dataset.level))));
render();
