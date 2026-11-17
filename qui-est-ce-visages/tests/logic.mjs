import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {newGame,answer,matches} from '../logic.js';
const data=JSON.parse(await readFile(new URL('../data.json',import.meta.url)));
const audio=JSON.parse(await readFile(new URL('../assets/audio.json',import.meta.url)));
let lines=0;
for(const [level,{board,characters}] of Object.entries(data)){
 assert.equal(characters.length,board);
 for(const c of characters){
  assert.deepEqual(characters.filter(x=>matches(x,c.clues)).map(x=>x.id),[c.id],`Description ambiguë : niveau ${level}, personnage ${c.id}`);
  for(const line of c.lines){assert.ok(audio[line.audio]);assert.equal(audio[line.audio].text,line.speech);assert.ok(audio[line.audio].end>audio[line.audio].start);lines++;}
  if(+level<3){assert.ok(!Object.values(c.clues).includes(false));assert.ok(!c.clues.chauve);assert.ok(!c.lines.some(x=>/chauve|n’a pas/.test(x.text)));}
  else {assert.equal(c.lines.filter(x=>x.text.includes('mais')).length,1);assert.ok(Object.values(c.clues).includes(false));}
  if(+level===1)for(const key of ['lunettes','chapeau','boucles','cheveuxCouleur','moustache','barbe'])assert.ok(!(key in c.clues));
  for(const key of ['cheveuxCouleur','barbeCouleur','moustacheCouleur'])assert.ok(!['gris','blancs','grise','blanche'].includes(c.clues[key]));
 }
 for(let i=0;i<20;i++){
  const s=newGame(characters);assert.equal(s.lives,5);assert.equal(new Set(s.targets.map(c=>c.id)).size,10);
  while(s.status==='playing')assert.equal(answer(s,s.targets[s.round].id),'correct');assert.equal(s.status,'won');assert.equal(s.round,10);assert.equal(s.lives,5);assert.equal(answer(s,1),'ignored');
 }
 const s=newGame(characters),wrong=characters.filter(c=>c.id!==s.targets[0].id).slice(0,5);
 answer(s,wrong[0].id);assert.equal(s.lives,4);assert.equal(answer(s,wrong[0].id),'ignored');assert.equal(s.lives,4);
 for(const c of wrong.slice(1))answer(s,c.id);assert.equal(s.status,'lost');assert.equal(s.lives,0);assert.equal(answer(s,s.targets[0].id),'ignored');
 const fresh=newGame(characters),bad=characters.find(c=>c.id!==fresh.targets[0].id);answer(fresh,bad.id);answer(fresh,fresh.targets[0].id);assert.deepEqual(fresh.wrong,[]);assert.equal(fresh.lives,4);
}
console.log(`63 descriptions uniques, ${lines} lignes audio, 3 niveaux, victoires/défaites et cinq vies vérifiés.`);
