import {mountOralOrder,foodLabel} from '../oral-order.js?v=3';
import {FRUITS,limit,phrase} from './logic.js?v=1';
const setup=()=>mountOralOrder({pickerAction:'add',hideNames:true,scene:{type:'market',image:'assets/scene-abricots-v2.webp',crops:[{x:0,y:10,w:28,h:86}]},question:"Quels fruits veux-tu acheter au marché ?",orderTitle:"Mon panier",pickerTitle:"Les fruits du marché",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FRUITS.map(f=>({id:f.id,label:f.word,image:`assets/${f.id}.webp`,max:3,quantityLabel:n=>phrase(f.id,n)}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
