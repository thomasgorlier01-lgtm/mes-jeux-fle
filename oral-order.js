import {createCafeOrder} from './oral-order-model.js?v=2';
// Shared classroom activity: the spoken request comes from the pupil.
export function mountOralOrder(config){
 const home=document.querySelector(config.home||'#home');if(!home||document.querySelector('#oral-order'))return;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('./oral-order.css?v=2',import.meta.url);document.head.append(css);
 const number=config.number||3;
 const launch=document.createElement('button');launch.type='button';launch.className='oral-launch';launch.dataset.activity=String(number);launch.innerHTML='<span class="oral-entry-number" aria-hidden="true">'+number+'</span><strong>Et toi ?</strong><small>En classe · Je commande, tu choisis</small>';
 let menu=document.querySelector(config.menu||'.choices');if(!menu){menu=document.createElement('div');menu.className='oral-home-menu';const old=home.querySelector('#start');if(old){old.before(menu);menu.append(old);}else home.append(menu);}
 menu.classList.add('oral-home-choices');const before=config.before?menu.querySelector(config.before):null;menu.insertBefore(launch,before);
 const section=document.createElement('section');section.id='oral-order';section.className='oral-order';section.hidden=true;section.setAttribute('aria-labelledby','oral-title');
 section.innerHTML=`<div class="oral-top"><button type="button" class="oral-back">← Les activités</button><span class="oral-mode-label">3 · En classe</span><button type="button" class="oral-next">Nouvel élève ↻</button></div><h2 id="oral-title" class="oral-title">Et toi ?</h2><p class="oral-question"></p><p class="oral-instructions">Un élève dit ce qu’il veut. Son camarade choisit les images. Vérifiez ensemble, puis échangez les rôles.</p><div class="oral-layout"><section class="oral-customer-panel" aria-label="La commande du personnage"><div class="oral-customer"><img class="oral-person" alt=""><div class="oral-tray" aria-label="Les éléments choisis"></div></div><p class="oral-model">Je voudrais…</p><h3 class="oral-order-heading"></h3><p class="oral-empty">La commande est vide.</p><div class="oral-receipt"></div></section><section class="oral-picker-panel" aria-label="Les choix disponibles"><h3 class="oral-picker-title"></h3><p class="oral-picker-hint">Clique pour choisir. Clique à nouveau pour retirer.</p><div class="oral-picker"></div></section></div><p class="oral-status" role="status" aria-live="polite" aria-atomic="true"></p>`;
 home.after(section);section.querySelector('.oral-mode-label').textContent=number+' · En classe';if(config.scene)section.classList.add('oral-scene-'+config.scene.type);section.querySelector('.oral-question').textContent=config.question;section.querySelector('.oral-order-heading').textContent=config.orderTitle||'Ma commande';section.querySelector('.oral-picker-title').textContent=config.pickerTitle||'À toi de choisir';
 let selection=new Map(),student=0,opened=false,hiddenNodes=[];const cafe=config.scene&&config.scene.type==='cafe'?createCafeOrder(3):null;let currentCrop=null;const buttons=new Map(),foods=new Map(config.items.map(f=>[f.id,f]));
 const picker=section.querySelector('.oral-picker'),tray=section.querySelector('.oral-tray'),receipt=section.querySelector('.oral-receipt'),status=section.querySelector('.oral-status');
 picker.dataset.count=String(config.items.length);
 function picture(food,served=false){const img=new Image();img.src=served&&food.servedImage?food.servedImage:food.image;img.alt='';img.draggable=false;return img;}
 function toggle(id){if(!opened)return;if(cafe){cafe.choose(id);render();status.textContent=cafe.drinks.filter(Boolean).length+' / 3 boissons choisies.';return;}if(selection.has(id))selection.delete(id);else selection.set(id,1);render();status.textContent=selection.has(id)?`${foods.get(id).label} : ajouté à la commande.`:`${foods.get(id).label} : retiré de la commande.`;}
 function quantity(id,delta){const food=foods.get(id),current=selection.get(id)||0,next=Math.max(0,Math.min(food.max||1,current+delta));if(next)selection.set(id,next);else selection.delete(id);render();status.textContent=next?`${food.label} : ${next}.`:`${food.label} : retiré de la commande.`;if(next)receipt.querySelector(`[data-receipt="${id}"] [data-delta="${delta}"]`)?.focus({preventScroll:true});else buttons.get(id)?.focus({preventScroll:true});}
 for(const food of config.items){const b=document.createElement('button');b.type='button';b.className='oral-food';b.dataset.food=food.id;b.setAttribute('aria-label',food.label);b.setAttribute('aria-pressed','false');const label=document.createElement('span');label.className='oral-food-label';label.textContent=food.label;const check=document.createElement('span');check.className='oral-check';check.textContent='✓';check.setAttribute('aria-hidden','true');b.append(picture(food),label,check);b.addEventListener('click',()=>toggle(food.id));picker.append(b);buttons.set(food.id,b);}
 function render(){
  if(cafe){renderCafe();return;}
  tray.replaceChildren();receipt.replaceChildren();section.querySelector('.oral-empty').hidden=selection.size>0;
  for(const [id,b]of buttons)b.setAttribute('aria-pressed',String(selection.has(id)));
  tray.dataset.count=selection.size;
  let visualIndex=0;
  for(const [id,count]of selection){const food=foods.get(id);const copies=config.scene&&config.scene.type==='market'?count:1;for(let copy=0;copy<copies;copy++){const onTray=document.createElement('button');onTray.type='button';onTray.className='oral-on-tray';onTray.dataset.trayFood=id;onTray.setAttribute('aria-label','Retirer '+food.label);onTray.append(picture(food,true));if(count>1&&copies===1){const badge=document.createElement('span');badge.className='oral-quantity-badge';badge.textContent=count;onTray.append(badge);}onTray.addEventListener('click',()=>copies>1?quantity(id,-1):toggle(id));positionItem(onTray,visualIndex++);tray.append(onTray);}
   const item=document.createElement('div');item.className='oral-receipt-item';item.dataset.receipt=id;
   const remove=document.createElement('button');remove.type='button';remove.className='oral-receipt-remove';remove.setAttribute('aria-label','Retirer '+food.label);const label=document.createElement('span');label.textContent=food.quantityLabel?food.quantityLabel(count):food.label;remove.append(picture(food),label);remove.addEventListener('click',()=>toggle(id));item.append(remove);
   if((food.max||1)>1){const controls=document.createElement('div');controls.className='oral-quantity';for(const delta of [-1,1]){const b=document.createElement('button');b.type='button';b.dataset.delta=delta;b.textContent=delta<0?'−':'+';b.setAttribute('aria-label',`${delta<0?'Retirer':'Ajouter'} un : ${food.label}`);b.disabled=delta>0&&count>=food.max;b.addEventListener('click',()=>quantity(id,delta));if(delta>0){const n=document.createElement('span');n.className='oral-quantity-count';n.textContent=count;controls.append(n);}controls.append(b);}item.append(controls);}
   receipt.append(item);
  }
 }
 function sceneSvg(crop,front=false){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',[crop.x,crop.y,crop.w,crop.h].join(' '));svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');svg.classList.add(front?'oral-context-front':'oral-context-picture');
  const image=document.createElementNS(ns,'image');image.setAttribute('href',config.scene.image);image.setAttribute('width','100');image.setAttribute('height','100');image.setAttribute('preserveAspectRatio','none');
  if(front){const defs=document.createElementNS(ns,'defs'),clip=document.createElementNS(ns,'clipPath'),polygon=document.createElementNS(ns,'polygon');clip.id='oral-basket-front-clip';polygon.setAttribute('points','3.3,75.4 7,78.2 14,80.1 20.4,78.4 26.1,75.4 25.7,84.3 23,88.7 9,90.5 5,87');clip.append(polygon);defs.append(clip);svg.append(defs);image.setAttribute('clip-path','url(#oral-basket-front-clip)');}
  svg.append(image);return svg;
 }
 function positionItem(button,index){
  if(!currentCrop)return;const type=config.scene.type;let x,y,w,h;
  if(type==='picnic'){x=currentCrop.bread+(index%2)*6;y=59.2+Math.floor(index/2)*2;w=9.2;h=10;}
  else if(type==='market'){x=8+(index%6)*2.8;y=74+Math.floor(index/6)*1.4;w=5.2;h=9;}
  else return;
  button.style.cssText='left:'+((x-currentCrop.x)/currentCrop.w*100)+'%;top:'+((y-currentCrop.y)/currentCrop.h*100)+'%;width:'+(w/currentCrop.w*100)+'%;height:'+(h/currentCrop.h*100)+'%;';
 }
 function renderCafe(){
  tray.replaceChildren();receipt.replaceChildren();receipt.hidden=true;section.querySelector('.oral-order-heading').hidden=true;
  const drinks=cafe.drinks,active=cafe.active;
  for(const [id,b]of buttons)b.setAttribute('aria-pressed',String(drinks[active]===id));
  const count=drinks.filter(Boolean).length,empty=section.querySelector('.oral-empty');empty.hidden=false;empty.textContent=count+' / 3 boissons choisies';
  let controls=section.querySelector('.oral-friends');if(!controls){controls=document.createElement('div');controls.className='oral-friends';section.querySelector('.oral-customer').after(controls);}controls.replaceChildren();
  const names=['Moi','Mon amie','Mon ami'];
  for(let index=0;index<3;index++){
   const person=document.createElement('button');person.type='button';person.className='oral-friend';person.dataset.person=index;person.setAttribute('aria-pressed',String(index===active));const name=document.createElement('strong');name.textContent=names[index];const choice=document.createElement('span');choice.textContent=drinks[index]?foods.get(drinks[index]).label:'Choisir une boisson';person.append(name,choice);person.addEventListener('click',()=>{cafe.focus(index);render();section.querySelector('.oral-friend[data-person="'+index+'"]').focus({preventScroll:true});});controls.append(person);
   if(!drinks[index])continue;const food=foods.get(drinks[index]),drink=document.createElement('button');drink.type='button';drink.className='oral-on-tray oral-served-drink';drink.dataset.person=index;drink.dataset.trayFood=food.id;drink.style.left=[21,50,77.5][index]+'%';drink.style.top='83%';drink.setAttribute('aria-label','Retirer la boisson de '+names[index]);drink.append(picture(food));drink.addEventListener('click',()=>{cafe.remove(index);render();status.textContent='La boisson est retirée. Choisis à nouveau pour '+names[index]+'.';});tray.append(drink);
  }
 }
 function customer(){
  const holder=section.querySelector('.oral-customer'),img=section.querySelector('.oral-person');if(!config.scene){img.src=config.customers[student%config.customers.length];img.alt=student%2?'Une fille présente sa commande.':'Un garçon présente sa commande.';return;}
  img.hidden=true;img.style.display='none';holder.querySelectorAll('.oral-context-picture,.oral-context-front,.oral-cafe-background').forEach(node=>node.remove());
  if(config.scene.type==='cafe'){const bg=new Image();bg.className='oral-cafe-background';bg.src=config.scene.image;bg.alt='Trois amis sont assis ensemble à la terrasse du café.';holder.style.aspectRatio='16 / 9';holder.prepend(bg);section.querySelector('.oral-picker-hint').textContent='Choisis une boisson par personne : 3 boissons au total.';section.querySelector('.oral-instructions').textContent='Dites à votre camarade ce que vous voulez boire. Il choisit une boisson pour chacun des trois amis.';return;}
  currentCrop=config.scene.crops[student%config.scene.crops.length];holder.style.aspectRatio=String(currentCrop.w/currentCrop.h*(16/9));holder.prepend(sceneSvg(currentCrop));if(config.scene.type==='market')holder.append(sceneSvg(currentCrop,true));
  if(config.scene.type==='picnic')section.querySelector('.oral-model').textContent='Dans mon sandwich, je voudrais…';
 }
 function fresh(){selection=new Map();if(cafe)cafe.clear();customer();render();status.textContent='Écoute ton camarade, puis clique sur ce qu’il demande.';}
 function show(){opened=true;home.hidden=true;document.body.classList.add('oral-active');hiddenNodes=(config.hide||[]).flatMap(selector=>[...document.querySelectorAll(selector)]).map(node=>({node,hidden:node.hidden}));for(const {node}of hiddenNodes)node.hidden=true;section.hidden=false;fresh();section.querySelector('.oral-back').focus({preventScroll:true});window.scrollTo(0,0);}
 function close(){if(!opened)return;opened=false;section.hidden=true;home.hidden=false;document.body.classList.remove('oral-active');for(const{node,hidden}of hiddenNodes)node.hidden=hidden;hiddenNodes=[];launch.focus({preventScroll:true});window.scrollTo(0,0);}
 launch.addEventListener('click',show);section.querySelector('.oral-back').addEventListener('click',close);section.querySelector('.oral-next').addEventListener('click',()=>{student++;fresh();section.querySelector('.oral-next').focus({preventScroll:true});});
 return{show,close};
}
export function foodLabel(id,fallback){return({poulet:'Le poulet',steak:'La viande',poisson:'Le poisson',riz:'Le riz',pates:'Les pâtes','pommes-de-terre':'Les pommes de terre',frites:'Les frites',carottes:'Les carottes',tomates:'Les tomates',salade:'La salade',oeufs:'Les œufs',fromage:'Le fromage',brocoli:'Le brocoli',concombre:'Le concombre',yaourt:'Le yaourt',glace:'La glace',gateau:'Le gâteau',kiwi:'Le kiwi',pomme:'La pomme',banane:'La banane',orange:'L’orange',eau:'L’eau',lait:'Le lait','jus-orange':'Le jus d’orange','jus-pomme':'Le jus de pomme',the:'Le thé',cola:'Le coca'})[id]||fallback||id;}
