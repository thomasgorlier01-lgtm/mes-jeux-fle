// Recorded neutral voices, decoded once and played at precise segment boundaries.
export class SpeechPlayer {
 constructor(onError){this.onError=onError;this.context=null;this.buffers=new Map();this.sources=[];this.generation=0;this.button=null;this.ready=fetch('assets/audio.json').then(r=>{if(!r.ok)throw Error();return r.json();});this.ready.catch(()=>{});}
 stop(){this.generation++;for(const source of this.sources){source.onended=null;try{source.stop();}catch{}source.disconnect();}this.sources=[];this.button?.classList.remove('playing');this.button=null;}
 async play(keys,button){
  this.stop();const generation=this.generation;
  try{
   if(!this.context)this.context=new (window.AudioContext||window.webkitAudioContext)();
   const resume=this.context.resume();const data=await this.ready;await resume;if(generation!==this.generation)return;
   const entries=keys.map(key=>{if(!data[key])throw Error('Extrait absent');return data[key];});this.button=button;button?.classList.add('playing');
   const decoded=await Promise.all(entries.map(entry=>{if(!this.buffers.has(entry.file))this.buffers.set(entry.file,fetch(entry.file).then(r=>{if(!r.ok)throw Error();return r.arrayBuffer();}).then(b=>this.context.decodeAudioData(b)).catch(e=>{this.buffers.delete(entry.file);throw e;}));return this.buffers.get(entry.file);}));
   if(generation!==this.generation)return;let when=this.context.currentTime+.035;
   entries.forEach((entry,i)=>{const source=this.context.createBufferSource();source.buffer=decoded[i];source.connect(this.context.destination);this.sources.push(source);const duration=Math.min(entry.end,source.buffer.duration)-entry.start;if(duration<=0)throw Error('Extrait vide');if(i===entries.length-1)source.onended=()=>{if(generation===this.generation){for(const s of this.sources)s.disconnect();this.sources=[];this.button?.classList.remove('playing');this.button=null;}};source.start(when,entry.start,duration);when+=duration+(i===0?.15:.1);});
  }catch{if(generation===this.generation){this.stop();this.onError('Le son n’a pas pu être lu. Clique à nouveau sur 🔊 pour réessayer.');}}
 }
}
