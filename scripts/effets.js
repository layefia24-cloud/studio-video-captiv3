/* =====================================================================
   EFFETS DERRIÈRE TOI (X1–X16) + OBJETS ILLUSTRÉS (O1–O6)
   Module du moteur, chargé après editorial.js.
   Une scène "type":"fx" = la vidéo face caméra + un effet qui se joue
   DERRIÈRE la personne (détourée par les masques de prepare.py --masks),
   jamais sur son visage. Options de scène :
     fx   : {kind, at, out, …}   effet (voir la liste EFX plus bas)
     bg   : "orig" (défaut) | "marque" | "creme" | "nuit"   fond derrière la personne
     zoomP: 0.8   taille de la personne sur fond creme/marque (style personnage illustré)
     cap  : "haut" (phrase en haut à gauche, mots de hl en italique couleur) | "bas" | false
     hl   : ["mot", …]
   Les vignettes des cartes : C.reels = ["img/r1.jpg", …] (ou fx.reels).
   ===================================================================== */
(function(){
const SER='Lora';
const U=()=>W/100;
const P=()=>{const b=C.brand||{};return {pri:b.primary||'#FF5A3C',acc:b.accent||b.primary||'#FF5A3C',dark:b.dark||'#15131a',light:b.light||'#F4EFE8',ink:b.ink||'#1d1b20',font:b.font||'Poppins'}};
const ease=(lt,a,d)=>eo(rp(lt,a,a+d));
const bk=(lt,a,d)=>back(rp(lt,a,a+d));
async function reels(sc){const L=(sc.fx&&sc.fx.reels)||C.reels||[];return Promise.all(L.map(load))}
/* carte vidéo 9:16 : coins arrondis, fin liseré clair, icône lecture */
function reel(im,X,Y,w,rot=0,s=1,a=1,o={}){if(a<=0||s<=0)return;const h=w*16/9;x.save();x.translate(X,Y);x.rotate(rot);x.scale(s,s);x.globalAlpha*=cl(a);
 x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=w*.18;x.shadowOffsetY=w*.06;x.fillStyle='#fff';rr(-w/2-w*.035,-h/2-w*.035,w*1.07,h+w*.07,w*.11);x.fill();x.shadowColor='transparent';
 x.save();rr(-w/2,-h/2,w,h,w*.08);x.clip();if(im)cover(im,-w/2,-h/2,w,h,.4);else{x.fillStyle='#333';x.fillRect(-w/2,-h/2,w,h)}
 if(o.dev!=null){x.fillStyle=`rgba(25,20,18,${1-cl(o.dev)})`;x.fillRect(-w/2,-h/2,w,h)}x.restore();
 if(o.play!==false){x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.arc(0,0,w*.16,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.moveTo(-w*.05,-w*.08);x.lineTo(w*.09,0);x.lineTo(-w*.05,w*.08);x.closePath();x.fill()}
 x.restore()}
function shadowOn(r=U()*3){x.shadowColor='rgba(0,0,0,.28)';x.shadowBlur=r;x.shadowOffsetY=r*.3}
function cursor(X,Y,s=1){x.save();x.translate(X,Y);x.scale(s*U()*.32,s*U()*.32);x.fillStyle='#111';x.strokeStyle='#fff';x.lineWidth=1.4;x.beginPath();x.moveTo(1,1);x.lineTo(1,16);x.lineTo(5,12);x.lineTo(8,19);x.lineTo(11,18);x.lineTo(8,11);x.lineTo(14,11);x.closePath();x.fill();x.stroke();x.restore()}
function ripple(X,Y,k){if(k<=0||k>=1)return;x.save();x.strokeStyle=P().acc;x.globalAlpha=1-k;x.lineWidth=U()*.6;x.beginPath();x.arc(X,Y,U()*(2+9*k),0,7);x.stroke();x.restore()}
function tick(X,Y,r,k){if(k<=0)return;x.save();x.translate(X,Y);x.scale(back(k),back(k));x.fillStyle=P().acc;x.beginPath();x.arc(0,0,r,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=r*.3;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(-r*.45,0);x.lineTo(-r*.1,r*.35);x.lineTo(r*.5,-r*.35);x.stroke();x.restore()}
function exitT(lt,fx){const o=fx.out;if(o==null)return 0;return eo(rp(lt,o,o+.35))}
function withExit(lt,fx,fn){const e=exitT(lt,fx);if(e>=1)return;x.save();x.globalAlpha*=1-e;x.translate(0,-e*H*.25);fn();x.restore()}

/* ---------------- les effets ---------------- */
const EFX={};
// X1 Enveloppe : tombe en tournant, rebondit, le rabat s'ouvre, les vidéos sortent en éventail
EFX.enveloppe=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;
 const ew=W*.4,eh=ew*.64,cx=W*(fx.x||.5),cy=H*(fx.y||.16);
 const fall=rp(t,0,.5),yy=lerp(-H*.25,cy,eo(fall)),rot=(1-eo(fall))*Math.PI*3,sq=t>.5?1-.12*Math.sin(rp(t,.5,.68)*Math.PI):1;
 const flap=ease(t,.55,.15);
 withExit(lt,fx,()=>{x.save();x.translate(cx,yy+eh/2);x.rotate(rot);x.scale(1/sq,sq);x.translate(0,-eh/2);
  // dos
  shadowOn(U()*4);x.fillStyle=p.pri;rr(-ew/2,-eh/2,ew,eh,U()*2);x.fill();x.shadowColor='transparent';
  // rabat (ouvert vers le haut)
  x.save();x.fillStyle=p.pri;x.beginPath();const fy=-eh/2;x.moveTo(-ew/2,fy);x.lineTo(ew/2,fy);x.lineTo(0,fy+(eh*.55)*(1-2*flap));x.closePath();x.fillStyle=flap>.5?p.pri:p.pri;x.globalAlpha=1;x.fill();x.restore();
  // cartes derrière la poche puis devant
  const n=Math.min(5,R.length||5),cw=W*.14*(fx.taille||1),cards=[];
  for(let i=0;i<n;i++){const k=bk(t,.68+i*.06,.45);if(k<=0)continue;const a=(-14+28*i/(n-1))*Math.PI/180;const X=Math.sin(a)*ew*1.25*k,Y=-eh*.05-k*eh*.45+Math.abs(i-(n-1)/2)*U()*2.5*k;cards.push({i,k,a,X,Y})}
  cards.filter(c=>c.k<.55).forEach(c=>reel(R[c.i%R.length],c.X,c.Y,cw,c.a*c.k,1,1));
  // poche avant
  x.fillStyle=lerpC(p.pri,'#ffffff',.18);x.beginPath();x.moveTo(-ew/2,-eh/2+U());x.lineTo(0,eh*.08);x.lineTo(ew/2,-eh/2+U());x.lineTo(ew/2,eh/2-U()*2);x.quadraticCurveTo(ew/2,eh/2,ew/2-U()*2,eh/2);x.lineTo(-ew/2+U()*2,eh/2);x.quadraticCurveTo(-ew/2,eh/2,-ew/2,eh/2-U()*2);x.closePath();x.fill();
  x.fillStyle=p.acc;x.beginPath();x.arc(0,eh*.06,U()*1.6,0,7);x.fill();
  cards.filter(c=>c.k>=.55).forEach(c=>reel(R[c.i%R.length],c.X,c.Y,cw,c.a*c.k,1,1));
  x.restore()})};
// X2 Dossier : un clic, il s'écrase, les vidéos jaillissent et se posent autour de toi
EFX.dossier=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;
 const fw=W*.36,fh=fw*.72,cx=W*.5,cy=H*(fx.y||.12),pop=bk(t,0,.4),click=fx.click??.6,spill=fx.spill??.85;
 const sq=t>click?1-.08*Math.sin(rp(t,click,click+.18)*Math.PI):1;
 withExit(lt,fx,()=>{x.save();x.translate(cx,cy);x.scale(pop/sq,pop*sq);
  shadowOn(U()*4);x.fillStyle=lerpC(p.pri,'#000',.15);rr(-fw/2,-fh/2,fw*.42,fh*.2,U()*1.5);x.fill();rr(-fw/2,-fh/2+fh*.12,fw,fh*.88,U()*2);x.fill();x.shadowColor='transparent';
  const pos=[[-.34,-.02],[.34,-.02],[-.4,.12],[.4,.12],[-.32,.24],[.32,.24],[0,-.06]];const cw=W*.16*(fx.taille||1);
  const cards=pos.slice(0,Math.max(1,Math.min(7,R.length?7:7))).map((q,i)=>({i,k:eo(rp(t,spill+i*.05,spill+i*.05+.45)),q}));
  const draw=c=>{const tx=q=>q;const X=lerp(0,c.q[0]*W,c.k),Y=lerp(0,c.q[1]*H-Math.sin(c.k*Math.PI)*H*.06,c.k),rot=((c.i*37)%25-12)*Math.PI/180*c.k;reel(R[c.i%R.length],X,Y,cw,rot,.5+.5*c.k,cl(c.k*4))};
  cards.filter(c=>c.k>0&&c.k<.3).forEach(draw);
  x.fillStyle=p.pri;rr(-fw/2,-fh/2+fh*.28,fw,fh*.72,U()*2);x.fill();
  pill(fx.label||'MES VIDÉOS',0,fh*.12,U()*2.6,'#fff',p.pri,1);
  cards.filter(c=>c.k>=.3).forEach(draw);x.restore();
  const ck=rp(t,.1,click),cx2=lerp(W*.95,cx+fw*.12,eo(ck)),cy2=lerp(H*.42,cy+fh*.1,eo(ck));if(t<spill+.5){ripple(cx2,cy2,rp(t,click,click+.45));cursor(cx2,cy2,t>click&&t<click+.1?.85:1)}})};
// X3 Polaroid : l'appareil flashe et imprime tes vidéos, qui se développent
EFX.polaroid=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;
 const bw=W*.36,bh=bw*.62,cx=W*.5,cy=H*(fx.y||.11),pop=bk(t,0,.4),pr=fx.print??.5;
 withExit(lt,fx,()=>{
  [0,1].forEach(j=>{const t0=pr+j*.6,k=t-t0;if(k<0)return;const out=eo(rp(k,0,.35)),sw=eo(rp(k,.35,.8)),dev=rp(k,.4,1.4),pw=W*.27*(fx.taille||1),ph=pw*1.18;
   const side=j?-1:1;const X=cx+side*sw*W*.27,Y=cy+bh*.42+out*ph*.5+sw*H*.05,rot=side*sw*7*Math.PI/180,s=1+.15*sw;
   x.save();if(sw<.02){x.beginPath();x.rect(cx-bw,cy+bh*.42,bw*2,H);x.clip()}x.translate(X,Y);x.rotate(rot);x.scale(s,s);shadowOn(U()*3);x.fillStyle='#fbfaf6';x.fillRect(-pw/2,-ph/2,pw,ph);x.shadowColor='transparent';
   const iw=pw*.86,ih=iw*1.0;x.save();x.beginPath();x.rect(-iw/2,-ph/2+pw*.07,iw,ih);x.clip();cover(R[j%Math.max(1,R.length)],-iw/2,-ph/2+pw*.07,iw,ih,.35);x.fillStyle=`rgba(30,25,22,${1-cl(dev)})`;x.fillRect(-iw/2,-ph/2,iw,ih+pw*.1);x.restore();x.restore()});
  x.save();x.translate(cx,cy);x.scale(pop,pop);shadowOn(U()*4);x.fillStyle='#fffdf8';rr(-bw/2,-bh/2,bw,bh,U()*3);x.fill();x.shadowColor='transparent';x.lineWidth=U()*.4;x.strokeStyle=lerpC(p.ink,'#fff',.6);x.stroke();
  x.fillStyle=p.pri;x.fillRect(-bw/2,-bh*.08,bw,bh*.16);x.fillStyle='#fffdf8';rr(-bw*.32,-bh/2-bh*.12,bw*.14,bh*.14,U());x.fill();
  const L=bh*.34;x.fillStyle='#d9d4cc';x.beginPath();x.arc(0,0,L,0,7);x.fill();x.fillStyle='#1f1c1a';x.beginPath();x.arc(0,0,L*.78,0,7);x.fill();const g=x.createRadialGradient(-L*.2,-L*.2,0,0,0,L*.6);g.addColorStop(0,'#5a6a8a');g.addColorStop(1,'#0c0d12');x.fillStyle=g;x.beginPath();x.arc(0,0,L*.55,0,7);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(-L*.2,-L*.22,L*.1,0,7);x.fill();
  x.fillStyle='#2a2522';rr(bw*.22,-bh*.38,bw*.16,bh*.14,U()*.8);x.fill();x.fillStyle='#e9e4dc';rr(-bw*.44,-bh*.38,bw*.14,bh*.1,U()*.6);x.fill();
  x.fillStyle='#2a2522';rr(-bw*.34,bh*.38,bw*.68,bh*.05,U()*.5);x.fill();
  [0,1].forEach(j=>{const f=rp(t,pr+j*.6,pr+j*.6+.25);if(f>0&&f<1){x.save();x.globalCompositeOperation='lighter';const gl=x.createRadialGradient(-bw*.37,-bh*.33,0,-bw*.37,-bh*.33,W*.35);gl.addColorStop(0,`rgba(255,250,230,${1-f})`);gl.addColorStop(1,'rgba(255,250,230,0)');x.fillStyle=gl;x.fillRect(-W,-H,W*2,H*2);x.restore()}});
  x.restore()})};
// X4 Tapis roulant : tes vidéos défilent derrière toi et reçoivent une coche au milieu
EFX.tapis=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;
 const y=H*(fx.y||.2),bh=U()*4.5,ink=lerpC(p.dark,'#000',.2),sl=1-eo(rp(t,0,.35));
 withExit(lt,fx,()=>{x.save();x.translate(-sl*W,0);x.globalAlpha*=1-sl;
  x.fillStyle=ink;[.15,.5,.85].forEach(q=>{x.fillRect(W*q-U()*.6,y+bh/2,U()*1.2,H*.12)});
  shadowOn(U()*3);x.fillStyle=ink;rr(-U()*2,y-bh/2,W+U()*4,bh,bh/2);x.fill();x.shadowColor='transparent';
  x.save();rr(-U()*2,y-bh/2,W+U()*4,bh,bh/2);x.clip();x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=U()*1.2;const off=(t*300*W/1080)%(U()*5);for(let i=-U()*10;i<W+U()*10;i+=U()*5){x.beginPath();x.moveTo(i+off,y+bh);x.lineTo(i+off+bh,y-bh);x.stroke()}x.restore();
  for(let i=0;i<9;i++){const X=U()*3+i*(W-U()*6)/8,a=t*300*W/1080/(bh*.35);x.save();x.translate(X,y);x.rotate(a);x.fillStyle=lerpC(ink,'#fff',.25);x.beginPath();x.arc(0,0,bh*.36,0,7);x.fill();x.strokeStyle=ink;x.lineWidth=U()*.4;x.beginPath();x.moveTo(-bh*.3,0);x.lineTo(bh*.3,0);x.stroke();x.restore()}
  const cw=W*.15*(fx.taille||1),ch=cw*16/9,gap=cw*1.45,sp=300*W/1080,n=Math.ceil(W/gap)+2;
  for(let i=0;i<n;i++){let X=((t*sp+i*gap)%(n*gap))-gap;const passed=X>W/2?rp(X,W/2,W/2+U()*4):0;
   reel(R[i%Math.max(1,R.length)],X,y-bh/2-ch/2-U()*.5,cw,0,1,1);tick(X+cw*.42,y-bh/2-ch+U()*.5,U()*2.2,passed)}
  x.restore()})};
