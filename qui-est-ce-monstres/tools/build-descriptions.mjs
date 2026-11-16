import {readFile,writeFile} from 'node:fs/promises';
import {describe,matchingCharacterIds} from '../description-logic.mjs';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('characters.json',root),'utf8'));
for(const c of data){
  c.description=describe(c.clues);
  const matches=matchingCharacterIds(data,c.clues);
  if(matches.length!==1||matches[0]!==c.id)throw Error(`Description ${c.id} ambiguë : ${matches.join(', ')}`);
}
await writeFile(new URL('characters.json',root),JSON.stringify(data,null,2)+'\n');
await writeFile(new URL('data.js',root),'export const CHARACTERS = '+JSON.stringify(data,null,2)+';\n');
console.log('24 descriptions reconstruites et vérifiées parmi les 24 personnages.');
