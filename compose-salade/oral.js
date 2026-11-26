import {mountOralOrder,foodLabel} from '../oral-order.js?v=4';
import {FOODS} from './data.js';
const setup=()=>mountOralOrder({question:"Qu’est-ce que tu veux mettre dans ta salade ?",orderTitle:"Ma salade",pickerTitle:"Les ingrédients",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FOODS.map(f=>({id:f.id,label:f.name,image:`assets/${f.image}`})),menu:'.step-cards'});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