// X5 Aperçu de fichiers : la fenêtre « Mes vidéos », le curseur clique et chaque fichier se joue
EFX.fichiers=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;
 const names=fx.names||['final.mp4','final_FINAL.mp4','final_FINAL_v2.mp4','final_FINAL_VRAI.mp4','celle_ci.mp4'];
 const ww=W*.52,rh=U()*5.2,wh=U()*7+rh*names.length,X0=W*.04,Y0=H*(fx.y||.06),pop=bk(t,0,.4);
 const clicks=fx.clicks||[[.5,1],[.95,3],[1.4,4]];let sel=-1,ci=-1;clicks.forEach(([ct,r],i)=>{if(t>=ct){sel=r;ci=i}});
 withExit(lt,fx,()=>{x.save();x.translate(X0+ww/2,Y0+wh/2);x.scale(pop,pop);x.translate(-ww/2,-wh/2);shadowOn(U()*4);x.fillStyle='#fff';rr(0,0,ww,wh,U()*2);x.fill();x.shadowColor='transparent';
  ['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(U()*2.5+i*U()*2.2,U()*3,U()*.75,0,7);x.fill()});
  word(fx.title||'Mes vidéos',ww/2,U()*3,U()*2.4,{w:700,col:p.ink});
  names.forEach((n,i)=>{const yy=U()*6+i*rh;if(i==sel){x.fillStyle=p.acc;rr(U()*1,yy,ww-U()*2,rh-U()*.5,U()*1.2);x.fill()}
   x.fillStyle=i==sel?'#fff':p.pri;rr(U()*2.4,yy+rh*.25,U()*2.6,rh*.45,U()*.5);x.fill();word(n,U()*6.5,yy+rh*.48,U()*2.3,{w:600,al:'left',col:i==sel?'#fff':p.ink})});x.restore();
  if(sel>=0){const ct=clicks[ci][0],k=bk(t,ct,.3),pw=W*.34,ph=pw*1.5,PX=W*.78,PY=Y0+ph*.55;x.save();x.translate(PX,PY);x.scale(k,k);shadowOn(U()*4);x.fillStyle='#fff';rr(-pw/2,-ph/2,pw,ph,U()*2);x.fill();x.shadowColor='transparent';
   word(names[sel],0,-ph/2+U()*2.6,U()*2,{w:700,col:p.ink,max:pw*.9});x.save();rr(-pw/2+U(),-ph/2+U()*5,pw-U()*2,ph-U()*8,U()*1.2);x.clip();cover(R[ci%Math.max(1,R.length)],-pw/2,-ph/2+U()*5,pw,ph-U()*7,.35);x.restore();
   x.fillStyle='#ddd';x.fillRect(-pw/2+U()*2,ph/2-U()*2,pw-U()*4,U()*.6);x.fillStyle=p.acc;x.fillRect(-pw/2+U()*2,ph/2-U()*2,(pw-U()*4)*rp(t,ct,ct+.45),U()*.6);x.restore()}
  const tgt=clicks.map(([ct,r])=>[ct,X0+ww*.6,Y0+U()*6+r*rh+rh/2]);let cx=W*.9,cy=H*.4;for(let i=0;i<tgt.length;i++){const [ct,tx,ty]=tgt[i];const st=i?tgt[i-1][0]:0.1;const k=eo(rp(t,st+.05,ct));const px=i?tgt[i-1][1]:W*.9,py=i?tgt[i-1][2]:H*.4;if(t>=st){cx=lerp(px,tx,k);cy=lerp(py,ty,k)}ripple(tx,ty,rp(t,ct,ct+.4))}
  cursor(cx,cy)})};
