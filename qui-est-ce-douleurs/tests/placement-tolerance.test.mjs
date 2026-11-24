import test from 'node:test';
import assert from 'node:assert/strict';
import {BODY_ZONES} from '../body-zones.js';
import {isInZone,newInfirmary,verifyInfirmary} from '../infirmary-logic.js';
import {newGrammar,verifyGrammar} from '../grammar-logic.js';
// Points relevés sur les deux portraits : cuisses, mollets, pouces et doigts.
const legs=[{x:.40,y:.695},{x:.61,y:.698},{x:.405,y:.815},{x:.615,y:.832},{x:.405,y:.878},{x:.61,y:.877}];
const fingers=[{x:.116,y:.578},{x:.163,y:.581},{x:.128,y:.623},{x:.165,y:.642},{x:.209,y:.644},{x:.244,y:.634},{x:.888,y:.579},{x:.847,y:.581},{x:.876,y:.623},{x:.846,y:.640},{x:.803,y:.646},{x:.764,y:.634}];
const mark=(p,id)=>({id,type:'plaster',...p,locked:false});
test('garçon et fille : cuisses, mollets et bas des deux jambes acceptés',()=>{for(const avatar of ['garcon','fille'])for(const point of legs)assert.ok(BODY_ZONES[avatar].jambe.some(z=>isInZone(point,z)),`${avatar} jambe ${JSON.stringify(point)}`);});
test('garçon et fille : pouce et quatre autres doigts acceptés sur les deux mains',()=>{for(const avatar of ['garcon','fille'])for(const point of fingers)assert.ok(BODY_ZONES[avatar].doigt.some(z=>isInZone(point,z)),`${avatar} doigt ${JSON.stringify(point)}`);});
test('aucun cœur perdu au niveau 1 selon le côté, la cuisse/le mollet ou le doigt choisi',()=>{for(const avatar of ['garcon','fille'])for(const leg of legs)for(const finger of fingers){let s=newInfirmary();s.rounds[0]={avatar,pronoun:avatar==='garcon'?'Il':'Elle',pains:['jambe','doigt','nez']};s.placements=[mark(leg,1),mark(finger,2),mark(BODY_ZONES[avatar].nez[0],3)];s=verifyInfirmary(s,BODY_ZONES[avatar]);assert.equal(s.phase,'correct');assert.equal(s.lives,3);}});
test('niveaux 2 et 3 : mêmes tolérances sans pénaliser les prépositions correctes',()=>{for(const avatar of ['garcon','fille'])for(const level of [2,3])for(const leg of legs)for(const finger of fingers){for(const single of level===2?['jambe','doigt']:['both']){let s=newGrammar(level);const pains=single==='both'?['jambe','doigt','nez']:[single];s.rounds[0]={avatar,pronoun:avatar==='garcon'?'Il':'Elle',pains};s.choices={jambe:'à la',doigt:'au',nez:'au'};s.placements=single==='both'?[mark(leg,1),mark(finger,2),mark(BODY_ZONES[avatar].nez[0],3)]:[mark(single==='jambe'?leg:finger,1)];s=verifyGrammar(s,BODY_ZONES[avatar]);assert.equal(s.phase,'correct');assert.equal(s.lives,3);}}});
test('la marge ne valide pas le ventre comme une jambe ni les pieds comme des doigts',()=>{for(const avatar of ['garcon','fille']){const z=BODY_ZONES[avatar];assert.ok(!z.jambe.some(zone=>isInZone(z.ventre[0],zone)));assert.ok(!z.doigt.some(zone=>isInZone(z.pied[0],zone)));}});
