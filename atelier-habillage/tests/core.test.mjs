import test from 'node:test';
import assert from 'node:assert/strict';
import catalog from '../catalog.js';
import {startGame,selectItem,clearOutfit,checkOutfit,revealSolution,nextRound,canCheck,describeRound,describeItem,signature,availableCategories} from '../logic.js';
const seeded=()=>{let n=123456;return ()=>((n=(n*1664525+1013904223)>>>0)/4294967296)};
test('10 tenues uniques, alternance, tous les types et couleurs, aucune robe avec haut/bas',()=>{
 for(let i=0;i<100;i++){
  const s=startGame(catalog);assert.equal(s.rounds.length,10);const cats=new Set(),colors=new Set(),signatures=new Set();
  s.rounds.forEach((r,index)=>{assert.equal(r.avatar,index%2===0?'garcon':'fille');assert.ok(r.expected.robe||r.expected.haut&&r.expected.bas);assert.ok(!(r.expected.robe&&(r.expected.haut||r.expected.bas)));signatures.add(signature(r.expected));for(const id of Object.values(r.expected)){const x=catalog.elements.find(x=>x.id===id);assert.ok(x);cats.add(x.categorie);colors.add(x.couleur)}});
  assert.equal(signatures.size,10);assert.equal(cats.size,17);assert.equal(colors.size,7);
 }
});
test('remplacement et retrait des couches, veste et chaussettes conservées',()=>{
 let s=startGame(catalog,seeded());s={...s,round:1};for(const id of ['tshirt_rouge','short_vert','veste_jaune','chaussettes_rose'])s=selectItem(s,catalog,id);
 s=selectItem(s,catalog,'robe_violet');assert.equal(s.selection.haut,undefined);assert.equal(s.selection.bas,undefined);assert.equal(s.selection.veste,'veste_jaune');assert.equal(s.selection.chaussettes,'chaussettes_rose');
 s=selectItem(s,catalog,'chemise_bleu');assert.equal(s.selection.robe,undefined);assert.equal(s.selection.haut,'chemise_bleu');s=selectItem(s,catalog,'chemise_bleu');assert.equal(s.selection.haut,undefined);
 s=clearOutfit(s);assert.deepEqual(s.selection,{});assert.equal(s.lives,3);
});
test('mauvaise réponse : une vie, aucun point, pas de double pénalité sans changement',()=>{
 let s=startGame(catalog,seeded());s=checkOutfit(s);assert.equal(s.lives,2);assert.equal(s.score,0);assert.equal(canCheck(s),false);assert.equal(checkOutfit(s),s);
 s=selectItem(s,catalog,'tshirt_rouge');assert.equal(canCheck(s),true);s=checkOutfit(s);assert.equal(s.lives,1);
 s=selectItem(s,catalog,'short_bleu');s=checkOutfit(s);assert.equal(s.lives,0);assert.equal(s.phase,'out-of-lives');assert.equal(selectItem(s,catalog,'jupe_rouge'),s);
 s=revealSolution(s);assert.equal(s.phase,'solution');assert.deepEqual(s.selection,s.rounds[0].expected);assert.equal(s.score,0);s=nextRound(s);assert.equal(s.round,1);assert.equal(s.lives,3);assert.deepEqual(s.selection,{});
});
test('bonne tenue exacte, extras refusés, points une seule fois et fin après 10',()=>{
 let s=startGame(catalog,seeded());const expected=s.rounds[0].expected;const extra=catalog.elements.find(x=>!expected[x.emplacement]);if(extra){const bad=checkOutfit({...s,selection:{...expected,[extra.emplacement]:extra.id}});assert.equal(bad.phase,'playing');assert.equal(bad.lives,2)}
 for(let n=0;n<10;n++){s=checkOutfit({...s,selection:{...s.rounds[s.round].expected}});assert.equal(s.score,n+1);assert.equal(s.phase,'success');assert.equal(checkOutfit(s),s);s=nextRound(s)}assert.equal(s.phase,'finished');assert.equal(s.score,10);
});
test('accords français et pronoms',()=>{
 const d=id=>describeItem(catalog.elements.find(x=>x.id===id));assert.equal(d('veste_bleu'),'une veste bleue');assert.equal(d('baskets_vert'),'des baskets vertes');assert.equal(d('chaussettes_violet'),'des chaussettes violettes');assert.equal(d('gants_vert'),'des gants verts');assert.equal(d('lunettes_violet'),'des lunettes violettes');
 const s=startGame(catalog,seeded());assert.match(describeRound(s.rounds[0],catalog),/^Il porte /);assert.match(describeRound(s.rounds[1],catalog),/^Elle porte /);
});