// X6 Orbite : un anneau fin se dessine, puis les vidéos tournent autour de la tête (passent derrière puis devant)
EFX.orbite=async(lt,sc,fx,front)=>{const R=await reels(sc),t=lt-(fx.at||0);if(t<0)return;const n=fx.n||8,cx=W*.5,cy=H*(fx.y||.19),rx=W*.46,ry=H*.05,sp=fx.speed||.5,tilt=-.08;
 withExit(lt,fx,()=>{const ring=ease(t,0,.35);if(!front){x.save();x.translate(cx,cy);x.rotate(tilt);x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=U()*.35;x.beginPath();x.ellipse(0,0,rx,ry,0,-Math.PI/2,-Math.PI/2+Math.PI*2*ring);x.stroke();x.restore()}
  const items=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2+t*sp,k=bk(t,.25+i*.05,.4);items.push({i,a,z:Math.sin(a),k})}items.sort((a,b)=>a.z-b.z);
  items.forEach(o=>{if((o.z>0)!==!!front||o.k<=0)return;const X=cx+Math.cos(o.a)*rx,Y=cy+o.z*ry+Math.cos(o.a)*rx*Math.sin(tilt);const s=(.72+.32*o.z)*o.k;reel(R[o.i%Math.max(1,R.length)],X,Y,W*.17*(fx.taille||1),Math.cos(o.a)*.15,s,cl(o.k*2)*(.65+.35*(o.z+1)/2),{play:false})})})};
