import {mountOralOrder,foodLabel} from '../oral-order.js?v=2';
import {FOODS} from './logic.js?v=3';
const setup=()=>mountOralOrder({scene:{type:'picnic',image:'assets/scene.webp',crops:[{x:0,y:9,w:28,h:65,bread:14.2},{x:72,y:9,w:28,h:65,bread:83.2}]},question:"Et toi, qu’est-ce que tu veux manger pour le pique-nique ?",orderTitle:"Mon sandwich",pickerTitle:"Les aliments du pique-nique",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:FOODS.map(f=>({id:f.id,label:foodLabel(f.id,f.word),image:`assets/${f.id}.webp`,servedImage:`assets/garniture-${f.id}-v3.webp`}))});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
