import assert from 'node:assert/strict';
class Node{constructor(){this.children=[];this.dataset={};this.attrs={};this.listeners={};this.hidden=false;this.textContent='';this.style={setProperty(){}};this.classList={add(){},remove(){},toggle(){}};}append(...n){this.children.push(...n)}replaceChildren(...n){this.children=n}setAttribute(a,b){this.attrs[a]=b}addEventListener(a,f){this.listeners[a]=f}focus(){}showModal(){this.open=true}close(){this.open=false}get firstElementChild(){return this.children[0]}getBoundingClientRect(){return{x:0,y:0,left:0,top:0,width:1000,height:563}}click(){this.listeners.click?.({stopPropagation(){}});this.onclick?.()}}
const elements=new Map();const $=id=>{if(!elements.has(id))elements.set(id,new Node());return elements.get(id)};
globalThis.document={getElementById:$,createElement:()=>new Node(),addEventListener(){}};globalThis.window={speechSynthesis:{cancel(){},getVoices(){return[{lang:'fr-FR',name:'Thomas'}]},speak(){}}};globalThis.speechSynthesis=window.speechSynthesis;globalThis.SpeechSynthesisUtterance=class{};globalThis.Image=Node;
for(const id of ['frigo-toggle','four-toggle'])$(id).append(new Node());
await import('../app.js');
const{MISSIONS,getZone}=await import('../model.js');
$('start').click();assert.equal($('palette').children.length,20);assert.equal($('progress').textContent,'1 / 10');
$('frigo-toggle').click();$('four-toggle').click();
for(let i=0;i<10;i++){const m=MISSIONS.find(m=>m.text===$('instruction').textContent),z=getZone(m.zone);const b=$('palette').children.find(b=>b.dataset.object===m.object);b.click();$('scene').listeners.click({clientX:z.point[0]*1000,clientY:z.point[1]*563});assert.equal($('check').disabled,false,m.id);$('check').click();assert.ok($('feedback').textContent.startsWith('Bravo'),m.id+' '+$('feedback').textContent);assert.equal($('next').hidden,false);$('next').click();}
assert.equal($('finish').open,true);$('restart').click();assert.equal($('progress').textContent,'1 / 10');assert.equal($('finish').open,false);$('home-button').click();assert.equal($('home').hidden,false);assert.equal($('game').hidden,true);
console.log('PASS parcours applicatif : sélection, placement, 10 vérifications, portes, fin, nouvelle partie, accueil (DOM simulé, sans rendu).');
