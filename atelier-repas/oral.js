import {mountOralOrder,foodLabel} from '../oral-order.js?v=4';
import foods from './data.js?v=3';
const setup=()=>mountOralOrder({number:4,question:"Et toi, qu’est-ce que tu veux manger ?",orderTitle:"Mon plateau",pickerTitle:"Les aliments et les boissons",customers:['../compose-salade/assets/garcon.webp','../compose-salade/assets/fille.webp'],items:foods.map(f=>({id:f.id,label:foodLabel(f.id,f.phrase),image:f.image})),home:'#level-home',menu:'.level-grid',hide:['.title-row']});

if(document.readyState==='complete')setup();else window.addEventListener('DOMContentLoaded',setup,{once:true});
