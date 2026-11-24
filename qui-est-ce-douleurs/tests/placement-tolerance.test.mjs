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
const arms=[{x:.31,y:.45},{x:.70,y:.45},{x:.245,y:.525},{x:.765,y:.525},{x:.205,y:.56},{x:.805,y:.56}];
const paired={
 bras:arms,
 main:[{x:.195,y:.590},{x:.820,y:.590},...fingers],
 oeil:[{x:.40,y:.20},{x:.605,y:.20}],
 oreille:[{x:.26,y:.26},{x:.75,y:.26}],
 epaule:[{x:.32,y:.39},{x:.69,y:.39}],
 genou:[{x:.39,y:.735},{x:.63,y:.735}],
 pied:[{x:.28,y:.94},{x:.735,y:.95}],
 jambe:legs,
 doigt:fingers
};
test('toutes les parties paires acceptent les deux côtés et leurs différentes zones utiles',()=>{for(const avatar of ['garcon','fille'])for(const[pain,points]of Object.entries(paired))for(const p of points)assert.ok(BODY_ZONES[avatar][pain].some(z=>isInZone(p,z)),`${avatar} ${pain} ${JSON.stringify(p)}`);});
test('niveaux 2 et 3 : bras entiers, mains et autres parties paires ne coûtent aucun cœur',()=>{const prep={bras:'au',main:'à la',oeil:'à l’',oreille:'à l’',epaule:'à l’',genou:'au',pied:'au',jambe:'à la',doigt:'au'};for(const avatar of ['garcon','fille'])for(const level of [2,3])for(const[pain,points]of Object.entries(paired))for(const p of points){let s=newGrammar(level);const pains=level===2?[pain]:[pain,'ventre','nez'];s.rounds[0]={avatar,pronoun:avatar==='garcon'?'Il':'Elle',pains};s.choices={[pain]:prep[pain],ventre:'au',nez:'au'};s.placements=[mark(p,1),...(level===3?[mark(BODY_ZONES[avatar].ventre[0],2),mark(BODY_ZONES[avatar].nez[0],3)]:[])];s=verifyGrammar(s,BODY_ZONES[avatar]);assert.equal(s.phase,'correct',`${avatar} ${pain}`);assert.equal(s.lives,3);}});
test('les yeux et oreilles au pluriel demandent toujours un soin de chaque côté',()=>{for(const avatar of ['garcon','fille'])for(const[pain,singular]of [['yeux','oeil'],['oreilles','oreille']]){let s=newGrammar(2);s.rounds[0]={avatar,pronoun:'Il',pains:[pain]};s.choices={[pain]:'aux'};const z=BODY_ZONES[avatar][singular];s.placements=[mark(z[0],1),mark(z[0],2)];s=verifyGrammar(s,BODY_ZONES[avatar]);assert.equal(s.phase,'playing');assert.equal(s.lives,2);s.placements=s.placements.filter(p=>p.locked);s.placements.push(mark(z[1],3));s=verifyGrammar(s,BODY_ZONES[avatar]);assert.equal(s.phase,'correct');assert.equal(s.lives,2);}});
