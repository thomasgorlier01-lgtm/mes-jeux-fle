// One pointer gesture for mouse, touch and pen. Short taps keep their native click.
export function createPointerDrag({canStart,begin,move,drop,cancel,now=Date.now}){
 let gesture=null,lastDrop=null;
 function release(g){try{g.target.releasePointerCapture(g.pointerId);}catch{}}
 function abort(){const g=gesture;if(!g)return;gesture=null;release(g);if(g.started)cancel();}
 function bind(target,getObject){
  target.addEventListener('pointerdown',e=>{
   if(gesture||e.button!==0||e.isPrimary===false||!canStart())return;
   const object=getObject();if(!object)return;
   gesture={target,object,pointerId:e.pointerId,x:e.clientX,y:e.clientY,started:false};
   try{target.setPointerCapture(e.pointerId);}catch{}
  });
  target.addEventListener('pointermove',e=>{
   const g=gesture;if(!g||g.target!==target||g.pointerId!==e.pointerId)return;
   if(!g.started&&Math.hypot(e.clientX-g.x,e.clientY-g.y)<8)return;
   if(!g.started){g.started=true;begin(g.object);}
   e.preventDefault();move(e.clientX,e.clientY);
  });
  target.addEventListener('pointerup',e=>{
   const g=gesture;if(!g||g.target!==target||g.pointerId!==e.pointerId)return;
   gesture=null;release(g);
   if(!g.started)return;
   e.preventDefault();lastDrop={x:e.clientX,y:e.clientY,until:now()+200};
   drop(e.clientX,e.clientY);
  });
  for(const event of ['pointercancel','lostpointercapture'])target.addEventListener(event,e=>{if(gesture?.target===target&&gesture.pointerId===e.pointerId)abort();});
 }
 return {bind,cancel:abort,ignoresClick(e){return !!lastDrop&&now()<lastDrop.until&&Math.hypot(e.clientX-lastDrop.x,e.clientY-lastDrop.y)<4;}};
}