test('accessoires indépendants et uniquement trois types de chaussures',()=>{
 assert.deepEqual([...new Set(catalog.elements.filter(x=>x.emplacement==='chaussures').map(x=>x.categorie))].sort(),['baskets','bottes','sandales']);
 assert.equal(catalog.categories.length,17);assert.equal(catalog.elements.length,119);assert.equal(new Set(catalog.categories.map(x=>x.previewColor)).size,17);
 let s=startGame(catalog,seeded());for(const id of ['lunettes_bleu','gants_rouge','bonnet_vert','veste_jaune'])s=selectItem(s,catalog,id);
 assert.equal(s.selection.lunettes,'lunettes_bleu');assert.equal(s.selection.gants,'gants_rouge');assert.equal(s.selection.coiffure,'bonnet_vert');assert.equal(s.selection.veste,'veste_jaune');
});

test('niveau 1 : cinq catégories seulement, dix tenues uniques et aucun accessoire avancé',()=>{
 for(let i=0;i<100;i++){const s=startGame(catalog,Math.random,1);const allowed=['tshirt','pantalon','baskets','jupe','chapeau_classique'];assert.equal(availableCategories(catalog,1).length,5);assert.equal(new Set(s.rounds.map(r=>signature(r.expected))).size,10);for(const round of s.rounds){assert.equal(Object.keys(round.expected).length,4);assert.deepEqual(round.negativeSlots,[]);for(const id of Object.values(round.expected))assert.ok(allowed.includes(catalog.elements.find(x=>x.id===id).categorie));}assert.equal(selectItem(s,catalog,'gants_rouge'),s);}
});
test('niveau 3 : négations vraies, phrases alternées et refus d’un accessoire interdit',()=>{
 for(let i=0;i<100;i++){let s=startGame(catalog,Math.random,3);for(const round of s.rounds){assert.ok(round.negativeSlots.length>=1);for(const slot of round.negativeSlots)assert.equal(round.expected[slot],undefined);const text=describeRound(round,catalog);assert.match(text,/ (ne porte|n’a)/);assert.ok(text.indexOf(' porte ')<text.indexOf(' ne porte ')||text.indexOf(' porte ')<text.indexOf(' n’a '));assert.match(text,/\. (Il|Elle) porte /);}
 const round=s.rounds[0],slot=round.negativeSlots[0],extra=catalog.elements.find(x=>x.emplacement===slot);s={...s,selection:{...round.expected,[slot]:extra.id}};s=checkOutfit(s);assert.equal(s.phase,'playing');assert.equal(s.lives,2);s=selectItem(s,catalog,extra.id);s=checkOutfit(s);assert.equal(s.phase,'success');}
});

test('robes et jupes réservées aux filles, filles aussi en pantalon ou short, aucun cow-boy',()=>{
 for(const level of [1,2,3])for(let i=0;i<100;i++){const s=startGame(catalog,Math.random,level);let neutralGirls=0,feminineGirls=0;for(const r of s.rounds){const cats=Object.values(r.expected).map(id=>catalog.elements.find(x=>x.id===id).categorie);assert.ok(!cats.includes('chapeau_cowboy'));if(r.avatar==='garcon')assert.ok(!cats.some(x=>['robe','jupe'].includes(x)));else if(cats.some(x=>['robe','jupe'].includes(x)))feminineGirls++;else neutralGirls++;}assert.ok(neutralGirls>0);assert.ok(feminineGirls>0);assert.equal(selectItem(s,catalog,'robe_rouge'),s);assert.equal(selectItem(s,catalog,'jupe_rouge'),s);assert.ok(!availableCategories(catalog,level,'garcon').some(x=>['robe','jupe'].includes(x.id)));}
});
