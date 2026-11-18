/* =====================================================================
   PREMIUM — module du moteur (chargé après short.js)
   Style « talking head premium » : marche en 16:9 (1920x1080, 1280x720)
   comme en 9:16. Ajoute :
   - captions.band : bande sombre floutée sous les sous-titres (tiers bas)
   - fond "bars" : barres verticales lumineuses (bleu, violet, or, rouge)
   - scènes : pface (face + encart nom), pside (carte vidéo + face),
     chapter, podium, cubes, ptext, window, ba (avant/après), pobject,
     countdown, deck (cartes en perspective)
   Palette : C.palette = {acc, accDark, white, black} (tirée du décor)
   ===================================================================== */
(function(){
const SANS='Inter',SERIF='Instrument Serif',SCRIPT='Great Vibes';
const P=()=>Object.assign({acc:'#3b82f6',accDark:'#1e3a8a',white:'#f4f7ff',black:'#05070d'},C.palette||{});
const BARS={blue:['#1d4ed8','#60a5fa'],violet:['#6d28d9','#c084fc'],gold:['#b45309','#fbbf24'],red:['#991b1b','#f87171'],green:['#15803d','#4ade80']};
const H2=()=>H,isWide=()=>W>H;
const S=v=>v*Math.min(W,H)/100*(W>H?1.35:1); // unité basée sur le petit côté
function sh(c,b,y){x.shadowColor=c;x.shadowBlur=b;x.shadowOffsetY=y||0}
function noSh(){x.shadowColor='transparent';x.shadowBlur=0;x.shadowOffsetY=0}
function T(s,X,Y,size,o={}){x.save();x.globalAlpha*=o.a??1;x.font=`${o.it?'italic ':''}${o.w||400} ${size}px ${o.f?`"${o.f}"`:SANS}`;x.textAlign=o.al||'center';x.textBaseline='middle';x.fillStyle=o.col||'#fff';if(o.ls)x.letterSpacing=o.ls+'px';if(o.glow){sh(o.glow,size*.6)}let w=x.measureText(s).width;if(o.max&&w>o.max){x.translate(X,Y);x.scale(o.max/w,o.max/w);x.fillText(s,0,0)}else x.fillText(s,X,Y);x.restore();return Math.min(w,o.max||w)}
// texte riche premium : sans fin (300-400) + *mot* en script/serif ou gras
function R(txt,X,Y,size,o={}){const ps=String(txt||'').split(/(\*[^*]+\*|\s+)/).filter(s=>s&&!/^\s+$/.test(s)).map(p=>p.startsWith('*')?{s:p.slice(1,-1),k:1}:{s:p,k:0});const kf=o.kf||C.special||'script';
 const font=p=>p.k?(kf=='script'?`400 ${size*1.7}px "${SCRIPT}"`:kf=='serif'?`italic 400 ${size*1.35}px "${SERIF}"`:`800 ${size*1.15}px ${SANS}`):`${o.w||400} ${size}px ${SANS}`;
 x.save();const sp=size*.3;let tw=0;const ws=ps.map(p=>{x.font=font(p);const w=x.measureText(p.s).width;tw+=w;return w});tw+=sp*(ps.length-1);let sc=o.max&&tw>o.max?o.max/tw:1;x.translate(X,Y);x.scale(sc,sc);let px=o.al=='left'?0:-tw/2;
 ps.forEach((p,i)=>{const st=(o.at||0)+i*(o.step??.06),k=o.lt==null?1:eo(rp(o.lt,st,st+.3));if(k>0){x.save();x.globalAlpha*=k*(o.a??1);if(k<1)x.filter=`blur(${(1-k)*12}px)`;x.font=font(p);x.textAlign='left';x.textBaseline='alphabetic';if(o.sh)sh('rgba(0,0,0,.6)',size*.4);x.fillStyle=p.k?(o.kcol||P().acc):(o.col||'#fff');x.fillText(p.s,px,size*.35+(1-k)*size*.4);x.restore()}px+=ws[i]+sp});x.restore()}

/* ---------- fond barres lumineuses ---------- */
function bars(kind,lt,Y0=0,Hh=H){const c=BARS[kind]||BARS.blue;x.save();x.fillStyle='#04060c';x.fillRect(0,Y0,W,Hh);const n=Math.round(W/S(1.6));
 for(let i=0;i<n;i++){const hx=Math.sin(i*1.7)*.5+.5,h=Hh*(.25+.45*hx)*(1+.06*Math.sin(lt*1.3+i)),X=i*W/n;const g=x.createLinearGradient(0,Y0+Hh-h,0,Y0+Hh);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.75,c[0]+'99');g.addColorStop(1,c[1]+'ee');x.fillStyle=g;x.fillRect(X+S(.25),Y0+Hh-h,W/n-S(.5),h)}
 const v=x.createRadialGradient(W/2,Y0+Hh*.35,0,W/2,Y0+Hh*.35,Math.max(W,Hh)*.6);v.addColorStop(0,'rgba(4,6,12,.75)');v.addColorStop(1,'rgba(4,6,12,0)');x.fillStyle=v;x.fillRect(0,Y0,W,Hh);x.restore()}
function grainFace(){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(0,0,0,.25)');g.addColorStop(.55,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=g;x.fillRect(0,0,W,H);const v=x.createRadialGradient(W/2,H*.45,Math.min(W,H)*.35,W/2,H*.45,Math.max(W,H)*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=v;x.fillRect(0,0,W,H)}
function card(X,Y,w,h,r,o={}){x.save();sh(o.shadow||'rgba(0,0,0,.55)',S(4),S(1));x.fillStyle=o.fill||'#111522';x.beginPath();x.roundRect(X,Y,w,h,r);x.fill();noSh();x.strokeStyle=o.stroke||'rgba(255,255,255,.14)';x.lineWidth=o.lw||S(.18);x.stroke();x.restore()}
function img(im,X,Y,w,h,r,fy=.4){if(!im)return;x.save();x.beginPath();x.roundRect(X,Y,w,h,r);x.clip();cover(im,X,Y,w,h,fy);x.restore()}
function face(f,X,Y,w,h,fy,r){x.save();if(r){x.beginPath();x.roundRect(X,Y,w,h,r);x.clip()}cover(f,X,Y,w,h,fy);x.restore()}

/* ---------- sous-titres en bande (tiers bas) ---------- */
function band(sc){if(!(C.captions&&C.captions.band)||sc.captions===false)return;const y0=H*(isWide()?.7:.66);if(!window._PB){_PB=document.createElement('canvas')}_PB.width=W;_PB.height=H;const q=_PB.getContext('2d');q.filter='blur(18px) brightness(.55)';q.drawImage(x.canvas,0,0);q.filter='none';q.globalCompositeOperation='destination-in';const g=q.createLinearGradient(0,y0-H*.08,0,y0+H*.04);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');q.fillStyle=g;q.fillRect(0,0,W,H);x.drawImage(_PB,0,0)}

/* ---------- face premium (+ encart nom en bas à gauche) ---------- */
async function scenePface(t,lt,sc){const {f}=await faceAt(t,sc);const d=sc.t1-sc.t0;x.save();const z=(sc.zoom||1)*(1+(sc.push??.04)*eo(rp(lt,0,d)));x.translate(W/2,H*.35);x.scale(z,z);x.translate(-W/2,-H*.35);
 if(f&&isWide()&&f.width<f.height&&sc.fit!=='cover'){x.save();x.filter='blur(28px) brightness(.55)';cover(f,0,0,W,H,.3);x.restore();const s=H/f.height*1.06,fw=f.width*s,fx=W*(sc.faceX??.5)-fw/2;x.drawImage(f,fx,-H*.03,fw,f.height*s);const e=S(5);let gl=x.createLinearGradient(fx,0,fx+e,0);gl.addColorStop(0,'rgba(0,0,0,.55)');gl.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gl;x.fillRect(fx,0,e,H);gl=x.createLinearGradient(fx+fw,0,fx+fw-e,0);gl.addColorStop(0,'rgba(0,0,0,.55)');gl.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gl;x.fillRect(fx+fw-e,0,e,H)}
 else cover(f,0,0,W,H,sc.fy??(isWide()?.22:.38));x.restore();
 if(sc.hideY!=null||C.hideY!=null){const hy=(sc.hideY??C.hideY);window._hideBand(hy,sc.hideH??C.hideH)}grainFace();band(sc);
 if(sc.callout){const c=sc.callout,k=eo(rp(lt,c.at||.3,(c.at||.3)+.4)),X=W*.05,Y=H*(isWide()?.83:.86);if(k>0){x.save();x.globalAlpha=k;x.translate(-(1-k)*S(6),0);x.fillStyle=P().acc;x.fillRect(X,Y-S(3.2),S(.5),S(6.4));T(c.name||'',X+S(2),Y-S(1.4),S(2.6),{w:700,al:'left'});T(c.role||'',X+S(2),Y+S(1.8),S(1.7),{w:400,al:'left',col:'rgba(255,255,255,.7)'});x.restore()}}
 if(sc.hook){R(sc.hook,W/2,H*(sc.hookY||(isWide()?.78:.7)),S(sc.hookSize||4.2),{lt,at:sc.hookAt||.1,sh:1,max:W*.86})}
 if(sc.captions!==false&&!sc.hook)captions(t,Object.assign({capStyle:'mix'},sc,{capY:sc.capY||(isWide()?.82:.74)}));
 if(sc.ui)await window._uiLayer(lt,sc)}

/* ---------- carte vidéo verticale + face (16:9) ---------- */
async function scenePside(t,lt,sc){bars(sc.bars||'blue',lt);const {f}=await faceAt(t,sc);const im=sc.src?await load(sc.src):null;const k=back(rp(lt,0,.45));
 const fw=W*(isWide()?.46:1),fx=W-fw;x.save();x.globalAlpha=eo(rp(lt,0,.3));const g=x.createLinearGradient(fx,0,fx+fw*.25,0);face(f,fx,0,fw,H,sc.fy??.3);x.restore();const gl=x.createLinearGradient(fx,0,fx+fw*.3,0);gl.addColorStop(0,'rgba(4,6,12,1)');gl.addColorStop(1,'rgba(4,6,12,0)');x.fillStyle=gl;x.fillRect(fx,0,fw*.3,H);
 const ch=H*.72,cw=ch*9/16,cx=W*(isWide()?.25:.5)-cw/2,cy=H*.1+(1-eo(k))*S(8);x.save();x.globalAlpha=cl(k);card(cx-S(.6),cy-S(.6),cw+S(1.2),ch+S(1.2),S(2.4),{fill:'#0b0f1a',stroke:(BARS[sc.bars||'blue']||BARS.blue)[1]+'88',lw:S(.3)});img(im,cx,cy,cw,ch,S(2));
 if(sc.label)T(sc.label,cx+cw/2,cy+ch+S(3.2),S(2),{w:600,col:'#fff',max:cw*1.4});x.restore();
 if(sc.over)R(sc.over,cx+cw/2,cy+ch*.62,S(3),{lt,at:.5,sh:1,max:cw*.9})}

/* ---------- carte de chapitre ---------- */
async function sceneChapter(t,lt,sc){bars(sc.bars||'blue',lt);const k=eo(rp(lt,.1,.5));const ims=await Promise.all((sc.imgs||[]).map(load));
 ims.forEach((im,i)=>{const a=(i/Math.max(1,ims.length))*Math.PI*2+lt*.25,R0=Math.min(W,H)*.36;const X=W*.5+Math.cos(a)*R0*(isWide()?1.5:.9),Y=H*.45+Math.sin(a)*R0*.7,w=S(9),h=w*16/9;x.save();x.globalAlpha=.55*k;x.filter='blur(1.5px)';img(im,X-w/2,Y-h/2,w,h,S(1));x.restore()});
 T((sc.kicker||'Chapitre 1').toUpperCase(),W/2,H*.4,S(1.8),{w:600,col:(BARS[sc.bars||'blue']||BARS.blue)[1],ls:S(.4),a:k});R(sc.title||'',W/2,H*.5,S(6),{lt,at:.25,w:700,max:W*.8});if(sc.sub)T(sc.sub,W/2,H*.6,S(2),{col:'rgba(255,255,255,.65)',a:eo(rp(lt,.6,1))})}

/* ---------- podium de classement ---------- */
async function scenePodium(t,lt,sc){bars(sc.bars||'violet',lt);const items=sc.items||[];const ims=await Promise.all(items.map(i=>i.src?load(i.src):null));const n=items.length,gap=S(2),bw=Math.min(S(14),(W*.86-gap*(n-1))/n),x0=W/2-(n*bw+gap*(n-1))/2,base=H*.95;const mx=Math.max(...items.map(i=>i.h||1));
 items.forEach((it,i)=>{const at=.15+(it.order??i)*.25,k=back(rp(lt,at,at+.5)),h=H*.3*(it.h||1)/mx*cl(k),X=x0+i*(bw+gap);if(k<=0)return;const c=BARS[sc.bars||'violet']||BARS.violet;const g=x.createLinearGradient(0,base-h,0,base);g.addColorStop(0,c[1]+'cc');g.addColorStop(1,c[0]+'33');x.fillStyle=g;x.beginPath();x.roundRect(X,base-h,bw,h,[S(1),S(1),0,0]);x.fill();
  T(String(it.rank??i+1),X+bw/2,base-h+S(4),S(4),{w:700,a:cl(k)});if(it.value)T(it.value,X+bw/2,base-h-S(4),S(4.4),{w:800,a:cl(k),glow:'rgba(255,255,255,.35)'});if(ims[i]){const pw=bw*.55,ph=pw*16/9;x.save();x.globalAlpha=cl(k);card(X+bw/2-pw/2-S(.3),base-h-S(8)-ph-S(.3),pw+S(.6),ph+S(.6),S(1.2));img(ims[i],X+bw/2-pw/2,base-h-S(8)-ph,pw,ph,S(1));x.restore()}});
 if(sc.title)R(sc.title,W/2,H*.1,S(3.6),{lt,at:0,max:W*.8})}

/* ---------- cubes lumineux (principes) ---------- */
function cube(X,Y,s,k,col,lit){if(k<=0)return;x.save();x.translate(X,Y);x.scale(k,k);x.rotate(.15+Math.sin(X)*.12);const d=s*.32;const fill=lit?col+'55':'rgba(255,255,255,.04)';x.lineJoin='round';sh(col,s*(lit?.9:.35));x.strokeStyle=col;x.lineWidth=s*.035;
 const F=[[-s/2,-s/2+d],[s/2-d,-s/2+d],[s/2-d,s/2],[-s/2,s/2]],B=F.map(([a,b])=>[a+d,b-d]);x.fillStyle=fill;x.beginPath();B.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fill();x.stroke();x.beginPath();F.forEach(([a,b],i)=>i?x.lineTo(a,b):x.moveTo(a,b));x.closePath();x.fillStyle=lit?col+'88':'rgba(255,255,255,.06)';x.fill();x.stroke();for(let i=0;i<4;i++){x.beginPath();x.moveTo(...F[i]);x.lineTo(...B[i]);x.stroke()}x.restore()}
async function sceneCubes(t,lt,sc){bars(sc.bars||'gold',lt);const items=sc.items||['1','2','3','4'],n=items.length,col=(BARS[sc.bars||'gold']||BARS.gold)[1];const act=sc.active??-1;
 items.forEach((s,i)=>{const cols=isWide()?n:2,X=W*((i%cols)+.5)/cols,Y=isWide()?H*.48:H*(.35+Math.floor(i/cols)*.3),k=back(rp(lt,.1+i*.15,.5+i*.15)),sz=S(isWide()?10:16)*(i==act?1.35:1);cube(X,Y+Math.sin(lt*1.5+i)*S(.6),sz,k,col,i==act||act<0&&lt>1.2);R(s,X,Y+sz*.9,S(2.2),{lt,at:.4+i*.15,max:W/cols*.9,kcol:col})});
 if(sc.title)R(sc.title,W/2,H*.12,S(4),{lt,at:0,kcol:col,max:W*.86})}

/* ---------- texte plein écran contrasté ---------- */
async function scenePtext(t,lt,sc){const p=P();if(sc.light){pbg(lt,true)}else bars(sc.bars||'none',lt);if(!sc.light&&(!sc.bars||sc.bars=='none')){x.fillStyle=p.black;x.fillRect(0,0,W,H);const g=x.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,Math.max(W,H)*.6);g.addColorStop(0,p.accDark+'55');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 const L=sc.lines||[],G=sc.gap||10;const y0=H*.5-(L.length-1)*S(G/2);L.forEach((l,i)=>{const big=l.big;R(l.text||l,W/2,y0+i*S(G)+(big?S(1):0),S(big?(sc.bsize||(isWide()?9:8)):(sc.lsize||3.4)),{lt,at:(l.at??i*.35),w:big?800:500,kf:C.special||'serif',col:big?p.acc:(sc.light?p.black:p.white),kcol:p.acc,max:W*.88})})}

/* ---------- fenêtre d'application (assistant) ---------- */
async function sceneWindow(t,lt,sc){bars(sc.bars||'blue',lt);const k=back(rp(lt,0,.45));const w=Math.min(W*.62,S(isWide()?110:86)),h=w*.48,X=W/2-w/2,Y=H*.5-h/2+(1-eo(k))*S(8);x.save();x.globalAlpha=cl(k);card(X,Y,w,h,S(2.2),{fill:'#16171c'});['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(X+S(2.4)+i*S(1.8),Y+S(2.2),S(.55),0,7);x.fill()});
 const ic=sc.iconText||'✳';T(ic,X+w/2-S(10),Y+h*.3,S(3.2),{col:sc.iconCol||'#e2763b',w:700});R(sc.hello||'Bonjour *Awa*',X+w/2+S(1),Y+h*.3,S(3.2),{kf:'serif',kcol:'#fff',col:'#e8e8ea'});
 const bx=X+w*.12,bw=w*.76,by=Y+h*.48,bh=h*.32;x.fillStyle='#22232a';x.beginPath();x.roundRect(bx,by,bw,bh,S(1.6));x.fill();x.strokeStyle='rgba(255,255,255,.1)';x.lineWidth=S(.15);x.stroke();
 const txt=sc.text||'',n=Math.floor(cl((lt-.6)*(sc.cps||22),0,txt.length));const tw=T(n?txt.slice(0,n):(sc.placeholder||'Comment puis-je t\'aider ?'),bx+S(2),by+S(3),S(2.4),{al:'left',col:n?'#f1f1f3':'#80828c',max:bw-S(4)});if(n&&Math.floor(lt*2.5)%2==0){x.fillStyle='#fff';x.fillRect(bx+S(2)+tw+S(.2),by+S(1.8),S(.15),S(2.4))}
 const done=n>=txt.length&&txt.length>0;x.fillStyle=done?'#e2763b':'#5a3b2e';x.beginPath();x.roundRect(bx+bw-S(4.2),by+bh-S(4),S(3),S(3),S(.7));x.fill();T('↑',bx+bw-S(2.7),by+bh-S(2.5),S(1.8),{w:700});x.restore()}

/* ---------- avant / après (deux objets + flèche) ---------- */
async function sceneBA(t,lt,sc){if(sc.light)pbg(lt,true);else bars(sc.bars||'blue',lt);const [a,b]=await Promise.all([load(sc.before),load(sc.after)]);const w=isWide()?W*.24:W*.38,h=w*(sc.ratio||1.4),y=H*.5-h/2,xa=W*.5-w-S(isWide()?10:4),xb=W*.5+S(isWide()?10:4);
 [[a,xa,.1,sc.la||'Avant'],[b,xb,.6,sc.lb||'Après']].forEach(([im,X,at,l],i)=>{const k=back(rp(lt,at,at+.45));if(k<=0)return;x.save();x.globalAlpha=cl(k);x.translate(0,(1-eo(k))*S(6));card(X,y,w,h,S(2),sc.light?{fill:'#fff',stroke:'rgba(0,0,0,.08)',shadow:'rgba(0,0,0,.18)'}:{});if(!i&&sc.gray)x.filter='grayscale(1) brightness(.9)';img(im,X+S(.6),y+S(.6),w-S(1.2),h-S(1.2),S(1.6));x.filter='none';if(!i){x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.roundRect(X+S(.6),y+S(.6),w-S(1.2),h-S(1.2),S(1.6));x.fill()}R(l,X+w/2,y+h+S(4),S(sc.lsize||3.2),{w:i?700:400,col:sc.light?(i?P().black:'#777'):(i?'#fff':'rgba(255,255,255,.6)'),kcol:P().acc,kf:C.special||'serif',max:w*1.3});x.restore()});
 const ka=eo(rp(lt,.45,.8));if(ka>0){x.save();x.strokeStyle=sc.light?P().acc:'#fff';x.lineWidth=S(.5);x.lineCap='round';const x1=xa+w+S(2),x2=xb-S(2),ym=H*.5;x.beginPath();x.moveTo(x1,ym);x.quadraticCurveTo((x1+x2)/2,ym-S(6),x1+(x2-x1)*ka,ym-S(ka<1?6*Math.sin(ka*Math.PI):0));x.stroke();if(ka>=1){x.beginPath();x.moveTo(x2-S(1.6),ym-S(1.2));x.lineTo(x2,ym);x.lineTo(x2-S(1.8),ym+S(.8));x.stroke()}x.restore()}
 if(sc.title)R(sc.title,W/2,H*.16,S(sc.tsize||3.6),{lt,at:0,max:W*.86,col:sc.light?P().black:'#fff',kcol:P().acc,kf:C.special||'serif'});await UIL(lt,sc)}

/* ---------- objet seul centré, ombre portée ---------- */
async function scenePobject(t,lt,sc){const p=P();if(sc.light)pbg(lt,true);else{x.fillStyle=p.black;x.fillRect(0,0,W,H);const g=x.createRadialGradient(W/2,H*.45,0,W/2,H*.45,Math.max(W,H)*.55);g.addColorStop(0,p.accDark+'66');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}
 const im=await load(sc.src);const k=back(rp(lt,.05,.5));const w=(isWide()?W*.32:W*.62)*(sc.w||1),h=im?w*im.height/im.width:w;const X=isWide()&&sc.text?W*.38:W*.5,Y=H*(sc.oy||.5);
 x.save();x.globalAlpha=.35*cl(k);x.fillStyle='#000';x.filter='blur(14px)';x.beginPath();x.ellipse(X,Y+h*.52,w*.42,h*.06,0,0,7);x.fill();x.restore();
 if(im){x.save();x.globalAlpha=cl(k);x.translate(X,Y+(1-eo(k))*S(5)+Math.sin(lt*1.4)*S(.4));const s=.92+.08*k;x.scale(s,s);if(sc.round){x.beginPath();x.roundRect(-w/2,-h/2,w,h,S(2));x.clip()}x.drawImage(im,-w/2,-h/2,w,h);x.restore()}
 if(sc.logo){const lg=await load(sc.logo),kl=eo(rp(lt,sc.logoAt||.1,(sc.logoAt||.1)+.4));if(lg&&kl>0){const lw=W*(sc.logoW||.55),lh=lw*lg.height/lg.width;x.save();x.globalAlpha=kl;x.drawImage(lg,W/2-lw/2,H*(sc.logoY||.07),lw,lh);x.restore()}}
 if(sc.big){const kb=back(rp(lt,sc.bigAt||.2,(sc.bigAt||.2)+.45));if(kb>0){x.save();x.translate(W/2,H*(sc.by||.2));x.scale(kb,kb);T(sc.big,0,0,S(sc.bsize||18),{w:800,col:p.acc,glow:p.acc+'88'});x.restore()}}
 if(sc.text)R(sc.text,isWide()?W*.72:W/2,isWide()?H*.5:H*(sc.ty||.82),S(sc.tsize||3.2),{lt,at:sc.textAt??.5,col:sc.light?'#111':'#fff',kcol:p.acc,kf:C.special||'serif',max:isWide()?W*.4:W*.86});
 if(sc.sub)R(sc.sub,W/2,H*(sc.sy||.87),S(sc.ssize||3),{lt,at:(sc.textAt??.5)+.3,col:sc.light?'#555':'rgba(255,255,255,.8)',kcol:p.acc,kf:C.special||'serif',max:W*.86});await UIL(lt,sc)}

/* ---------- compte à rebours lumineux ---------- */
async function sceneCountdown(t,lt,sc){bars(sc.bars||'violet',lt);const s0=sc.from||259200,rate=sc.rate||3600,v=Math.max(0,s0-Math.max(0,lt-.4)*rate);const hh=Math.floor(v/3600),mm=Math.floor(v%3600/60),ss=Math.floor(v%60);const str=[hh,mm,ss].map(n=>String(n).padStart(2,'0')).join(':');
 const k=back(rp(lt,0,.4));x.save();x.translate(W/2,H*.45);x.scale(k,k);T(str,0,0,S(isWide()?13:14),{w:800,col:'#fff',glow:(BARS[sc.bars||'violet']||BARS.violet)[1]});x.restore();if(sc.sub)R(sc.sub,W/2,H*.62,S(2.8),{lt,at:.5,max:W*.8})}

/* ---------- cartes en perspective (mur 3D) ---------- */
async function sceneDeck(t,lt,sc){bars(sc.bars||'blue',lt);const ims=await Promise.all((sc.cards||[]).map(load));const n=ims.length;if(!n)return;x.save();x.translate(W/2,H*.52);x.transform(1,-.12,.18,.86,0,0);const cw=S(isWide()?11:16),chh=cw*16/9,cols=isWide()?9:5;
 for(let r=-2;r<=2;r++)for(let c=-Math.ceil(cols/2);c<=Math.ceil(cols/2);c++){const i=((r+2)*cols+c+cols*3)%n,at=.05+Math.abs(c)*.06+Math.abs(r)*.05,k=eo(rp(lt,at,at+.4));if(k<=0)continue;const X=c*(cw+S(1.4))-lt*S(2),Y=r*(chh+S(1.4));x.save();x.globalAlpha=k*(1-Math.min(.75,(Math.abs(c)/cols+Math.abs(r)/3)*.9));img(ims[i],X-cw/2,Y-chh/2+(1-k)*S(6),cw,chh,S(1));x.restore()}x.restore();
 const v=x.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*.6);v.addColorStop(0,'rgba(4,6,12,.55)');v.addColorStop(1,'rgba(4,6,12,.15)');x.fillStyle=v;x.fillRect(0,0,W,H);
 if(sc.title)R(sc.title,W/2,H*.5,S(isWide()?5.4:5),{lt,at:.3,w:600,max:W*.8,sh:1})}


/* ---------- fond uni teinté (palette) ---------- */
function pbg(lt,light){const p=P();x.fillStyle=light?p.white:p.black;x.fillRect(0,0,W,H);const g=x.createRadialGradient(W/2,H*.4,0,W/2,H*.4,Math.max(W,H)*.7);g.addColorStop(0,light?'rgba(255,255,255,.85)':p.accDark+'aa');g.addColorStop(1,light?'rgba(255,255,255,0)':'rgba(0,0,0,0)');if(light){x.fillStyle=g;x.fillRect(0,0,W,H);const g2=x.createLinearGradient(0,0,0,H);g2.addColorStop(0,'rgba(255,255,255,0)');g2.addColorStop(1,p.acc+'22');x.fillStyle=g2;x.fillRect(0,0,W,H);return}x.fillStyle=g;x.fillRect(0,0,W,H)}

/* ---------- clip : séquence d'images (ex. démo Stageshow filmée) dans une carte ---------- */
async function sceneClip(t,lt,sc){pbg(lt,sc.light);const n=sc.count||1,i=Math.min(n-1,Math.max(0,Math.floor((lt+(sc.start||0))*(sc.fps||30))));const im=await load(`${sc.dir}/${String(i+1).padStart(4,'0')}.jpg`);const k=back(rp(lt,0,.45));
 const w=W*(sc.w||.9),h=im?w*im.height/im.width:w*.6,X=W/2-w/2,Y=H*(sc.cy||.52)-h/2+(1-eo(k))*S(8);x.save();x.globalAlpha=cl(k);card(X-S(1),Y-S(1),w+S(2),h+S(2),S(3),{fill:'#ffffff',stroke:'rgba(255,255,255,.4)'});if(im){x.save();x.beginPath();x.roundRect(X,Y,w,h,S(2.4));x.clip();x.drawImage(im,X,Y,w,h);x.restore()}x.restore();
 if(sc.title)R(sc.title,W/2,Y-S(7),S(sc.tsize||4.6),{lt,at:.15,col:sc.light?'#111':P().white,kf:C.special||'serif',max:W*.9});if(sc.sub)R(sc.sub,W/2,Y+h+S(7),S(3.2),{lt,at:.5,col:sc.light?'#444':'rgba(255,255,255,.75)',kf:C.special||'serif',max:W*.9})}

/* ---------- week : jours de la semaine qui se cochent ---------- */
async function sceneWeek(t,lt,sc){pbg(lt,sc.light);const p=P(),items=sc.items||[],n=items.length;const rh=Math.min(S(11),H*.62/n),w=W*.8,X=W*.1,Y0=H*(sc.y||.24);
 if(sc.title)R(sc.title,W/2,Y0-S(8),S(sc.tsize||5),{lt,at:0,col:p.white,kf:C.special||'serif',max:W*.9});
 items.forEach((it,i)=>{const at=it.in??(.1+i*.08),k=back(rp(lt,at,at+.4));if(k<=0)return;const y=Y0+i*rh,on=it.on!=null&&lt>=it.on,hot=it.hot!=null&&lt>=it.hot;x.save();x.globalAlpha=cl(k);x.translate((1-eo(k))*S(6),0);
  x.fillStyle=hot?p.acc:on?'rgba(255,255,255,.14)':'rgba(255,255,255,.06)';x.beginPath();x.roundRect(X,y,w,rh-S(1.6),S(2.2));x.fill();if(hot){sh(p.acc,S(4))}x.restore();x.save();x.globalAlpha=cl(k);
  T(it.d||'',X+S(4),y+(rh-S(1.6))/2,S(3.2),{w:700,al:'left',col:hot?p.black:p.white});T(it.t||'',X+S(18),y+(rh-S(1.6))/2,S(3.2),{w:400,al:'left',col:hot?p.black:'rgba(255,255,255,.85)'});
  const cx=X+w-S(5),cy=y+(rh-S(1.6))/2,kc=it.on!=null?eo(rp(lt,it.on,it.on+.25)):0;x.strokeStyle=hot?p.black:'rgba(255,255,255,.45)';x.lineWidth=S(.35);x.beginPath();x.arc(cx,cy,S(2.2),0,7);x.stroke();if(kc>0){x.fillStyle=hot?p.black:p.acc;x.beginPath();x.arc(cx,cy,S(2.2)*kc,0,7);x.fill();x.strokeStyle=hot?p.acc:p.black;x.lineWidth=S(.5);x.lineCap='round';x.beginPath();x.moveTo(cx-S(1),cy);x.lineTo(cx-S(.2),cy+S(.8));x.lineTo(cx+S(1.1),cy-S(.8));x.stroke()}x.restore()})}


/* =================== scènes produit / éducatif =================== */
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};
const UIL=async(lt,sc)=>{if(sc.ui&&window._uiLayer)await window._uiLayer(lt,sc)};
// photo plein écran, zoom lent, titre riche, logo, mot géant
async function scenePhoto(t,lt,sc){const p=P(),im=await load(sc.src),d=sc.t1-sc.t0;x.save();const z=(sc.z0||1.08)+((sc.z1||1)-(sc.z0||1.08))*eo(rp(lt,0,d));x.translate(W/2,H/2);x.scale(z,z);x.translate(-W/2,-H/2);if(sc.gray)x.filter=`grayscale(${sc.gray})`;cover(im,0,0,W,H,sc.fy??.4);x.restore();
 const g=x.createLinearGradient(0,H*.45,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${sc.dim??.6})`);x.fillStyle=g;x.fillRect(0,H*.45,W,H*.55);if(sc.top){const g2=x.createLinearGradient(0,0,0,H*.3);g2.addColorStop(0,'rgba(0,0,0,.45)');g2.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g2;x.fillRect(0,0,W,H*.3)}
 if(sc.logo){const lg=await load(sc.logo),k=eo(rp(lt,sc.logoAt||.2,(sc.logoAt||.2)+.4));if(lg&&k>0){const lw=W*(sc.logoW||.5),lh=lw*lg.height/lg.width;x.save();x.globalAlpha=k;sh('rgba(0,0,0,.4)',S(3));x.drawImage(lg,W/2-lw/2,H*(sc.logoY||.08),lw,lh);x.restore()}}
 if(sc.big){const k=back(rp(lt,sc.bigAt||.2,(sc.bigAt||.2)+.45));if(k>0){x.save();x.translate(W/2,H*(sc.by||.62));x.scale(k,k);T(sc.big,0,0,S(sc.bsize||18),{w:800,col:p.acc,glow:p.acc+'aa'});x.restore()}}
 if(sc.title)R(sc.title,W/2,H*(sc.ty||.74),S(sc.tsize||6),{lt,at:sc.titleAt||.15,kf:C.special||'serif',kcol:p.acc,col:'#fff',sh:1,max:W*.9});
 if(sc.sub)R(sc.sub,W/2,H*(sc.sy||.8),S(sc.ssize||3.6),{lt,at:(sc.titleAt||.15)+.35,col:'rgba(255,255,255,.9)',kcol:p.acc,kf:C.special||'serif',sh:1,max:W*.9});await UIL(lt,sc)}
// liste de croix ou de coches qui tombent
async function sceneXlist(t,lt,sc){pbg(lt,sc.light);const p=P(),it=sc.items||[],n=it.length,ink=sc.light?p.black:p.white;if(sc.title)R(sc.title,W/2,H*.2,S(sc.tsize||7),{lt,at:0,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9});
 it.forEach((s,i)=>{const at=(sc.at||.35)+i*(sc.step||.28),k=back(rp(lt,at,at+.4));if(k<=0)return;const y=H*.36+i*S(17),X=W*.16;x.save();x.globalAlpha=cl(k);x.translate(0,-(1-eo(k))*S(14));
  const r=S(5.5),cx=X+r,cy=y+r;x.fillStyle=sc.mark=='check'?'#16a34a':'#dc2626';x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.strokeStyle='#fff';x.lineWidth=S(1.1);x.lineCap='round';x.beginPath();if(sc.mark=='check'){x.moveTo(cx-r*.42,cy);x.lineTo(cx-r*.08,cy+r*.34);x.lineTo(cx+r*.45,cy-r*.32)}else{x.moveTo(cx-r*.38,cy-r*.38);x.lineTo(cx+r*.38,cy+r*.38);x.moveTo(cx+r*.38,cy-r*.38);x.lineTo(cx-r*.38,cy+r*.38)}x.stroke();
  R(s,X+r*2+S(4),cy,S(sc.isize||5),{al:'left',col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.62});x.restore()})}
// palette 60-30-10
async function scenePalette(t,lt,sc){pbg(lt,sc.light);const p=P(),ink=sc.light?p.black:p.white,cols=sc.colors||[p.black,p.white,p.acc],pc=[60,30,10];if(sc.title)R(sc.title,W/2,H*.18,S(sc.tsize||6.5),{lt,at:0,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9});
 const X=W*.1,w=W*.8,Y=H*.32,h=H*.4;let y=Y;pc.forEach((v,i)=>{const k=eo(rp(lt,.25+i*.25,.7+i*.25)),hh=h*v/100;x.save();x.fillStyle=cols[i];sh('rgba(0,0,0,.25)',S(3),S(1));x.beginPath();x.roundRect(X,y,w*k,hh-S(1.2),S(2));x.fill();x.restore();if(k>.6)T(v+' %',X+S(5),y+(hh-S(1.2))/2,S(5),{w:800,al:'left',col:i==1?p.black:'#fff',a:eo(rp(k,.6,1))});y+=hh});
 if(sc.sub)R(sc.sub,W/2,H*.8,S(3.6),{lt,at:1,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9})}
// jour -> nuit
async function sceneDaynight(t,lt,sc){const d=sc.t1-sc.t0,k=eo(rp(lt,.2,d*.75));const c1=[[247,236,220],[16,24,48]],c2=[[255,214,170],[45,40,90]];const mix=(a,b)=>`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*k)).join(',')})`;
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,mix(c1[0],c1[1]));g.addColorStop(1,mix(c2[0],c2[1]));x.fillStyle=g;x.fillRect(0,0,W,H);
 const sy=H*.42+k*H*.4;x.save();sh('#ffcf6b',S(8));x.fillStyle='#ffc857';x.globalAlpha=1-k;x.beginPath();x.arc(W*.3,sy,S(9),0,7);x.fill();x.restore();
 const my=H*.82-k*H*.48;x.save();x.globalAlpha=k;sh('#f5f0d0',S(6));x.fillStyle='#f5f0d0';x.beginPath();x.arc(W*.68,my,S(8),0,7);x.fill();x.fillStyle=mix(c1[0],c1[1]);x.beginPath();x.arc(W*.68+S(3.5),my-S(2.5),S(7),0,7);x.fill();x.restore();
 for(let i=0;i<30;i++){const a=k*(.4+.6*hash(i));x.fillStyle=`rgba(255,255,255,${a})`;x.beginPath();x.arc(W*hash(i+3),H*.6*hash(i+7),S(.35+.3*hash(i)),0,7);x.fill()}
 if(sc.title)R(sc.title,W/2,H*.2,S(sc.tsize||6.5),{lt,at:.1,col:k>.5?'#fff':'#2a1d12',kcol:P().acc,kf:C.special||'serif',max:W*.9});if(sc.sub)R(sc.sub,W/2,H*.27,S(3.6),{lt,at:.4,col:k>.5?'rgba(255,255,255,.85)':'#5b4636',kf:C.special||'serif',max:W*.9})}
// flèches qui montent sur des zones
async function sceneArrows(t,lt,sc){pbg(lt,sc.light);const p=P(),ink=sc.light?p.black:p.white,it=sc.items||[];if(sc.title)R(sc.title,W/2,H*.18,S(sc.tsize||6.5),{lt,at:0,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9});
 it.forEach((s,i)=>{const X=W*(i+.5)/it.length,k=eo(rp(lt,.2+i*.2,.6+i*.2));if(k<=0)return;x.save();x.globalAlpha=k;x.fillStyle=p.acc+'22';x.beginPath();x.roundRect(X-W*.13,H*.32,W*.26,H*.42,S(6));x.fill();
  for(let j=0;j<4;j++){const ph=((lt*.9+j/4)%1),y=H*.7-ph*H*.34,a=Math.sin(ph*Math.PI);x.strokeStyle=p.acc;x.globalAlpha=k*a;x.lineWidth=S(1.2);x.lineCap='round';x.beginPath();x.moveTo(X-S(4),y+S(3));x.lineTo(X,y-S(1));x.lineTo(X+S(4),y+S(3));x.stroke()}x.restore();
  R(s,X,H*.79,S(4.4),{lt,at:.3+i*.2,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.3})})}
// courbe qui monte puis chute
async function sceneCurve(t,lt,sc){pbg(lt,sc.light);const p=P(),ink=sc.light?p.black:p.white;if(sc.title)R(sc.title,W/2,H*.18,S(sc.tsize||6.5),{lt,at:0,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9});
 const X0=W*.1,Y0=H*.32,w=W*.8,h=H*.4,pts=sc.pts||[.05,.25,.45,.62,.78,.82,.5,.2,.08],k=eo(rp(lt,.2,(sc.t1-sc.t0)*.8)),n=pts.length;x.save();x.strokeStyle=ink+'33';x.lineWidth=S(.2);for(let i=0;i<=4;i++){x.beginPath();x.moveTo(X0,Y0+h*i/4);x.lineTo(X0+w,Y0+h*i/4);x.stroke()}
 const P2=pts.map((v,i)=>[X0+w*i/(n-1),Y0+h*(1-v)]);const upto=k*(n-1);x.lineWidth=S(1.2);x.lineJoin='round';x.lineCap='round';x.beginPath();x.moveTo(...P2[0]);for(let i=1;i<=Math.floor(upto);i++)x.lineTo(...P2[i]);const fi=Math.floor(upto),fr=upto-fi;let tip=P2[fi];if(fi<n-1){tip=[P2[fi][0]+(P2[fi+1][0]-P2[fi][0])*fr,P2[fi][1]+(P2[fi+1][1]-P2[fi][1])*fr];x.lineTo(...tip)}
 const pk=sc.peak??5;x.strokeStyle=p.acc;x.stroke();if(upto>pk){x.beginPath();x.moveTo(...P2[pk]);for(let i=pk+1;i<=fi;i++)x.lineTo(...P2[i]);if(fi<n-1)x.lineTo(...tip);x.strokeStyle='#dc2626';x.stroke()}const down=upto>pk;x.fillStyle=down?'#dc2626':p.acc;x.beginPath();x.arc(...tip,S(1.6),0,7);x.fill();x.restore();
 (sc.labels||[]).forEach(l=>{if(upto>=l.i){const q=P2[l.i];T(l.text,q[0],q[1]-S(5),S(3),{w:700,col:l.red?'#dc2626':ink,a:eo(rp(upto-l.i,0,.5))})}})}
// mots qui défilent (mois…)
async function sceneFlip(t,lt,sc){pbg(lt,sc.light);const p=P(),ink=sc.light?p.black:p.white,w=sc.words||[],d=sc.t1-sc.t0,i=Math.min(w.length-1,Math.floor(eo(rp(lt,0,d*.85))*w.length));if(sc.title)R(sc.title,W/2,H*.24,S(sc.tsize||5),{lt,at:0,col:ink,kcol:p.acc,kf:C.special||'serif',max:W*.9});
 const fr=(lt*w.length/(d*.85))%1;x.save();x.beginPath();x.rect(0,H*.38,W,H*.16);x.clip();T(w[i],W/2,H*.46,S(sc.wsize||12),{w:800,col:i==w.length-1?p.acc:ink});x.restore();
 if(sc.card){const k=back(rp(lt,.3,.7));x.save();x.globalAlpha=cl(k);card(W*.2,H*.62,W*.6,S(14),S(3),{fill:sc.light?'#fff':'#141a2e',stroke:'rgba(0,0,0,.08)'});T('📄',W*.27,H*.62+S(7),S(5));T(sc.card,W*.34,H*.62+S(5),S(3.4),{w:700,al:'left',col:sc.light?'#111':'#fff'});T(sc.cardSub||'',W*.34,H*.62+S(9.5),S(2.6),{al:'left',col:'#888'});x.restore()}}

// P03 : photo entière dans un cadre arrondi, fond = même photo floutée, titre + logo + ui autour
async function sceneFrame(t,lt,sc){const p=P(),im=await load(sc.src),d=sc.t1-sc.t0;
 x.save();x.filter='blur(38px) brightness(.55) saturate(1.1)';cover(im,-W*.1,-H*.1,W*1.2,H*1.2,.5);x.restore();x.fillStyle='rgba(0,0,0,.18)';x.fillRect(0,0,W,H);
 const k=back(rp(lt,.05,.55)),fw=W*(sc.fw||.7),fh=fw*(im?im.height/im.width:1),cx=W/2,cy=H*(sc.fy||.48)+(1-eo(cl(k)))*S(10),z=1+.04*eo(rp(lt,0,d));
 x.save();x.globalAlpha=cl(k);x.translate(cx,cy);x.scale(z*(.9+.1*cl(k)),z*(.9+.1*cl(k)));sh('rgba(0,0,0,.55)',S(9),S(3));x.fillStyle='rgba(255,255,255,.14)';x.beginPath();x.roundRect(-fw/2-S(1.4),-fh/2-S(1.4),fw+S(2.8),fh+S(2.8),S(5));x.fill();x.shadowColor='transparent';
 x.save();x.beginPath();x.roundRect(-fw/2,-fh/2,fw,fh,S(4));x.clip();x.drawImage(im,-fw/2,-fh/2,fw,fh);x.restore();x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=S(.35);x.beginPath();x.roundRect(-fw/2,-fh/2,fw,fh,S(4));x.stroke();x.restore();
 if(sc.logo){const lg=await load(sc.logo),kl=eo(rp(lt,sc.logoAt||.3,(sc.logoAt||.3)+.4));if(lg&&kl>0){const lw=W*(sc.logoW||.42),lh=lw*lg.height/lg.width;x.save();x.globalAlpha=kl;sh('rgba(0,0,0,.4)',S(3));x.drawImage(lg,W/2-lw/2,H*(sc.logoY||.06),lw,lh);x.restore()}}
 if(sc.title)R(sc.title,W/2,H*(sc.ty||.8),S(sc.tsize||5.5),{lt,at:sc.titleAt??.5,col:'#fff',kcol:p.acc,kf:C.special||'serif',sh:1,max:W*.9});
 if(sc.sub)R(sc.sub,W/2,H*(sc.sy||.86),S(sc.ssize||4),{lt,at:sc.subAt??.9,col:'rgba(255,255,255,.88)',kcol:p.acc,kf:C.special||'serif',sh:1,max:W*.9});await UIL(lt,sc)}

Object.assign(RUN,{frame:sceneFrame,photo:scenePhoto,xlist:sceneXlist,palette:scenePalette,daynight:sceneDaynight,arrows:sceneArrows,curve:sceneCurve,flip:sceneFlip,clip:sceneClip,week:sceneWeek,pface:scenePface,pside:scenePside,chapter:sceneChapter,podium:scenePodium,cubes:sceneCubes,ptext:scenePtext,window:sceneWindow,ba:sceneBA,pobject:scenePobject,countdown:sceneCountdown,deck:sceneDeck});
})();
