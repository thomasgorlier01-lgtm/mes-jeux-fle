// Build recordings from the vocabulary actually used by the approved descriptions.
export function speechInventory(avatar,catalog){
 const p=avatar==='garcon'?'Il':'Elle',lower=p.toLowerCase();
 const descriptions=category=>[...new Set(catalog.elements.filter(x=>x.categorie===category&&!x.emotion).map(x=>x.description))];
 const phrases=[
  ...descriptions('yeux').map(x=>`${p} a ${x}`),
  ...['cheveux','nez','oreilles'].flatMap(descriptions),
  ...descriptions('bouche').map(x=>'et '+x),
  ...['chapeau','lunettes','boucles'].flatMap(descriptions),
  ...['lunettes','boucles'].flatMap(descriptions).map(x=>'et '+x),
  `${p} a`,`${p} porte`,`mais ${lower} a`,
  ...['de chapeau','de lunettes','de boucles d’oreilles'].flatMap(x=>[`${p} n’a pas ${x}`,`mais ${lower} n’a pas ${x}`]),
  ...(avatar==='garcon'?['content','triste','fâché','malade','surpris']:['contente','triste','fâchée','malade','surprise']).map(x=>`${p} est ${x}`)
 ];
 return [...new Set(phrases)].map((text,i)=>({id:`${avatar}-${String(i).padStart(3,'0')}`,text,avatar}));
}
const lexicons=new WeakMap();
export function planSpeech(text,avatar,recordings){
 if(!lexicons.has(recordings))lexicons.set(recordings,new Map());
 const cached=lexicons.get(recordings);
 if(!cached.has(avatar))cached.set(avatar,Object.entries(recordings).filter(([key])=>key.startsWith(avatar+'-')).map(([key,value])=>({key,text:value.text,lower:value.text.toLowerCase()})).sort((a,b)=>b.text.length-a.text.length));
 const lexicon=cached.get(avatar),plan=[];let cursor=0;
 while(cursor<text.length){
  const separator=text.slice(cursor).match(/^[\s,.!?]+/)?.[0]||'';
  if(separator){cursor+=separator.length;if(plan.length)plan.at(-1).pauseAfter=separator.includes('.')?.38:separator.includes(',')?.18:.08;}
  if(cursor>=text.length)break;
  const rest=text.slice(cursor).toLowerCase();
  const match=lexicon.find(x=>rest.startsWith(x.lower)&&(!rest[x.text.length]||/[\s,.!?]/.test(rest[x.text.length])));
  if(!match)throw Error('Expression audio absente : '+text.slice(cursor,Math.min(text.length,cursor+65)));
  plan.push({key:match.key,pauseAfter:.08});cursor+=match.text.length;
 }
 if(!plan.length)throw Error('Description vide');
 return plan;
}
