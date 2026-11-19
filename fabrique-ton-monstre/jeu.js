
"use strict";
const ART={"heads":[artData1[0],artData1[1],artData2[0],artData2[1]],"bodies":[artData3[0],artData3[1],artData3[2],artData4[0]],"limbs":[artData4[1],artData4[2],artData4[3],artData5[0]],"ears":[[artData5[1],artData5[2]],[artData6[0],artData6[1]],[artData6[2],artData7[0]],[artData7[1],artData8[0]]],"expressions":[[artData8[1],artData8[2]],[artData8[3],artData8[4]],[artData9[0],artData9[1]],[artData9[2],artData9[3]]],"hair":[artData9[4],artData9[5],artData10[0],artData10[1],artData10[2],artData10[3],artData11[0],artData11[1]],"eyes":[artData11[2],artData12[0],artData12[1],artData13[0]],"accessories":[artData13[1],artData13[2],artData13[3]],"cover":artData14[0]};
const bank=[...reviewData1,...reviewData2,...reviewData3,...reviewData4,...reviewData5,...reviewData6,...reviewData7,...reviewData8,...reviewData9,...reviewData10];
const themesAll=[...new Set(bank.map(q=>q.theme))];
const shuffle=function(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const pickPair=function(a){return shuffle(a.slice()).slice(0,2)};
function buildStages(){
 const eyeCounts=pickPair([1,2,3]);
 const countWords={1:"un",2:"deux",3:"trois",4:"quatre",5:"cinq",6:"six"};
 const eyeColors=[["blue","bleus"],["brown","marron"]];
 const hairColors=[["blond","blonds"],["brown","bruns"],["red","roux"],["black","noirs"]];
 const accessories=shuffle([["glasses","des lunettes"],["hat","un chapeau"],["moustache","une moustache"],["beard","une barbe"],["earrings","des boucles d’oreilles en anneaux"]]);
 const moods=[["sad","Il est triste."],["happy","Il est content."],["angry","Il est fâché."],["scared","Il a peur."]];
 const steps=[
  {key:"head",prompt:"Ton monstre a :",opts:["une petite tête","une grosse tête"],values:["small","large"]},
  {key:"ears",prompt:"Ton monstre a :",opts:["de petites oreilles","de grandes oreilles"],values:["small","large"]},
  {key:"eyes",prompt:"Ton monstre a :",opts:eyeCounts.map(n=>n===1?"un œil":countWords[n]+" yeux"),values:eyeCounts},
  {key:"eyeColor",prompt:"Ton monstre a :",opts:eyeColors.map(x=>"les yeux "+x[1]),values:eyeColors.map(x=>x[0])},
  {key:"nose",prompt:"Ton monstre a :",opts:["un petit nez","un gros nez"],values:["small","large"]},
  {key:"hairLength",prompt:"Ton monstre a :",opts:["des cheveux courts","des cheveux longs"],values:["short","long"]},
  {key:"hairColor",prompt:"Ton monstre a :",opts:hairColors.map(x=>"les cheveux "+x[1]),values:hairColors.map(x=>x[0])},
  {key:"mood",prompt:"Comment est ton monstre ?",opts:moods.map(x=>x[1]),values:moods.map(x=>x[0])},
  {key:"belly",prompt:"Ton monstre a :",opts:["un petit ventre","un gros ventre"],values:["small","large"]},
  {key:"arms",prompt:"Ton monstre a :",opts:["deux bras","quatre bras","six bras"],values:[2,4,6]},
  {key:"legs",prompt:"Ton monstre a :",opts:["une jambe","trois jambes","quatre jambes"],values:[1,3,4]},
  {key:"pain1",prompt:"Ton monstre a mal :",opts:["à la tête","au bras","à la jambe"],values:["head","arm","leg"]},
  {key:"pain2",prompt:"Ton monstre a aussi mal :",opts:["à l’œil","au nez","à l’oreille","au ventre"],values:["eye","nose","ear","belly"]},
  {key:"accessory1",prompt:"Ton monstre a :",opts:["des lunettes","un chapeau"],values:["glasses","hat"]},
  {key:"accessory2",prompt:"Ton monstre a :",opts:["des boucles d’oreilles","pas de boucles d’oreilles"],values:["earrings","none"]},
  {key:"accessory3",prompt:"Ton monstre a :",opts:["une barbe","une moustache"],values:["beard","moustache"]}
 ];
 return steps;
}
const palettes=[
 {body:"#688d95",line:"#18333d",cream:"#f0d6ad",accent:"#d06c47"},
 {body:"#688d95",line:"#18333d",cream:"#f0d6ad",accent:"#d06c47"},
 {body:"#718e91",line:"#18333d",cream:"#f4ddba",accent:"#c76745"}
];
let model={},steps=[],stepIndex=0,reviewDeck=[],reviewIndex=0,answerIndex=null,reviewOnly=false,phase="intro",currentName="",palette=palettes[0],seed=1,usedIds=readHistory();
function readHistory(){
 try {
  const history=JSON.parse(localStorage.getItem("fleMonsterV5BlockHistory")||"[]");
  return Array.isArray(history)?history.filter(id=>bank.some(q=>q.id===id)):[];
 } catch {return []}
}
const $=function(id){return document.getElementById(id)};
const esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
function audio(text,after){
 if(!("speechSynthesis" in window)){if(after)after();return}
 speechSynthesis.cancel();
 let spoken=text.replace("Que fait-il ?","Qu’est-ce qu’il fait ?").replace("Qu’est-ce qu’il dit ?","Qu’est-ce qu’il dit ?");
 let u=new SpeechSynthesisUtterance(spoken);u.lang="fr-FR";u.rate=.92;
 let voices=speechSynthesis.getVoices(),v=voices.find(x=>x.lang.toLowerCase()==="fr-fr")||voices.find(x=>x.lang.toLowerCase().startsWith("fr"));
 if(v)u.voice=v;
 if(after){
  // If the platform has no working speech service, the written correction remains available.
  const timeout=setTimeout(after,6000);
  u.onstart=()=>clearTimeout(timeout);
  u.onend=()=>{clearTimeout(timeout);after()};
  u.onerror=event=>{
   clearTimeout(timeout);
   if(event.error!=="canceled"&&event.error!=="interrupted")after();
  };
 }
 speechSynthesis.speak(u);
}
function audioButton(text,label,feedback){return '<button class="audio" type="button" aria-label="'+esc(label||("Écouter : "+text))+'" data-audio="'+esc(text)+'" '+(feedback?'data-feedback="true"':'')+'>'+(feedback?"🔊 Écoute encore":"🔊 Écoute")+'</button>'}
function selectedRound(size=steps.length){
 const chosen=[];
 while(chosen.length<size){
  if(bank.every(q=>usedIds.includes(q.id)))usedIds=[];
  const available=bank.filter(q=>!usedIds.includes(q.id)&&!chosen.includes(q));
  const count=Math.min(size-chosen.length,available.length);
  const groups=shuffle(themesAll.map(theme=>shuffle(available.filter(q=>q.theme===theme))).filter(group=>group.length));
  const batch=groups.slice(0,count).map(group=>group.pop());
  // Save at least one question per theme for each remaining full round when possible.
  const reserve=Math.floor((available.length-count)/size);
  while(batch.length<count){
   const pool=groups.flatMap(group=>group.slice(reserve));
   const eligible=pool.length?pool:groups.flat();
   const next=eligible[Math.floor(Math.random()*eligible.length)];
   const group=groups.find(group=>group.includes(next));
   group.splice(group.indexOf(next),1);
   batch.push(next);
  }
  chosen.push(...shuffle(batch));
  usedIds.push(...batch.map(q=>q.id));
 }
 try {localStorage.setItem("fleMonsterV5BlockHistory",JSON.stringify(usedIds))} catch {}
 return chosen;
}
function renderMonster(){
 const m=model,p=palette,variant=seed%4;
 const headW=m.head==="large"?250:199;
 const headH=headW*.88;
 const headY=m.head==="large"?43:67;
 const bodyW=m.belly==="large"?308:239;
 const bodyH=bodyW*.70;
 const bodyY=headY+headH-31;
 const bodyBase=bodyY+bodyH;
 const bodyTile=[0,2,3,1][variant];
 const striped=bodyTile===2||bodyTile===0;
 const pains=m.pains||[];
 const eyeCenters=[];
 let svg='<svg id="monsterSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 560" role="img" aria-label="Monstre FLE Lab">';
 function piece(src,x,y,width,height){
  return '<image href="'+src+'" x="'+x+'" y="'+y+'" width="'+width+'" height="'+height+'" preserveAspectRatio="none"/>';
 }
 function centered(src,x,y,width,height){
  return piece(src,x-width/2,y,width,height);
 }
 function part(name,markup){
  return '<g data-part="'+name+'">'+markup+'</g>';
 }
 function bandage(site,x,y,width,height,angle){
  const w=width/2,h=height/2;
  return part("bandage-"+site,'<g transform="translate('+x+' '+y+') rotate('+angle+')">'+
   '<path d="M'+(-w)+' '+(-h*.58)+' Q0 '+(-h*1.28)+' '+w+' '+(-h*.58)+' L'+w+' '+(h*.56)+' Q0 '+(h*1.28)+' '+(-w)+' '+(h*.56)+'Z" fill="#fff1d4" stroke="#736254" stroke-width="1.8" stroke-linejoin="round"/>'+
   '<path d="M'+(-w*.46)+' '+(-h*.8)+' Q'+(-w*.34)+' 0 '+(-w*.45)+' '+(h*.79)+' M'+(w*.17)+' '+(-h*.89)+' Q'+(w*.30)+' 0 '+(w*.20)+' '+(h*.9)+' M'+(w*.66)+' '+(-h*.75)+' Q'+(w*.75)+' 0 '+(w*.66)+' '+(h*.74)+'" fill="none" stroke="#c6a785" stroke-width="1.45" stroke-linecap="round"/></g>');
 }
 function adhesive(site,x,y,width,height,angle){
  const h=height/2;
  const dot=width*.32;
  return part("pansement-"+site,'<g transform="translate('+x+' '+y+') rotate('+angle+')">'+
   '<rect x="'+(-width/2)+'" y="'+(-h)+'" width="'+width+'" height="'+height+'" rx="'+(height*.41)+'" fill="#f0bc91" stroke="#705246" stroke-width="1.4"/>'+
   '<rect x="'+(-width*.17)+'" y="'+(-h*.81)+'" width="'+(width*.34)+'" height="'+(height*.81)+'" rx="1.8" fill="#ffe7be" stroke="#c58f73" stroke-width="1"/>'+
   [dot,-dot].map(cx=>'<circle cx="'+cx+'" cy="'+(-h*.29)+'" r="1" fill="#9d7059"/><circle cx="'+cx+'" cy="'+(h*.29)+'" r="1" fill="#9d7059"/>').join("")+
   '</g>');
 }
 const legCount=m.legs||0;
 const legStride=legCount>1?Math.min(bodyW*.43,bodyW*.68/(legCount-1)):0;
 const legWidth=legCount>1?Math.min(68,legStride-4):68;
 const legTop=bodyY+bodyH*.76;
 const legHeight=bodyBase+80-legTop;
 for(let i=0;i<legCount;i++){
  const x=250+(i-(legCount-1)/2)*legStride;
  svg+=part("leg",centered(ART.limbs[striped?3:2],x,legTop,legWidth,legHeight));
  if(i===0&&pains.includes("leg"))svg+=bandage("leg",x-1,bodyBase+24,legWidth*.59,22,6);
 }
 const armPairs=(m.arms||0)/2;
 const armHeight=armPairs===3?61:armPairs===2?73:80;
 const shoulderLevels=([[],[.42],[.33,.71],[.28,.54,.81]])[armPairs];
 const armX=250+bodyW*.27;
 const armWidth=Math.min(494,250+bodyW*.32+119)-armX;
 for(const [i,level] of shoulderLevels.entries()){
  const y=bodyY+bodyH*level-armHeight*.77;
  const arm=piece(ART.limbs[variant===1?1:0],armX,y,armWidth,armHeight);
  svg+=part("arm",'<g transform="translate(500 0) scale(-1 1)">'+arm+'</g>')+part("arm",arm);
  if(i===0&&pains.includes("arm"))svg+=bandage("arm",armX+armWidth*.60,y+armHeight*.63,armHeight*.36,25,-54);
 }
 if(m.belly){
  svg+=part("belly",centered(ART.bodies[bodyTile],250,bodyY,bodyW,bodyH));
  if(pains.includes("belly"))svg+=adhesive("belly",250,bodyY+bodyH*.53,46,19,-15);
 }
 if(m.head){
  const longHair=m.hairLength==="long";
  const earSize=m.ears==="large"?90:63;
  const earCenter=250+headW*.44+(longHair?15:0);
  const earY=headY+headH*.34;
  if(m.ears){
   svg+=part("ear",centered(ART.ears[variant][0],500-earCenter,earY,earSize,earSize));
   svg+=part("ear",centered(ART.ears[variant][1],earCenter,earY,earSize,earSize));
  }
  svg+=part("head",centered(ART.heads[variant],250,headY,headW,headH));
  if(m.hairLength){
   const color=({blond:0,red:1,brown:2,black:3})[m.hairColor]??1;
   const hair=ART.hair[color+(longHair?4:0)];
   const hairTop=headY-headH*(longHair?.095:.12);
   svg+=part("hair",centered(hair,250,hairTop,headW*(longHair?1.13:.79),headH*(longHair?.79:.41)));
  }
  if(pains.includes("head"))svg+=bandage("head",250,headY+headH*.18,headW*.72,headH*.106,4);
  const eyeCount=m.eyes||0;
  const eyeY=headY+headH*.45;
  const eyeSize=headW*(eyeCount===1?.28:eyeCount===2?.23:.185);
  const eyeSpacing=eyeSize+headW*.038;
  const noseY=headY+headH*.697;
  const bigNose=m.nose==="large";
  const noseRx=headH*(bigNose?.113:.04945);
  const noseRy=headH*(bigNose?.049:.03354);
  const moustache=m.accessory3==="moustache";
  const beard=m.accessory3==="beard";
  const mouthTop=headY+headH*(moustache?.853:.777);
  const mouthHeight=headH*(m.mood==="sad"?.094:moustache?.125:beard?.145:m.mood==="scared"?.18:.16);
  const mouthWidth=headW*(m.mood==="scared"?.22:.37);
  for(let i=0;i<eyeCount;i++){
   const x=250+(i-(eyeCount-1)/2)*eyeSpacing;
   const y=eyeY+(eyeCount===3&&i===1?-3:0);
   eyeCenters.push([x,y]);
   svg+=part("eye",centered(ART.eyes[m.eyeColor==="brown"?2:0],x,y-eyeSize/2,eyeSize,eyeSize));
  }
  if(m.mood){
   const [brows,mouth]=ART.expressions[({happy:0,angry:1,scared:2,sad:3})[m.mood]];
   const browBottom=eyeY-eyeSize/2-(eyeCount===3?3:0)-6;
   const browHeight=Math.min(headH*.09,browBottom-headY-headH*.218);
   svg+=part("eyebrows",centered(brows,250,browBottom-browHeight,headW*.51,browHeight));
   svg+=part("mouth",centered(mouth,250,mouthTop,mouthWidth,mouthHeight));
  }
  if(m.nose){
   svg+=part("nose",'<ellipse cx="250" cy="'+noseY+'" rx="'+noseRx+'" ry="'+noseRy+'" fill="#d87d4c" stroke="'+p.line+'" stroke-width="2"/>'+
    '<ellipse cx="'+(250-noseRx*.23)+'" cy="'+(noseY-noseRy*.32)+'" rx="'+(noseRx*.48)+'" ry="'+(noseRy*.30)+'" fill="#f7c998" opacity=".85"/>');
   if(pains.includes("nose"))svg+=adhesive("nose",250,noseY,Math.max(17,noseRx*1.35),9,-8);
  }
  if(pains.includes("eye")&&eyeCount){
   const [x,y]=eyeCenters[0];
   svg+=adhesive("eye",x,y,eyeSize*.72,eyeSize*.25,-19);
  }
  if(m.accessory1==="glasses"&&eyeCount){
   const single=eyeCount===1;
   const radius=eyeSize/2+2.3;
   const halfWidth=single?eyeSize*.62:radius;
   const first=eyeCenters[0][0],last=eyeCenters[eyeCount-1][0];
   const temple=250-headW*.43;
   const frameY=eyeY-eyeSize*.14,templeY=frameY-eyeSize*.13;
   const hingeY=frameY-2;
   let frame='<path d="M'+temple+' '+templeY+' Q'+(temple+12)+' '+hingeY+' '+(first-halfWidth)+' '+frameY+
    ' M'+(last+halfWidth)+' '+frameY+' Q'+(500-temple-12)+' '+hingeY+' '+(500-temple)+' '+templeY+'" fill="none" stroke="#69372b" stroke-width="4" stroke-linecap="round"/>';
   if(single){
    const lensHeight=eyeSize+5;
    frame+='<rect x="'+(250-halfWidth)+'" y="'+(eyeY-lensHeight/2)+'" width="'+(halfWidth*2)+'" height="'+lensHeight+'" rx="'+(lensHeight*.38)+'" fill="#e0f6fc" fill-opacity=".12" stroke="#a7472b" stroke-width="4.5"/>';
   }else{
    eyeCenters.forEach(([x,y],i)=>{
     frame+='<circle cx="'+x+'" cy="'+y+'" r="'+radius+'" fill="#e0f6fc" fill-opacity=".10" stroke="#a7472b" stroke-width="3.8"/>';
     if(i){
      const [previous,py]=eyeCenters[i-1],bridgeY=Math.min(y,py)-3;
      frame+='<path d="M'+(previous+radius-1)+' '+py+' Q'+((previous+x)/2)+' '+bridgeY+' '+(x-radius+1)+' '+y+'" fill="none" stroke="#a7472b" stroke-width="3.3"/>';
     }
    });
   }
   svg+=part("glasses",frame);
  }
  if(m.accessory1==="hat")svg+=part("hat",centered(ART.accessories[0],229,headY-28,headW*.58,headH*.37));
  const earDetailX=earCenter+earSize*.15;
  if(m.ears&&pains.includes("ear"))svg+=adhesive("ear",earDetailX,earY+earSize*.46,earSize*.33,13,18);
  if(m.accessory2==="earrings"&&m.ears){
   for(const x of [500-earDetailX,earDetailX]){
    svg+=part("earring",'<circle cx="'+x+'" cy="'+(earY+earSize*.78)+'" r="10" fill="none" stroke="#f4bf61" stroke-width="5"/>');
   }
  }
  if(moustache)svg+=part("moustache",centered(ART.accessories[1],250,headY+headH*.754,headW*.46,headH*.087));
  if(beard){
   const width=headW*.47;
   const topEdge="M0 83 Q200 123 400 83";
   const beardArt='<svg x="'+(250-width/2)+'" y="'+(mouthTop+mouthHeight+4)+'" width="'+width+'" height="'+(headH*.22)+'" viewBox="0 83 400 185" preserveAspectRatio="none">'+
    '<defs><clipPath id="beard-chin"><path d="'+topEdge+' V268 H0Z"/></clipPath></defs>'+
    '<g clip-path="url(#beard-chin)">'+piece(ART.accessories[2],0,0,400,268)+'</g>'+
    '<path d="'+topEdge+'" fill="none" stroke="#713416" stroke-width="4"/></svg>';
   svg+=part("beard",beardArt);
  }
 }
 $("monsterArt").innerHTML=svg+"</svg>";
}

function sceneForQuestion(q){
 if(q.word)return '<strong class="review-word">'+esc(q.word)+'</strong>';
 return '<img class="review-illustration" src="'+q.src+'" alt="'+esc(q.visual)+'">';
}
function prepIntro(){
 $("coverArt").innerHTML='<img class="cover-image" src="'+ART.cover+'" alt="Le monstre FLE Lab bleu à trois yeux, fâché, sur fond noir">';
}
function createRound(){
 model={pains:[]};steps=buildStages();stepIndex=0;reviewDeck=selectedRound();reviewIndex=0;answerIndex=null;reviewOnly=false;phase="review";palette=palettes[Math.floor(Math.random()*palettes.length)];seed=Math.floor(Math.random()*10000);render();
}
function render(){
 document.body.className=phase+"-mode";
 $("progress").textContent=phase==="review"?"Révision · "+(reviewIndex+1)+" / "+reviewDeck.length:phase==="build"?"Création · "+(stepIndex+1)+" / "+steps.length:(phase==="finished"||phase==="reviewDone")?"Terminé":"";
 if(phase!=="intro")renderMonster();
 $("monsterFoot").textContent=(phase==="finished"||phase==="reviewDone")?currentName:"";
 let screen="";
 if(phase==="intro"){
  screen='<div class="intro"><h2>Fabrique ton<br>monstre !</h2><div class="monster-art" id="coverArt"></div><button type="button" data-start>Commencer →</button></div>';
 }else if(phase==="review"){
  let q=reviewDeck[reviewIndex],choices=q.displayOptions,answered=answerIndex!==null;
  screen='<div class="quiz"><div class="quiz-prompt">'+audioButton(q.question,"Écouter la question")+'<span>'+esc(q.question)+'</span></div><div class="quiz-body"><div class="scene">'+sceneForQuestion(q)+'</div><div class="answers">'+choices.map(function(a,i){let cls="answer"+(answered?(i===q.correctIndex?" correct":i===answerIndex?" wrong":""):"");return '<div class="choice-wrap"><button class="'+cls+'" '+(answered?"disabled":"")+' data-answer="'+i+'">'+esc(a)+'</button>'+audioButton(a)+'</div>'}).join("")+'</div></div>';
  if(answered&&answerIndex!==q.correctIndex)screen+='<div class="feedback" role="status"><strong>Regarde la bonne réponse : '+esc(choices[q.correctIndex])+'</strong>'+audioButton(choices[q.correctIndex],"Écouter encore la bonne réponse",true)+'<button class="next hidden" data-next>Continuer →</button></div>';
  screen+="</div>";
 }else if(phase==="build"){
  let st=steps[stepIndex];
  let opts=st.opts.map(function(label,i){return {label:label,value:st.values[i]}});
  let choiceN=opts.length,selected=model[st.key];
  screen='<div class="build"><h2 class="prompt">'+esc(st.prompt)+'</h2><div class="options '+(choiceN>2?"many":"")+'">'+opts.map(function(o){return '<div class="choice-wrap"><button class="option '+(selected===o.value?"selected":"")+'" aria-pressed="'+(selected===o.value)+'" data-build="'+esc(o.value)+'">'+esc(o.label)+'</button>'+audioButton(o.label)+'</div>'}).join("")+'</div><button class="next" '+(selected==null?"disabled":"")+' data-next-build>Continuer →</button></div>';
 }else if(phase==="reviewDone"){
  screen='<div class="end"><h2>Révision terminée !</h2><p>Bravo !</p><button class="next" data-result>Revoir mon monstre</button><button class="next" data-restart>Créer un autre monstre</button></div>';
 }else if(phase==="finished"){
  screen='<div class="end"><h2>Ton monstre est terminé !</h2><p>Donne-lui un prénom, enregistre-le ou imprime-le.</p><input id="name" aria-label="Prénom du monstre" maxlength="28" placeholder="Son prénom" value="'+esc(currentName)+'"><p><button class="next" data-save>Enregistrer le monstre</button><button class="next" data-print>Imprimer</button></p><button class="next" data-review>Réviser les questions</button><button class="next" data-restart>Créer un autre monstre</button></div>';
 }
 $("screen").innerHTML=screen;
 bindScreen();
 if(phase==="intro")prepIntro();
}
function bindScreen(){
 $("screen").querySelectorAll("[data-audio]").forEach(function(b){b.addEventListener("click",function(){const next=b.dataset.feedback?$("screen").querySelector("[data-next]"):null;
  audio(b.dataset.audio,next?()=>{
   if(next.isConnected){next.classList.remove("hidden");next.focus()}
  }:null)})});
 $("screen").querySelectorAll("[data-answer]").forEach(function(b){b.addEventListener("click",function(){reply(Number(b.dataset.answer))})});
 $("screen").querySelectorAll("[data-build]").forEach(function(b){b.addEventListener("click",function(){chooseValue(b.dataset.build)})});
 let q=$("screen").querySelector("[data-next]");if(q)q.addEventListener("click",completeReviewQuestion);
 let n=$("screen").querySelector("[data-next-build]");if(n)n.addEventListener("click",nextBuild);
 let start=$("screen").querySelector("[data-start]");if(start)start.addEventListener("click",createRound);
 let review=$("screen").querySelector("[data-review]");if(review)review.addEventListener("click",function(){reviewDeck=selectedRound();reviewIndex=0;answerIndex=null;reviewOnly=true;phase="review";render()});
 let result=$("screen").querySelector("[data-result]");if(result)result.addEventListener("click",function(){phase="finished";render()});
 let save=$("screen").querySelector("[data-save]");if(save)save.addEventListener("click",saveSVG);
 let print=$("screen").querySelector("[data-print]");if(print)print.addEventListener("click",function(){window.print()});
 let restart=$("screen").querySelector("[data-restart]");if(restart)restart.addEventListener("click",function(){phase="intro";model={pains:[]};currentName="";render()});
 let name=$("screen").querySelector("#name");if(name)name.addEventListener("input",function(){currentName=name.value;$("monsterFoot").textContent=currentName});
}
function reply(i){
 if(answerIndex!==null)return;
 if(i===reviewDeck[reviewIndex].correctIndex){completeReviewQuestion();return}
 answerIndex=i;
 render();
 $("screen").querySelector("[data-feedback]").focus();
}
function completeReviewQuestion(){
 if("speechSynthesis" in window)speechSynthesis.cancel();
 answerIndex=null;
 if(reviewOnly){
  reviewIndex++;
  phase=reviewIndex===reviewDeck.length?"reviewDone":"review";
 }else phase="build";
 render();
 $("screen").querySelector(reviewOnly?".quiz-prompt button, [data-result]":"[data-build]").focus();
}
function chooseValue(value){
 const stage=steps[stepIndex];
 const picked=stage.values.find(option=>String(option)===value);
 if(picked===undefined)return;
 model[stage.key]=picked;
 model.pains=[model.pain1,model.pain2].filter(Boolean);
 render();
 $("screen").querySelector("[data-build].selected").focus();
}
function nextBuild(){
 if(model[steps[stepIndex].key]==null)return;
 if("speechSynthesis" in window)speechSynthesis.cancel();
 stepIndex++;
 reviewIndex++;
 phase=stepIndex===steps.length?"finished":"review";
 render();
 $("screen").querySelector(phase==="finished"?"#name":".quiz-prompt button").focus();
}
function saveSVG(){
 let el=$("monsterSVG");if(!el)return;let clone=el.cloneNode(true);clone.setAttribute("width","920");clone.setAttribute("height","1040");
 let data=new Blob([new XMLSerializer().serializeToString(clone)],{type:"image/svg+xml;charset=utf-8"}),url=URL.createObjectURL(data),a=document.createElement("a");a.href=url;a.download=((currentName.trim()||"mon-monstre").replace(/[^\p{L}\p{N}_-]+/gu,"-"))+".svg";a.click();setTimeout(function(){URL.revokeObjectURL(url)},1500)
}
function init(){
 if(!bank.length)console.error("La banque de questions est vide.");
 render();
}
init();