// X7 Mur de vignettes : un mur de tes vidéos derrière toi
EFX.mur=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),p=P(),t=lt-(fx.at||0);if(t<0)return;const cols=3,cw=W*.27,ch=cw*16/9,gx=W*.06,gy=U()*5;
 withExit(lt,fx,()=>{x.fillStyle=lerpC(p.dark,'#000',.3);x.globalAlpha*=ease(t,0,.2);x.fillRect(0,0,W,H);x.globalAlpha=1;const pan=t*U()*3;
  for(let r=0;r<4;r++)for(let c=0;c<cols;c++){const i=r*cols+c,k=bk(t,.04*i,.4);const X=gx/2+cw/2+c*(cw+gx/2)+((r%2)?-cw*.25:0),Y=H*.03+ch/2+r*(ch+gy)-pan;reel(R[i%Math.max(1,R.length)],X,Y,cw,0,k,k,{play:false});
   if(fx.labels){word(fx.labels[i%fx.labels.length],X-cw/2+U()*2,Y-ch/2+U()*3,U()*2.6,{al:'left',w:700,it:1,f:SER,col:'#fff',sh:1,a:k})}}})};
// X8 Cadre qui casse : tu es dans un cadre photo et ta tête en sort
EFX.cadre=async(lt,sc,fx,front,ctx)=>{const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.45),fw=W*.8,fh=H*.46,cx=W/2,top=H*(fx.top||.3),rot=(fx.rot??-3)*Math.PI/180*k;
 if(!front){x.fillStyle=fx.bg||lerpC(p.pri,'#fff',.55);x.fillRect(0,0,W,H);x.save();x.translate(cx,top+fh/2);x.rotate(rot);x.scale(.85+.15*k,.85+.15*k);shadowOn(U()*5);x.fillStyle='#fff';x.fillRect(-fw/2-U()*2.5,-fh/2-U()*2.5,fw+U()*5,fh+U()*9);x.shadowColor='transparent';x.beginPath();x.rect(-fw/2,-fh/2,fw,fh);x.clip();x.translate(-cx,-(top+fh/2));cover(ctx.f,0,0,W,H,ctx.fy);x.restore()}
 else{x.save();x.beginPath();x.rect(0,0,W,top+U()*2);x.clip();cutout(ctx.f,ctx.m,ctx.fy);x.restore()}};
