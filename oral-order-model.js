// Three seats may order the same drink. Choosing is independent of vocabulary cards.
export function createCafeOrder(size=3){
 const drinks=Array(size).fill(null);let active=0;
 return{
  get active(){return active;},get drinks(){return drinks.slice();},
  focus(index){if(!Number.isInteger(index)||index<0||index>=size)return false;active=index;return true;},
  choose(id){if(typeof id!=='string'||!id)return false;const removed=drinks[active]===id;drinks[active]=removed?null:id;if(!removed){for(let offset=1;offset<size;offset++){const i=(active+offset)%size;if(!drinks[i]){active=i;break;}}}return true;},
  remove(index){if(!Number.isInteger(index)||index<0||index>=size)return false;drinks[index]=null;active=index;return true;},
  clear(){drinks.fill(null);active=0;}
 };
}
