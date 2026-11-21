/* =====================================================================
   EFFETS 2 — chargé après effets.js
   · Version fidèle des 17 effets « Echo » (X6–X15 revus + X17–X24)
   · Objets autour de la tête et sous-titres « duo » (X25–X31)
   · Personnage illustré : graphismes, interfaces, cabines, nuit (O7–O25)
   · Options de scène : titre, reperes, annot, trame, bg "cabine", cap "duo" | "tuiles"
   ===================================================================== */
(function(){
const {reel,cursor,ripple,tick,lerpC,withExit,bk,ease,P,U,reels,shadowOn}=window.FXU,EFX=window.EFX;
const SER='Lora',MONO='"JetBrains Mono", monospace';
const R0=a=>a[0]||null;
function txt(s,X,Y,size,o={}){x.save();x.translate(X,Y);if(o.rot)x.rotate(o.rot);if(o.sx||o.sc)x.scale((o.sx||1)*(o.sc||1),o.sc||1);x.font=`${o.it?'italic ':''}${o.w||700} ${size}px ${o.f||P().font}`;x.textAlign=o.al||'left';x.textBaseline=o.bl||'middle';x.globalAlpha*=o.a??1;
 if(o.max){const w=x.measureText(s).width*(o.sx||1);if(w>o.max){const k=o.max/w;x.scale(k,k)}}
 if(o.sh){x.shadowColor=o.sh===true?'rgba(0,0,0,.45)':o.sh;x.shadowBlur=size*.25;x.shadowOffsetY=size*.06}
 if(o.stroke){x.lineWidth=o.stroke[0];x.strokeStyle=o.stroke[1];x.lineJoin='round';x.strokeText(s,0,0)}x.fillStyle=o.col||'#fff';x.fillText(s,0,0);x.restore()}
function box(X,Y,w,h,r,fill,o={}){x.save();if(o.sh!==false){x.shadowColor=o.shc||'rgba(0,0,0,.22)';x.shadowBlur=o.blur||U()*3;x.shadowOffsetY=U()*.6}x.fillStyle=fill;rr(X,Y,w,h,r);x.fill();x.shadowColor='transparent';if(o.line){x.strokeStyle=o.line;x.lineWidth=o.lw||U()*.25;x.stroke()}x.restore()}
function popT(k){return [cl(k*1.6),.85+.15*back(k)]}
function scaleAt(X,Y,s){x.translate(X,Y);x.scale(s,s);x.translate(-X,-Y)}
function jit(t,i,a=U()*.35){const f=Math.floor(t*10);return Math.sin(f*12.9898+i*78.233)*a}
const PINK='#ff4f9a',YEL='#ffe14d';

/* ============ VERSION FIDÈLE « ECHO » ============ */
// X10 Mur de unes : un collage de feuilles de papier avec de gros titres, étiquettes colorées
EFX.titres=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const words=fx.words||['ORBITE','MUR DE VIDÉOS','CADRE','UI WORLD','ZOOM'];
 x.fillStyle='#d9d6d0';x.fillRect(0,0,W,H);const g=x.createRadialGradient(W/2,H*.3,0,W/2,H*.3,H*.7);g.addColorStop(0,'rgba(255,255,255,.5)');g.addColorStop(1,'rgba(0,0,0,.15)');x.fillStyle=g;x.fillRect(0,0,W,H);
 const sheets=[[.5,.1,.86,.17,-1.5,'#f6f4ef','#111',true],[.24,.31,.42,.1,2,'#f6f4ef','#111'],[.8,.29,.34,.12,-2,YEL,'#111'],[.2,.44,.38,.11,-3,'#151515','#fff'],[.8,.47,.36,.12,3,'#ff9ad0','#111']];
 sheets.forEach(([cx,cy,w,h,rot,bg,fg,big],i)=>{const k=bk(t,i*.07,.35);if(k<=0)return;x.save();x.translate(W*cx,H*cy+(1-k)*H*.05);x.rotate(rot*Math.PI/180);x.globalAlpha=cl(k*2);box(-W*w/2,-H*h/2,W*w,H*h,U()*.4,bg);
  txt('EFFET '+String(i+1).padStart(2,'0'),-W*w/2+U()*2,-H*h/2+U()*2.2,U()*1.6,{w:700,col:'#fff',f:MONO});x.fillStyle='#e8425a';x.fillRect(-W*w/2+U()*1.4,-H*h/2+U()*1.2,U()*10,U()*2);txt('EFFET '+String(i+1).padStart(2,'0'),-W*w/2+U()*2,-H*h/2+U()*2.2,U()*1.4,{w:700,col:'#fff'});
  txt(words[i%words.length],-W*w/2+U()*2.5,U()*1.5,U()*(big?10:6),{w:900,col:fg,sx:.82,max:W*w*.9,bl:'middle'});if(big){x.fillStyle='#111';x.fillRect(-W*w/2+U()*2.5,H*h/2-U()*3,W*w*.6,U()*.3)}x.restore()})};
// X11 Zoom traversant : la caméra plonge dans le visage, puis coupe nette
EFX.traversant=async(lt,sc,fx,front,ctx)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=rp(t,0,fx.d||.55),z=1+3*Math.pow(k,2.2);
 x.save();scaleAt(W/2,H*(fx.y||.24),z);x.filter=`blur(${k*k*14}px)`;cover(ctx.f,0,0,W,H,ctx.fy);x.restore();x.filter='none';
 if(k>=1){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1b1c33');g.addColorStop(1,'#2a2440');x.fillStyle=g;x.globalAlpha=1-ease(t,(fx.d||.55),.4);x.fillRect(0,0,W,H);x.globalAlpha=1}
 ctx.noPerson=k<1};
// X13 Fond vert remplacé : un fond vert devient un ciel de coucher de soleil, soleil derrière la tête, montagnes
EFX.decor=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=ease(t,.25,.4);
 x.fillStyle='#20b34a';x.fillRect(0,0,W,H);x.save();x.globalAlpha=k;const g=x.createLinearGradient(0,0,0,H*.75);g.addColorStop(0,fx.c1||'#b7b3ea');g.addColorStop(.55,fx.c2||'#f2c3c9');g.addColorStop(1,'#f7d7b5');x.fillStyle=g;x.fillRect(0,0,W,H);
 const sy=H*(fx.y||.2);const sg=x.createRadialGradient(W/2,sy,0,W/2,sy,W*.36);sg.addColorStop(0,'rgba(255,240,150,1)');sg.addColorStop(.35,'rgba(255,230,120,.8)');sg.addColorStop(1,'rgba(255,230,120,0)');x.fillStyle=sg;x.fillRect(0,0,W,H);
 [[.62,'#9fa6e6',.06],[.7,'#7f86d6',.05],[.8,'#6a6fc4',.04]].forEach(([y,c,a],i)=>{x.fillStyle=c;x.beginPath();x.moveTo(0,H);for(let X=0;X<=W;X+=W/30)x.lineTo(X,H*y-Math.abs(Math.sin(X/W*Math.PI*(2+i)+i*1.7))*H*a);x.lineTo(W,H);x.closePath();x.fill()});x.restore();
 x.save();box(W*.58,H*.04,W*.34,U()*4.4,U()*2.2,'rgba(20,20,30,.75)',{sh:false});txt('CHROMA KEY',W*.61,H*.04+U()*2.2,U()*1.7,{w:700,col:'#fff'});box(W*.83,H*.04+U()*.9,U()*6,U()*2.6,U()*1.3,k>.5?YEL:'#555',{sh:false});txt(k>.5?'ON':'OFF',W*.83+U()*3,H*.04+U()*2.2,U()*1.4,{w:800,col:'#111',al:'center'});
 x.fillStyle='#ff4f5a';x.beginPath();x.arc(W*.07,H*.05,U()*.7,0,7);x.fill();txt('REC',W*.09,H*.05,U()*1.6,{w:700,col:'#fff'});x.restore()};
// X14 Vertigo : un couloir de cadres qui fonce vers l'arrière derrière la personne
EFX.vertigo=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const cx=W/2,cy=H*.3,sp=(t*(fx.speed||.9))%1;
 x.fillStyle='#2b2238';x.fillRect(0,0,W,H);for(let i=14;i>=0;i--){const d=Math.pow(.78,i-sp),w=W*1.6*d,h=H*1.2*d;const c=i%2?'#7b5a9e':'#c48fc0';x.strokeStyle=c;x.globalAlpha=cl(1.2-d*.4)*cl(d*6);x.lineWidth=U()*3*d;x.strokeRect(cx-w/2,cy-h/2,w,h)}x.globalAlpha=1;
 const g=x.createRadialGradient(cx,cy,0,cx,cy,W*.2);g.addColorStop(0,'rgba(255,220,240,.7)');g.addColorStop(1,'rgba(255,220,240,0)');x.fillStyle=g;x.fillRect(0,0,W,H)};
