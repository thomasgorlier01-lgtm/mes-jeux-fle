import {mountOralOrder,foodLabel} from '../oral-order.js?v=4';
import {FOODS} from './data.js?v=1';
const setup=()=>mountOralOrder({question:"Qu’est-ce que tu veux manger à la cantine ?",orderTitle:"Mon plateau",pickerTitle:"Le menu de la cantine",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FOODS.map(f=>({id:f.id,label:foodLabel(f.id,f.phrase),image:`assets/${f.id}.webp`}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
