/* =====================================================================
   ÉDITORIAL CRÈME — module du moteur (chargé après premium.js)
   Style sans visage « agence éditoriale » : fond crème avec halo doux,
   titres serif (Lora) avec mots en italique, petites capitales espacées,
   personnage détouré, cartes blanches à pastille olive, compteurs,
   listes numérotées, calendrier, réseau, anneau, téléphone, pistes de
   montage, gros numéro d'étape, transitions par volets olive / sable.
   Une seule scène : "type":"ed" avec "els":[…] (éléments qui arrivent
   chacun à son temps "at"). Palette : C.ed = {bg, ink, olive, tan, brown, card}
   ===================================================================== */
(function(){
const SER='Lora',SANS='Montserrat',BODY='Poppins';
// Palette : par défaut crème / olive / sable. Avec C.ed.primary (couleur de la marque) et C.ed.secondary (facultatif),
// toutes les teintes sont dérivées de la marque ; une clé donnée explicitement (bg, ink, olive…) reste prioritaire.
function mixc(a,b,t){const A=hex(a),B=hex(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')}
function lum(c){const [r,g,b]=hex(c);return (.299*r+.587*g+.114*b)/255}
let _EP=null,_EK='',DARK=false;
const E=()=>{const ed=C.ed||{},k=JSON.stringify(ed);if(_EP&&_EK==k)return _EP;let base={bg:'#F6EFE7',ink:'#2B2420',sub:'#6B625B',olive:'#4E5E40',tan:'#C9AE8A',brown:'#3B2A22',card:'#FFFFFF',line:'#D9CFC3',red:'#B5402F'};
 if(ed.primary){const pr=ed.primary,se=ed.secondary||mixc(pr,'#FFFFFF',.45),warm=ed.paper||'#FBF7F1';
  const prD=lum(pr)>.62?mixc(pr,'#000000',.45):pr;
  base=Object.assign(base,{olive:prD,tan:lum(se)<.25?mixc(se,'#FFFFFF',.55):se,bg:mixc(warm,se,.10),ink:mixc(prD,'#000000',.78),sub:mixc(mixc(prD,'#000000',.55),'#FFFFFF',.35),brown:mixc(prD,'#000000',.55),line:mixc(mixc(warm,se,.10),mixc(prD,'#000000',.78),.13)})}
 _EP=Object.assign(base,ed);_EK=k;return _EP};
const u=()=>W/100;
const ap=(lt,at,d=.45)=>eo(rp(lt,at??0,(at??0)+d));
function enter(k,dy=2.2){x.globalAlpha*=cl(k);x.translate(0,(1-k)*u()*dy);if(k<1)x.filter=`blur(${(1-k)*8}px)`}
function rr(X,Y,w,h,r){x.beginPath();x.roundRect(X,Y,w,h,r)}
function shadow(a=.10,b=3,y=1){x.shadowColor=`rgba(60,40,20,${a})`;x.shadowBlur=u()*b;x.shadowOffsetY=u()*y}
function nos(){x.shadowColor='transparent';x.shadowBlur=0;x.shadowOffsetY=0}
function txt(s,X,Y,size,o={}){x.save();x.font=`${o.it?'italic ':''}${o.w||400} ${size}px "${o.f||SER}"`;x.textAlign=o.al||'left';x.textBaseline=o.bl||'alphabetic';x.fillStyle=o.col||E().ink;if(o.ls)x.letterSpacing=o.ls+'px';const w=x.measureText(s).width;x.fillText(s,X,Y);x.restore();return w}
function caps(s,X,Y,size,o={}){return txt(String(s).toUpperCase(),X,Y,size,Object.assign({f:SANS,w:600,ls:size*.28,col:E().sub},o))}

/* ---------- icônes vectorielles (centrées en X,Y, taille s) ---------- */
function icon(name,X,Y,s,col){x.save();x.translate(X,Y);x.strokeStyle=x.fillStyle=col;x.lineWidth=s*.11;x.lineCap='round';x.lineJoin='round';const r=s/2;
 const P=()=>x.beginPath();
 if(name=='play'){P();x.moveTo(-r*.35,-r*.5);x.lineTo(r*.55,0);x.lineTo(-r*.35,r*.5);x.closePath();x.fill()}
 else if(name=='send'){P();x.moveTo(-r*.6,-r*.05);x.lineTo(r*.6,-r*.5);x.lineTo(r*.15,r*.6);x.lineTo(-r*.05,r*.1);x.closePath();x.fill();x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=s*.05;P();x.moveTo(-r*.05,r*.1);x.lineTo(r*.6,-r*.5);x.stroke()}
 else if(name=='user'){P();x.arc(0,-r*.22,r*.26,0,7);x.fill();P();x.ellipse(0,r*.5,r*.48,r*.34,0,Math.PI,0);x.fill()}
 else if(name=='check'){P();x.moveTo(-r*.45,0);x.lineTo(-r*.1,r*.35);x.lineTo(r*.5,-r*.35);x.stroke()}
 else if(name=='x'){P();x.moveTo(-r*.35,-r*.35);x.lineTo(r*.35,r*.35);x.moveTo(r*.35,-r*.35);x.lineTo(-r*.35,r*.35);x.stroke()}
 else if(name=='mic'){rr(-r*.2,-r*.6,r*.4,r*.75,r*.2);x.fill();P();x.arc(0,-r*.05,r*.38,0,Math.PI);x.stroke();P();x.moveTo(0,r*.33);x.lineTo(0,r*.6);x.stroke()}
 else if(name=='video'){rr(-r*.6,-r*.35,r*.8,r*.7,r*.12);x.fill();P();x.moveTo(r*.25,0);x.lineTo(r*.62,-r*.28);x.lineTo(r*.62,r*.28);x.closePath();x.fill()}
 else if(name=='calendar'){x.lineWidth=s*.08;rr(-r*.55,-r*.45,r*1.1,r*1,r*.12);x.stroke();P();x.moveTo(-r*.55,-r*.12);x.lineTo(r*.55,-r*.12);x.stroke();P();x.moveTo(-r*.25,-r*.62);x.lineTo(-r*.25,-r*.35);x.moveTo(r*.25,-r*.62);x.lineTo(r*.25,-r*.35);x.stroke()}
 else if(name=='lock'||name=='unlock'){x.lineWidth=s*.12;P();if(name=='lock')x.arc(0,-r*.15,r*.32,Math.PI,0);else x.arc(r*.32,-r*.3,r*.32,Math.PI,0);x.stroke();rr(-r*.5,-r*.15,r*1,r*.75,r*.12);x.fill();x.fillStyle='rgba(255,255,255,.85)';P();x.arc(0,r*.18,r*.1,0,7);x.fill()}
 else if(name=='chat'){P();x.ellipse(0,-r*.05,r*.55,r*.42,0,0,7);x.fill();P();x.moveTo(-r*.3,r*.25);x.lineTo(-r*.45,r*.55);x.lineTo(-r*.05,r*.33);x.fill()}
 else if(name=='pin'){P();x.arc(0,-r*.15,r*.38,Math.PI*.85,Math.PI*2.15);x.lineTo(0,r*.6);x.closePath();x.fill();x.fillStyle='#fff';P();x.arc(0,-r*.15,r*.14,0,7);x.fill()}
 else if(name=='edit'){x.rotate(-.78);rr(-r*.15,-r*.6,r*.3,r*1,r*.05);x.fill();P();x.moveTo(-r*.15,r*.45);x.lineTo(0,r*.68);x.lineTo(r*.15,r*.45);x.fill()}
 else if(name=='star'){P();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr2=i%2?r*.25:r*.58;x.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}x.closePath();x.fill()}
 else if(name=='box'){x.lineWidth=s*.08;rr(-r*.5,-r*.4,r,r*.8,r*.08);x.stroke();P();x.moveTo(-r*.5,-r*.1);x.lineTo(r*.5,-r*.1);x.stroke()}
 else if(name=='question'){x.font=`700 ${s*.75}px "${BODY}"`;x.textAlign='center';x.textBaseline='middle';x.fillText('?',0,r*.04)}
 else if(name=='bolt'){P();x.moveTo(r*.1,-r*.62);x.lineTo(-r*.35,r*.08);x.lineTo(0,r*.08);x.lineTo(-r*.1,r*.62);x.lineTo(r*.38,-r*.1);x.lineTo(r*.02,-r*.1);x.closePath();x.fill()}
 else if(name=='heart'){P();x.moveTo(0,r*.5);x.bezierCurveTo(-r*.8,0,-r*.4,-r*.65,0,-r*.22);x.bezierCurveTo(r*.4,-r*.65,r*.8,0,0,r*.5);x.fill()}
 else {P();x.arc(0,0,r*.25,0,7);x.fill()}
 x.restore()}
function badge(X,Y,R,col,ic,icCol='#fff'){x.save();x.fillStyle=col;x.beginPath();x.arc(X,Y,R,0,7);x.fill();icon(ic,X,Y,R*1.15,icCol);x.restore()}
const colOf=c=>({olive:E().olive,tan:E().tan,brown:E().brown,ink:E().ink,white:'#fff'})[c]||c||E().olive;

/* ---------- texte éditorial : mots qui passent du gris pâle à l'encre ---------- */
// "Tes images suivent *ta voix.*" → italique ; "__mot__" → souligné au marqueur sable ; "~~mot~~" → barré
function ftext(s,X,Y,size,lt,at,o={}){const toks=[];String(s).split(/(\*[^*]+\*|__[^_]+__|~~[^~]+~~)/).filter(Boolean).forEach(seg=>{let kind='n',t=seg;if(seg.startsWith('*')){kind='i';t=seg.slice(1,-1)}else if(seg.startsWith('__')){kind='h';t=seg.slice(2,-2)}else if(seg.startsWith('~~')){kind='s';t=seg.slice(2,-2)}t.split(/(\s+)/).filter(w=>w&&!/^\s+$/.test(w)).forEach(w=>toks.push({w,kind}))});
 x.save();const fnt=k=>`${k=='i'||k=='h'?'italic ':''}${o.w||400} ${size*(k=='i'||k=='h'?(o.ib||1.04):1)}px "${o.f||SER}"`;const sp=size*.27;const ws=toks.map(t=>{x.font=fnt(t.kind);return x.measureText(t.w).width});
 const maxW=o.max||W*.86;const lines=[[]];let lw=0;toks.forEach((t,i)=>{if(lw+ws[i]>maxW&&lines.at(-1).length){lines.push([]);lw=0}lines.at(-1).push(i);lw+=ws[i]+sp});
 const lh=size*(o.lh||1.18);let n=0;lines.forEach((L,li)=>{const tw=L.reduce((a,i)=>a+ws[i],0)+sp*(L.length-1);let px=o.al=='center'?X-tw/2:o.al=='right'?X-tw:X;const py=Y+li*lh;
  L.forEach(i=>{const t=toks[i],st=at+n*(o.step??.07),k=eo(rp(lt,st,st+.35));n++;x.font=fnt(t.kind);x.textBaseline='alphabetic';x.textAlign='left';
   if(t.kind=='h'){const kk=eo(rp(lt,st+.3,st+.75));if(kk>0){x.save();x.fillStyle=E().tan;x.globalAlpha=.7;x.fillRect(px-size*.05,py-size*.26,(ws[i]+size*.1)*kk,size*.32);x.restore()}}
   const c0=[214,205,196],c1=hex((t.kind=='i'||t.kind=='h')&&o.icol?o.icol:(o.col||E().ink));x.fillStyle=`rgb(${c0.map((v,j)=>Math.round(v+(c1[j]-v)*k)).join(',')})`;x.globalAlpha=cl(k*1.6);x.fillText(t.w,px,py);x.globalAlpha=1;
   if(t.kind=='s'){const kk=eo(rp(lt,st+.4,st+.8));if(kk>0){x.strokeStyle=E().red;x.lineWidth=size*.06;x.beginPath();x.moveTo(px,py-size*.3);x.lineTo(px+ws[i]*kk,py-size*.3);x.stroke()}}
   px+=ws[i]+sp})});x.restore();return lines.length*lh}
function hex(c){c=String(c).replace('#','');if(c.length==3)c=c.split('').map(v=>v+v).join('');return [0,2,4].map(i=>parseInt(c.slice(i,i+2),16))}

/* ---------- fond crème + halo ---------- */
function bg(sc){const e=E();x.fillStyle=sc.bgc||e.bg;x.fillRect(0,0,W,H);const gx=W*(sc.gx??.5),gy=H*(sc.gy??.55);const g=x.createRadialGradient(gx,gy,0,gx,gy,W*.75);const tc=hex(E().tan);g.addColorStop(0,`rgba(${tc},${sc.dark?.10:.40})`);g.addColorStop(1,`rgba(${tc},0)`);x.fillStyle=g;x.fillRect(0,0,W,H)}

/* ---------- éléments ---------- */
const EL={
 header(o,lt){const e=E(),k=ap(lt,o.at,.5),U=u();x.save();x.globalAlpha=k;const Y=H*(o.y??.045);
  if(o.center){caps(o.brand||'',W/2,Y,U*2.7,{f:SER,w:400,col:e.ink,al:'center',ls:U*1.2})}
  else{caps(o.brand||'',U*4,Y,U*2.5,{f:SER,w:400,col:e.ink,ls:U*1.1});if(o.right)caps(o.right,W-U*4,Y,U*1.5,{al:'right',col:e.ink,ls:U*.25});x.fillStyle=e.line;x.fillRect(U*4,Y+U*1.8,W-U*8,U*.18);if(o.prog){x.fillStyle=e.sub;x.fillRect(U*4,Y+U*1.8,(W-U*8)*o.prog,U*.3)}}
  x.restore()},
 kicker(o,lt){const e=E(),k=ap(lt,o.at),U=u();x.save();enter(k,1);const X=o.al=='center'?W/2:W*(o.x??.04),Y=H*(o.y??.115);if(o.al!='center'){x.fillStyle=e.sub;x.fillRect(X,Y-U*.55,U*2.6,U*.15)}caps(o.text,o.al=='center'?X:X+U*3.4,Y,U*(o.size||1.75),{al:o.al=='center'?'center':'left',col:o.col||(DARK?e.tan:e.sub)});x.restore()},
 title(o,lt){const U=u(),al=o.al||'left',X=al=='center'?W/2:W*(o.x??.04),Y=H*(o.y??.17);x.save();const dc=DARK?E().bg:undefined,di=DARK?E().tan:undefined;const h=ftext(o.text,X,Y,U*(o.size||6.6),lt,o.at??0,{al,max:W*(o.w||.86),icol:o.icol||di,col:o.col||dc});if(o.sub)ftext(o.sub,X,Y+h+U*.4,U*(o.ssize||(o.size||6.6)*.8),lt,(o.at??0)+.25,{al,max:W*(o.w||.86),f:o.sf||SER,col:o.scol||di});x.restore()},
 text(o,lt){const U=u(),al=o.al||'center',X=al=='center'?W/2:W*(o.x??.04);ftext(o.text,X,H*o.y,U*(o.size||3.2),lt,o.at??0,{al,f:o.f||BODY,max:W*(o.w||.86),col:o.col||(DARK?E().bg:undefined),step:o.step??.04})},
 char(o,lt){const im=o._im;if(!im)return;const k=ap(lt,o.at,.6),U=u(),h=H*(o.h||.5),w=h*im.width/im.height,X=W*(o.x??.3)-w/2,Y=H*(o.y??.95)-h;x.save();
  const g=x.createRadialGradient(X+w/2,Y+h,0,X+w/2,Y+h,w*.6);g.addColorStop(0,'rgba(80,55,30,.22)');g.addColorStop(1,'rgba(80,55,30,0)');x.globalAlpha=k;x.fillStyle=g;x.beginPath();x.ellipse(X+w/2,Y+h-U*.3,w*.55,U*2,0,0,7);x.fill();
  x.globalAlpha=.25+.75*k;if(k<1)x.filter=`blur(${(1-k)*6}px) saturate(${.4+.6*k})`;x.translate(X+w/2,Y+h);const s=1+(o.zoom||0)*lt;x.scale(o.flip?-s:s,s);x.drawImage(im,-w/2,-h,w,h);x.restore()},
 cards(o,lt){const e=E(),U=u(),w=W*(o.w||.46),X=W*(o.x??.5),its=o.items||[],h=U*(o.h||11),gap=U*(o.gap||2);its.forEach((it,i)=>{const at=(o.at??0)+i*(o.step??.6),k=ap(lt,at);if(k<=0)return;const Y=H*(o.y??.42)+i*(h+gap);x.save();enter(k);shadow();x.fillStyle=it.bg||e.card;rr(X,Y,w,h,U*1.6);x.fill();nos();
   const R=h*.3;if(it.num!=null){txt(String(it.num).padStart(2,'0'),X+U*2,Y+h*.66,h*.5,{col:e.tan,w:400})}else badge(X+U*1.6+R,Y+h/2,R,colOf(it.ic),it.icon||'play');const tx=X+U*2.4+R*2+(it.num!=null?U*2:0);
   txt(it.title,tx,Y+h*(it.sub?.47:.6),U*(o.ts||3.5),{w:500,col:it.col||e.ink});if(it.sub)txt(it.sub,tx,Y+h*.77,U*2.05,{f:BODY,col:e.sub});if(it.right)badge(X+w-U*2.6,Y+h/2,U*1.3,e.brown,it.right,'#fff');x.restore()})},
 counter(o,lt){const e=E(),U=u(),k=ap(lt,o.at),w=W*(o.w||.4),h=U*14,X=W*(o.x??.53),Y=H*(o.y??.27);if(k<=0)return;x.save();enter(k);shadow();x.fillStyle=e.card;rr(X,Y,w,h,U*1.6);x.fill();nos();
  const cnt=eo(rp(lt,(o.at??0)+.2,(o.at??0)+(o.dur||1.4))),v=Math.round((o.from||0)+((o.to||0)-(o.from||0))*cnt);txt(v.toLocaleString('fr-FR').replace(/ /g,' '),X+U*3,Y+h*.56,U*(o.size||8.5),{col:e.ink});if(o.label)txt(o.label,X+U*3,Y+h*.8,U*1.5,{f:BODY,col:e.sub});
  if(o.pill){const kp=ap(lt,(o.at??0)+(o.dur||1.4)+.1,.4);if(kp>0){x.globalAlpha*=kp;const pw=U*(o.pw||22),ph=U*4.4,px=X+w-pw+U*1,py=Y+h-ph*.7;x.fillStyle=e.olive;rr(px,py,pw,ph,ph/2);x.fill();icon('check',px+ph*.62,py+ph/2,ph*.55,'#fff');txt(o.pill,px+ph*1.05,py+ph*.64,U*1.75,{f:BODY,w:500,col:'#fff'})}}x.restore()},
 numlist(o,lt){const e=E(),U=u(),its=o.items||[],X=W*(o.x??.06),gap=U*(o.gap||8.2);its.forEach((it,i)=>{const at=(o.at??0)+i*(o.step??.4),k=ap(lt,at);if(k<=0)return;const Y=H*(o.y??.3)+i*gap,RR=U*(o.r||3.4);x.save();enter(k,1.2);
   if(i<its.length-1){x.strokeStyle=e.line;x.lineWidth=U*.2;x.beginPath();x.moveTo(X+RR,Y+RR);x.lineTo(X+RR,Y+gap-RR);x.stroke()}badge(X+RR,Y,RR,o.col?colOf(o.col):e.olive,'dot');txt(String(i+1),X+RR,Y+RR*.38,RR*.95,{al:'center',col:'#fff',f:SER});txt(it,X+RR*2.7,Y+RR*.38,U*(o.size||4),{col:e.ink});x.restore()})},
 pills(o,lt){const e=E(),U=u(),its=o.items||[],X=W*(o.x??.53);its.forEach((it,i)=>{const at=(o.at??0)+i*(o.step??.5),k=ap(lt,at);if(k<=0)return;const t=typeof it=='string'?{text:it}:it;const h=U*(o.h||7.4),Y=H*(o.y??.3)+i*(h+U*1.8);x.save();enter(k,1);x.font=`500 ${U*(o.size||2.8)}px "${BODY}"`;const w=o.w?W*o.w:x.measureText(t.text).width+h*1.9;
   const fill=t.fill?colOf(t.fill):(t.kind=='x'?'#fff':e.card);x.fillStyle=fill;shadow(.08,2.4,.6);rr(X,Y,w,h,h/2);x.fill();nos();const R=h*.32;badge(X+h*.5,Y+h/2,R,t.kind=='x'?e.ink:colOf(t.ic||'olive'),t.kind=='x'?'x':(t.icon||'check'));txt(t.text,X+h*.95,Y+h*.63,U*(o.size||2.8),{f:BODY,w:500,col:t.fill?'#fff':e.ink});x.restore()})},
 tag(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.4);if(k<=0)return;x.save();x.font=`600 ${U*(o.size||2.3)}px "${BODY}"`;const h=U*(o.h||5.6),w=x.measureText(o.text).width+h*(o.icon?2:1.3),X=o.al=='center'?W*(o.x??.5)-w/2:W*(o.x??.04),Y=H*o.y;enter(k,1);x.fillStyle=colOf(o.col||'tan');rr(X,Y,w,h,h/2);x.fill();let tx=X+h*.65;if(o.icon){icon(o.icon,X+h*.55,Y+h/2,h*.5,o.ink||'#fff');tx=X+h*1.05}txt(o.text,tx,Y+h*.66,U*(o.size||2.3),{f:BODY,w:600,col:o.ink||'#fff'});x.restore()},
 calendar(o,lt){const e=E(),U=u(),k=ap(lt,o.at);if(k<=0)return;const w=W*(o.w||.42),X=W*(o.x??.05),Y=H*(o.y??.28),cols=7,n=o.days||30,cw=(w-U*4)/cols,rows=Math.ceil(n/cols),h=U*8+rows*cw*.62+U*4;x.save();enter(k);shadow();x.fillStyle=e.card;rr(X,Y,w,h,U*1.6);x.fill();nos();
  const tw=U*14;x.fillStyle=e.olive;rr(X+w/2-tw/2,Y+U*1.6,tw,U*3.4,U*1.7);x.fill();caps(o.label||`${n} jours`,X+w/2,Y+U*3.85,U*1.25,{al:'center',col:'#fff'});const f=Math.floor(n*eo(rp(lt,(o.at??0)+.4,(o.at??0)+(o.dur||2.4))));
  for(let i=0;i<n;i++){const c=i%cols,r=Math.floor(i/cols),cx=X+U*2+c*cw,cy=Y+U*7+r*cw*.62;x.fillStyle=i<f?e.tan:mixc(e.bg,e.line,.6);rr(cx+U*.25,cy,cw-U*.5,cw*.5,U*.5);x.fill()}if(o.foot)txt(o.foot,X+w/2,Y+h-U*1.4,U*1.4,{al:'center',f:BODY,col:e.sub});x.restore()},
 people(o,lt){const e=E(),U=u(),n=o.n||10,cols=o.cols||5,s=U*(o.s||4.4),X=W*(o.x??.53),Y=H*(o.y??.28),cs=[e.olive,e.tan,e.brown];for(let i=0;i<n;i++){const at=(o.at??0)+i*(o.step??.12),k=ap(lt,at,.35);if(k<=0)continue;const c=i%cols,r=Math.floor(i/cols);x.save();x.globalAlpha=k;icon('user',X+c*s*1.25+s/2,Y+r*s*1.35+s/2,s*1.2,cs[i%3]);x.restore()}},
 network(o,lt){const e=E(),U=u(),n=o.n||10,X=W*(o.x??.5),Y=H*(o.y??.55),R=W*(o.r||.3),k0=ap(lt,o.at,.5);if(k0<=0)return;const cs=[e.olive,e.tan,e.brown,'#fff'];
  for(let i=0;i<n;i++){const at=(o.at??0)+.3+i*(o.step??.12),k=ap(lt,at,.4);if(k<=0)continue;const a=-Math.PI/2+i*2*Math.PI/n,px=X+Math.cos(a)*R*(.92+.08*Math.sin(i*1.7)),py=Y+Math.sin(a)*R*(.92+.08*Math.cos(i*1.3));x.save();x.globalAlpha=k*.5;x.setLineDash([U*.5,U*.6]);x.strokeStyle=e.sub;x.lineWidth=U*.15;x.beginPath();x.moveTo(X,Y);x.lineTo(px,py);x.stroke();x.restore();
   x.save();x.globalAlpha=k;shadow(.12,2,.5);const c=cs[i%4];x.fillStyle=c;x.beginPath();x.arc(px,py,U*3.3*k,0,7);x.fill();nos();if(c=='#fff'){x.strokeStyle=e.line;x.lineWidth=U*.2;x.stroke()}icon('user',px,py,U*3.4,c=='#fff'?e.ink:'#fff');x.restore()}
  x.save();x.globalAlpha=k0;x.fillStyle=e.olive+'26';x.beginPath();x.arc(X,Y,U*8.5*k0,0,7);x.fill();badge(X,Y,U*6.6*back(k0),e.olive,o.icon||'send');x.restore()},
 donut(o,lt){const e=E(),U=u(),k=ap(lt,o.at),X=W*(o.x??.5),Y=H*(o.y??.5),R=W*(o.r||.2);if(k<=0)return;const p=(o.pct||0)/100*eo(rp(lt,(o.at??0)+.3,(o.at??0)+(o.dur||1.5)));x.save();x.globalAlpha=k;x.lineWidth=R*.3;x.strokeStyle=o.track||'rgba(255,255,255,.18)';x.beginPath();x.arc(X,Y,R,0,7);x.stroke();
  x.strokeStyle=e.tan;x.lineCap='butt';x.beginPath();x.arc(X,Y,R,-Math.PI/2,-Math.PI/2+p*Math.PI*2);x.stroke();x.fillStyle=o.inner||'#fff';x.beginPath();x.arc(X,Y,R*.84,0,7);x.fill();txt(Math.round(p*100)+'%',X,Y+R*.2,R*.55,{al:'center',col:o.tcol||e.ink});if(o.label)caps(o.label,X,Y+R*.48,R*.11,{al:'center'});x.restore()},
 phone(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.55);if(k<=0)return;const w=W*(o.w||.36),h=w*2.05,X=W*(o.x??.5)-w/2,Y=H*(o.y??.3);x.save();enter(k,3);shadow(.25,5,2);x.fillStyle='#1E1714';rr(X,Y,w,h,w*.13);x.fill();nos();const m=w*.045;x.save();rr(X+m,Y+m,w-2*m,h-2*m,w*.1);x.clip();
  if(o._im){const im=o._im,r=Math.max((w-2*m)/im.width,(h-2*m)/im.height),iw=im.width*r,ih=im.height*r;x.drawImage(im,X+w/2-iw/2,Y+h/2-ih/2,iw,ih)}else{x.fillStyle=o.screen||'#E9E1D6';x.fillRect(X,Y,w,h)}x.restore();x.fillStyle='#1E1714';rr(X+w*.36,Y+m+U*.6,w*.28,U*1.6,U*.8);x.fill();x.restore();
  (o.notes||[]).forEach(n=>{const kk=ap(lt,n.at,.4);if(kk<=0)return;x.save();x.globalAlpha=kk;x.translate(0,(1-kk)*U*1.5);x.font=`600 ${U*1.8}px "${BODY}"`;const tw=x.measureText(n.text).width+U*4,th=U*4.4,tx=W*n.x-tw/2,ty=H*n.y;shadow(.15,2.5,.6);x.fillStyle='#fff';rr(tx,ty,tw,th,U*1.2);x.fill();nos();txt(n.text,tx+U*2,ty+th*.64,U*1.8,{f:BODY,w:600,col:e.ink});x.restore()})},
 tracks(o,lt){const e=E(),U=u(),k=ap(lt,o.at);if(k<=0)return;const w=W*(o.w||.9),X=W*(o.x??.05),Y=H*(o.y??.32),h=U*21;x.save();enter(k);shadow(.08,2.4,.6);x.fillStyle=e.card;rr(X,Y,w,h,U*1.4);x.fill();nos();
  caps('Images',X+U*2,Y+U*2.8,U*1.05,{col:e.sub});const cols=[e.olive,e.tan,e.brown,mixc(e.olive,'#FFFFFF',.3)],n=o.n||4,bw=(w-U*4-U*1.2*(n-1))/n;for(let i=0;i<n;i++){const ki=ap(lt,(o.at??0)+.3+i*(o.step??.35),.3);if(ki<=0)continue;x.globalAlpha=ki;x.fillStyle=cols[i%4];rr(X+U*2+i*(bw+U*1.2),Y+U*4,bw,U*5,U*.6);x.fill();x.globalAlpha=1;icon('star',X+U*2+i*(bw+U*1.2)+bw/2,Y+U*6.5,U*2.2,'rgba(255,255,255,.85)')}
  caps('Voix off',X+U*2,Y+U*12.6,U*1.05,{col:e.sub});x.fillStyle=mixc(e.bg,e.line,.5);rr(X+U*1.5,Y+U*13.6,w-U*3,U*5.6,U*.8);x.fill();const kw=ap(lt,(o.at??0)+.2,1.2);x.fillStyle=e.olive;const bars=Math.floor((w-U*5)/(U*.8));for(let i=0;i<bars*kw;i++){const a=Math.abs(Math.sin(i*.9)*Math.sin(i*.23))*.8+.15;x.fillRect(X+U*2.5+i*U*.8,Y+U*16.4-a*U*2.4,U*.42,a*U*4.8)}
  if(o.head){const ph=X+U*2+(w-U*4)*cl((lt-(o.at??0)-1)/(o.dur||4));x.fillStyle=e.ink;x.fillRect(ph,Y+U*3.2,U*.25,U*16.6);x.beginPath();x.arc(ph+U*.12,Y+U*3.2,U*.7,0,7);x.fill()}x.restore()},
 bignum(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.6);x.save();x.globalAlpha=k;txt(o.n,W*(o.x??.04),H*(o.y??.16),U*(o.size||17),{col:e.tan,w:400});const X=W*(o.tx??.42),Y=H*(o.y??.16)-U*13;const segs=o.of||4;for(let i=0;i<segs;i++){x.fillStyle=i<(o.done||1)?e.ink:e.line;x.fillRect(X+i*(W*.13),Y,W*.115,U*.35)}
  caps(o.step||'',X,Y+U*4,U*1.45,{col:e.ink});x.restore();if(o.title)ftext(o.title,X,Y+U*10,U*(o.tsize||5.6),lt,(o.at??0)+.25,{max:W*.5})},
 bigcheck(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.5),X=W*(o.x??.5),Y=H*(o.y??.5),R=W*(o.r||.12);if(k<=0)return;x.save();x.globalAlpha=k;x.strokeStyle=e.tan;x.lineWidth=U*.3;x.beginPath();x.arc(X,Y,R*1.35,0,7);x.stroke();const kr=ap(lt,(o.at??0)+.5,.6);for(let i=0;i<24;i++){const a=i/24*Math.PI*2;x.globalAlpha=k*kr;x.beginPath();x.moveTo(X+Math.cos(a)*R*1.5,Y+Math.sin(a)*R*1.5);x.lineTo(X+Math.cos(a)*R*(1.5+.15*kr),Y+Math.sin(a)*R*(1.5+.15*kr));x.stroke()}
  x.globalAlpha=k;badge(X,Y,R*back(k),e.olive,'check');x.restore()},
 qr(o,lt){const e=E(),U=u(),k=ap(lt,o.at);if(k<=0||!o._im)return;const w=W*(o.w||.36),X=W*(o.x??.55),Y=H*(o.y??.27);x.save();enter(k);shadow();x.fillStyle='#fff';rr(X,Y,w,w*1.12,U*1.6);x.fill();nos();x.drawImage(o._im,X+w*.1,Y+w*.08,w*.8,w*.8);if(o.label)txt(o.label,X+w/2,Y+w*1.03,U*1.3,{al:'center',f:BODY,col:e.sub});x.restore()},
 stamp(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.3);if(k<=0)return;x.save();x.translate(W*(o.x??.3),H*(o.y??.7));x.rotate(o.rot??-.25);const s=1+.6*(1-back(k));x.scale(s,s);x.globalAlpha=k;x.strokeStyle=e.red;x.lineWidth=U*.6;x.font=`800 ${U*(o.size||5)}px "${BODY}"`;const w=x.measureText(o.text).width+U*4,h=U*(o.size||5)*1.6;rr(-w/2,-h/2,w,h,U*1);x.stroke();x.fillStyle=e.red;x.textAlign='center';x.textBaseline='middle';x.fillText(o.text,0,U*.3);x.restore()},
 tape(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.35);if(k<=0)return;x.save();x.translate(W*(o.x??.5),H*(o.y??.6));x.rotate(o.rot??-.06);x.globalAlpha=k;x.scale(.8+.2*back(k),.8+.2*back(k));x.font=`italic 500 ${U*(o.size||3.6)}px "${SER}"`;const w=x.measureText(o.text).width+U*5,h=U*(o.size||3.6)*1.7;shadow(.2,2,.6);x.fillStyle=e.tan;rr(-w/2,-h/2,w,h,U*.6);x.fill();nos();x.strokeStyle=e.brown;x.lineWidth=U*.25;x.stroke();x.fillStyle=e.ink;x.textAlign='center';x.textBaseline='middle';x.fillText(o.text,0,U*.2);x.restore()},
 clock(o,lt){const e=E(),U=u(),k=ap(lt,o.at),X=W*(o.x??.5),Y=H*(o.y??.4),R=W*(o.r||.17);if(k<=0)return;x.save();x.globalAlpha=k;x.fillStyle='#FBF8F3';x.strokeStyle=e.olive;x.lineWidth=U*1.1;x.beginPath();x.arc(X,Y,R,0,7);x.fill();x.stroke();for(let i=0;i<12;i++){const a=i/12*Math.PI*2;x.lineWidth=U*.3;x.beginPath();x.moveTo(X+Math.cos(a)*R*.82,Y+Math.sin(a)*R*.82);x.lineTo(X+Math.cos(a)*R*.9,Y+Math.sin(a)*R*.9);x.stroke()}
  const t=lt*(o.speed||1);[[t*.3,R*.5,U*.9],[t*3,R*.75,U*.5]].forEach(([a,l,lw])=>{x.strokeStyle=e.ink;x.lineWidth=lw;x.beginPath();x.moveTo(X,Y);x.lineTo(X+Math.sin(a)*l,Y-Math.cos(a)*l);x.stroke()});x.fillStyle=e.ink;x.beginPath();x.arc(X,Y,U*1,0,7);x.fill();x.restore()},
 lock(o,lt){const e=E(),U=u(),k=ap(lt,o.at),X=W*(o.x??.5),Y=H*(o.y??.5);if(k<=0)return;const open=lt>(o.openAt??99);x.save();x.globalAlpha=k;icon(open?'unlock':'lock',X,Y,W*(o.s||.16),e.olive);x.restore()},
 icons(o,lt){const e=E(),U=u();(o.items||[]).forEach((it,i)=>{const k=ap(lt,(o.at??0)+i*(o.step??.25),.4);if(k<=0)return;x.save();x.globalAlpha=k;const s=W*(it.s||.07);icon(it.icon,W*it.x,H*it.y+(1-k)*U*2,s,colOf(it.col||'ink'));if(it.no){x.strokeStyle=e.red;x.lineWidth=s*.09;x.beginPath();x.arc(W*it.x,H*it.y,s*.62,0,7);x.moveTo(W*it.x-s*.44,H*it.y-s*.44);x.lineTo(W*it.x+s*.44,H*it.y+s*.44);x.stroke()}if(it.label)txt(it.label,W*it.x,H*it.y+s*.95,U*1.4,{al:'center',f:BODY,col:e.sub});x.restore()})},
 panel(o,lt){const e=E(),U=u(),k=ap(lt,o.at);if(k<=0)return;const X=W*(o.x??.05),Y=H*(o.y??.3),w=W*(o.w||.9),h=H*(o.h||.2);x.save();enter(k);shadow(.12,3,1);x.fillStyle=colOf(o.col||'olive');rr(X,Y,w,h,U*1.6);x.fill();nos();if(o.kicker)caps(o.kicker,X+w/2,Y+U*4,U*1.3,{al:'center',col:'rgba(255,255,255,.75)'});if(o.title)txt(o.title,X+w/2,Y+U*10,U*(o.tsize||5),{al:'center',it:true,col:'#fff'});
  if(o.big){const kb=ap(lt,o.bigAt??((o.at??0)+.6),.4);x.globalAlpha=kb;txt(o.big,X+w/2,Y+h*.72,U*(o.bsize||5),{al:'center',f:BODY,w:700,col:'#fff'})}x.restore()},
 logo(o,lt){const e=E(),U=u(),k=ap(lt,o.at,.8);x.save();x.globalAlpha=k;if(k<1)x.filter=`blur(${(1-k)*10}px)`;caps(o.brand,W/2,H*(o.y??.48),U*(o.size||6.4),{f:SER,w:400,col:e.ink,al:'center',ls:U*(o.ls||2.2)});x.filter='none';const k2=ap(lt,(o.at??0)+.7,.6);x.globalAlpha=k2;if(o.sub)caps(o.sub,W/2,H*(o.y??.48)+U*5,U*1.2,{al:'center',col:e.sub,ls:U*.5});if(o.tagline)txt(o.tagline,W/2,H*(o.y??.48)+U*10,U*3,{al:'center',it:false,col:e.ink});x.restore()},
 img(o,lt){const U=u(),k=ap(lt,o.at,.5);if(k<=0||!o._im)return;const w=W*(o.w||.4),h=w*o._im.height/o._im.width;x.save();enter(k,2);if(o.shadow!==false)shadow(.18,4,1.2);if(o.round){rr(W*o.x-w/2,H*o.y,w,h,U*o.round);x.clip()}x.drawImage(o._im,W*o.x-w/2,H*o.y,w,h);x.restore()}
};