// X15 Texte chrome : un grand mot chromé en relief, la 1re ligne derrière, la 2e devant
EFX.verre=async(lt,sc,fx,front)=>{const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.45);
 const chrome=(s,y,size)=>{x.save();x.translate(W/2,y);x.scale(.75+.25*k,.75+.25*k);x.globalAlpha*=cl(k*1.6);x.font=`900 ${size}px ${P().font}`;x.textAlign='center';x.textBaseline='middle';const w=x.measureText(s).width;if(w>W*.94){const q=W*.94/w;x.scale(q,q)}
  for(let d=6;d>0;d--){x.fillStyle=`rgba(30,30,40,${.12})`;x.fillText(s,d*size*.012,d*size*.014)}
  const g=x.createLinearGradient(0,-size*.5,0,size*.5);g.addColorStop(0,'#ffffff');g.addColorStop(.38,'#c9c9d2');g.addColorStop(.5,'#5b5b66');g.addColorStop(.62,'#e9e9ef');g.addColorStop(1,'#8d8d99');x.fillStyle=g;x.fillText(s,0,0);
  x.lineWidth=size*.018;x.strokeStyle='rgba(40,40,50,.75)';x.strokeText(s,0,0);const sh=((t*.6)%1.4-.2)*w;x.save();x.globalCompositeOperation='source-atop';const s2=x.createLinearGradient(sh-w*.1,0,sh+w*.1,0);s2.addColorStop(0,'rgba(255,255,255,0)');s2.addColorStop(.5,'rgba(255,255,255,.7)');s2.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=s2;x.fillText(s,0,0);x.restore();x.restore()};
 if(!front)chrome(fx.top||'STUDIO',H*(fx.yTop||.17),U()*26);else if(fx.bottom)chrome(fx.bottom,H*(fx.yBot||.66),U()*22)};
// X8 Cadre qui casse (fond lilas par défaut) : on garde la version du moteur, couleur fidèle
const _cadre=EFX.cadre;EFX.cadre=async(lt,sc,fx,front,ctx)=>_cadre(lt,sc,Object.assign({bg:'#d9c6f2'},fx),front,ctx);

// X17 UI World : des panneaux d'interface flottent autour de la personne (calques, réglages, compteur d'images, aperçu)
EFX.ui=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const p=P();
 const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#eef0fb');g.addColorStop(1,'#d9dcef');x.fillStyle=g;x.fillRect(0,0,W,H);x.save();x.globalAlpha=.25;x.fillStyle='#9aa0c8';for(let i=U()*2;i<W;i+=U()*3)for(let j=U()*2;j<H;j+=U()*3){x.beginPath();x.arc(i,j,U()*.12,0,7);x.fill()}x.restore();
 const pan=(i,X,Y,w,h,title,draw)=>{const k=bk(t,i*.08,.4);if(k<=0)return;x.save();x.globalAlpha=cl(k*1.6);scaleAt(X+w/2,Y+h/2,.85+.15*k);box(X,Y,w,h,U()*1.6,'rgba(255,255,255,.92)',{line:'rgba(0,0,0,.06)'});if(title)txt(title,X+U()*1.6,Y+U()*2.2,U()*1.7,{w:700,col:'#222'});draw&&draw(X,Y,w,h);x.restore()};
 pan(0,W*.05,H*.1,W*.36,H*.1,'Calques',(X,Y)=>['Sujet','Graphismes','Fond'].forEach((s,i)=>{x.fillStyle=['#8b7cf6','#3fb7f5','#f5a34a'][i];x.beginPath();x.arc(X+U()*2.6,Y+U()*5.2+i*U()*2.8,U()*.7,0,7);x.fill();txt(s,X+U()*4,Y+U()*5.2+i*U()*2.8,U()*1.6,{w:500,col:'#333'})}));
 pan(1,W*.6,H*.1,W*.35,H*.1,'Réglages',(X,Y,w)=>['Profondeur','Lueur','Parallaxe'].forEach((s,i)=>{txt(s,X+U()*1.6,Y+U()*5.2+i*U()*2.8,U()*1.5,{w:500,col:'#555'});const on=t>.6+i*.15||i==0;box(X+w-U()*6.5,Y+U()*4.2+i*U()*2.8,U()*4.6,U()*2,U(),on?PINK:'#ccc',{sh:false});x.fillStyle='#fff';x.beginPath();x.arc(X+w-U()*(on?3:5.4),Y+U()*5.2+i*U()*2.8,U()*.8,0,7);x.fill()}));
 pan(2,W*.66,H*.24,W*.26,H*.06,null,(X,Y,w,h)=>{box(X,Y,w,h,U()*1.6,'#17171c',{sh:false});txt('IMAGE',X+U()*1.6,Y+U()*1.8,U()*1.2,{w:600,col:'#999'});txt(String(Math.floor(t*30)).padStart(4,'0'),X+U()*1.6,Y+h*.62,U()*4,{w:800,col:'#fff'})});
 pan(3,W*.05,H*.26,W*.25,U()*3.6,null,(X,Y)=>{x.fillStyle='#ff4f5a';x.beginPath();x.arc(X+U()*1.8,Y+U()*1.8,U()*.6,0,7);x.fill();txt('Aperçu en direct',X+U()*3.2,Y+U()*1.8,U()*1.5,{w:600,col:'#333'})});
 pan(4,W*.05,H*.36,W*.3,H*.12,'Timeline',(X,Y,w)=>[0,1,2].forEach(i=>{box(X+U()*1.6,Y+U()*4.5+i*U()*2.6,(w-U()*3.2)*(.4+.2*i),U()*1.7,U()*.5,['#c9c2fb','#bde6fb','#fbd7b0'][i],{sh:false})}));
 const bx=W*.62,by=H*.46;['Aperçu','Appliquer'].forEach((s,i)=>{const k=bk(t,.5+i*.08,.3);if(k<=0)return;box(bx+i*W*.17,by,W*.15,U()*4,U()*2,i?PINK:'#fff',{line:'#222'});txt(s,bx+i*W*.17+W*.075,by+U()*2,U()*1.6,{w:700,col:i?'#fff':'#222',al:'center'})});
 const ck=rp(t,.6,1.2);if(t>.6){const cxp=lerp(W*.9,bx+W*.25,eo(ck)),cyp=lerp(H*.6,by+U()*2,eo(ck));ripple(cxp,cyp,rp(t,1.2,1.6));cursor(cxp,cyp)}};
// X18 Zoom numérique : viseur de caméra, REC, mise au point sur le visage, zoom 2.0x
EFX.zoomcam=async(lt,sc,fx,front,ctx)=>{const t=lt-(fx.at||0);if(t<0)return;const k=eo(rp(t,.2,.8)),z=1+(fx.z||1)*k,fyc=H*(fx.y||.24);
 if(!front){x.save();scaleAt(W/2,fyc,z);cover(ctx.f,0,0,W,H,ctx.fy);x.restore();ctx.noPerson=true;return}
 const m=U()*6,L=U()*7;x.save();x.strokeStyle='#fff';x.lineWidth=U()*.5;[[m,m,1,1],[W-m,m,-1,1],[m,H*.78,1,-1],[W-m,H*.78,-1,-1]].forEach(([X,Y,a,b])=>{x.beginPath();x.moveTo(X,Y+b*L);x.lineTo(X,Y);x.lineTo(X+a*L,Y);x.stroke()});
 x.fillStyle='#ff4f5a';x.beginPath();x.arc(m+U()*3,m+U()*3.5,U()*.8,0,7);x.fill();txt('REC',m+U()*5,m+U()*3.5,U()*2,{w:700,col:'#fff'});txt('4K 25P',m+U()*2,m+U()*6,U()*1.3,{w:500,col:'#ccc'});
 const tc=lt+((sc.t0||0));txt('00:00:'+String(Math.floor(tc)).padStart(2,'0')+':'+String(Math.floor((tc%1)*25)).padStart(2,'0'),W-m-U()*2,m+U()*3.5,U()*1.6,{w:500,col:'#eee',al:'right',f:MONO});
 const fq=U()*16,fk=bk(t,.1,.35);x.strokeStyle=YEL;x.lineWidth=U()*.4;const fx0=W/2,fy0=H*.22;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{const X=fx0+a*fq*(1.2-.2*fk),Y=fy0+b*fq*(1.2-.2*fk);x.beginPath();x.moveTo(X,Y-b*U()*3);x.lineTo(X,Y);x.lineTo(X-a*U()*3,Y);x.stroke()});
 box(fx0-U()*2.5,fy0+fq+U()*1.5,U()*5,U()*2,U()*.5,YEL,{sh:false});txt('AF-L',fx0,fy0+fq+U()*2.5,U()*1.1,{w:800,col:'#111',al:'center'});
 box(W/2-U()*5,H*.74,U()*10,U()*3.6,U()*1.8,'rgba(20,20,20,.75)',{sh:false});txt((1+(fx.z||1)*k).toFixed(1)+'x',W/2,H*.74+U()*1.8,U()*2.2,{w:800,col:'#fff',al:'center'});
 for(let i=-10;i<=10;i++){x.fillStyle='rgba(255,255,255,.6)';x.fillRect(W/2+i*U()*1.3,H*.77,U()*.15,i%5?U()*.8:U()*1.4)}x.restore()};
