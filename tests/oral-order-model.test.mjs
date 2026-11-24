import test from 'node:test';
import assert from 'node:assert/strict';
import {createCafeOrder} from '../oral-order-model.js';
test('trois amis peuvent commander trois boissons identiques',()=>{const c=createCafeOrder();c.choose('eau');c.choose('eau');c.choose('eau');assert.deepEqual(c.drinks,['eau','eau','eau']);});
test('modifier ou retirer une boisson ne change pas les deux autres',()=>{const c=createCafeOrder();c.choose('eau');c.choose('the');c.choose('cafe');c.focus(1);c.choose('lait');assert.deepEqual(c.drinks,['eau','lait','cafe']);c.remove(0);assert.deepEqual(c.drinks,[null,'lait','cafe']);assert.equal(c.active,0);});
test('cliquer de nouveau la boisson active la retire',()=>{const c=createCafeOrder();c.choose('eau');c.focus(0);c.choose('eau');assert.deepEqual(c.drinks,[null,null,null]);});
test('nouvel élève vide les trois commandes et remet la première place active',()=>{const c=createCafeOrder();c.choose('eau');c.choose('lait');c.choose('cafe');c.clear();assert.deepEqual(c.drinks,[null,null,null]);assert.equal(c.active,0);});
test('les indices de places invalides ne modifient pas la commande',()=>{const c=createCafeOrder();assert.equal(c.focus(-1),false);assert.equal(c.focus(3),false);assert.equal(c.remove(9),false);assert.equal(c.choose(''),false);assert.deepEqual(c.drinks,[null,null,null]);});
