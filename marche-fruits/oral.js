import {mountOralOrder,foodLabel} from '../oral-order.js?v=1';
import {FRUITS,limit,phrase} from './logic.js?v=1';
const setup=()=>mountOralOrder({question:"Quels fruits veux-tu acheter au marché ?",orderTitle:"Mon panier",pickerTitle:"Les fruits du marché",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FRUITS.map(f=>({id:f.id,label:f.word,image:`assets/${f.id}.webp`,max:limit(f.id),quantityLabel:n=>phrase(f.id,n)}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