// X19 Checklist : une carte blanche avec un compteur ; les cases se cochent et se barrent
EFX.checklist=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const items=fx.items||['Orbite','Mur de vidéos','UI World','Cadre','Zoom'],tot=fx.total||items.length;
 const k=bk(t,0,.4),X=W*.08,Y=H*(fx.y||.05),w=W*.84,h=U()*7+Math.ceil(items.length/2)*U()*4.4;withExit(lt,fx,()=>{x.save();x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.85+.15*k);box(X,Y,w,h,U()*2.4,'#fff');
  box(X+U()*2,Y+U()*1.6,U()*4,U()*2.4,U()*1.2,YEL,{sh:false});txt(String(fx.n||7).padStart(2,'0'),X+U()*4,Y+U()*2.8,U()*1.2,{w:800,col:'#111',al:'center'});txt(fx.title||'CHECKLIST',X+U()*7,Y+U()*2.9,U()*3.2,{w:900,col:'#111'});
  const done=items.filter((_,i)=>t>.5+i*.22).length;box(X+w-U()*11,Y+U()*1.5,U()*9,U()*2.8,U()*1.4,'#111',{sh:false});txt(String(done).padStart(2,'0')+'/'+tot,X+w-U()*6.5,Y+U()*2.9,U()*1.6,{w:800,col:'#fff',al:'center'});
  items.forEach((s,i)=>{const cX=X+U()*3+(i%2)*w*.5,cY=Y+U()*8+Math.floor(i/2)*U()*4.4,on=t>.5+i*.22;box(cX-U()*1.1,cY-U()*1.1,U()*2.2,U()*2.2,U()*.5,on?PINK:'#fff',{sh:false,line:on?PINK:'#999'});if(on){x.strokeStyle='#fff';x.lineWidth=U()*.35;x.beginPath();x.moveTo(cX-U()*.6,cY);x.lineTo(cX-U()*.1,cY+U()*.5);x.lineTo(cX+U()*.7,cY-U()*.5);x.stroke()}
   txt(s,cX+U()*2.2,cY,U()*1.9,{w:500,col:on?'#d33':'#333'});if(on){x.save();x.globalAlpha=.8;x.strokeStyle='#d33';x.lineWidth=U()*.2;x.beginPath();x.moveTo(cX+U()*2.2,cY);x.lineTo(cX+U()*2.2+x.measureText(s).width*rp(t,.5+i*.22,.7+i*.22)*1.15,cY);x.stroke();x.restore()}});x.restore()})};
// X20 Courbe qui grimpe : fond bleu nuit, des barres et une courbe montent derrière la personne
EFX.courbe2=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1d1f33');g.addColorStop(1,'#2b2d45');x.fillStyle=g;x.fillRect(0,0,W,H);
 x.strokeStyle='rgba(255,255,255,.08)';x.lineWidth=1;for(let i=1;i<8;i++){x.beginPath();x.moveTo(W*.06,H*.08*i);x.lineTo(W*.94,H*.08*i);x.stroke()}
 const vals=fx.values||[.15,.22,.2,.32,.38,.5,.62,.8,1],n=vals.length,base=H*.62;vals.forEach((v,i)=>{const k=ease(t,i*.06,.4),X=W*.08+i*(W*.84/n),h=H*.5*v*k;const gg=x.createLinearGradient(0,base-h,0,base);gg.addColorStop(0,i==n-1?PINK:'#8f8cff');gg.addColorStop(1,'rgba(143,140,255,.15)');x.fillStyle=gg;rr(X,base-h,W*.84/n*.62,h,U());x.fill()});
 x.strokeStyle=PINK;x.lineWidth=U()*.6;x.beginPath();vals.forEach((v,i)=>{const k=ease(t,i*.06,.4);const X=W*.08+i*(W*.84/n)+W*.84/n*.31,Y=base-H*.5*v*k;i?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke();
 if(fx.label){const k=bk(t,.6,.4);txt(fx.label,W*.92,base-H*.53,U()*6,{w:900,col:'#fff',al:'right',a:cl(k)})}};
// X21 Papier déchiré : des bandes de papier déchiré traversent l'écran, la 2e porte le titre
EFX.papier=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;
 const strip=(y,h,col,k,ang,seed)=>{x.save();x.translate(W/2+(1-k)*W*1.2,y);x.rotate(ang);x.fillStyle=col;x.beginPath();x.moveTo(-W*.8,-h/2);for(let X=-W*.8;X<=W*.8;X+=U()*2)x.lineTo(X,-h/2+Math.sin(X*.37+seed)*U()*.8+Math.sin(X*1.3+seed)*U()*.5);for(let X=W*.8;X>=-W*.8;X-=U()*2)x.lineTo(X,h/2+Math.sin(X*.41+seed*2)*U()*.8+Math.cos(X*1.1)*U()*.5);x.closePath();x.shadowColor='rgba(0,0,0,.2)';x.shadowBlur=U()*2;x.fill();x.restore()};
 x.fillStyle='#ecebe7';x.fillRect(0,0,W,H);strip(H*.1,H*.13,'#c7b8f5',ease(t,0,.4),-.05,1);strip(H*.24,H*.12,'#fff',ease(t,.12,.4),.03,2);strip(H*.4,H*.1,'#f6c9dd',ease(t,.24,.4),-.04,3);
 if(fx.label){const k=bk(t,.4,.35);x.save();x.translate(W*.5,H*.1);x.rotate(-.05);x.globalAlpha=cl(k);txt(fx.label,0,0,U()*5,{w:900,col:'#111',al:'center',sx:.9});x.restore()}};
