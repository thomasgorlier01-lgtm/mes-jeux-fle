// Les valeurs multiples désignent un détail visuel ambigu : toute valeur
// possible est conservée pour que le contrôle d’unicité reste prudent.
export function matchesDescription(character, clues) {
  return Object.entries(clues).every(([key, value]) => {
    const actual = character.traits[key];
    return Array.isArray(actual) ? actual.includes(value) : actual === value;
  });
}
export function matchingCharacterIds(characters, clues) {
  return characters.filter(c => matchesDescription(c, clues)).map(c => c.id);
}
const number = {1:'un',2:'deux',3:'trois',4:'quatre',6:'six'};
export function describe(clues) {
  const {eyes, arms, legs} = clues;
  const parts = [`Il a ${number[eyes]} ${eyes === 1 ? 'œil' : 'yeux'}, ${number[arms]} bras et ${number[legs]} jambes.`];
  if (clues.hairColor) parts.push(`Il a les cheveux ${clues.hairLength ? clues.hairLength + ' et ' : ''}${clues.hairColor}.`);
  else if (clues.hairLength) parts.push(`Il a les cheveux ${clues.hairLength}.`);
  if (clues.beard === true) parts.push('Il a une barbe.');
  if (clues.moustache === true) parts.push(clues.beard === false ? 'Il a une moustache, mais pas de barbe.' : 'Il a une moustache.');
  else if (clues.beard === false && clues.moustache === false) parts.push('Il n’a ni barbe ni moustache.');
  else if (clues.beard === false) parts.push('Il n’a pas de barbe.');
  else if (clues.moustache === false) parts.push('Il n’a pas de moustache.');
  const accessories = [];
  if (clues.headwear && clues.headwear !== 'aucun') {
    const cap = clues.headwear === 'casquette';
    const feminine = {violet:'violette',bleu:'bleue',vert:'verte',noir:'noire',jaune:'jaune'};
    const color = clues.headwearColor ? ' ' + (cap ? feminine[clues.headwearColor] : clues.headwearColor) : '';
    accessories.push(`${cap ? 'une' : 'un'} ${clues.headwear}${color}`);
  }
  if (clues.glasses === true) accessories.push('des lunettes');
  if (clues.earrings === true) accessories.push('des boucles d’oreilles');
  if (accessories.length) parts.push('Il porte ' + accessories.slice(0,-1).join(', ') + (accessories.length > 1 ? ' et ' : '') + accessories.at(-1) + '.');
  return parts.join(' ');
}
