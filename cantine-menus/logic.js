import {FOODS,GROUPS,foodById} from './data.js?v=1';
export const emptyTray=()=>Object.fromEntries(GROUPS.map(group=>[group,null]));
export const signature=menu=>GROUPS.map(group=>menu[group]).join('|');
export const matches=(selected,expected)=>GROUPS.every(group=>selected[group]===expected[group]);
export function choose(selected,id){const food=foodById(id);if(!food)return selected;return {...selected,[food.group]:selected[food.group]===id?null:id};}
export function describe(menu){return [
 `Bonjour, je voudrais ${foodById(menu.proteine).phrase} avec ${foodById(menu.feculent).phrase} et ${foodById(menu.legume).phrase}.`,
 `Pour le dessert, je voudrais ${foodById(menu.dessert).phrase}.`,
 `Et pour boire, je voudrais ${foodById(menu.boisson).phrase}.`
];}
export const audioKeys=(menu,avatar)=>['intro',...GROUPS.map(group=>menu[group])].map(key=>`${avatar}-${key}`);
function shuffle(items,random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export function allMenus(){return GROUPS.reduce((menus,group)=>menus.flatMap(menu=>FOODS.filter(f=>f.group===group).map(food=>({...menu,[group]:food.id}))),[{}]);}
export function newMenus(random=Math.random){
 for(let attempt=0;attempt<30;attempt++){
  const bags=Object.fromEntries(GROUPS.map(group=>{const ids=FOODS.filter(f=>f.group===group).map(f=>f.id);let bag=[];while(bag.length<10)bag.push(...shuffle(ids,random));return [group,bag.slice(0,10)];}));
  const menus=Array.from({length:10},(_,i)=>Object.fromEntries(GROUPS.map(group=>[group,bags[group][i]])));
  if(new Set(menus.map(signature)).size===10)return menus;
 }
 return shuffle(allMenus(),random).slice(0,10);
}