// X22 Gribouillis vivants : halo, flèches et bulle dessinés à la main, qui « tremblent » comme une animation image par image
EFX.doodle=async(lt,sc,fx,front)=>{const t=lt-(fx.at||0);if(t<0)return;const cx=W*.5,cy=H*(fx.y||.24),dr=k=>Math.min(1,k);
 x.save();x.lineCap='round';x.lineJoin='round';
 if(!front){const k=ease(t,0,.4);x.strokeStyle=YEL;x.lineWidth=U()*.7;x.beginPath();for(let a=0;a<=Math.PI*2*dr(k);a+=.1){const r1=W*.24+jit(t,a*3,U()*.5);const X=cx+Math.cos(a-Math.PI/2)*r1,Y=cy+Math.sin(a-Math.PI/2)*r1*1.25;a?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.restore();return}
 const k2=ease(t,.25,.3);x.strokeStyle='#fff';x.lineWidth=U()*.55;
 for(let i=0;i<5;i++){const a=-.3+i*.15;if(k2<=0)break;x.beginPath();x.moveTo(W*.78+Math.cos(a)*U()*3+jit(t,i),cy+U()*14+Math.sin(a)*U()*3);x.lineTo(W*.78+Math.cos(a)*U()*(3+3*k2)+jit(t,i+9),cy+U()*14+Math.sin(a)*U()*(3+3*k2));x.stroke()}
 const ak=ease(t,.35,.35);if(ak>0){x.strokeStyle='#ff5fa8';x.beginPath();x.moveTo(W*.06,cy+U()*8);x.quadraticCurveTo(W*.1+jit(t,3),cy-U()*6,W*.06+W*.18*ak,cy-U()*4+jit(t,4));x.stroke();x.strokeStyle='#fff';x.beginPath();x.moveTo(W*.95,cy+U()*30);x.quadraticCurveTo(W*.88,cy+U()*20+jit(t,5),W*.95-W*.2*ak,cy+U()*24);x.stroke()}
 const bk2=bk(t,.5,.35);if(bk2>0){x.save();x.translate(W*.75,cy-U()*15);x.rotate(-.12+jit(t,7,.01));x.scale(bk2,bk2);x.fillStyle='rgba(255,255,255,.92)';x.strokeStyle='#222';x.lineWidth=U()*.35;x.beginPath();x.ellipse(0,0,U()*12,U()*6,0,0,7);x.fill();x.stroke();txt(fx.text||'Waouh !',0,0,U()*3.6,{w:600,it:1,f:SER,col:'#222',al:'center'});x.restore()}
 [[.26,.12,YEL],[.8,.2,'#ff5fa8'],[.18,.32,'#fff']].forEach(([X,Y,c],i)=>{const k=bk(t,.3+i*.1,.3);if(k<=0)return;x.save();x.translate(W*X+jit(t,i+20),H*Y);x.scale(k,k);x.fillStyle=c;x.beginPath();for(let j=0;j<8;j++){const r=j%2?U()*.8:U()*2.6,a=j*Math.PI/4;x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();x.restore()});x.restore()};
// X23 Couverture de magazine : la personne devient la une d'un magazine
EFX.magazine=async(lt,sc,fx,front)=>{const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.5),X=W*.06,Y=H*.03,w=W*.88,h=H*.6,rot=-.04;
 if(!front){x.fillStyle='#16151c';x.fillRect(0,0,W,H);x.save();x.translate(W/2,Y+h/2);x.rotate(rot*k);x.scale(.85+.15*k,.85+.15*k);const g=x.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#a9b3f5');g.addColorStop(1,'#c5b2ef');box(-w/2,-h/2,w,h,U()*.5,'#a9b3f5');x.fillStyle=g;x.fillRect(-w/2,-h/2,w,h);
  txt('VOL. 01 · '+(fx.issue||'LE NUMÉRO MOTION'),-w/2+U()*3,-h/2+U()*2.5,U()*1.4,{w:600,col:'#223'});txt(fx.handle||C.brand.handle||'',w/2-U()*3,-h/2+U()*2.5,U()*1.4,{w:600,col:'#223',al:'right'});
  txt(fx.title||'CAPTIV',0,-h/2+U()*13,U()*19,{w:900,col:'#fff',al:'center',sx:.86,max:w*.96});txt(fx.script||'La une',-w/2+U()*4,-h*.12,U()*5,{w:500,it:1,f:SER,col:'rgba(255,255,255,.85)'});x.restore();return}
 x.save();x.translate(W/2,Y+h/2);x.rotate(rot*k);x.scale(.85+.15*k,.85+.15*k);const b=bk(t,.35,.35);x.save();x.translate(w*.36,-h*.08);x.scale(b,b);x.fillStyle=PINK;x.beginPath();x.arc(0,0,U()*6,0,7);x.fill();txt(fx.badge||'17',0,-U()*.8,U()*5,{w:900,col:'#fff',al:'center'});txt(fx.badgeSub||'effets',0,U()*3,U()*1.6,{w:500,it:1,f:SER,col:'#fff',al:'center'});x.restore();
 txt(fx.cover||'17 EFFETS CRÉATIFS',-w/2+U()*4,h/2-U()*7,U()*3.6,{w:900,col:YEL,rot:-.06,sh:'rgba(0,0,0,.3)'});x.fillStyle='#fff';x.fillRect(w/2-U()*12,h/2-U()*7,U()*9,U()*5);for(let i=0;i<22;i++){x.fillStyle='#111';x.fillRect(w/2-U()*11.5+i*U()*.38,h/2-U()*6.5,(i%3?U()*.15:U()*.28),U()*3.5)}x.restore()};
// X24 Carte de fin : carte en verre « COMMENTE [MOT] », rayons lumineux, grand mot final
EFX.fin=async(lt,sc,fx,front)=>{const t=lt-(fx.at||0);if(t<0)return;const p=P();
 if(!front){const k=ease(t,0,.5);x.save();x.globalCompositeOperation='lighter';x.translate(W/2,H*.5);for(let i=0;i<28;i++){x.rotate(Math.PI*2/28);x.fillStyle=`rgba(255,190,120,${.07*k})`;x.beginPath();x.moveTo(0,0);x.lineTo(-U()*2,-H);x.lineTo(U()*2,-H);x.closePath();x.fill()}x.restore();return}
 const k=bk(t,0,.45),X=W*.15,Y=H*.06,w=W*.7,h=H*.13;x.save();x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.8+.2*k);box(X,Y,w,h,U()*3,'rgba(255,255,255,.72)',{line:'rgba(255,255,255,.9)'});
 txt(fx.top||'COMMENTE',W/2,Y+U()*3,U()*2,{w:700,col:'#333',al:'center'});const mot=fx.mot||'STUDIO';x.font=`900 ${U()*6}px ${p.font}`;const mw=x.measureText(mot).width+U()*6;box(W/2-mw/2,Y+U()*5,mw,U()*7.5,U()*3.75,PINK,{sh:false});txt(mot,W/2,Y+U()*8.8,U()*6,{w:900,col:'#fff',al:'center'});
 txt(fx.sous||'et je t\'envoie tout',W/2,Y+h-U()*2.6,U()*2.4,{w:500,it:1,f:SER,col:'#333',al:'center'});x.restore();
 if(fx.big){const k2=bk(t,.4,.4);txt(fx.big,W/2,H*.66,U()*15,{w:900,col:'#fff',al:'center',sc:.8+.2*k2,a:cl(k2),sh:true,max:W*.92})}};

/* ============ OBJETS AUTOUR DE LA TÊTE (agente immo) ============ */
// X25 Points d'interrogation qui flottent autour de la tête
EFX.questions=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const P0=[[.3,.1,1.3,-.2],[.62,.06,1.6,.15],[.74,.17,1,-.1],[.2,.21,.8,.2],[.82,.27,.7,-.25]];
 withExit(lt,fx,()=>P0.forEach(([X,Y,s,r],i)=>{const k=bk(t,i*.07,.4);if(k<=0)return;x.save();x.translate(W*X,H*Y+Math.sin(t*3+i)*U()*.8);x.rotate(r+Math.sin(t*2+i)*.06);x.scale(k*s,k*s);x.font=`900 ${U()*12}px ${P().font}`;x.textAlign='center';x.textBaseline='middle';
  x.fillStyle='rgba(0,0,0,.25)';x.fillText('?',U()*.6,U()*.8);const g=x.createLinearGradient(0,-U()*6,0,U()*6);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#bcd9f5');x.fillStyle=g;x.fillText('?',0,0);x.restore()}))};
// X26 Arc d'icônes (drapeaux, logos…) qui se déploie autour de la tête
EFX.arc=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const n=fx.n||14,cx=W/2,cy=H*(fx.y||.22),R=W*.33,k=ease(t,0,.6);const cols=fx.cols||[['#e63946','#fff','#1d3557'],['#009739','#fedd00','#002776'],['#ce1126','#fcd116','#006b3f'],['#000','#dd0000','#ffce00'],['#002395','#fff','#ed2939'],['#ff9933','#fff','#138808']];
 withExit(lt,fx,()=>{x.save();x.strokeStyle='rgba(255,255,255,.6)';x.lineWidth=U()*.3;x.beginPath();x.arc(cx,cy,R*1.06,Math.PI,Math.PI+Math.PI*k);x.stroke();
  for(let i=0;i<n;i++){const q=i/(n-1);if(q>k)break;const a=Math.PI+Math.PI*q,X=cx+Math.cos(a)*R,Y=cy+Math.sin(a)*R,c=cols[i%cols.length];x.save();x.translate(X,Y);x.rotate(a+Math.PI/2);const fw=U()*4.4,fh=U()*3;x.shadowColor='rgba(0,0,0,.3)';x.shadowBlur=U();c.forEach((cc,j)=>{x.fillStyle=cc;x.fillRect(-fw/2+j*fw/3,-fh/2,fw/3,fh)});x.restore()}x.restore()})};
// X27 Photo qui surgit au-dessus de la tête (puis deux autres en éventail)
EFX.photos=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),t=lt-(fx.at||0);if(t<0)return;const n=fx.n||3,w=W*.42*(fx.taille||1),h=w*.62;
 withExit(lt,fx,()=>{for(let i=n-1;i>=0;i--){const k=bk(t,i*.25,.4);if(k<=0)continue;const ang=(i-(n-1)/2)*(n>1?.14:0)*eo(rp(t,.25*(n-1),.25*(n-1)+.4)),X=W/2+Math.sin(ang)*W*.35,Y=H*(fx.y||.12)+(1-Math.cos(ang))*H*.15;x.save();x.translate(X,Y);x.rotate(ang);x.scale(k,k);x.globalAlpha=cl(k*1.6);shadowOn(U()*4);x.fillStyle='#fff';rr(-w/2-U()*.8,-h/2-U()*.8,w+U()*1.6,h+U()*1.6,U()*1.5);x.fill();x.shadowColor='transparent';x.save();rr(-w/2,-h/2,w,h,U()*1.1);x.clip();cover(R[i%Math.max(1,R.length)],-w/2,-h/2,w,h,.3);x.restore();x.restore()}})};
// X28 Mot géant lumineux derrière la personne (dégradé + halo coloré)
EFX.motgeant=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4),s=fx.mot||'5%',size=U()*(fx.size||22),y=H*(fx.y||.16);
 withExit(lt,fx,()=>{x.save();x.globalCompositeOperation='lighter';const g=x.createRadialGradient(W/2,y+size*.6,0,W/2,y+size*.6,W*.6);g.addColorStop(0,(fx.glow||'#ff5a3c')+'aa');g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=k;x.fillStyle=g;x.fillRect(0,0,W,H);x.restore();
  x.save();x.translate(W/2,y);x.scale(.7+.3*k,.7+.3*k);x.globalAlpha=cl(k*1.5);x.font=`900 ${size}px ${P().font}`;x.textAlign='center';x.textBaseline='middle';const w=x.measureText(s).width;if(w>W*.94){const q=W*.94/w;x.scale(q,q)}
  const gg=x.createLinearGradient(0,-size/2,0,size/2);gg.addColorStop(0,fx.c1||'#ffffff');gg.addColorStop(1,fx.c2||'#ffd0e4');x.shadowColor=fx.glow||'#ff5a3c';x.shadowBlur=size*.35;x.fillStyle=gg;x.fillText(s,0,0);x.restore()})};