// X9 Téléphone : ta vidéo devient un Reel dans un téléphone
EFX.telephone=async(lt,sc,fx,front,ctx)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.5),pw=W*.62,ph=pw*2.05;
 const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,fx.c1||'#d9c8ff');g.addColorStop(1,fx.c2||'#f3e8ff');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.save();x.translate(W/2,H*.5+(1-k)*H*.3);x.rotate((1-k)*-.25+(fx.rot??-4)*Math.PI/180);shadowOn(U()*8);x.fillStyle='#111';rr(-pw/2-U()*1.6,-ph/2-U()*1.6,pw+U()*3.2,ph+U()*3.2,U()*8);x.fill();x.shadowColor='transparent';
 x.save();rr(-pw/2,-ph/2,pw,ph,U()*6.5);x.clip();cover(ctx.f,-pw/2,-ph/2,pw,ph,ctx.fy);
 ['♥','💬','➤'].forEach((s,i)=>word(s,pw/2-U()*5,ph*.1+i*U()*7,U()*4,{col:'#fff',sh:1}));
 x.fillStyle='#fff';x.beginPath();x.arc(-pw/2+U()*5,ph/2-U()*9,U()*2.2,0,7);x.fill();word(fx.handle||C.brand.handle||'@moncompte',-pw/2+U()*8.5,ph/2-U()*9,U()*2.6,{al:'left',w:700,col:'#fff',sh:1});
 x.restore();x.fillStyle='#111';rr(-pw*.14,-ph/2+U()*1.2,pw*.28,U()*2.6,U()*1.3);x.fill();x.restore();ctx.noPerson=true};
// X10 Mur de titres : de grands mots défilent derrière toi
EFX.titres=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const words=fx.words||['STUDIO','CAPTIV','VIDÉO','MOTION'];
 withExit(lt,fx,()=>{x.fillStyle=fx.bg||'#eeeae4';x.globalAlpha*=ease(t,0,.2);x.fillRect(0,0,W,H);
  for(let r=0;r<7;r++){const s=U()*(r%2?13:17),y=H*.04+r*H*.085,dir=r%2?1:-1,off=dir*t*U()*12+(r*U()*13);const k=ease(t,r*.04,.35);x.save();x.globalAlpha*=k;
   const txt=(words[r%words.length]+'  ').repeat(5);word(txt,-W*.5+off,y,s,{al:'left',w:900,col:r%3==1?p.pri:lerpC(p.ink,'#fff',.25),it:r%3==2,f:r%3==2?SER:undefined});x.restore()}})};
// X11 Zoom traversant : une vidéo grossit jusqu'à remplir l'écran, on passe à travers
EFX.traversant=async(lt,sc,fx,front,ctx)=>{const R=await reels(sc),t=lt-(fx.at||0);if(t<0||t>.9||!front)return;const k=rp(t,0,.6),s=Math.pow(9,eo(k)),a=1-rp(t,.55,.9);
 x.save();x.globalAlpha=a;x.fillStyle='rgba(0,0,0,.35)';x.fillRect(0,0,W,H);reel(R[(fx.i||0)%Math.max(1,R.length)],W/2,H*.42,W*.2,0,s,1,{play:false});x.restore();ctx.overlay=true};
