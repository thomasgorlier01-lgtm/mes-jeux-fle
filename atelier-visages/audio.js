import {planSpeech} from './speech.js?v=1';
// Prerecorded neutral voices; no browser speech service and no pitch effects.
export class DescriptionAudio {
 constructor(onState){this.onState=onState;this.context=null;this.sources=[];this.buffers=new Map();this.generation=0;this.active=false;this.ready=fetch('assets/description-audio.json').then(r=>{if(!r.ok)throw Error('Audio absent');return r.json();});this.ready.catch(()=>{});}
 stop(){this.generation++;for(const s of this.sources){s.onended=null;try{s.stop();}catch{}s.disconnect();}this.sources=[];this.active=false;this.onState('idle');}
 async play(text,avatar){
  this.stop();const generation=this.generation;this.active=true;this.onState('loading');
  try{
   // Resume in the user's click before any download, including on mobile Safari.
   if(!this.context)this.context=new (window.AudioContext||window.webkitAudioContext)();
   const resumed=this.context.resume(),recordings=await this.ready;await resumed;
   if(generation!==this.generation)return;
   const plan=planSpeech(text,avatar,recordings),files=[...new Set(plan.map(x=>recordings[x.key].file))];
   const resolved=await Promise.all(files.map(file=>{if(!this.buffers.has(file))this.buffers.set(file,fetch(file).then(r=>{if(!r.ok)throw Error('Fichier audio absent');return r.arrayBuffer();}).then(bytes=>this.context.decodeAudioData(bytes)).catch(error=>{this.buffers.delete(file);throw error;}));return this.buffers.get(file);}));
   if(generation!==this.generation)return;
   const decoded=new Map(files.map((file,i)=>[file,resolved[i]]));
   let when=this.context.currentTime+.04;
   plan.forEach((part,i)=>{const clip=recordings[part.key],source=this.context.createBufferSource();source.buffer=decoded.get(clip.file);source.connect(this.context.destination);const duration=clip.end-clip.start;if(duration<=0||clip.end>source.buffer.duration+.02)throw Error('Extrait invalide');this.sources.push(source);if(i===plan.length-1)source.onended=()=>{if(generation===this.generation){for(const s of this.sources)s.disconnect();this.sources=[];this.active=false;this.onState('idle');}};source.start(when,clip.start,duration);when+=duration+part.pauseAfter;});
   this.onState('playing');
  }catch{if(generation===this.generation){this.stop();this.onState('error');}}
 }
}