// X29 Chiffres flottants autour de la personne
EFX.chiffres=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.items||[['32 000','agents'],['1 200','bureaux'],['N°1','du réseau']];const pos=[[.5,.06],[.2,.15],[.8,.15],[.22,.28],[.78,.28]];
 withExit(lt,fx,()=>L.forEach(([a,b],i)=>{const k=bk(t,i*.12,.4);if(k<=0)return;const [X,Y]=pos[i%pos.length];x.save();x.translate(W*X,H*Y+Math.sin(t*2+i)*U()*.5);x.scale(k,k);txt(a,0,0,U()*7,{w:900,col:'#fff',al:'center',sh:true});txt(b.toUpperCase(),0,U()*5,U()*2.4,{w:600,col:'rgba(255,255,255,.85)',al:'center',sh:true});x.restore()}))};
// X30 Icône néon lumineuse derrière la personne
EFX.neon=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=ease(t,0,.35),fl=t<.35?(Math.sin(t*80)>0?1:.35):1,c=fx.col||'#5fd4ff',cx=W/2,cy=H*(fx.y||.15),s=U()*(fx.size||14);
 withExit(lt,fx,()=>{x.save();x.globalAlpha=k*fl;x.strokeStyle=c;x.lineWidth=U()*1.2;x.shadowColor=c;x.shadowBlur=U()*7;x.lineCap='round';x.lineJoin='round';const ic=fx.icon||'personne';x.translate(cx,cy);
  for(let pass=0;pass<3;pass++){if(pass==2){x.strokeStyle='#ffffff';x.lineWidth=U()*.4}x.beginPath();if(ic=='maison'){x.moveTo(-s,0);x.lineTo(0,-s*.9);x.lineTo(s,0);x.moveTo(-s*.75,-s*.2);x.lineTo(-s*.75,s);x.lineTo(s*.75,s);x.lineTo(s*.75,-s*.2);x.rect(-s*.2,s*.35,s*.4,s*.65)}
   else if(ic=='coche'){x.arc(0,0,s,0,7);x.moveTo(-s*.45,0);x.lineTo(-s*.1,s*.38);x.lineTo(s*.5,-s*.35)}else if(ic=='coeur'){x.moveTo(0,s*.8);x.bezierCurveTo(-s*1.4,-s*.1,-s*.6,-s*1.1,0,-s*.35);x.bezierCurveTo(s*.6,-s*1.1,s*1.4,-s*.1,0,s*.8)}
   else{x.arc(0,-s*.55,s*.38,0,7);x.moveTo(-s*.75,s*.75);x.quadraticCurveTo(-s*.7,-s*.05,0,-s*.05);x.quadraticCurveTo(s*.7,-s*.05,s*.75,s*.75)}x.stroke()}x.restore()})};
// X31 Grande forme colorée qui ondule derrière la personne
EFX.forme=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=ease(t,0,.5),c=fx.col||'#3fd0e8';
 withExit(lt,fx,()=>{x.save();x.globalAlpha=.95*k;const g=x.createLinearGradient(0,H*.2,W,H*.5);g.addColorStop(0,c);g.addColorStop(1,lerpC(c,'#ffffff',.35));x.fillStyle=g;x.beginPath();const cy=H*(fx.y||.33);x.moveTo(-U()*2,H*.55);
  for(let X=-U()*2;X<=W+U()*2;X+=W/24){const yy=cy-Math.sin(X/W*Math.PI)*H*.12*k+Math.sin(X/W*7+t*3)*U()*1.2;x.lineTo(X,yy)}x.lineTo(W+U()*2,H*.55);x.closePath();x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=U()*4;x.fill();x.restore()})};

/* ============ PERSONNAGE ILLUSTRÉ : graphismes, interfaces, cabines, nuit ============ */
// O7 Gros titre rouge condensé qui claque
EFX.grostitre=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=rp(t,0,.18),s=lerp(1.6,1,eo(k));if(k<=0)return;const L=(fx.text||'ÇA MARCHE').split('|');
 withExit(lt,fx,()=>{x.save();x.translate(W/2,H*(fx.y||.13));x.scale(s,s);x.globalAlpha=cl(k*3);L.forEach((l,i)=>txt(l,0,i*U()*11,U()*12,{w:900,col:fx.col||'#e8332a',al:'center',sx:.78,stroke:[U()*.5,'#111'],sh:'rgba(0,0,0,.35)',max:W*.92}));x.restore()})};
// O8 Autocollants épinglés (3 icônes + étiquettes)
EFX.stickers=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.items||[['👥','ABONNÉS'],['📄','CONTRATS'],['📣','PORTÉE']];
 withExit(lt,fx,()=>L.forEach(([ic,lab],i)=>{const k=bk(t,i*.12,.35);if(k<=0)return;const X=W*(.2+i*.3),Y=H*(fx.y||.14)+(i==1?U()*2:0),rot=(i-1)*.08;x.save();x.translate(X,Y);x.rotate(rot);x.scale(k,k);box(-U()*12,-U()*12,U()*24,U()*24,U()*1.5,'#fff',{line:'#222',lw:U()*.4});
  txt(ic,0,-U()*3,U()*9,{al:'center',f:'sans-serif'});txt(lab,0,U()*7.5,U()*2.4,{w:900,col:'#222',al:'center',sx:.85,max:U()*21});x.fillStyle='#e8332a';x.beginPath();x.arc(U()*10,-U()*10,U()*1.4,0,7);x.fill();x.restore()}))};
// O9 Courbe qui monte dans une carte blanche, point rouge qui la parcourt
EFX.courbe=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4),d=eo(rp(t,.2,1.2));
 withExit(lt,fx,()=>{x.save();const X=W*.2,Y=H*(fx.y||.05),w=W*.6,h=H*.2;x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.85+.15*k);box(X,Y,w,h,U()*1.2,'#fff',{line:'#222'});
  x.strokeStyle='#ddd';x.lineWidth=U()*.2;x.beginPath();x.moveTo(X+U()*3,Y+U()*3);x.lineTo(X+U()*3,Y+h-U()*3);x.lineTo(X+w-U()*3,Y+h-U()*3);x.stroke();
  x.strokeStyle='#e8332a';x.lineWidth=U()*.5;x.setLineDash([U()*.8,U()*.8]);x.beginPath();let px=0,py=0;for(let q=0;q<=d;q+=.02){px=X+U()*3+q*(w-U()*6);py=Y+h-U()*3-Math.pow(q,3)*(h-U()*6);q?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();x.setLineDash([]);
  x.fillStyle='#e8332a';x.beginPath();x.arc(px,py,U()*1.2,0,7);x.fill();if(fx.label){box(X+U()*3,Y+U()*3,U()*16,U()*7,U(),'#e8332a',{sh:false});txt(fx.label,X+U()*11,Y+U()*6.5,U()*2.6,{w:900,col:'#fff',al:'center',max:U()*15})}x.restore()})};
// O14 Carte de statistiques (vues sur 30 jours)
EFX.stats=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4),v=Math.round((fx.value||125000)*eo(rp(t,.2,1.1)));
 withExit(lt,fx,()=>{x.save();const X=W*.18,Y=H*(fx.y||.05),w=W*.64,h=H*.19;x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.85+.15*k);box(X,Y,w,h,U()*2.4,'#111');txt(fx.title||'Vues',W/2,Y+U()*3,U()*2,{w:700,col:'#fff',al:'center'});
  box(X+U()*2.5,Y+U()*5.5,U()*14,U()*2.4,U()*.8,'#2a2a2a',{sh:false});txt(fx.periode||'30 derniers jours',X+U()*3.5,Y+U()*6.7,U()*1.3,{w:500,col:'#ccc'});
  txt(v.toLocaleString('fr-FR').replace(/ /g,' '),W/2,Y+U()*13.5,U()*8.5,{w:900,col:'#fff',al:'center',f:MONO});if(fx.label)txt(fx.label,W/2,Y+h-U()*2.5,U()*1.6,{w:600,it:1,f:SER,col:'#e8332a',al:'center'});x.restore()})};
