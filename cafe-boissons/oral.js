import {mountOralOrder,foodLabel} from '../oral-order.js?v=1';
import {DRINKS} from './logic.js?v=1';
const setup=()=>mountOralOrder({question:"Qu’est-ce que tu veux boire au café ?",orderTitle:"Ma commande",pickerTitle:"Les boissons",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:DRINKS.map(f=>({id:f.id,label:f.word,image:`assets/${f.id}.webp`}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
