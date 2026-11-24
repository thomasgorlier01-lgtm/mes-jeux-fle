import {mountOralOrder,foodLabel} from '../oral-order.js?v=1';
import {FOODS} from './logic.js?v=3';
const setup=()=>mountOralOrder({question:"Et toi, qu’est-ce que tu veux manger pour le pique-nique ?",orderTitle:"Mon pique-nique",pickerTitle:"Les aliments du pique-nique",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FOODS.map(f=>({id:f.id,label:foodLabel(f.id,f.word),image:`assets/${f.id}.webp`}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