// O15 Carte de profil (photo, nom, 3 chiffres, compteur rouge)
EFX.profil=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4);
 withExit(lt,fx,()=>{x.save();const X=W*.16,Y=H*(fx.y||.05),w=W*.68,h=H*.17;x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.85+.15*k);box(X,Y,w,h,U()*2.4,'#151515');
  txt(fx.handle||C.brand.handle||'@moncompte',X+U()*3,Y+U()*3,U()*2,{w:700,col:'#fff'});x.save();x.beginPath();x.arc(X+U()*9,Y+U()*12,U()*5,0,7);x.clip();cover(R[0],X+U()*4,Y+U()*7,U()*10,U()*10,.3);x.restore();x.strokeStyle='#e8332a';x.lineWidth=U()*.5;x.beginPath();x.arc(X+U()*9,Y+U()*12,U()*5.4,0,7);x.stroke();
  (fx.stats||[['26','posts'],['42,5K','abonnés'],['625','suivis']]).forEach(([a,b],i)=>{txt(a,X+U()*24+i*U()*14,Y+U()*10.5,U()*3.2,{w:800,col:i==1?'#fff':'#fff',al:'center'});txt(b,X+U()*24+i*U()*14,Y+U()*14,U()*1.4,{w:500,col:'#aaa',al:'center'})});
  if(fx.compteur){const c=bk(t,.5,.4);x.save();x.translate(X+U()*6,Y+h+U()*1);x.scale(c,c);box(0,-U()*4.5,U()*28,U()*8,U()*1,'#fff',{line:'#e8332a',lw:U()*.6});txt(fx.compteur,U()*14,-U()*.5,U()*5.6,{w:900,col:'#e8332a',al:'center',sx:.85});x.restore()}x.restore()})};
// O16 Fenêtre de chat : la question, une ligne qui s'écrit, une étiquette rouge annotée
EFX.chat=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4);
 withExit(lt,fx,()=>{x.save();const X=W*.08,Y=H*(fx.y||.06),w=W*.84,h=H*.17;x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.88+.12*k);box(X,Y,w,h,U()*1.6,'#1b1b1d');['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(X+U()*2+i*U()*1.8,Y+U()*1.8,U()*.55,0,7);x.fill()});
  txt('✳',W/2,Y+h*.38,U()*4,{col:'#e8693c',al:'center',f:'sans-serif'});txt(fx.question||'Que veux-tu créer ?',W/2,Y+h*.58,U()*2.4,{w:600,col:'#eee',al:'center'});
  const s=fx.text||'fais une vidéo sur mon lait de corps',n=Math.floor(s.length*rp(t,.35,.35+s.length*.03));box(X+U()*2,Y+h-U()*5,w-U()*4,U()*3.6,U()*1,'#2a2a2e',{sh:false});txt(s.slice(0,n)+(Math.floor(t*4)%2?'|':''),X+U()*3.5,Y+h-U()*3.2,U()*1.8,{w:500,col:'#ddd',max:w-U()*8});
  if(fx.pill){const pk=bk(t,.6,.35);x.save();x.translate(X+w*.2,Y-U()*1);x.rotate(-.08);x.scale(pk,pk);box(-U()*7,-U()*2.4,U()*14,U()*4.8,U()*2.4,'#e8332a',{sh:false});txt(fx.pill,0,0,U()*2.6,{w:800,col:'#fff',al:'center'});x.restore()}x.restore()})};
// O17 Téléphone + panneau « Claude construit ta vidéo » dont les étapes se cochent
EFX.construit=async(lt,sc,fx,front)=>{if(front)return;const R=await reels(sc),t=lt-(fx.at||0);if(t<0)return;const steps=fx.steps||['Écrire le script','Enregistrer la voix','Animer les scènes','Exporter'];
 withExit(lt,fx,()=>{const k=bk(t,0,.4),pw=W*.3,ph=pw*2;x.save();x.translate(W*.3,H*(fx.y||.15));x.scale(k,k);box(-pw/2-U()*.8,-ph/2-U()*.8,pw+U()*1.6,ph+U()*1.6,U()*4,'#111');x.save();rr(-pw/2,-ph/2,pw,ph,U()*3.4);x.clip();cover(R[0],-pw/2,-ph/2,pw,ph,.3);x.restore();x.restore();
  const k2=bk(t,.2,.4),X=W*.5,Y=H*(fx.y||.15)-H*.08,w=W*.44,h=U()*6+steps.length*U()*4;x.save();x.globalAlpha=cl(k2*1.6);scaleAt(X+w/2,Y,.85+.15*k2);box(X,Y,w,h,U()*1.6,'#1b1b1d');txt(fx.title||'Claude construit ta vidéo',X+U()*2,Y+U()*2.6,U()*1.7,{w:700,col:'#fff',max:w-U()*4});
  steps.forEach((s,i)=>{const on=t>.5+i*.3,cur=!on&&t>.2+i*.3;const yy=Y+U()*6.5+i*U()*4;x.fillStyle=on?'#e8332a':cur?'#fff':'#555';x.beginPath();x.arc(X+U()*3,yy,U()*1,0,7);x.fill();if(on){x.strokeStyle='#fff';x.lineWidth=U()*.3;x.beginPath();x.moveTo(X+U()*2.5,yy);x.lineTo(X+U()*2.9,yy+U()*.4);x.lineTo(X+U()*3.5,yy-U()*.4);x.stroke()}txt(s,X+U()*5,yy,U()*1.7,{w:500,col:on||cur?'#fff':'#777',max:w-U()*7})});x.restore()})};
// O18 Commentaires + lettres-tuiles qui forment le mot-clé
EFX.motcle=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const mot=(fx.mot||'STUDIO').toUpperCase().split('');
 withExit(lt,fx,()=>{const k=bk(t,.0,.4),X=W*.12,Y=H*(fx.y||.12),w=W*.76,h=H*.16;x.save();x.globalAlpha=cl(k*1.6);box(X,Y,w,h,U()*2,'#151515');txt('Commentaires',W/2,Y+U()*2.6,U()*1.7,{w:700,col:'#fff',al:'center'});
  for(let i=0;i<4;i++){const yy=Y+U()*6+i*U()*3.2;x.fillStyle=['#e8332a','#6a5acd','#2a9d8f','#f4a261'][i];x.beginPath();x.arc(X+U()*3,yy,U()*1.1,0,7);x.fill();box(X+U()*5,yy-U()*.6,w*(.3+.12*((i*7)%3)),U()*1.2,U()*.6,'#333',{sh:false});if(t>.9+i*.15)txt(fx.mot||'STUDIO',X+U()*5+w*.5,yy,U()*1.6,{w:800,col:'#e8332a'})}x.restore();
  const tw=U()*8;mot.forEach((c,i)=>{const kk=bk(t,.3+i*.1,.3);if(kk<=0)return;const XX=W/2+(i-(mot.length-1)/2)*tw*1.08,YY=Y-U()*4-(1-eo(kk))*H*.1;x.save();x.translate(XX,YY);x.rotate((i%2?.06:-.06));box(-tw/2,-tw/2,tw,tw,U()*1,i==mot.length-1?'#e8332a':'#fff',{line:'#222',lw:U()*.4});txt(c,0,U()*.3,U()*5,{w:900,col:i==mot.length-1?'#fff':'#e8332a',al:'center'});x.restore()})})};
// O19 Interrupteur : des options en pastilles, le curseur clique celle qu'on choisit
EFX.choix=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.options||['Téléphone','Ordinateur','Les deux'],sel=fx.choix??0,ct=fx.clic??.8;
 withExit(lt,fx,()=>{const k=bk(t,0,.4),Y=H*(fx.y||.12),w=W*.86,X=W*.07,h=U()*7;x.save();x.globalAlpha=cl(k*1.6);box(X,Y,w,h,h/2,'#fff',{line:'#ddd'});const iw=(w-U()*2)/L.length;
  L.forEach((s,i)=>{const on=t>ct&&i==sel;if(on)box(X+U()+i*iw,Y+U(),iw,h-U()*2,(h-U()*2)/2,'#111',{sh:false});txt(s,X+U()+i*iw+iw/2,Y+h/2,U()*2.2,{w:700,col:on?'#fff':'#555',al:'center',max:iw-U()*2})});
  const tx=X+U()+sel*iw+iw*.7,ty=Y+h*.7,ck=eo(rp(t,.2,ct));const cxp=lerp(W*.9,tx,ck),cyp=lerp(H*.35,ty,ck);ripple(tx,ty,rp(t,ct,ct+.4));cursor(cxp,cyp);x.restore()})};
// O20 Bulle d'objection numérotée (« 1 D'ABORD ») avec grand point d'interrogation
EFX.objection=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const k=bk(t,0,.4);
 withExit(lt,fx,()=>{x.save();const X=W*.1,Y=H*(fx.y||.07),w=W*.8,h=H*.12;x.translate(W/2,Y+h/2);x.scale(k,k);x.translate(-W/2,-(Y+h/2));box(X,Y,w,h,U()*1.5,'#fff',{line:'#111',lw:U()*.5});
  x.fillStyle='#fff';x.strokeStyle='#111';x.lineWidth=U()*.5;x.beginPath();x.moveTo(X+w*.7,Y+h-U()*.3);x.lineTo(X+w*.76,Y+h+U()*4);x.lineTo(X+w*.8,Y+h-U()*.3);x.fill();x.stroke();
  box(X-U()*1.5,Y-U()*2.5,U()*13,U()*4.5,U()*.6,'#111',{sh:false});txt(String(fx.n||1),X+U()*.8,Y-U()*.25,U()*2.4,{w:900,col:'#fff'});txt(fx.tag||"D'ABORD",X+U()*3.2,Y-U()*.25,U()*1.6,{w:800,col:'#fff'});
  txt(fx.small||'tu te dis sûrement',X+U()*3,Y+U()*4.5,U()*1.6,{w:500,col:'#888'});const s=fx.text||'que c’est trop technique',n=Math.floor(s.length*rp(t,.2,.2+s.length*.03));txt(s.slice(0,n),X+U()*3,Y+U()*8.5,U()*3,{w:700,col:'#111',max:w*.7});
  txt('?',X+w-U()*6,Y+h/2,U()*10,{w:900,it:1,f:SER,col:'#ccc',al:'center'});x.restore()})};
