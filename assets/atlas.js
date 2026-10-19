(()=>{'use strict';
const DATA=[
 {name:'Texte & idées',glyph:'Aa',desc:"Clarifier une pensée, écrire un premier jet ou faire ressortir l'essentiel d'un document.",path:'./catalogue.html',color:[.60,.70,.69],p:[1.92,.98,-.10]},
 {name:'Images & création',glyph:'◈',desc:'Imaginer des concepts visuels, produire des illustrations et les contrôler avant diffusion.',path:'./catalogue.html',color:[.72,.65,.53],p:[.44,1.99,.44]},
 {name:'Développement',glyph:'</>',desc:'Prototyper une interface, comprendre du code et tester ce qui a été créé.',path:'./catalogue.html',color:[.48,.58,.68],p:[-1.72,1.06,.44]},
 {name:'Vidéo & son',glyph:'▶',desc:'Préparer un script, explorer la voix et organiser un montage.',path:'./catalogue.html',color:[.71,.56,.49],p:[-1.86,-1.09,-.14]},
 {name:'Automatisation',glyph:'↗',desc:'Relier des étapes répétitives avec une vérification humaine à chaque décision sensible.',path:'./fiches.html#flux',color:[.42,.58,.58],p:[-.30,-2.00,.41]},
 {name:'Recherche & analyse',glyph:'⌕',desc:'Explorer des sources, comparer des documents et vérifier les informations.',path:'./catalogue.html',color:[.54,.55,.67],p:[1.79,-1.16,-.30]}
];
const canvas=document.getElementById('atlas3d');if(!canvas)return;
const scene=document.getElementById('scene'),buttons=[...document.querySelectorAll('[data-family]')];
const title=document.getElementById('familyTitle'),desc=document.getElementById('familyDesc');
const glyph=document.getElementById('familyGlyph'),counter=document.getElementById('familyCounter'),link=document.getElementById('familyLink');
const toggle=document.getElementById('rotateToggle');
const media=window.matchMedia('(prefers-reduced-motion: reduce)');
let active=0,paused=media.matches,angleY=.31,angleX=-.22,drag=null,moved=false,lastFrame=0,inView=true,gl=null,ctx=null,app=null;
const PI=Math.PI;
const identity=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
const mul=(a,b)=>{const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o};
const trans=(x,y,z)=>{let a=identity();a[12]=x;a[13]=y;a[14]=z;return a};
const scale=(x,y,z)=>{let a=identity();a[0]=x;a[5]=y;a[10]=z;return a};
const rx=t=>{let a=identity(),c=Math.cos(t),s=Math.sin(t);a[5]=c;a[6]=s;a[9]=-s;a[10]=c;return a};
const ry=t=>{let a=identity(),c=Math.cos(t),s=Math.sin(t);a[0]=c;a[2]=-s;a[8]=s;a[10]=c;return a};
const rz=t=>{let a=identity(),c=Math.cos(t),s=Math.sin(t);a[0]=c;a[1]=s;a[4]=-s;a[5]=c;return a};
const perspective=(fov,aspect,near,far)=>{const f=1/Math.tan(fov/2),m=new Float32Array(16);m[0]=f/aspect;m[5]=f;m[10]=(far+near)/(near-far);m[11]=-1;m[14]=2*far*near/(near-far);return m};
const transform=(m,p)=>[m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14]];
const group=()=>mul(ry(angleY),rx(angleX));
let projector=()=>[0,0,0];
function family(index){active=index;const d=DATA[index];title.textContent=d.name;desc.textContent=d.desc;glyph.textContent=d.glyph;counter.textContent='UNIVERS '+String(index+1).padStart(2,'0')+' / 06';link.href=d.path;
buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.setAttribute('aria-pressed',String(i===index))});
const label=scene.querySelector('.scene-bottom p');if(label)label.textContent=String(index+1).padStart(2,'0')+' / '+d.name;draw(performance.now())}
buttons.forEach(b=>b.addEventListener('click',()=>family(Number(b.dataset.family))));
function sphere(rows=25,cols=38){const pos=[],norm=[],ids=[];for(let i=0;i<=rows;i++){const v=i/rows,theta=v*PI;for(let j=0;j<=cols;j++){const a=j/cols*2*PI,s=Math.sin(theta),x=Math.cos(a)*s,y=Math.cos(theta),z=Math.sin(a)*s;pos.push(x,y,z);norm.push(x,y,z)}}for(let i=0;i<rows;i++)for(let j=0;j<cols;j++){const a=i*(cols+1)+j,b=a+cols+1;ids.push(a,a+1,b,b,a+1,b+1)}return{pos,norm,ids}}
function torus(segments=108,tubeSegments=9){const pos=[],norm=[],ids=[];for(let i=0;i<=segments;i++){const a=i/segments*2*PI,ca=Math.cos(a),sa=Math.sin(a);for(let j=0;j<=tubeSegments;j++){const b=j/tubeSegments*2*PI,cb=Math.cos(b),sb=Math.sin(b),r=2.0+.026*cb;pos.push(r*ca,r*sa,.026*sb);norm.push(ca*cb,sa*cb,sb)}}for(let i=0;i<segments;i++)for(let j=0;j<tubeSegments;j++){const a=i*(tubeSegments+1)+j,b=a+tubeSegments+1;ids.push(a,b,a+1,b,b+1,a+1)}return{pos,norm,ids}}
function setupGL(){try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,powerPreference:'low-power'});if(!gl)throw Error('webgl unavailable');const vert='attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uMvp;uniform mat4 uModel;varying vec3 vNormal;varying vec3 vPos;void main(){vec4 w=uModel*vec4(aPosition,1.0);vPos=w.xyz;vNormal=mat3(uModel)*aNormal;gl_Position=uMvp*vec4(aPosition,1.0);}';
const frag='precision mediump float;varying vec3 vNormal;varying vec3 vPos;uniform vec3 uColor;uniform float uMetal;void main(){vec3 n=normalize(vNormal);vec3 light=normalize(vec3(-.7,1.0,2.3));float diff=max(dot(n,light),0.0);float rim=pow(1.0-max(dot(n,normalize(vec3(0.,0.,1.))),0.0),3.0);float spec=pow(max(dot(reflect(-light,n),vec3(0.,0.,1.)),0.0),22.0);vec3 c=uColor*(.55+.53*diff)+vec3(.85,.91,.88)*spec*(.28+uMetal*.35)+vec3(.94,.96,.91)*rim*.13;gl_FragColor=vec4(c,1.0);}';
const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s)||'shader');return s};
const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vert));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,frag));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'link');gl.useProgram(program);
const mesh=(data)=>{const inter=[];for(let i=0;i<data.pos.length/3;i++)inter.push(...data.pos.slice(3*i,3*i+3),...data.norm.slice(3*i,3*i+3));const v=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,v);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(inter),gl.STATIC_DRAW);const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data.ids),gl.STATIC_DRAW);return{v,ib,count:data.ids.length}};
app={program,sphere:mesh(sphere()),ring:mesh(torus()),attrib:{pos:gl.getAttribLocation(program,'aPosition'),normal:gl.getAttribLocation(program,'aNormal')},uni:{mvp:gl.getUniformLocation(program,'uMvp'),model:gl.getUniformLocation(program,'uModel'),color:gl.getUniformLocation(program,'uColor'),metal:gl.getUniformLocation(program,'uMetal')}};
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);return true;
}catch(err){console.warn('Rendu WebGL indisponible, affichage 2D accessible.',err);gl=null;return false}}
function drawMesh(mesh,world,color,metal,proj,view){gl.useProgram(app.program);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.v);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ib);gl.enableVertexAttribArray(app.attrib.pos);gl.vertexAttribPointer(app.attrib.pos,3,gl.FLOAT,false,24,0);gl.enableVertexAttribArray(app.attrib.normal);gl.vertexAttribPointer(app.attrib.normal,3,gl.FLOAT,false,24,12);
gl.uniformMatrix4fv(app.uni.mvp,false,mul(proj,mul(view,world)));gl.uniformMatrix4fv(app.uni.model,false,world);gl.uniform3fv(app.uni.color,color);gl.uniform1f(app.uni.metal,metal);gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_SHORT,0)}
function dimensions(){const rect=canvas.getBoundingClientRect();return{w:Math.max(rect.width,1),h:Math.max(rect.height,1),d:Math.min(devicePixelRatio||1,1.5)}}
function resize(){const d=dimensions();const w=Math.floor(d.w*d.d),h=Math.floor(d.h*d.d);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;if(ctx)ctx.setTransform(d.d,0,0,d.d,0,0)}draw(performance.now())}
function makeProjector(g,w,h,dist){const f=1/Math.tan(PI/5.5/2);return p=>{const t=transform(g,p),z=Math.max(1,dist-t[2]),sx=w/2+t[0]*f/z*h/2,sy=h/2-t[1]*f/z*h/2;return[sx,sy,t[2]]}}
function renderFallback(g,d,time){ctx.clearRect(0,0,d.w,d.h);const project=makeProjector(g,d.w,d.h,d.w<450?10:9);projector=project;const points=DATA.map((v,i)=>({...v,p2:project(v.p),i})).sort((a,b)=>a.p2[2]-b.p2[2]);
ctx.save();ctx.lineWidth=1.5;ctx.strokeStyle='#a9b7b1';for(let r=0;r<3;r++){ctx.beginPath();ctx.ellipse(d.w/2,d.h/2,Math.min(d.w,d.h)*.32,Math.min(d.w,d.h)*(.16+r*.035),r*PI/3,0,2*PI);ctx.stroke()}const cx=d.w/2,cy=d.h/2;let grad=ctx.createRadialGradient(cx-31,cy-43,4,cx,cy,Math.min(d.w,d.h)*.15);grad.addColorStop(0,'#f9f9f4');grad.addColorStop(.35,'#acbab6');grad.addColorStop(1,'#425a5e');ctx.fillStyle=grad;ctx.beginPath();ctx.arc(cx,cy,Math.min(d.w,d.h)*.15,0,2*PI);ctx.fill();
for(const item of points){const[x,y]=item.p2,rad=Math.max(12,Math.min(d.w,d.h)*(.039+(item.i===active?.014:0)));ctx.shadowColor='#546b6977';ctx.shadowBlur=14;ctx.shadowOffsetY=11;let gradient=ctx.createRadialGradient(x-rad*.32,y-rad*.4,1,x,y,rad*1.1);gradient.addColorStop(0,'#f5f4ed');gradient.addColorStop(.28,'#acb8b1');gradient.addColorStop(1,item.i===active?'#566c76':'#70817e');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(x,y,rad,0,2*PI);ctx.fill();ctx.shadowBlur=ctx.shadowOffsetY=0;if(item.i===active){ctx.strokeStyle='#394f55';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,rad+5,0,2*PI);ctx.stroke()}}ctx.restore()}
function draw(time){if(!canvas.width)return;const d=dimensions(),dist=d.w<450?10.4:9.2,g=group();projector=makeProjector(g,d.w,d.h,dist);
if(!gl){if(ctx){renderFallback(g,d,time);scene.dataset.rendered='true'}return}const proj=perspective(PI/5.5,d.w/d.h,.1,90),view=trans(0,0,-dist);
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
drawMesh(app.ring,mul(g,mul(rx(.67),scale(1,1,1))),[.66,.73,.69],.45,proj,view);
drawMesh(app.ring,mul(g,mul(ry(1.06),mul(rx(.29),scale(1.12,1.12,1.12)))),[.61,.65,.63],.45,proj,view);
drawMesh(app.ring,mul(g,mul(rx(1.39),scale(.84,.84,.84))),[.75,.68,.61],.65,proj,view);
drawMesh(app.sphere,mul(g,scale(.88,.88,.88)),[.46,.58,.61],1,proj,view);
DATA.forEach((item,i)=>{const pulse=media.matches||paused?0:Math.sin(time*.0014+i)*.018;const r=(i===active?.35:.275)+pulse;
drawMesh(app.sphere,mul(g,mul(trans(...item.p),scale(r,r,r))),item.color,.8,proj,view)});
scene.dataset.rendered='true'}
function choosePointer(event){const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top,d=dimensions();let best=-1,score=Infinity;DATA.forEach((item,i)=>{const p=projector(item.p),dist=Math.hypot(p[0]-x,p[1]-y);if(dist<score){score=dist;best=i}});if(best>=0&&score<Math.max(34,Math.min(d.w,d.h)*.07)){family(best);return true}return false}
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,ax:angleX,ay:angleY};moved=false;canvas.classList.add('dragging');canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;if(moved){angleY=drag.ay+dx*.007;angleX=Math.max(-1.15,Math.min(1.15,drag.ax+dy*.006));draw(performance.now())}});
canvas.addEventListener('pointerup',e=>{if(!drag)return;if(!moved)choosePointer(e);drag=null;canvas.classList.remove('dragging')});
canvas.addEventListener('pointercancel',()=>{drag=null;canvas.classList.remove('dragging')});
toggle.addEventListener('click',()=>{paused=!paused;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Relancer le mouvement ▶':'Arrêter le mouvement Ⅱ'});
function start(){if(!setupGL())ctx=canvas.getContext('2d');if(!gl&&!ctx){canvas.style.display='none';return}resize();const io=new IntersectionObserver(items=>{inView=items[0].isIntersecting});io.observe(scene);new ResizeObserver(resize).observe(scene);media.addEventListener?.('change',()=>{paused=media.matches;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Relancer le mouvement ▶':'Arrêter le mouvement Ⅱ'});let prev=0;
function tick(time){requestAnimationFrame(tick);if(document.hidden||!inView||media.matches||paused||drag)return;if(time-prev<33)return;const dt=Math.min(time-prev,60);prev=time;angleY+=dt*.00038;draw(time)}
requestAnimationFrame(tick);family(0);if(paused){toggle.setAttribute('aria-pressed','true');toggle.textContent='Relancer le mouvement ▶'}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();