/* ---------- transition par volets (olive en bas, sable en haut) ---------- */
function wipe(lt,kind){const e=E(),d=.55,k=rp(lt,0,d);if(k>=1)return;const ez=eo(k);x.save();const top=kind=='tan'?e.olive:e.tan,bot=kind=='tan'?e.tan:e.olive;const y=-H*ez*1.05;x.fillStyle=top;x.fillRect(0,y,W,H*.45);x.fillStyle=bot;x.fillRect(0,y+H*.45,W,H*.6);x.restore()}

async function sceneEd(t,lt,sc){DARK=!!(sc.dark||sc.olive);const els=sc.els||[];for(const o of els){if((o.src)&&o._im===undefined)o._im=await load(o.src)}
 if(sc.dark){x.fillStyle=sc.bgc||mixc(E().ink,'#000000',.25);x.fillRect(0,0,W,H);const g=x.createRadialGradient(W/2,H*.5,0,W/2,H*.5,W*.8);g.addColorStop(0,E().tan+'1a');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,W,H)}else if(sc.olive){x.fillStyle=E().olive;x.fillRect(0,0,W,H)}else bg(sc);
 const d=sc.t1-sc.t0;for(const o of els){if(lt<(o.at??0)-.05)continue;if(o.out!=null&&lt>o.out+.35)continue;x.save();if(o.out!=null&&lt>o.out){x.globalAlpha=1-rp(lt,o.out,o.out+.35)}const f=EL[o.kind];if(f)f(o,lt);x.restore()}
 if(sc.fadeOut){const k=rp(lt,d-.35,d);if(k>0){x.save();x.fillStyle=sc.bgc||E().bg;x.globalAlpha=k;x.fillRect(0,0,W,H);x.restore()}}
 if(sc.wipe)wipe(lt,sc.wipe)}

Object.assign(RUN,{ed:sceneEd});
})();
