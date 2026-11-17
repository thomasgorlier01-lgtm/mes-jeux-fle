import {FOODS} from './data.js';
const one=[[0,0]],many=[[-9,-13],[9,-10],[-12,8],[10,12],[0,0]];
export function plate(selection,extra=''){
 const p=document.createElement('div');p.className='plate '+extra;
 const bed=document.createElement('div');bed.className='lettuce';p.append(bed);
 for(let i=0;i<7;i++){const img=new Image();img.src='assets/salade.webp';img.alt='';img.style.cssText=`left:${17+(i%3)*22}%;top:${18+Math.floor(i/3)*21}%;transform:rotate(${i*47}deg)`;bed.append(img);}
 const chosen=FOODS.filter(f=>selection[f.id]>0),centers=chosen.length<=1?[[50,50]]:chosen.length===2?[[29,50],[71,50]]:[[30,28],[70,28],[29,72],[71,72],[50,50],[50,18]];
 chosen.forEach((food,index)=>{const [cx,cy]=centers[index],q=selection[food.id];for(const [i,[dx,dy]] of (q===1?one:many).entries()){const img=new Image();img.src='assets/'+food.image;img.alt='';img.dataset.ingredient=food.id;img.dataset.portion=q;img.className='piece';const scale=chosen.length>2?16:chosen.length===1?24:21;img.style.cssText=`left:${cx+dx}%;top:${cy+dy}%;width:${scale}%;transform:translate(-50%,-50%) rotate(${i*29-10}deg)`;p.append(img);}});
 return p;
}