// O21 Multiprise : des câbles descendent et se branchent, chaque prise s'allume (cabine)
EFX.multiprise=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const n=fx.n||4,cols=['#2f6fe4','#2aa84a','#e8a31c','#7b4fd6'],Y=H*(fx.y||.2),w=W*.84,X=W*.08,h=U()*12;
 withExit(lt,fx,()=>{x.save();box(X,Y,w,h,U()*3,'#f5f2ea',{line:'#222',lw:U()*.5});x.fillStyle='#e8332a';rr(X+U()*2,Y+h/2-U()*2.5,U()*3,U()*5,U()*.8);x.fill();
  for(let i=0;i<n;i++){const cx=X+U()*12+i*(w-U()*16)/(n-1)*.92,on=t>.4+i*.25;x.fillStyle='#fff';x.strokeStyle='#222';x.lineWidth=U()*.35;x.beginPath();x.arc(cx,Y+h/2,U()*4,0,7);x.fill();x.stroke();x.fillStyle='#222';x.fillRect(cx-U()*1.4,Y+h/2-U()*1,U()*.6,U()*2);x.fillRect(cx+U()*.8,Y+h/2-U()*1,U()*.6,U()*2);
   const pk=eo(rp(t,.1+i*.25,.4+i*.25));if(pk>0){const py=lerp(-U()*10,Y+h/2-U()*5,pk);x.strokeStyle=cols[i%4];x.lineWidth=U()*1.4;x.beginPath();x.moveTo(cx,-U()*5);x.bezierCurveTo(cx+U()*3,py*.4,cx-U()*3,py*.7,cx,py-U()*4);x.stroke();box(cx-U()*2.6,py-U()*5,U()*5.2,U()*6,U()*1,cols[i%4],{line:'#222',lw:U()*.3});txt(String(i+1),cx,py-U()*2,U()*2.6,{w:900,col:'#fff',al:'center'})}
   if(on){x.fillStyle=cols[i%4];x.globalAlpha=.25;x.beginPath();x.arc(cx,Y+h/2,U()*5.5,0,7);x.fill();x.globalAlpha=1}}
  (fx.labels||[]).forEach((s,i)=>{const cx=X+U()*12+i*(w-U()*16)/(n-1)*.92;box(cx-U()*6,Y+h+U()*1.2,U()*12,U()*3,U()*.5,'#1e3a8a',{sh:false});txt(s,cx,Y+h+U()*2.7,U()*1.3,{w:800,col:'#fff',al:'center',max:U()*11})});x.restore()})};
// O22 Terminal : des lignes de commande s'écrivent, coches vertes
EFX.terminal=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.lines||['/studio installe le kit','✓ moteur prêt','✓ voix prête','Plan terminé · 5/5 tâches'];
 withExit(lt,fx,()=>{const k=bk(t,0,.4),X=W*.08,Y=H*(fx.y||.07),w=W*.84,h=U()*7+L.length*U()*3.6;x.save();x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.9+.1*k);box(X,Y,w,h,U()*1.4,'#16161a');['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(X+U()*2+i*U()*1.8,Y+U()*1.8,U()*.55,0,7);x.fill()});
  let acc=.25;L.forEach((s,i)=>{const d=s.length*.025,n=Math.floor(s.length*rp(t,acc,acc+d));acc+=d+.08;const ok=s.startsWith('✓');txt((i==0?'> ':'')+s.slice(0,n),X+U()*2.5,Y+U()*5.5+i*U()*3.6,U()*1.9,{w:500,f:MONO,col:ok?'#4ade80':i==0?'#e8693c':'#ddd',max:w-U()*5})});x.restore()})};
// O23 Compteur mécanique (chiffres qui tournent)
EFX.compteurmeca=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const v=Math.round((fx.value||68)*eo(rp(t,.2,1.2))),s=String(v).padStart(fx.digits||3,'0');
 withExit(lt,fx,()=>{const k=bk(t,0,.4),dw=U()*8,w=s.length*dw+U()*4,X=W*(fx.x||.68)-w/2,Y=H*(fx.y||.09);x.save();x.globalAlpha=cl(k*1.6);box(X,Y-U()*4,w,U()*15,U()*1.5,'#efece6',{line:'#222',lw:U()*.5});txt(fx.label||'COMPTEUR',X+w/2,Y-U()*1.6,U()*1.5,{w:800,col:'#222',al:'center'});
  s.split('').forEach((c,i)=>{const dx=X+U()*2+i*dw;box(dx+U()*.3,Y+U()*1,dw-U()*.6,U()*9,U()*.6,'#1a1a1a',{sh:false});txt(c,dx+dw/2,Y+U()*5.6,U()*6.5,{w:800,col:'#fff',al:'center',f:MONO});x.fillStyle='rgba(255,255,255,.12)';x.fillRect(dx+U()*.3,Y+U()*5.5,dw-U()*.6,U()*.2)});x.restore()})};
// O24 Liste de tâches qui se cochent + petite horloge
EFX.taches=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.items||['Tâche 1','Tâche 2','Tâche 3','Tâche 4'];
 withExit(lt,fx,()=>{const k=bk(t,0,.4),X=W*.1,Y=H*(fx.y||.06),w=W*.4,h=U()*6+L.length*U()*4;x.save();x.globalAlpha=cl(k*1.6);box(X,Y,w,h,U()*1.2,'#fff',{line:'#222'});txt(fx.title||'plan.md',X+U()*2,Y+U()*2.6,U()*1.8,{w:700,col:'#222',f:MONO});
  L.forEach((s,i)=>{const on=t>.4+i*.25,yy=Y+U()*7+i*U()*4;txt(s,X+U()*2,yy,U()*2,{w:700,col:'#222'});x.strokeStyle='#222';x.lineWidth=U()*.35;x.beginPath();x.arc(X+w-U()*4,yy,U()*1.4,0,7);x.stroke();if(on){x.fillStyle='#111';x.beginPath();x.arc(X+w-U()*4,yy,U()*1.4,0,7);x.fill();x.strokeStyle='#fff';x.beginPath();x.moveTo(X+w-U()*4.7,yy);x.lineTo(X+w-U()*4.1,yy+U()*.6);x.lineTo(X+w-U()*3.2,yy-U()*.6);x.stroke()}});
  const cx=W*.68,cy=Y+U()*9;x.fillStyle='#fff';x.strokeStyle='#222';x.lineWidth=U()*.5;x.beginPath();x.arc(cx,cy,U()*7,0,7);x.fill();x.stroke();const a=t*2.5;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a-Math.PI/2)*U()*5,cy+Math.sin(a-Math.PI/2)*U()*5);x.stroke();x.beginPath();x.moveTo(cx,cy);x.lineTo(cx,cy-U()*3.5);x.stroke();x.restore()})};
// O25 Tableau de bord nuit : cartes en verre lumineuses (objectifs, équipe)
EFX.tableau=async(lt,sc,fx,front)=>{if(front)return;const t=lt-(fx.at||0);if(t<0)return;const L=fx.items||['Lancer la nouvelle offre','Publier 3 vidéos','Répondre aux messages'];
 withExit(lt,fx,()=>{const k=bk(t,0,.45),X=W*.1,Y=H*(fx.y||.05),w=W*.8,h=U()*8+L.length*U()*4.2;x.save();const g=x.createRadialGradient(W/2,Y+h/2,0,W/2,Y+h/2,W*.6);g.addColorStop(0,'rgba(80,110,255,.35)');g.addColorStop(1,'rgba(80,110,255,0)');x.fillStyle=g;x.fillRect(0,0,W,H*.6);
  x.globalAlpha=cl(k*1.6);scaleAt(W/2,Y+h/2,.9+.1*k);box(X,Y,w,h,U()*2,'rgba(26,32,64,.85)',{line:'rgba(140,160,255,.5)',shc:'rgba(80,110,255,.6)',blur:U()*6});txt(fx.title||'Objectifs de la semaine',X+U()*2.5,Y+U()*3,U()*2,{w:700,col:'#fff'});
  L.forEach((s,i)=>{const on=t>.5+i*.3,yy=Y+U()*8+i*U()*4.2;box(X+U()*2,yy-U()*1.6,w-U()*4,U()*3.4,U()*.8,on?'rgba(232,51,42,.25)':'rgba(255,255,255,.06)',{sh:false});x.strokeStyle=on?'#ff6b5f':'#8890b8';x.lineWidth=U()*.3;x.beginPath();x.arc(X+U()*4,yy,U()*.9,0,7);x.stroke();txt(s,X+U()*6.5,yy,U()*1.8,{w:500,col:on?'#fff':'#c8cbe0'})});x.restore()})};

