import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {describe, matchingCharacterIds} from '../description-logic.mjs';
const characters = JSON.parse(await readFile(new URL('../characters.json',import.meta.url),'utf8'));
// Relevé effectué visuellement, indépendant des descriptions générées.
const anatomy = [[1,2,2],[2,4,2],[3,4,2],[2,2,3],[1,2,4],[2,2,2],[3,4,3],[2,2,2],
 [2,2,2],[3,4,2],[1,2,3],[2,4,2],[3,2,3],[2,2,4],[1,4,2],[2,2,3],
 [2,4,2],[3,2,2],[2,2,3],[1,2,4],[2,4,2],[3,2,4],[2,2,2],[1,4,3]];
assert.equal(characters.length,24);
assert.equal(new Set(characters.map(c=>c.description)).size,24);
const allowed = new Set(['eyes','arms','legs','hairColor','hairLength','beard','moustache','headwear','headwearColor','glasses','earrings']);
for (const [i,c] of characters.entries()) {
  assert.deepEqual([c.eyes,c.arms,c.legs],anatomy[i],`Anatomie ${c.id}`);
  assert.deepEqual([c.traits.eyes,c.traits.arms,c.traits.legs],anatomy[i]);
  assert.deepEqual([c.clues.eyes,c.clues.arms,c.clues.legs],anatomy[i]);
  assert.equal(c.description,describe(c.clues),`Texte synchronisé ${c.id}`);
  for (const key of Object.keys(c.clues)) {
    assert(allowed.has(key),`Indice hors périmètre ${key}`);
    assert(!Array.isArray(c.traits[key]),`Indice ambigu sélectionné pour ${c.id}: ${key}`);
  }
  assert(!/\b(peau|fleur|papillon)\b/iu.test(c.description));
  assert.deepEqual(matchingCharacterIds(characters,c.clues),[c.id],`La description ${c.id} doit désigner un seul personnage`);
}
// La comparaison doit aussi détecter les ambiguïtés des anciens indices.
const withoutFacialHair = {...characters[18].clues};
delete withoutFacialHair.beard; delete withoutFacialHair.moustache;
assert.deepEqual(matchingCharacterIds(characters,withoutFacialHair),[16,19]);
const withoutBeardExclusion = {...characters[20].clues};
delete withoutBeardExclusion.beard;
assert.deepEqual(matchingCharacterIds(characters,withoutBeardExclusion),[12,21]);
console.log('24/24 descriptions exactes selon la matrice relue, uniques parmi les 24 et synchronisées ; ambiguïtés 16/19 et 12/21 détectées par les tests.');
