import test from 'node:test';
import assert from 'node:assert/strict';
import catalog from '../catalog.js';
import {availableItems,startGame,selectItem,describeRound} from '../logic.js';
import {planSpeech} from '../speech.js';
import {readFile} from 'node:fs/promises';
const recordings=JSON.parse(await readFile(new URL('../assets/description-audio.json',import.meta.url)));
test('niveau 2 : uniquement le chapeau classique, dans le choix et dans les commandes',()=>{
 for(const avatar of ['garcon','fille']){
  const hats=availableItems(catalog,'chapeau',avatar,2);
  assert.equal(hats.length,7);
  for(const h of hats){assert.match(h.id,/^chapeau_classique_/);assert.match(h.description,/^un chapeau /);assert.doesNotMatch(h.description,/classique/);}
 }
 for(let i=0;i<100;i++){
  const state=startGame(catalog,Math.random,2);
  for(const round of state.rounds){if(round.expected.chapeau)assert.match(round.expected.chapeau,/^chapeau_classique_/);assert.doesNotMatch(describeRound(round,catalog),/bonnet|casquette|classique/);assert.ok(planSpeech(describeRound(round,catalog),round.avatar,recordings).length);}
  for(const id of ['casquette_bleu','bonnet_rouge'])assert.equal(selectItem(state,catalog,id),state);
  assert.equal(selectItem(state,catalog,'chapeau_classique_bleu').selection.chapeau,'chapeau_classique_bleu');
 }
});
test('niveau 3 : chapeau, casquette et bonnet toujours disponibles et audibles',()=>{
 for(const avatar of ['garcon','fille']){
  const hats=availableItems(catalog,'chapeau',avatar,3);assert.equal(hats.length,21);
  for(const type of ['chapeau_classique','casquette','bonnet'])assert.equal(hats.filter(h=>h.id.startsWith(type+'_')).length,7);
 }
 const state=startGame(catalog,Math.random,3);
 for(const id of ['chapeau_classique_bleu','casquette_bleu','bonnet_bleu']){
  assert.equal(selectItem(state,catalog,id).selection.chapeau,id);
  const round={...state.rounds[0],expected:{...state.rounds[0].expected,chapeau:id,lunettes:'lunettes_bleu'},negativeSlots:['boucles']};
  const text=describeRound(round,catalog);assert.ok(text.includes(catalog.elements.find(x=>x.id===id).description));assert.ok(planSpeech(text,round.avatar,recordings).length);
 }
});