/* ============ OPTIONS DE SCÈNE ============ */
const H2=window.FXH=window.FXH||{};
// fond « cabine » : couleur pastel, tableau perforé, étiquette noire en haut à gauche, voyants en haut à droite
H2.bg=async(mode,sc,lt)=>{if(mode!='cabine'&&mode!='nuit2')return false;const cb=sc.cabine||{};
 if(mode=='nuit2'){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0e1430');g.addColorStop(1,'#1a1f42');x.fillStyle=g;x.fillRect(0,0,W,H);return true}
 const col=cb.col||'#cfe0f5';x.fillStyle=col;x.fillRect(0,0,W,H*.72);x.fillStyle=lerpC(col,'#000',.12);for(let i=U()*2;i<W;i+=U()*3.4)for(let j=U()*2;j<H*.7;j+=U()*3.4){x.beginPath();x.arc(i,j,U()*.32,0,7);x.fill()}
 x.fillStyle=cb.desk||lerpC(col,'#000',.35);x.fillRect(0,H*.72,W,H*.28);x.fillStyle='rgba(255,255,255,.15)';x.fillRect(0,H*.72,W,U()*.6);
 if(cb.label){x.font=`800 ${U()*2}px ${P().font}`;const lw=x.measureText(cb.label.toUpperCase()).width+U()*4;box(U()*3,U()*3,lw,U()*4,U()*.6,'#1b1b1b',{sh:false});txt(cb.label.toUpperCase(),U()*5,U()*5,U()*2,{w:800,col:'#fff',f:MONO})}
 if(cb.voyants){const [on,tot]=cb.voyants;box(W-U()*21,U()*3,U()*18,U()*5,U()*1,'#fff',{line:'#222',lw:U()*.35});for(let i=0;i<tot;i++){x.fillStyle=i<on?['#e8332a','#2f6fe4','#2aa84a','#e8a31c'][i%4]:'#ccc';x.beginPath();x.arc(W-U()*18+i*U()*4,U()*5.5,U()*1.3,0,7);x.fill()}txt((cb.vlab||'ÉTAPES')+' '+on+'/'+tot,W-U()*12,U()*9.6,U()*1.3,{w:700,col:'#222',al:'center',f:MONO})}
 return true};
// superpositions : repères, annotations, rayons, titre de séquence, trame en points
H2.post=async(lt,sc,ctx,when)=>{
 if(when=='avantcap'){
  if(sc.reperes){const r=sc.reperes,dk=(sc.bg||'orig')=='orig'||sc.bg=='nuit'||sc.bg=='nuit2';txt(r.g||'',U()*4,U()*2.4,U()*1.3,{w:500,f:MONO,col:dk?'rgba(255,255,255,.6)':'rgba(0,0,0,.45)'});txt(r.d||'',W-U()*4,U()*2.4,U()*1.3,{w:500,f:MONO,col:dk?'rgba(255,255,255,.6)':'rgba(0,0,0,.45)',al:'right'})}
  (sc.annot||[]).forEach(a=>{const k=ease(lt,a.at||0,.35);if(k<=0)return;x.save();x.strokeStyle=a.col||'#e8332a';x.lineWidth=U()*(a.w||.55);x.lineCap='round';
   if(a.type=='cercle'){x.beginPath();for(let q=0;q<=k*1.08;q+=.02){const ang=q*Math.PI*2-1.2,rr2=1+.06*Math.sin(q*9);const X=W*a.x+Math.cos(ang)*W*a.r*rr2,Y=H*a.y+Math.sin(ang)*W*a.r*.72*rr2;q?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke()}
   else{const [x0,y0,x1,y1]=a.de.concat(a.a).map((v,i)=>i%2?v*H:v*W);const mx=(x0+x1)/2+(a.courbe??.15)*W,my=(y0+y1)/2;x.beginPath();x.moveTo(x0,y0);const ex=lerp(x0,x1,k),ey=lerp(y0,y1,k);x.quadraticCurveTo(lerp(x0,mx,k),lerp(y0,my,k),ex,ey);x.stroke();if(k>.95){const an=Math.atan2(y1-my,x1-mx);x.beginPath();x.moveTo(x1,y1);x.lineTo(x1-Math.cos(an-.5)*U()*3,y1-Math.sin(an-.5)*U()*3);x.moveTo(x1,y1);x.lineTo(x1-Math.cos(an+.5)*U()*3,y1-Math.sin(an+.5)*U()*3);x.stroke()}}x.restore()});
  if(sc.titre){const T=sc.titre,k=ease(lt,T.at||0,.3),out=1-ease(lt,T.out??1.4,.3);if(k*out>0){x.save();x.globalAlpha=k*out;const Y=H*(T.y||.05);box(W/2-U()*3,Y-U()*1.5,U()*6,U()*3,U()*1.5,YEL,{sh:false});txt(T.n||'01',W/2,Y,U()*1.8,{w:800,col:'#111',al:'center'});
   const s=(T.text||'').toUpperCase(),n=Math.ceil(s.length*k);txt(s.slice(0,n),W/2,Y+U()*5.6,U()*6,{w:900,col:'#fff',al:'center',sh:'rgba(0,0,0,.5)',max:W*.9});x.restore()}}}
 if(when=='fin'&&sc.trame!=null){const a=sc.trame,k=rp(lt,a,a+.45);if(k>0&&k<1){x.save();x.fillStyle='#111';const step=U()*2.6;for(let i=0;i<W+step;i+=step)for(let j=0;j<H+step;j+=step){const d=(i/W+j/H)/2,r=cl((k*1.6-d)*3)*step*.75*(k<.5?1:cl((1-k)*2.2));if(r>0){x.beginPath();x.arc(i,j,r,0,7);x.fill()}}x.restore()}}};
// sous-titres « duo » (un mot fin italique blanc + mot fort gras en dégradé) et « tuiles » (mots-clés en tuiles jaunes)
const capCur=t=>{let gi=-1;for(let i=0;i<GROUPS.length;i++)if(t>=WORDS[GROUPS[i][0]][1]-.05)gi=i;if(gi<0)return null;const g=GROUPS[gi];if(t>WORDS[g.at(-1)][2]+.5)return null;return g};
H2.cap={duo:(t,sc)=>{const g=capCur(t);if(!g)return;const hl=(sc.hl||[]).map(s=>s.toLowerCase()),Y=H*(sc.capY||.56);const ws=g.map(i=>[WORDS[i][0].replace(/[,.…:!?«»]/g,''),WORDS[i][1]]).filter(w=>w[0]);
  let key=ws.findIndex(w=>hl.some(h=>w[0].toLowerCase().includes(h)));if(key<0)key=ws.length-1;const small=ws.filter((_,i)=>i!=key).map(w=>w[0]).join(' ').toLowerCase(),big=ws[key][0].toLowerCase(),age=t-WORDS[g[0]][1];
  if(small)txt(small,W/2,Y-U()*6.5,U()*6,{w:300,it:1,col:'#fff',al:'center',sh:true,a:cl(age/.12)});
  x.save();x.translate(W/2,Y+U()*1.5);const k=back(cl(age/.2));x.scale(.8+.2*k,.8+.2*k);x.font=`italic 900 ${U()*10}px ${P().font}`;x.textAlign='center';x.textBaseline='middle';const w=x.measureText(big).width;if(w>W*.9){const q=W*.9/w;x.scale(q,q)}const gr=x.createLinearGradient(-w/2,0,w/2,0);(sc.duo||['#ff4f9a','#ff8a3d']).forEach((c,i,a)=>gr.addColorStop(i/(a.length-1),c));x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=U()*2;x.fillStyle=gr;x.fillText(big,0,0);x.restore()},
 tuiles:(t,sc)=>{const g=capCur(t);if(!g)return;const ws=g.map(i=>WORDS[i]).filter(w=>t>=w[1]-.04).map(w=>w[0].replace(/[,.…:!?«»]/g,'')).filter(Boolean);const Y=H*(sc.capY||.8);let tot=0;x.font=`800 ${U()*4.4}px ${P().font}`;const sz=ws.map(w=>x.measureText(w).width+U()*4);tot=sz.reduce((a,b)=>a+b,0)+U()*(ws.length-1);let X=W/2-tot/2;
  ws.forEach((w,i)=>{const hl=(sc.hl||[]).some(h=>w.toLowerCase().includes(h));box(X,Y-U()*3.4,sz[i],U()*6.8,U()*.8,hl?'#ffd43b':'#f2d27a',{line:'#3a2e12',lw:U()*.35,shc:'rgba(0,0,0,.4)'});txt(w,X+sz[i]/2,Y,U()*4.4,{w:800,col:'#2b2210',al:'center'});X+=sz[i]+U()})}};
})();