// X12 Recul sur immeuble : la caméra recule, tu es dans une fenêtre d'un immeuble la nuit
EFX.immeuble=async(lt,sc,fx,front,ctx)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=eo(rp(t,0,fx.d||1.2)),s=lerp(1,.2,k);
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0b1030');g.addColorStop(1,'#2a1d4a');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.save();x.translate(W/2,H*.42);x.scale(s,s);const bw=W*4.2,bh=H*3.4;x.fillStyle='#15172b';x.fillRect(-bw/2,-H*.55,bw,bh);
 for(let r=-3;r<9;r++)for(let c=-6;c<7;c++){if(r==0&&c==0)continue;const lit=((r*7+c*13)&5)?.15:.85;x.fillStyle=`rgba(255,214,140,${lit})`;x.fillRect(c*W*1.15-W*.4,r*H*.62-H*.27,W*.8,H*.5)}
 x.save();x.beginPath();x.rect(-W/2,-H*.42,W,H);x.clip();x.translate(-W/2,-H*.42);cover(ctx.f,0,0,W,H,ctx.fy);x.restore();
 x.strokeStyle='#2c2f4a';x.lineWidth=U()*3/s;x.strokeRect(-W/2,-H*.42,W,H);x.restore();ctx.noPerson=true};
// X13 Décor remplacé : ton fond devient un décor illustré aux couleurs de la marque
EFX.decor=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=ease(t,0,.3);x.save();x.globalAlpha*=k;
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,fx.c1||'#ffd6a8');g.addColorStop(.6,fx.c2||lerpC(p.pri,'#fff',.55));g.addColorStop(1,lerpC(p.pri,'#fff',.2));x.fillStyle=g;x.fillRect(0,0,W,H);
 x.fillStyle='rgba(255,240,200,.9)';x.beginPath();x.arc(W*.5,H*.3,W*.22,0,7);x.fill();
 [[.62,.3,'#ffffff55'],[.7,.25,lerpC(p.pri,'#fff',.35)],[.8,.2,p.pri]].forEach(([y,a,c],i)=>{x.fillStyle=c;x.beginPath();x.moveTo(0,H);for(let X=0;X<=W;X+=W/40)x.lineTo(X,H*y+Math.sin(X/W*Math.PI*(2+i)+i)*H*.04*a*3);x.lineTo(W,H);x.closePath();x.fill()});x.restore()};
// X14 Vertigo : le fond avance pendant que tu restes immobile
EFX.vertigo=async(lt,sc,fx,front,ctx)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const z=1+(fx.z||.45)*eo(rp(t,0,fx.d||1.4));x.save();x.filter=`blur(${4+(z-1)*20}px)`;cover(ctx.f,0,0,W,H,ctx.fy,z);x.filter='none';x.fillStyle=`rgba(10,8,12,${.15+.3*(z-1)})`;x.fillRect(0,0,W,H);x.restore();
 x.save();x.globalAlpha=.25*rp(t,0,.4);x.strokeStyle='#fff';x.lineWidth=U()*.3;for(let i=0;i<24;i++){const a=i/24*Math.PI*2;x.beginPath();x.moveTo(W/2+Math.cos(a)*W*.3*z,H*.3+Math.sin(a)*W*.3*z);x.lineTo(W/2+Math.cos(a)*W*1.2,H*.3+Math.sin(a)*W*1.2);x.stroke()}x.restore()};
// X15 Texte en verre : un grand mot en verre, la 1re ligne derrière toi, la 2e devant
EFX.verre=async(lt,sc,fx,front,ctx)=>{const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.45);
 const glass=(s,y,size)=>{x.save();x.translate(W/2,y);x.scale(.7+.3*k,.7+.3*k);x.globalAlpha*=cl(k*1.5);x.font=`900 ${size}px ${P().font}`;x.textAlign='center';x.textBaseline='middle';let w=x.measureText(s).width;if(w>W*.94){const q=W*.94/w;x.scale(q,q)}
  x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=size*.08;x.fillStyle='rgba(255,255,255,.38)';x.fillText(s,0,0);x.shadowColor='transparent';const g=x.createLinearGradient(0,-size/2,0,size/2);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.45,'rgba(255,255,255,.15)');g.addColorStop(1,'rgba(255,255,255,.55)');x.lineWidth=size*.025;x.strokeStyle=g;x.strokeText(s,0,0);
  x.shadowColor='rgba(255,255,255,.6)';x.shadowBlur=size*.12;x.globalAlpha*=.35;x.fillText(s,0,0);x.restore()};
 if(!front)glass(fx.top||'STUDIO',H*(fx.yTop||.17),U()*28);else glass(fx.bottom||'',H*(fx.yBot||.56),U()*24)};
// X16 Halo : un anneau doré lumineux derrière ta tête
EFX.halo=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.5),cx=W*.5,cy=H*(fx.y||.17),R=W*.2*k;x.save();x.globalCompositeOperation='lighter';
 const g=x.createRadialGradient(cx,cy,R*.6,cx,cy,R*1.8);g.addColorStop(0,'rgba(255,200,80,.0)');g.addColorStop(.35,'rgba(255,200,80,.35)');g.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
 x.save();x.strokeStyle=fx.col||'#ffcf5a';x.lineWidth=U()*1.4;x.shadowColor='#ffcf5a';x.shadowBlur=U()*4;x.beginPath();x.ellipse(cx,cy,R,R*.32,0,0,7);x.stroke();x.restore()};

