/* =====================================================================
   REMAKE — reproduire une vidéo d'inspiration calque par calque.
   Scène "type":"remake" : la vidéo face caméra + des calques minutés
   (mots animés, objets, cartes, compteur…) devant OU derrière la personne
   (masques de prepare.py --masks). Les temps sont en secondes depuis t0.
   La fiche de mouvement vient de l'analyse reanimate (outils/reanimate) :
   voir references/remake.md.
   ===================================================================== */
(function(){
const FONTS=[['Inter','inter-latin-900-italic.woff2','900','italic'],['Inter','inter-latin-800-italic.woff2','800','italic'],['Inter','inter-latin-300-italic.woff2','300','italic']];
const prev=window.SHORT_READY;
window.SHORT_READY=(async()=>{if(prev)await prev;for(const [f,file,w,s] of FONTS){try{const ff=new FontFace(f,`url(/__engine/fonts/${file})`,{weight:w,style:s});document.fonts.add(await ff.load())}catch(e){}}})();

const TAU=Math.PI*2;
const inout=v=>{v=cl(v);return v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2};
/* entrée / sortie d'un calque : k = 0→1 à l'entrée, 1→0 à la sortie */
function life(lt,L,din=.18,dout=.15){const a=L.at||0,o=L.out??1e9;if(lt<a||lt>=o)return 0;return Math.min(rp(lt,a,a+(L.din??din)),1-rp(lt,o-(L.dout??dout),o))}
function age(lt,L){return lt-(L.at||0)}

/* ---------- textes ---------- */
const STY={
 thin:{w:300,size:5.2},
 bold:{w:900,size:7.6},
 glow:{w:900,size:7.6,glow:true},
 orange:{w:900,size:8.6,grad:['v',['#ffb15c',0],['#ff6a1f',.5],['#ff2d14',1]],soft:'rgba(255,80,20,.55)'},
 purple:{w:900,size:5.6,grad:['h',['#b06cff',0],['#ff5fcf',1]],a:.8},
 metal:{w:900,size:8,grad:['v',['#ffffff',0],['#dbe5ee',.42],['#6f8aa6',.56],['#c4d4e2',1]],sh:'rgba(0,0,0,.45)'},
 ice:{w:900,size:7.4,grad:['v',['#f2fbff',0],['#a9dcf3',.6],['#79c3e6',1]],sh:'rgba(0,0,0,.35)'},
 duo:{w:900,size:8,grad:['h',['#20a8ff',0],['#3f7dff',.38],['#e3198a',.62],['#ff2f6d',1]],sh:'rgba(0,0,0,.35)'},
 big:{w:900,size:12,sh:'rgba(0,0,0,.45)'},
 label:{w:800,size:2.6,sh:'rgba(0,0,0,.5)'}};
function fillFor(st,w,size){if(!st.grad)return st.col||'#fff';const [dir,...stops]=st.grad;const g=dir=='h'?x.createLinearGradient(-w/2,0,w/2,0):x.createLinearGradient(0,-size*.55,0,size*.45);stops.forEach(([c,p])=>g.addColorStop(p,c));return g}
function glowBlob(X,Y,rx,ry,a,col='255,84,24'){if(a<=0)return;x.save();x.globalCompositeOperation='screen';x.translate(X,Y);x.scale(1,ry/rx);const g=x.createRadialGradient(0,0,0,0,0,rx);g.addColorStop(0,`rgba(${col},${.95*a})`);g.addColorStop(.35,`rgba(${col},${.6*a})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.beginPath();x.arc(0,0,rx,0,TAU);x.fill();x.restore()}
let TS=1;
function drawText(L,lt){const k=life(lt,L);if(k<=0)return;const st=Object.assign({},STY[L.style||'bold'],L.st||{});const size=u*(L.size||st.size)*(st.w>=800&&!L.fixed?TS:Math.sqrt(TS)),X=W*(L.x??.5),Y=H*(L.y??.55);
 const kin=rp(age(lt,L),0,L.din??.18),out=L.out!=null?rp(lt,L.out-(L.dout??.15),L.out):0;
 const heavy=st.w>=800;const sc=(heavy?1.18-.18*eo(kin):1.06-.06*eo(kin))*(1+.06*out);const blur=(1-eo(kin))*u*1.6+out*u*1.8;
 if(st.glow&&L.z!='back'){const g=eo(kin)*(1-out);glowBlob(X,Y+size*.7,W*.55,size*1.9,g);glowBlob(X,Y+size*.25,W*.3,size*.9,g*.75,'255,150,60');glowBlob(X,Y+size*1.3,W*.45,size*1.4,g*.6,'255,60,20')}
 x.save();x.translate(X,Y);if(L.rot)x.rotate(L.rot);x.scale(sc,sc);x.globalAlpha*=cl(k*1.3)*(st.a??1);if(blur>.3)x.filter=`blur(${blur.toFixed(1)}px)`;
 x.font=`italic ${st.w} ${size}px Inter, ${C.brand.font}`;x.textAlign=L.al||'center';x.textBaseline='middle';x.letterSpacing=(L.ls??(heavy?-size*.03:-size*.01))+'px';
 let w=x.measureText(L.text).width;if(L.max&&w>W*L.max){const s2=W*L.max/w;x.scale(s2,s2);w=W*L.max}
 const ox=L.al=='left'?w/2:L.al=='right'?-w/2:0;x.translate(ox,0);x.textAlign='center';
 if(st.sh){x.shadowColor=st.sh;x.shadowBlur=size*.22;x.shadowOffsetY=size*.05}
 if(st.glow){x.shadowColor='rgba(255,90,30,.9)';x.shadowBlur=size*.5}
 if(st.soft){x.shadowColor=st.soft;x.shadowBlur=size*.45}
 x.fillStyle=fillFor(st,w,size);x.fillText(L.text,0,0);
 if(st.glow){x.shadowColor='transparent';const g=x.createLinearGradient(0,-size*.5,0,size*.5);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.75,'rgba(255,170,110,.0)');g.addColorStop(1,'rgba(255,120,60,.55)');x.fillStyle=g;x.fillText(L.text,0,0)}
 x.restore()}

/* ---------- points d'interrogation ---------- */
function qmarks(L,lt){const k=life(lt,L,.01,.2);if(k<=0)return;const t=age(lt,L);const P=L.items||[[.18,.3,.055,-.25],[.33,.19,.085,-.12],[.52,.11,.105,.05],[.7,.2,.075,.15],[.84,.31,.06,.22],[.6,.33,.045,.3]];
 P.forEach(([px,py,s,r],i)=>{const kk=back(rp(t,i*.05,i*.05+.3));if(kk<=0)return;const size=H*s*(L.scale||1),X=W*px+Math.sin(t*2.2+i)*u*.6,Y=H*py+Math.cos(t*1.8+i*1.7)*u*.8;
  x.save();x.translate(X,Y);x.rotate(r+Math.sin(t*1.5+i)*.06);x.scale(kk,kk);x.globalAlpha*=cl(k);x.font=`italic 900 ${size}px Inter, ${C.brand.font}`;x.textAlign='center';x.textBaseline='middle';
  const white=i==4;const g=x.createLinearGradient(-size*.3,-size*.5,size*.3,size*.5);if(white){g.addColorStop(0,'#ffffff');g.addColorStop(1,'#cfd8e0')}else{g.addColorStop(0,'#e9fbff');g.addColorStop(.45,'#8fd6f2');g.addColorStop(1,'#3a9fd0')}
  x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=size*.12;x.shadowOffsetY=size*.04;x.fillStyle=g;x.fillText('?',0,0);x.shadowColor='transparent';x.lineWidth=size*.018;x.strokeStyle='rgba(255,255,255,.8)';x.strokeText('?',0,0);x.restore()})}

/* ---------- carte vidéo (PIP) qui glisse ---------- */
async function pip(L,lt){const a=L.at||0,o=L.out??1e9;if(lt<a||lt>=o)return;const imgs=await Promise.all((L.imgs||[]).map(load));const sw=L.swaps||[];let idx=0;sw.forEach(s=>{if(lt>=s)idx++});idx=Math.min(idx,imgs.length-1);
 const w=W*(L.w||.64),h=H*(L.h||.16),X=W*(L.x??.5),Y=H*(L.y??.17);let dx=0,blur=0;
 const kin=eo(rp(lt,a,a+.25)),kout=rp(lt,o-.22,o);dx+=(1-kin)*W*.9-kout*kout*W*1.1;blur+=(1-kin)*u*4+kout*u*5;
 sw.forEach(s=>{const d=lt-s;if(d>-.08&&d<.16){blur+=u*3.5*(1-Math.abs(d-.04)/.12)}});
 x.save();x.translate(X+dx,Y);if(blur>.3)x.filter=`blur(${blur.toFixed(1)}px)`;x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=u*3;rr(-w/2,-h/2,w,h,u*2.6);x.fillStyle='#1b2230';x.fill();x.shadowColor='transparent';rr(-w/2,-h/2,w,h,u*2.6);x.clip();
 const im=imgs[idx];if(im){const z=1.08+.06*rp(lt,a,o);x.translate(0,0);cover(im,-w/2,-h/2,w,h,L.fy??.4,z)}
 const s0=sw.filter(s=>s<=lt).at(-1);if(s0!=null&&lt-s0<.12){x.fillStyle=`rgba(255,255,255,${.25*(1-(lt-s0)/.12)})`;x.fillRect(-w/2,-h/2,w,h)}
 x.fillStyle='rgba(120,160,210,.12)';x.fillRect(-w/2,-h/2,w,h);x.restore()}

/* ---------- arc de vignettes autour de la tête ---------- */
async function ring(L,lt){const k=life(lt,L,.01,.12);if(k<=0)return;const t=age(lt,L);const imgs=await Promise.all((L.imgs||[]).map(load));const n=L.n||24,cx=W*(L.cx??.5),cy=H*(L.cy??.27),R=W*(L.r||.31),a0=(L.a0??200)*Math.PI/180,a1=(L.a1??-20)*Math.PI/180;
 const draw=eo(rp(t,0,.55)),spin=t*(L.speed??.18);
 x.save();x.globalAlpha*=k;x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=u*.22;x.beginPath();x.arc(cx,cy,R*.8,Math.PI*.5-draw*Math.PI*1.2,Math.PI*.5+draw*Math.PI*1.2,false);x.stroke();x.restore();
 for(let i=0;i<n;i++){const v=i/(n-1);if(v>draw*1.05)continue;const ang=a0+(a1-a0)*v+spin;const kk=back(rp(t,v*.5,v*.5+.2));const px=cx+Math.cos(ang)*R,py=cy-Math.sin(ang)*R;const s=u*(L.size||4.4);const im=imgs.length?imgs[i%imgs.length]:null;
  x.save();x.translate(px,py);x.rotate(-ang+Math.PI/2);x.scale(kk,kk);x.globalAlpha*=k;x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=u;rr(-s/2,-s*.36,s,s*.72,s*.12);x.fillStyle='#fff';x.fill();x.shadowColor='transparent';rr(-s/2+u*.2,-s*.36+u*.2,s-u*.4,s*.72-u*.4,s*.1);x.clip();if(im)cover(im,-s/2,-s*.36,s,s*.72,.4);else{x.fillStyle=['#e63946','#2a9d8f','#f4a261','#457b9d','#ffd166'][i%5];x.fillRect(-s/2,-s/2,s,s)}x.restore()}}

/* ---------- icône réseau (molécule 3D qui tourne) ---------- */
function nodes(L,lt){const k=life(lt,L,.25,.15);if(k<=0)return;const t=age(lt,L);const X=W*(L.x??.72),Y=H*(L.y??.57),S=W*(L.s||.11);const P=[[0,0,0],[1,.3,.2],[-.6,.9,-.3],[-.9,-.4,.4],[.4,-1,-.2],[.2,.5,1],[1.4,-.6,.3]];const E=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,6],[4,6]];
 const ry=t*1.4,rx=.5+Math.sin(t)*.2;const pr=P.map(([a,b,c])=>{let X1=a*Math.cos(ry)+c*Math.sin(ry),Z1=-a*Math.sin(ry)+c*Math.cos(ry);let Y1=b*Math.cos(rx)-Z1*Math.sin(rx),Z2=b*Math.sin(rx)+Z1*Math.cos(rx);const p=1/(1+Z2*.25);return [X+X1*S*p,Y+Y1*S*p,Z2,p]});
 const sc=back(rp(t,0,.35));x.save();x.translate(X,Y);x.scale(sc,sc);x.translate(-X,-Y);x.globalAlpha*=k;x.lineWidth=u*.45;x.strokeStyle='#7fb7d8';E.forEach(([a,b])=>{x.beginPath();x.moveTo(pr[a][0],pr[a][1]);x.lineTo(pr[b][0],pr[b][1]);x.stroke()});
 pr.map((p,i)=>[p,i]).sort((a,b)=>a[0][2]-b[0][2]).forEach(([p,i])=>{const r=u*(i?1.15:1.6)*p[3];const g=x.createRadialGradient(p[0]-r*.3,p[1]-r*.3,r*.1,p[0],p[1],r);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#b9c3cc');g.addColorStop(1,'#4a5560');x.fillStyle=g;x.beginPath();x.arc(p[0],p[1],r,0,TAU);x.fill();x.strokeStyle='#2c3640';x.lineWidth=u*.25;x.stroke()});x.restore()}

/* ---------- petits chiffres / étiquettes en haut ---------- */
function stats(L,lt){(L.items||[]).forEach(([s,px,py,d])=>drawText({text:s,x:px,y:py,at:(L.at||0)+(d||0),out:L.out,style:'label',size:L.size||2.6,din:.25},lt))}

/* ---------- carrousel courbe de photos ---------- */
async function carousel(L,lt){const k=life(lt,L,.25,.2);if(k<=0)return;const t=age(lt,L);const imgs=await Promise.all((L.imgs||[]).map(load));const n=imgs.length||1;const cx=W*(L.cx??.5),cy=H*(L.cy??.14),R=W*(L.r||.3),cw=W*(L.w||.2),ch=H*(L.h||.12);const rot=t*(L.speed??.55)+(1-eo(rp(t,0,.4)))*1.2;
 const items=imgs.map((im,i)=>{const a=rot+i*TAU/n;return {im,a,z:Math.cos(a)}}).sort((p,q)=>p.z-q.z);
 items.forEach(({im,a,z})=>{if(z<-.15)return;const px=cx+Math.sin(a)*R;const sx=Math.max(.08,Math.cos(a));const p=1+z*.12;x.save();x.globalAlpha*=k*cl((z+.15)*2.5);x.translate(px,cy);x.scale(sx*p,p);x.transform(1,Math.sin(a)*-.12,0,1,0,0);x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=u*2;rr(-cw/2,-ch/2,cw,ch,u*1.2);x.fillStyle='#fff';x.fill();x.shadowColor='transparent';rr(-cw/2,-ch/2,cw,ch,u*1.2);x.clip();if(im)cover(im,-cw/2,-ch/2,cw,ch,.4);const sh=x.createLinearGradient(-cw/2,0,cw/2,0);sh.addColorStop(0,`rgba(0,0,0,${.35*(1-sx)})`);sh.addColorStop(1,'rgba(255,255,255,.08)');x.fillStyle=sh;x.fillRect(-cw/2,-ch/2,cw,ch);x.restore()})}

/* ---------- hologramme bleu (icône lumineuse) ---------- */
function holo(L,lt){const k=life(lt,L,.2,.25);if(k<=0)return;const t=age(lt,L);const X=W*(L.x??.5),Y=H*(L.y??.12),S=W*(L.s||.1);const fl=t<.25?(Math.sin(t*80)>0?1:.45):1;
 x.save();x.globalCompositeOperation='screen';const beam=x.createLinearGradient(0,Y+S*1.6,0,Y-S);beam.addColorStop(0,`rgba(60,170,255,${.0})`);beam.addColorStop(.6,`rgba(60,170,255,${.35*k})`);beam.addColorStop(1,'rgba(60,170,255,0)');x.fillStyle=beam;x.beginPath();x.moveTo(X-S*.4,Y+S*1.6);x.lineTo(X+S*.4,Y+S*1.6);x.lineTo(X+S*1.1,Y-S);x.lineTo(X-S*1.1,Y-S);x.fill();
 glowBlob(X,Y,S*1.6,S*1.6,.55*k*fl,'40,150,255');x.restore();
 x.save();x.globalAlpha*=k*fl;x.translate(X,Y+Math.sin(t*2)*u*.4);x.shadowColor='rgba(80,190,255,1)';x.shadowBlur=u*3;x.strokeStyle='#bff0ff';x.fillStyle='rgba(120,210,255,.35)';x.lineWidth=u*.6;x.lineJoin='round';
 const ic=L.icon||'bulle';if(ic=='bulle'){rr(-S*.7,-S*.5,S*1.4,S*.95,S*.25);x.fill();x.stroke();x.beginPath();x.moveTo(-S*.25,S*.45);x.lineTo(-S*.45,S*.8);x.lineTo(0,S*.45);x.fill();x.stroke();x.fillStyle='#e8fbff';[-.35,0,.35].forEach(d=>{x.beginPath();x.arc(S*d,-S*.03,S*.09,0,TAU);x.fill()})}
 else{x.beginPath();x.arc(0,-S*.35,S*.28,0,TAU);x.fill();x.stroke();rr(-S*.45,0,S*.9,S*.7,S*.3);x.fill();x.stroke()}
 x.restore()}

/* ---------- lumière orange derrière la personne ---------- */
function flare(L,lt){const k=life(lt,L,.12,.35);if(k<=0)return;x.save();x.globalCompositeOperation='screen';const g=x.createRadialGradient(W*(L.x??.5),H*(L.y??.3),0,W*(L.x??.5),H*(L.y??.3),H*.55);g.addColorStop(0,`rgba(255,120,40,${.95*k})`);g.addColorStop(.45,`rgba(255,70,20,${.7*k})`);g.addColorStop(1,'rgba(255,40,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore()}

/* ---------- compteur géant avec rayons bleus ---------- */
function counter(L,lt){const k=life(lt,L,.12,.2);if(k<=0)return;const t=age(lt,L);const d=(L.out??(L.at||0)+1.2)-(L.at||0)-.2;const v=Math.round((L.from||0)+((L.to||100)-(L.from||0))*inout(rp(t,.05,d)));const X=W*(L.x??.5),Y=H*(L.y??.14),size=u*(L.size||13);
 x.save();x.globalCompositeOperation='screen';for(let i=0;i<9;i++){const a=-Math.PI/2+(i-4)*.17;const g=x.createLinearGradient(X,Y,X+Math.cos(a)*H*.2,Y+Math.sin(a)*H*.2);g.addColorStop(0,`rgba(110,150,255,${.5*k})`);g.addColorStop(1,'rgba(110,150,255,0)');x.strokeStyle=g;x.lineWidth=u*(1.2+(i%3)*.6);x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.cos(a)*H*.2,Y+Math.sin(a)*H*.2);x.stroke()}glowBlob(X,Y,W*.3,size*.9,.55*k,'90,130,255');x.restore();
 drawText({text:v+(L.suffix??'%'),x:L.x??.5,y:L.y??.14,at:L.at,out:L.out,size:L.size||13,style:'big',st:{grad:['v',['#ffffff',0],['#eef2ff',.6],['#b9c4ff',1]],sh:'rgba(40,60,200,.5)'}},lt)}

/* ---------- vague bleue qui monte derrière la personne ---------- */
function wave(L,lt){const k=life(lt,L,.01,.25);if(k<=0)return;const t=age(lt,L);const rise=eo(rp(t,0,.6));const top=H*((L.y??.36)+(1-rise)*.5);
 x.save();x.globalAlpha*=k;x.beginPath();x.moveTo(0,H);x.lineTo(0,top+u*6);for(let i=0;i<=40;i++){const v=i/40;x.lineTo(W*v,top+Math.sin(v*5.5+t*3)*u*4-Math.sin(v*2.2+1)*u*9*(1-v))}x.lineTo(W,H);x.closePath();
 const dp=H*(L.depth||.3),g=x.createLinearGradient(0,top-u*10,0,top+dp);g.addColorStop(0,'#8fe8ff');g.addColorStop(.18,'#2bb8f0');g.addColorStop(.6,'rgba(16,110,190,.85)');g.addColorStop(1,'rgba(10,80,160,0)');x.fillStyle=g;x.fill();x.save();x.clip();x.lineWidth=u*1.1;x.strokeStyle='rgba(225,250,255,.95)';x.beginPath();for(let i=0;i<=40;i++){const v=i/40;const yy=top+Math.sin(v*5.5+t*3)*u*4-Math.sin(v*2.2+1)*u*9*(1-v);i?x.lineTo(W*v,yy):x.moveTo(W*v,yy)}x.stroke();x.restore();x.restore()}

const KIND={text:drawText,qmarks,pip,ring,nodes,stats,carousel,holo,flare,counter,wave};

/* ---------- personne détourée, avec le même zoom que l'image ---------- */
let PCR=null;
function cut(f,m,fy,z,zy){if(!f||!m)return;if(!PCR){PCR=document.createElement('canvas');PCR.width=W;PCR.height=H}const q=PCR.getContext('2d');q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.clearRect(0,0,W,H);
 q.translate(W/2,H*zy);q.scale(z,z);q.translate(-W/2,-H*zy);const s=Math.max(W/m.width,H/m.height),iw=m.width*s,ih=m.height*s;q.drawImage(m,(W-iw)/2,(H-ih)*fy,iw,ih);q.globalCompositeOperation='source-in';
 q.setTransform(1,0,0,1,0,0);q.translate(W/2,H*zy);q.scale(z,z);q.translate(-W/2,-H*zy);const s2=Math.max(W/f.width,H/f.height),fw=f.width*s2,fh=f.height*s2;q.drawImage(f,(W-fw)/2,(H-fh)*fy,fw,fh);q.setTransform(1,0,0,1,0,0);x.drawImage(PCR,0,0)}

async function sceneRemake(t,lt,sc){TS=sc.textScale||1;const {f,m}=await faceAt(t,sc);const fy=sc.fy??.45,zy=sc.zoomY??.35;
 let z=1;for(const [at,zz] of (sc.zoom||[]))if(lt>=at)z=zz;
 x.save();x.translate(W/2,H*zy);x.scale(z,z);x.translate(-W/2,-H*zy);cover(f,0,0,W,H,fy);x.restore();
 const G=sc.grade||{};if(G.warm){x.save();x.globalCompositeOperation='soft-light';const g=x.createLinearGradient(0,0,0,H*.7);g.addColorStop(0,`rgba(255,70,20,${G.warm})`);g.addColorStop(1,'rgba(255,90,40,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore()}
 const Ls=sc.layers||[];
 for(const L of Ls)if(L.z=='back'||(L.z==null&&['ring','carousel','holo','flare','wave','stats'].includes(L.kind)))await KIND[L.kind](L,lt);
 if(m)cut(f,m,fy,z,zy);
 if(G.bottom!=null){const g=x.createLinearGradient(0,H*(G.from??.6),0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${G.bottom})`);x.fillStyle=g;x.fillRect(0,H*(G.from??.6),W,H)}
 if(sc.logo){const lg=sc.logo;if(lg.src){const im=await load(lg.src);if(im){const lw=W*(lg.w||.26),lh=lw*im.height/im.width;x.drawImage(im,W/2-lw/2,H*(lg.y||.83)-lh/2,lw,lh)}}else{x.save();x.font=`600 ${u*(lg.size||6.2)}px Montserrat, ${C.brand.font}`;x.textAlign='center';x.textBaseline='middle';x.letterSpacing=u*.35+'px';x.fillStyle='#fff';x.fillText(lg.text||C.brand.name||'',W/2,H*(lg.y||.83));if(lg.sub){x.font=`600 ${u*1.6}px Montserrat, ${C.brand.font}`;x.letterSpacing=u*.9+'px';x.fillText(lg.sub,W/2,H*(lg.y||.83)+u*5)}x.restore()}}
 for(const L of Ls)if(!(L.z=='back'||(L.z==null&&['ring','carousel','holo','flare','wave','stats'].includes(L.kind))))await KIND[L.kind](L,lt)}
RUN.remake=sceneRemake;
window.REMAKE={KIND,life};
})();
