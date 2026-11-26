import test from 'node:test';import assert from 'node:assert/strict';
import {marketBasketLayout} from '../market-basket.js';
test('Chaque quantité de 1 à 30 donne des emplacements entièrement visibles et sans chevauchement',()=>{
 for(let n=1;n<=30;n++){
  const slots=marketBasketLayout(n);assert.equal(slots.length,n);
  for(const s of slots){assert.ok(s.x-s.w/2>=6.5-1e-8);assert.ok(s.x+s.w/2<=23.5+1e-8);assert.ok(s.y-s.h/2>=62-1e-8);assert.ok(s.y+s.h/2<=77+1e-8);assert.ok(s.w>0&&s.h>0);}
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const a=slots[i],b=slots[j];assert.ok(Math.abs(a.x-b.x)>=(a.w+b.w)/2||Math.abs(a.y-b.y)>=(a.h+b.h)/2,`${n}: ${i}/${j}`);}
 }
});
test('La taille diminue seulement lorsque le contenu exige davantage de place',()=>{assert.ok(marketBasketLayout(3)[0].w>marketBasketLayout(12)[0].w);assert.ok(marketBasketLayout(12)[0].w>marketBasketLayout(30)[0].w);assert.deepEqual(marketBasketLayout(0),[]);});