/* ---------- O1–O6 objets illustrés au-dessus de la tête ---------- */
// O1 Compteur qui défile
EFX.compteur=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4),v=Math.round((fx.value||40000)*eo(rp(t,.2,1.2))),s=v.toLocaleString('fr-FR').replace(/ /g,' ');
 withExit(lt,fx,()=>{x.save();x.translate(W/2,H*(fx.y||.15));x.scale(k,k);const w=W*.62,h=U()*16;shadowOn(U()*4);x.fillStyle='#fff';rr(-w/2,-h/2,w,h,U()*3);x.fill();x.shadowColor='transparent';x.lineWidth=U()*.5;x.strokeStyle=p.pri;x.stroke();
  word(s,0,-U()*1.2,U()*9,{w:900,col:p.ink});word(fx.label||'abonnés',0,h/2-U()*3,U()*2.8,{w:600,it:1,f:SER,col:p.acc});x.restore()})};
// O2 Coffre-fort qui s'ouvre
EFX.coffre=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4),op=eo(rp(t,fx.open??.5,(fx.open??.5)+.5));
 withExit(lt,fx,()=>{x.save();x.translate(W/2,H*(fx.y||.17));x.scale(k,k);const s=W*.42;shadowOn(U()*4);x.fillStyle='#d9d4cc';rr(-s/2,-s/2,s,s,U()*2);x.fill();x.shadowColor='transparent';x.fillStyle='#3a3431';rr(-s*.42,-s*.42,s*.84,s*.84,U()*1.5);x.fill();
  word(fx.text||'LE SECRET',0,0,U()*5,{w:900,col:'#fff',max:s*.75});
  x.save();x.translate(-s*.42,0);x.scale(Math.cos(op*Math.PI*.48),1);x.fillStyle='#bdb6ab';rr(0,-s*.42,s*.84,s*.84,U()*1.5);x.fill();x.strokeStyle='#8d867c';x.lineWidth=U()*.8;x.beginPath();x.arc(s*.42,0,s*.18,0,7);x.stroke();
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2+op*3;x.beginPath();x.moveTo(s*.42,0);x.lineTo(s*.42+Math.cos(a)*s*.18,Math.sin(a)*s*.18);x.stroke()}x.restore();x.restore()})};
// O3 Tampon qui s'écrase
EFX.tampon=async(lt,sc,fx,front)=>{if(!front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=rp(t,0,.18),s=lerp(2.4,1,eo(k));if(k<=0)return;
 withExit(lt,fx,()=>{x.save();x.translate(W*(fx.x||.72),H*(fx.y||.12));x.rotate(-.18);x.scale(s,s);x.globalAlpha*=cl(k*2)*.92;x.strokeStyle=p.acc;x.lineWidth=U()*1;const tx=fx.text||'VALIDÉ';x.font=`900 ${U()*6}px ${p.font}`;const w=x.measureText(tx).width+U()*5;rr(-w/2,-U()*4.5,w,U()*9,U()*1.5);x.stroke();word(tx,0,U()*.3,U()*6,{w:900,col:p.acc});x.restore()})};
// O4 Barres qui montent
EFX.barres=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const vals=fx.values||[.25,.4,.35,.6,.8,1],bw=W*.07,base=H*(fx.y||.27);
 withExit(lt,fx,()=>{vals.forEach((v,i)=>{const k=bk(t,i*.07,.45),h=H*.17*v*k,X=W/2+(i-(vals.length-1)/2)*bw*1.35;shadowOn(U()*2);x.fillStyle=i==vals.length-1?p.acc:lerpC(p.ink,'#fff',.15);rr(X-bw/2,base-h,bw,h,U()*1);x.fill();x.shadowColor='transparent';if(i==vals.length-1&&fx.label)word(fx.label,X,base-h-U()*3.5,U()*3.4,{w:900,col:p.acc,a:k})})})};
// O5 Marches numérotées (étapes)
EFX.marches=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const n=fx.n||5,bw=W*.13,base=H*(fx.y||.28);
 withExit(lt,fx,()=>{for(let i=0;i<n;i++){const k=bk(t,i*.1,.4),h=H*.035*(i+1)*k,X=W/2+(i-(n-1)/2)*bw*1.08;shadowOn(U()*2);x.fillStyle=lerpC(p.ink,'#000',.1);rr(X-bw/2,base-h,bw,h,U()*1);x.fill();x.shadowColor='transparent';word(String(i+1),X,base-h+U()*4,U()*6,{w:900,col:'#fff',a:k})}})};
