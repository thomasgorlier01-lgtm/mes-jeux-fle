
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/index.html','utf8'),script=html.match(/<script>([\s\S]*)<\/script>/)[1];
function element(){return {children:[],disabled:false,hidden:false,textContent:'',attrs:{},classList:{add(){},remove(){}},setAttribute(k,v){this.attrs[k]=v},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]}}}
const elements={}; const document={getElementById:id=>elements[id]??=element(),createElement:()=>element()};
const context=vm.createContext({document,console});vm.runInContext(script,context);
const evaluate=s=>vm.runInContext(s,context);
(async()=>{
assert.equal(evaluate('MONSTRES.length'),15);
let portraits=[];
for(let n=1;n<=3;n++){
evaluate('setLevel('+n+')');
assert.equal(elements.grid.children.length,15);
for(let id=1;id<=15;id++){
evaluate('queue[0]='+id+';show()');
const c=evaluate('MONSTRES['+(id-1)+']'),parts=evaluate('clues(MONSTRES['+(id-1)+'],'+n+')'),desc=elements.clue.textContent;
assert.equal(evaluate('MONSTRES.filter(x=>clues(MONSTRES['+(id-1)+'],'+n+').every(p=>p.test(x))).length'),1);
assert.ok(parts.every(p=>p.test(c)));
assert.ok((desc.match(/\bne |\bn’/g)||[]).length<=(n===3?1:0));
if(n===1)assert.ok(!/bleu|vert|noir|marron|blond|brun|roux|chapeau|lunettes|boucles/.test(desc));
assert.ok(evaluate('portrait(MONSTRES['+(id-1)+'],'+n+')').includes(evaluate('EYE_COLORS[MONSTRES['+(id-1)+'].eyeColor]')));
}
evaluate('restart()');assert.equal(evaluate('new Set(queue).size'),10);
evaluate('choose(queue[0],document.getElementById("grid").children[queue[0]-1])');assert.equal(evaluate('score'),1);
evaluate('choose(queue[0],document.getElementById("grid").children[queue[0]-1])');assert.equal(evaluate('score'),1);
elements.next.onclick();assert.equal(evaluate('index'),1);
evaluate('restart()');for(let j=0;j<3;j++){evaluate('choose(queue[index]===1?2:1,document.getElementById("grid").children[0])');elements.next.onclick()}assert.equal(evaluate('lives'),0);assert.equal(elements.finish.hidden,false);
evaluate('restart()');assert.equal(elements.next.textContent,'Question suivante →');assert.equal(elements.finish.hidden,true);
for(let j=0;j<10;j++){evaluate('choose(queue[index],document.getElementById("grid").children[queue[index]-1])');elements.next.onclick()}
assert.equal(evaluate('score'),10);assert.equal(evaluate('over'),true);
}
console.log('PASS: 45 descriptions vraies et uniques, couleurs, négations, 3 niveaux, 10 questions, score, vies, fin et redémarrage.');
})().catch(e=>{console.error(e);process.exitCode=1});
