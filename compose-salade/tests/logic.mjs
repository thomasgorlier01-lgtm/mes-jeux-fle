import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {FOODS,QUANTITIES} from '../data.js';
import {newGame,roundsFor,describe,signature,choose,check,next,audioKeys} from '../logic.js';
const meta=JSON.parse(await fs.readFile(new URL('../assets/audio.json',import.meta.url)));
for(const step of [1,2])for(let n=0;n<100;n++){
 const state=newGame(step);assert.equal(state.lives,5);assert.equal(state.rounds.length,10);
 const seen=new Set();
 for(const [i,r] of state.rounds.entries()){
  assert.equal(r.avatar,i%2?'fille':'garcon');assert.deepEqual([...r.options].sort((a,b)=>a-b),QUANTITIES);
  const sig=step===1?r.food+r.quantity:signature(r.expected);assert.ok(!seen.has(sig));seen.add(sig);
  assert.ok(!describe(r,step).includes('undefined'));assert.ok(!describe(r,step).includes('sans '));
  for(const key of audioKeys(r,step)){assert.ok(meta[key]);assert.ok(meta[key].end>meta[key].start);}
  if(step===2){assert.equal(Object.keys(r.expected).length,2);assert.deepEqual(Object.values(r.expected).sort(),[1,5]);assert.ok(!r.expected[r.absent]);assert.equal(new Set([r.first,r.second,r.absent]).size,3);assert.match(describe(r,step),/, mais pas d[’e]/);}
 }
 for(let i=0;i<10;i++){const r=state.rounds[i];if(step===2)for(const [id,q] of Object.entries(r.expected))choose(state,id,q);assert.equal(check(state,r.quantity),'correct');assert.equal(check(state,r.quantity),'ignored');next(state);}assert.equal(state.status,'won');assert.equal(state.lives,5);
}
const s=newGame(2);for(const q of [1,5]){choose(s,s.rounds[0].absent,q);assert.equal(check(s),'wrong');const lives=s.lives;assert.equal(check(s),'ignored');assert.equal(s.lives,lives);}assert.equal(s.lives,3);
const correct=s.rounds[0].expected;s.selection={...correct,[s.rounds[0].absent]:1};assert.equal(check(s),'wrong');s.selection={...correct,[FOODS.find(f=>!correct[f.id]&&f.id!==s.rounds[0].absent).id]:1};assert.equal(check(s),'wrong');s.selection={};assert.equal(check(s),'wrong');assert.equal(s.status,'lost');assert.equal(s.lives,0);assert.equal(check(s),'ignored');
const r=newGame(1);const first=r.rounds[0],bad=QUANTITIES.find(q=>q!==first.quantity);assert.equal(check(r,bad),'wrong');assert.equal(check(r,bad),'ignored');assert.equal(r.lives,4);check(r,first.quantity);next(r);assert.equal(r.lives,4);assert.deepEqual(r.wrong,[]);
assert.ok(new Set(Array.from({length:20},()=>JSON.stringify(roundsFor(2).map(x=>x.expected)))).size>1);
console.log('Deux étapes, 200 parties, 2 000 questions, commandes distinctes, accords, audio, quantités et cinq vies vérifiés.');