// O6 Bulle de conversation (question au-dessus de la tête)
EFX.bulle=async(lt,sc,fx,front)=>{if(front)return;const p=P(),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4);
 withExit(lt,fx,()=>{x.save();x.translate(W*.5,H*(fx.y||.14));x.scale(k,k);const w=W*.66,h=U()*14;shadowOn(U()*4);x.fillStyle='#fff';rr(-w/2,-h/2,w,h,U()*3);x.fill();x.beginPath();x.moveTo(-U()*3,h/2-1);x.lineTo(U()*2,h/2+U()*4);x.lineTo(U()*5,h/2-1);x.fill();x.shadowColor='transparent';
  const s=fx.text||'Et toi, tu fais comment ?',n=Math.floor(s.length*rp(t,.15,.15+s.length*.025));word(s.slice(0,n),-w/2+U()*4,0,U()*3.4,{al:'left',w:600,col:p.ink,max:w*.86});word('?',w/2-U()*5,-h/2+U()*1,U()*8,{w:900,it:1,f:SER,col:p.acc,a:k});x.restore()})};

function lerpC(a,b,k){const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')}
function hx(c){c=c.replace('#','');if(c.length==3)c=c.split('').map(q=>q+q).join('');return [0,2,4].map(i=>parseInt(c.slice(i,i+2),16))}

/* légende « en haut à gauche » : phrase dite, mots forts en serif italique couleur */
function capHaut(t,sc,dark){if(!WORDS.length)return;let gi=-1;for(let i=0;i<GROUPS.length;i++){if(t>=WORDS[GROUPS[i][0]][1]-.05)gi=i}if(gi<0)return;const g=GROUPS[gi],last=WORDS[g.at(-1)][2];if(t>last+.6)return;
 const hl=(sc.hl||[]).map(s=>s.toLowerCase()),p=P();let X=W*.07,Y=H*(sc.capY??(dark?.7:.075));const size=U()*5.2;x.save();x.textBaseline='alphabetic';
 g.forEach(i=>{const raw=WORDS[i][0],w=raw.replace(/[,.…:!?]$/,''),on=t>=WORDS[i][1]-.04,isH=hl.some(h=>w.toLowerCase().includes(h));if(!on)return;
  x.font=isH?`italic 600 ${size*1.05}px ${SER}`:`600 ${size}px ${p.font}`;const ww=x.measureText(w+' ').width;if(X+ww>W*.93){X=W*.07;Y+=size*1.2}
  x.fillStyle=isH?p.acc:(dark?'#fff':p.ink);if(dark){x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=size*.3}x.fillText(w,X,Y);X+=ww});x.restore()}

async function sceneFx(t,lt,sc){const {f,m}=await faceAt(t,sc);const fy=sc.fy??.45,ctx={f,m,fy},p=P();const fx=sc.fx||{};const fn=EFX[fx.kind]||(async()=>{});
 const mode=sc.bg||'orig',zp=sc.zoomP||1;
 // 1) fond
 const HK=window.FXH||{};if(mode=='orig')cover(f,0,0,W,H,fy);else if(HK.bg&&await HK.bg(mode,sc,lt,ctx)){}else{x.fillStyle=mode=='nuit'?'#141a2e':mode=='marque'?lerpC(p.pri,'#fff',.55):(p.light||'#F4EFE8');x.fillRect(0,0,W,H);
  if(mode=='creme'||mode=='marque'){x.save();x.globalAlpha=.05;x.fillStyle=p.ink;for(let i=0;i<W;i+=U()*2.2)for(let j=0;j<H;j+=U()*2.2){x.beginPath();x.arc(i,j,U()*.15,0,7);x.fill()}x.restore()}}
 // 2) effet derrière (sur fond uni avec la personne réduite, les objets descendent un peu pour remplir le haut)
 const oy=zp!=1?H*(sc.objY??.14):0;x.save();x.translate(0,oy);await fn(lt,sc,fx,false,ctx);x.restore();
 // 2b) le bureau d'origine reste sous la personne quand le fond est remplacé
 if(mode=='orig'&&['mur','titres','ui','decor','papier','vertigo','magazine','courbe2','fin'].includes(fx.kind)&&!ctx.noPerson&&zp==1){x.save();x.beginPath();x.rect(0,H*(sc.sol??.76),W,H);x.clip();cover(f,0,0,W,H,fy);x.restore()}
 // 3) la personne (devant l'effet)
 if(!ctx.noPerson&&!(fx.kind=='cadre')){if(zp!=1){const zy=H*(sc.zoomY??2.25);x.save();x.translate(W/2,zy);x.scale(zp,zp);x.translate(-W/2,-zy);cutout(f,m,fy);x.restore()}else if(mode!='orig'||fx.kind)cutout(f,m,fy)}
 // 4) partie de l'effet devant
 x.save();x.translate(0,oy);await fn(lt,sc,fx,true,ctx);x.restore();
 // 5) légende
 const dark=mode=='orig'||mode=='nuit'||['telephone','immeuble','mur','vertigo','traversant'].includes(fx.kind);
 if(HK.post)await HK.post(lt,sc,ctx,'avantcap');
 if(sc.cap!==false){const cm=sc.cap||'haut';if(HK.cap&&HK.cap[cm])HK.cap[cm](t,sc,dark);else if(cm=='haut')capHaut(t,sc,dark);else captions(t,sc)}
 if(HK.post)await HK.post(lt,sc,ctx,'fin')}
Object.assign(RUN,{fx:sceneFx});
window.EFX=EFX;window.FXU={reel,cursor,ripple,tick,lerpC,withExit,bk,ease,P,U,reels,shadowOn,capHaut,exitT};
window.EFFETS=Object.keys(EFX);
})();
