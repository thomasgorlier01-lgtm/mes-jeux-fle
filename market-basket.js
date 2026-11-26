// Shared geometry for the same illustrated basket in both market activities.
const ASPECT=1672/941;
export function marketBasketLayout(count){
 if(!Number.isInteger(count)||count<0||count>30)throw new RangeError('Basket capacity: 0–30');
 if(!count)return [];
 const gap=.18,width=17,height=15/ASPECT;
 let best=null;
 for(let cols=1;cols<=count;cols++){
  const rows=Math.ceil(count/cols),size=Math.min(5,(width-gap*(cols-1))/cols,(height-gap*(rows-1))/rows);
  if(size>0&&(!best||size>best.size))best={cols,rows,size};
 }
 const {cols,rows,size}=best,pitch=size+gap;
 return Array.from({length:count},(_,i)=>{
  const row=Math.floor(i/cols),col=i%cols,rowCount=Math.min(cols,count-row*cols);
  return {x:15+(col-(rowCount-1)/2)*pitch,y:69.5+(row-(rows-1)/2)*pitch*ASPECT,w:size,h:size*ASPECT};
 });
}
let zoomId=0;
export function mountMarketBasketZoom({host,image,getItems}){
 const ns='http://www.w3.org/2000/svg';
 if(!document.getElementById('market-basket-zoom-style')){
  const style=document.createElement('style');style.id='market-basket-zoom-style';style.textContent=`
   .market-basket-zoom-button{font:inherit;font-weight:700;border:1px solid #d9c9e3;border-radius:12px;padding:10px 14px;margin:8px 0;background:#f5eff9;color:#6b5081;cursor:pointer;min-height:44px}.market-basket-zoom-button:disabled{opacity:.45;cursor:default}
   .market-basket-dialog{width:min(900px,94vw);max-height:94dvh;border:1px solid #dac8b5;border-radius:20px;padding:14px;background:#fffaf0;color:#473b51}.market-basket-dialog::backdrop{background:#30233499}.market-basket-zoom-header{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:10px}.market-basket-zoom-header h2{margin:0;font:700 22px system-ui}.market-basket-zoom-header p{margin:3px 0;font:16px system-ui}.market-basket-zoom-close{min-height:44px;padding:10px 16px;border:1px solid #d9c9e3;border-radius:12px;background:#f5eff9;color:#6b5081;font:700 16px system-ui;cursor:pointer}.market-basket-zoom-stage{width:min(850px,calc((94dvh - 110px)*1.359));max-width:100%;margin:auto}.market-basket-zoom-stage svg{display:block;width:100%;height:auto;border-radius:12px}
  `;document.head.append(style);
 }
 const button=document.createElement('button');button.type='button';button.className='market-basket-zoom-button';button.textContent='Agrandir le panier';host.append(button);
 const dialog=document.createElement('dialog');dialog.className='market-basket-dialog';const id='market-basket-title-'+(++zoomId);dialog.setAttribute('aria-labelledby',id);
 const header=document.createElement('div');header.className='market-basket-zoom-header';const text=document.createElement('div'),title=document.createElement('h2'),count=document.createElement('p');title.id=id;title.textContent='Mon panier';text.append(title,count);
 const close=document.createElement('button');close.type='button';close.className='market-basket-zoom-close';close.textContent='Fermer';header.append(text,close);const stage=document.createElement('div');stage.className='market-basket-zoom-stage';dialog.append(header,stage);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>button.focus({preventScroll:true}));
 button.addEventListener('click',()=>{
  const items=getItems(),slots=marketBasketLayout(items.length);count.textContent=items.length+' fruit'+(items.length>1?'s':'');
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','2 57 26 34');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('width','850');svg.setAttribute('height',String(850/(26/34*ASPECT)));svg.setAttribute('role','img');svg.setAttribute('aria-label','Panier contenant '+items.length+' fruits');
  function picture(href,attrs){const img=document.createElementNS(ns,'image');img.setAttribute('href',new URL(href,document.baseURI).href);img.setAttribute('preserveAspectRatio','none');for(const [key,value]of Object.entries(attrs))img.setAttribute(key,String(value));return img;}
  svg.append(picture(image,{x:0,y:0,width:100,height:100}));
  items.forEach((item,i)=>{const s=slots[i];svg.append(picture(item.image,{x:s.x-s.w/2,y:s.y-s.h/2,width:s.w,height:s.h,'data-basket-item':item.id}));});
  const defs=document.createElementNS(ns,'defs'),clip=document.createElementNS(ns,'clipPath'),polygon=document.createElementNS(ns,'polygon');clip.id=id+'-front';polygon.setAttribute('points','3.3,75.4 7,78.2 14,80.1 20.4,78.4 26.1,75.4 25.7,84.3 23,88.7 9,90.5 5,87');clip.append(polygon);defs.append(clip);svg.append(defs,picture(image,{x:0,y:0,width:100,height:100,'clip-path':'url(#'+clip.id+')'}));stage.replaceChildren(svg);dialog.showModal();close.focus();
 });
 return {button,refresh(){button.disabled=getItems().length===0;}};
}
