/* =====================================================================
   SHORT-FORM LOOKBOOK — module du moteur (chargé après engine.html)
   Ajoute :
   - sous-titres « mix » (sans + serif italique, mot par mot avec flou)
   - looks de face-cam : studio (bleu nuit), green, violet, warm
   - surcouches « ui » sur la face-cam : app, prompt, notif, comment, video,
     counter, strike, step, timer, avatar, pill, list
   - scènes : stage (plein écran bleu / papier / sombre), post, timeline,
     annot, profile
   - transitions : fx "blur" (entrée floutée), out "blur" (sortie floutée)
   ===================================================================== */
(function(){
const SANS='Inter',SERIF='Instrument Serif',SCRIPT='Great Vibes';
const FONTS=[[SANS,'inter-latin-400-normal.woff2','400'],[SANS,'inter-latin-600-normal.woff2','600'],[SANS,'inter-latin-700-normal.woff2','700'],[SANS,'inter-latin-800-normal.woff2','800'],[SERIF,'instrument-serif-latin-400-normal.woff2','400','normal'],[SERIF,'instrument-serif-latin-400-italic.woff2','400','italic'],[SCRIPT,'great-vibes-latin-400-normal.woff2','400']];
const fontsReady=Promise.all(FONTS.map(([f,file,w,s])=>new FontFace(f,`url(/__engine/fonts/${file})`,{weight:w,style:s||'normal'}).load().then(ff=>document.fonts.add(ff)).catch(()=>{})));
window.SHORT_READY=fontsReady;

const LOOKS={
 studio:{tint:'rgba(30,80,170,.16)',acc:'#3b82f6',dia:['#7cc0ff','#1f63d6'],hi:'#2f6fe0',money:'#4ade80'},
 green:{tint:'rgba(30,160,80,.10)',acc:'#22c55e',dia:['#9bff6f','#18a83a'],hi:'#22c55e',money:'#4ade80'},
 violet:{tint:'rgba(120,50,220,.20)',acc:'#a855f7',dia:['#d8b4fe','#7c3aed'],hi:'#a855f7',money:'#4ade80',script:true},
 warm:{tint:'rgba(200,120,40,.12)',acc:'#f59e0b',dia:['#fde68a','#d97706'],hi:'#f59e0b',money:'#4ade80'}};
const LK=sc=>Object.assign({},LOOKS.studio,LOOKS[(sc&&sc.look)||C.look||'studio']||{},C.lookOverride||{});
const norm=s=>String(s).toLowerCase().replace(/[^\p{L}\p{N}']/gu,'');
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)};

/* ---------- texte : petit sans + accent serif italique ---------- */
// "Fais de toi un *maître* du design"  -> *mot* en serif italique (ou script en look violet)
function richParts(txt){return String(txt||'').split(/(\*[^*]+\*|\s+)/).filter(s=>s&&!/^\s+$/.test(s)).map(p=>p.startsWith('*')?{s:p.slice(1,-1),k:1}:{s:p,k:0})}
function fontOf(p,size,o){if(p.k)return o.script?`400 ${size*1.55}px "${SCRIPT}"`:`italic 400 ${size*1.32}px "${SERIF}"`;return `${o.w||600} ${size}px ${SANS}`}
// dessine une ligne riche centrée (ou alignée à gauche), mot par mot, apparition floutée
function rich(txt,X,Y,size,o={}){const ps=richParts(txt);if(!ps.length)return 0;x.save();const sp=size*.28;let tw=0;const ws=ps.map(p=>{x.font=fontOf(p,size,o);const w=x.measureText(p.s).width;tw+=w;return w});tw+=sp*(ps.length-1);
 let sc=1;if(o.max&&tw>o.max)sc=o.max/tw;x.translate(X,Y);x.scale(sc,sc);let px=o.al=='left'?0:-tw/2;
 ps.forEach((p,i)=>{const st=(o.at||0)+i*(o.step??.07),k=o.lt==null?1:eo(rp(o.lt,st,st+.22));if(k>0){x.save();x.globalAlpha*=k*(o.a??1);if(k<1)x.filter=`blur(${(1-k)*10}px)`;x.font=fontOf(p,size,o);x.textBaseline='alphabetic';x.textAlign='left';
  if(o.sh){x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=size*.35}x.fillStyle=p.k?(o.kcol||o.col||'#fff'):(o.col||'#fff');x.fillText(p.s,px,size*.36+(1-k)*size*.25);x.restore()}px+=ws[i]+sp});x.restore();return tw*sc}

/* ---------- sous-titres « mix » ---------- */
let MG=null;
function mkMix(){MG=[];let cur=[];const mx=C.captions.maxWords>3?C.captions.maxWords:6;for(let i=0;i<WORDS.length;i++){cur.push(i);const w=WORDS[i][0],end=/[.?!…:]$/.test(w),comma=/,$/.test(w),gap=i+1<WORDS.length?WORDS[i+1][1]-WORDS[i][2]:1;if(cur.length>=mx||end||gap>.45||(comma&&cur.length>=3)){MG.push(cur);cur=[]}}if(cur.length)MG.push(cur)}
function capMix(t,sc){if(!WORDS.length)return;if(!MG)mkMix();let gi=-1;for(let i=0;i<MG.length;i++){const st=WORDS[MG[i][0]][1]-.04,nx=i+1<MG.length?WORDS[MG[i+1][0]][1]-.04:1e9,en=Math.min(nx,WORDS[MG[i].at(-1)][2]+.7);if(t>=st&&t<en)gi=i}if(gi<0)return;
 const g=MG[gi],L=LK(sc),dark=sc.capInk=='dark',col=dark?'#111':'#fff';const hl=((sc.hl||[]).concat(C.captions.hl||[])).map(norm),strong=((sc.strong||[]).concat(C.captions.strong||[])).map(norm);
 const base=u*(sc.capSize||C.captions.size||4.3),Y=H*(sc.capY||C.captions.y||.62);
 // 2 lignes max : la 2e ligne commence au milieu du groupe
 const n=g.length,cut=n<=3?n:Math.ceil(n/2);const lines=[g.slice(0,cut),g.slice(cut)].filter(l=>l.length);
 const nxt=gi+1<MG.length?WORDS[MG[gi+1][0]][1]-.04:1e9,fade=cl((nxt-t)/.12);
 lines.forEach((ln,li)=>{const items=ln.map(i=>{const s=WORDS[i][0].replace(/[,.…:;]$/,''),nn=norm(s);const kind=hl.includes(nn)?'k':strong.includes(nn)?'s':'n';return {i,s,kind}});
  const fnt=it=>it.kind=='k'?(L.script?`400 ${base*1.75}px "${SCRIPT}"`:`italic 400 ${base*1.42}px "${SERIF}"`):it.kind=='s'?`800 ${base*1.3}px ${SANS}`:`600 ${base}px ${SANS}`;
  const sp=base*.27;let tw=0;items.forEach(it=>{x.font=fnt(it);it.w=x.measureText(it.s).width;tw+=it.w});tw+=sp*(items.length-1);const sc2=tw>W*.88?W*.88/tw:1;
  const ly=Y+li*base*1.38;let px=W/2-tw*sc2/2;
  items.forEach(it=>{const age=t-WORDS[it.i][1]+.04,k=eo(cl(age/.2)),gst=t-WORDS[g[0]][1]+.04,gk=eo(cl(gst/.25));if(gk>0){x.save();x.globalAlpha=(.3*gk+.7*k)*fade;if(k<1||fade<1)x.filter=`blur(${Math.max((1-k)*7,(1-fade)*8)}px)`;x.font=fnt(it);x.textBaseline='alphabetic';x.textAlign='left';
   if(!dark){x.shadowColor='rgba(0,0,0,.6)';x.shadowBlur=base*.45;x.shadowOffsetY=base*.06}x.fillStyle=col;x.translate(px,ly+(1-gk)*base*.3);x.scale(sc2,sc2);x.fillText(it.s,0,0);x.restore()}px+=(it.w+sp)*sc2})})}
const _cap=captions;captions=function(t,sc){if((sc&&sc.capStyle||C.captions.style)=='mix')return capMix(t,sc);return _cap(t,sc)};

/* ---------- petites briques ---------- */
function diamond(X,Y,s,cols,n,k=1){if(k<=0)return;x.save();x.translate(X,Y);x.scale(k,k);x.rotate(Math.PI/4);const g=x.createLinearGradient(-s/2,-s/2,s/2,s/2);g.addColorStop(0,cols[0]);g.addColorStop(1,cols[1]);x.shadowColor=cols[1]+'aa';x.shadowBlur=s*.6;x.fillStyle=g;rr(-s/2,-s/2,s,s,s*.22);x.fill();x.shadowColor='transparent';x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=s*.05;x.stroke();x.restore();if(n!=null)word(String(n),X,Y+s*.02,s*.5,{w:800,f:SANS,col:'#fff',a:cl(k)})}
function glass(X,Y,w,h,r,k,o={}){x.save();x.globalAlpha*=cl(k);x.shadowColor='rgba(0,0,0,.45)';x.shadowBlur=u*5;x.shadowOffsetY=u*1.2;x.fillStyle=o.fill||'rgba(28,30,38,.88)';rr(X,Y,w,h,r);x.fill();x.shadowColor='transparent';x.strokeStyle=o.stroke||'rgba(255,255,255,.12)';x.lineWidth=u*.25;x.stroke();x.restore()}
function white(X,Y,w,h,r,k,o={}){x.save();x.globalAlpha*=cl(k);x.shadowColor=o.shadow||'rgba(0,0,0,.32)';x.shadowBlur=u*6;x.shadowOffsetY=u*1.6;x.fillStyle=o.fill||'#fff';rr(X,Y,w,h,r);x.fill();x.restore()}
function txt(s,X,Y,size,o={}){x.save();x.globalAlpha*=o.a??1;x.font=`${o.it?'italic ':''}${o.w||600} ${size}px ${o.f?`"${o.f}"`:SANS}`;x.textAlign=o.al||'left';x.textBaseline='middle';x.fillStyle=o.col||'#111';let w=x.measureText(s).width;if(o.max&&w>o.max){x.translate(X,Y);x.scale(o.max/w,o.max/w);x.fillText(s,o.al=='center'?0:0,0)}else x.fillText(s,X,Y);x.restore();return Math.min(w,o.max||w)}
function enter(lt,at,dur=.35){return back(rp(lt,at,at+dur))}
function popT(X,Y,k,fn){if(k<=0)return;x.save();x.translate(X,Y);const s=(.88+.12*Math.min(1,k))*(C.uiScale||1.15);x.scale(s,s);x.globalAlpha*=cl(k*1.4);if(k<.7)x.filter=`blur(${(1-k/.7)*10}px)`;x.translate(0,(1-cl(k))*u*5);fn();x.restore()}
function exitK(lt,it,sc){const out=it.out!=null?it.out:(sc.t1-sc.t0)+1;return 1-rp(lt,out,out+.25)}
function money(v,o){const s=Math.round(v).toLocaleString(o.locale||'fr-FR').replace(/ | /g,' ');return (o.prefix||'')+s+(o.suffix||'')}

/* ---------- surcouches UI ---------- */
const UI={
 // fiche d'app : icône, nom, sous-titre, étoiles, bouton
 app:async(it,lt,sc)=>{const im=it.icon?await load(it.icon):null,k=enter(lt,it.at||0)*exitK(lt,it,sc);const w=W*(it.w||.62),h=u*13;popT(W*(it.x||.5),H*(it.y||.74),k,()=>{white(-w/2,-h/2,w,h,u*3,1);const s=u*8.6,ix=-w/2+u*2.4;x.save();rr(ix,-s/2,s,s,u*2);x.clip();if(im)cover(im,ix,-s/2,s,s,.5);else{x.fillStyle=it.iconBg||LK(sc).acc;x.fillRect(ix,-s/2,s,s);word(it.iconText||'✳',ix+s/2,0,s*.55,{w:800,col:'#fff'})}x.restore();
  txt(it.title||'',ix+s+u*2.2,-u*3,u*3.2,{w:700,max:w*.45});txt(it.sub||'',ix+s+u*2.2,u*.4,u*2.1,{w:500,col:'#8a8f98',max:w*.45});txt('★★★★★  '+(it.rating||'4,8'),ix+s+u*2.2,u*3.4,u*1.8,{w:500,col:'#a0a4ab'});
  const bw=u*11,bh=u*4.6;x.fillStyle=it.btnBg||'#1d7bff';rr(w/2-u*2.4-bw,-bh/2,bw,bh,bh/2);x.fill();txt(it.btn||'Obtenir',w/2-u*2.4-bw/2,0,u*2.2,{w:700,col:'#fff',al:'center'})})},
 // champ de prompt qui s'écrit
 prompt:async(it,lt,sc)=>{const k=enter(lt,it.at||0)*exitK(lt,it,sc);const w=W*(it.w||.7),h=u*(it.chips?17:13);const ims=await Promise.all((it.chips||[]).map(c=>c.src?load(c.src):null));popT(W*(it.x||.5),H*(it.y||.74),k,()=>{white(-w/2,-h/2,w,h,u*3,1,{shadow:'rgba(0,0,0,.28)'});const T=it.text||'',cps=it.cps||16,n=Math.floor(cl((lt-(it.at||0)-.35)*cps,0,T.length));const L=-w/2+u*3;let yy=-h/2+u*4.4;
  if(it.chips){it.chips.forEach((c,i)=>{const cw=u*13,ch=u*4.4,cx=L+i*(cw+u*1.4);x.fillStyle='#f1f2f4';rr(cx,yy-ch/2,cw,ch,u*1.2);x.fill();if(ims[i]){x.save();rr(cx+u*.6,yy-ch/2+u*.6,ch-u*1.2,ch-u*1.2,u*.7);x.clip();cover(ims[i],cx+u*.6,yy-ch/2+u*.6,ch-u*1.2,ch-u*1.2,.5);x.restore()}txt(c.name||c,cx+ch+u*.4,yy,u*1.6,{w:600,col:'#444',max:cw-ch-u})});yy+=u*5.6}
  if(n==0)txt(it.placeholder||'Comment puis-je t\'aider ?',L,yy,u*2.8,{w:500,col:'#a3a7ae',max:w-u*6});else{const tw=txt(T.slice(0,n),L,yy,u*2.8,{w:500,col:'#1a1a1a',max:w-u*8});if(Math.floor(lt*2.4)%2==0||n<T.length){x.fillStyle='#1a1a1a';x.fillRect(L+tw+u*.3,yy-u*1.5,u*.25,u*3)}}
  const by=h/2-u*3.2;txt('+',L,by,u*2.6,{w:500,col:'#8a8f98'});txt(it.brand||'Assistant',L+u*3.5,by,u*1.8,{w:600,col:'#8a8f98'});const done=n>=T.length&&T.length>0;x.fillStyle=done?(it.send||'#e2763b'):'#e8c4b2';x.beginPath();x.arc(w/2-u*3.4,by,u*1.9,0,7);x.fill();word('↑',w/2-u*3.4,by,u*2.2,{w:800,f:SANS,col:'#fff'})})},
 // notifications de paiement empilées
 notif:async(it,lt,sc)=>{const items=it.items||[];const w=W*(it.w||.64),h=u*9.6,gap=u*1.6;items.forEach((n,i)=>{const at=(it.at||0)+i*(it.gap||.45),k=enter(lt,at)*exitK(lt,it,sc);popT(W*(it.x||.5),H*(it.y||.74)+i*(h+gap),k,()=>{glass(-w/2,-h/2,w,h,u*2.6,1);const s=u*5.4,ix=-w/2+u*2;x.fillStyle=n.color||'#6366f1';rr(ix,-s/2,s,s,u*1.3);x.fill();word(n.icon||'€',ix+s/2,0,s*.55,{w:800,f:SANS,col:'#fff'});
  txt(n.title||'Paiement reçu',ix+s+u*1.8,-u*1.7,u*2.2,{w:700,col:'#fff',max:w*.42});txt(n.sub||'',ix+s+u*1.8,u*1.6,u*1.7,{w:500,col:'#9aa0aa',max:w*.42});
  const v=n.to!=null?money(n.from!=null?lerp(n.from,n.to,eo(rp(lt,at+.2,at+.9))):n.to,n):(n.amount||'');txt(v,w/2-u*2,-u*1.3,u*2.6,{w:700,col:LK(sc).money,al:'right'});x.fillStyle='rgba(74,222,128,.18)';rr(w/2-u*10.4,u*1.2,u*8.4,u*2.6,u*1.3);x.fill();txt(n.tag||'Réussi',w/2-u*6.2,u*2.5,u*1.4,{w:700,col:'#4ade80',al:'center'})})})},
 // barre de commentaire qui tape un mot-clé
 comment:async(it,lt,sc)=>{const k=enter(lt,it.at||0)*exitK(lt,it,sc);const w=W*(it.w||.8),h=u*7.6;popT(W*(it.x||.5),H*(it.y||.82),k,()=>{glass(-w/2,-h/2,w,h,h/2,1,{fill:'rgba(20,22,28,.92)'});const T=it.text||'',n=Math.floor(cl((lt-(it.at||0)-.4)*(it.cps||9),0,T.length));x.fillStyle=LK(sc).acc;x.beginPath();x.arc(-w/2+u*4.2,0,u*2.3,0,7);x.fill();
  if(n==0)txt(it.placeholder||'Ajouter un commentaire…',-w/2+u*8,0,u*2.2,{w:500,col:'#8b8f98'});else{const tw=txt(T.slice(0,n),-w/2+u*8,0,u*2.4,{w:600,col:'#fff'});if(Math.floor(lt*2.4)%2==0)x.fillRect(-w/2+u*8+tw+u*.3,-u*1.5,u*.25,u*3)}
  const pressed=n>=T.length&&lt>(it.at||0)+.4+T.length/(it.cps||9)+.25;x.fillStyle='#1d7bff';x.beginPath();x.arc(w/2-u*4,0,u*2.5*(pressed?.88:1),0,7);x.fill();word('↑',w/2-u*4,0,u*2.6,{w:800,f:SANS,col:'#fff'})})},
 // carte vidéo (miniature + titre)
 video:async(it,lt,sc)=>{const im=await load(it.src),k=enter(lt,it.at||0)*exitK(lt,it,sc);const w=W*(it.w||.6),th=w*9/16,h=th+u*10;popT(W*(it.x||.5),H*(it.y||.76),k,()=>{white(-w/2,-h/2,w,h,u*2.4,1);x.save();rr(-w/2+u*1.2,-h/2+u*1.2,w-u*2.4,th,u*1.6);x.clip();if(im)cover(im,-w/2+u*1.2,-h/2+u*1.2,w-u*2.4,th,.4);x.restore();txt(it.title||'',-w/2+u*2,-h/2+th+u*4.2,u*2.2,{w:700,max:w-u*4});txt(it.channel||'',-w/2+u*2,-h/2+th+u*7.4,u*1.6,{w:500,col:'#8a8f98',max:w-u*4})})},
 // grand compteur qui roule (+ halo vert + confettis)
 counter:async(it,lt,sc)=>{const at=it.at||0,d=it.dur||1.2,k=eo(rp(lt,at,at+d)),kx=exitK(lt,it,sc);if(lt<at||kx<=0)return;const v=lerp(it.from||0,it.to||0,k),done=k>=1,size=u*(it.size||9.5);const X=W*(it.x||.5),Y=H*(it.y||.6);x.save();x.globalAlpha=kx*cl((lt-at)/.15);
  word(money(v,it),X,Y,size,{w:800,f:SANS,col:done&&it.glow!==false?'#dcfce7':'#fff',glow:done&&it.glow!==false?'rgba(74,222,128,.9)':null,sh:!done});if(it.label)rich(it.label,X,Y+size*.85,u*3.2,{lt,at:at+d*.6,sh:1});
  if(done&&it.confetti!==false){const a=lt-at-d;if(a<1.1)for(let i=0;i<26;i++){const ang=hash(i)*Math.PI*2,sp=(.5+hash(i+9))*W*.35,px=X+Math.cos(ang)*sp*eo(a/1.1),py=Y+Math.sin(ang)*sp*.55*eo(a/1.1)+a*a*u*14;x.save();x.globalAlpha=(1-a/1.1)*kx;x.fillStyle=['#4ade80','#22c55e','#facc15','#ffffff'][i%4];x.translate(px,py);x.rotate(a*8+i);x.fillRect(-u*.7,-u*.35,u*1.4,u*.7);x.restore()}}x.restore()},
 // prix barré -> nouveau prix
 strike:async(it,lt,sc)=>{const at=it.at||0,kx=exitK(lt,it,sc);if(lt<at||kx<=0)return;const X=W*(it.x||.5),Y=H*(it.y||.62),s=u*(it.size||7.5);x.save();x.globalAlpha=kx;const k1=eo(rp(lt,at,at+.25));word(it.old||'',X-W*.2,Y,s,{w:800,f:SANS,col:'#fff',a:k1,sh:1});
  const ks=eo(rp(lt,at+.45,at+.75));if(ks>0){x.save();x.strokeStyle='#ef4444';x.lineWidth=u*.7;x.lineCap='round';x.beginPath();x.moveTo(X-W*.32,Y+s*.05);x.lineTo(X-W*.32+W*.24*ks,Y-s*.1*ks);x.stroke();x.restore()}
  const ka=eo(rp(lt,at+.7,at+1));if(ka>0){x.save();x.strokeStyle='#fff';x.lineWidth=u*.5;x.lineCap='round';x.beginPath();x.arc(X-W*.02,Y+s*.2,W*.06,Math.PI*1.15,Math.PI*1.15+Math.PI*.75*ka);x.stroke();x.restore()}
  const kn=back(rp(lt,at+.9,at+1.25));if(kn>0)word(it.new||'',X+W*.2,Y,s*1.15,{w:800,f:SANS,col:'#4ade80',glow:'rgba(74,222,128,.75)',sc:kn});if(it.sub)rich(it.sub,X-W*.2,Y+s*.85,u*2.2,{lt,at:at+.3,col:'#d4d4d8',sh:1});x.restore()},
 // badge étape (losange) + titre ; mot fantôme flou derrière
 step:async(it,lt,sc)=>{const at=it.at||0,kx=exitK(lt,it,sc),L=LK(sc);if(lt<at||kx<=0)return;const X=W*(it.x||.5),Y=H*(it.y||.6);x.save();x.globalAlpha=kx;
  if(it.ghost){const kg=1-rp(lt,at+.5,at+1.1);if(kg>0){x.save();x.filter='blur(5px)';word(it.ghost,X,Y+u*5,u*9,{w:700,f:SANS,col:'#fff',a:.4*kg});x.restore()}}
  const kd=back(rp(lt,at,at+.4));if(it.align=='left'){{const kb=eo(rp(lt,at+.1,at+.4));x.font=`700 ${u*(it.size||4.2)}px ${SANS}`;const tw=x.measureText((it.title||'').replace(/\*/g,'')).width;if(it.box!==false&&kb>0)glass(X-W*.4,Y-u*5.6,u*13+tw*1.1,u*11.2,u*5.6,kb,{fill:'rgba(10,12,18,.55)'})}diamond(X-W*.4+u*5.6,Y,u*6.4,L.dia,it.n,kd);if(it.label)txt(it.label.toUpperCase(),X-W*.4+u*11,Y-u*2.8,u*1.7,{w:700,col:'rgba(255,255,255,.7)',a:eo(rp(lt,at+.2,at+.4))});rich(it.title||'',X-W*.4+u*11,Y+u*1.2,u*(it.size||4.2),{lt,at:at+.3,al:'left',sh:1,script:L.script})}
  else{diamond(X,Y-u*5,u*(it.d||7.5),L.dia,it.n,kd);rich(it.title||'',X,Y+u*3.5,u*(it.size||4.4),{lt,at:at+.35,sh:1,script:L.script});if(it.sub)rich(it.sub,X,Y+u*7,u*2.4,{lt,at:at+.6,col:'#d4d4d8',sh:1})}x.restore()},
 // chrono circulaire
 timer:async(it,lt,sc)=>{const at=it.at||0,kx=exitK(lt,it,sc);if(lt<at||kx<=0)return;const r=u*(it.r||5.6),X=W*(it.x||.5),Y=H*(it.y||.74),k=back(rp(lt,at,at+.35));const from=it.from||60,rate=it.rate||1,v=Math.max(it.to||0,from-Math.max(0,lt-at-(it.hold||.6))*rate);
  x.save();x.globalAlpha=kx;x.translate(X,Y);x.scale(k,k);x.fillStyle='rgba(10,12,18,.55)';x.beginPath();x.arc(0,0,r,0,7);x.fill();x.strokeStyle='rgba(255,255,255,.25)';x.lineWidth=r*.09;x.beginPath();x.arc(0,0,r*.86,0,7);x.stroke();x.strokeStyle='#fff';x.beginPath();x.arc(0,0,r*.86,-Math.PI/2,-Math.PI/2+Math.PI*2*(v/from));x.stroke();
  for(let i=0;i<60;i+=5){const a=i/60*Math.PI*2;x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=r*.03;x.beginPath();x.moveTo(Math.cos(a)*r*.68,Math.sin(a)*r*.68);x.lineTo(Math.cos(a)*r*.74,Math.sin(a)*r*.74);x.stroke()}
  word(String(Math.ceil(v)).padStart(2,'0'),0,-r*.06,r*.62,{w:800,f:SANS,col:'#fff'});word(it.unit||'secondes',0,r*.38,r*.16,{w:600,f:SANS,col:'rgba(255,255,255,.7)'});x.restore()},
 // photo ronde + nom
 avatar:async(it,lt,sc)=>{const im=await load(it.src),k=enter(lt,it.at||0)*exitK(lt,it,sc);const r=u*(it.r||5);popT(W*(it.x||.5),H*(it.y||.76),k,()=>{x.strokeStyle='#fff';x.lineWidth=u*.5;x.beginPath();x.arc(0,0,r+u*.8,0,7);x.stroke();x.save();x.beginPath();x.arc(0,0,r,0,7);x.clip();if(im)cover(im,-r,-r,r*2,r*2,.3);else{x.fillStyle=LK(sc).acc;x.fillRect(-r,-r,r*2,r*2)}x.restore();if(it.label)txt(it.label,0,r+u*3.2,u*1.9,{w:600,col:'#fff',al:'center'})})},
 pill:async(it,lt,sc)=>{const k=enter(lt,it.at||0)*exitK(lt,it,sc);popT(W*(it.x||.5),H*(it.y||.74),k,()=>{x.font=`700 ${u*2.4}px ${SANS}`;const w=x.measureText(it.text||'').width+u*5,h=u*5;glass(-w/2,-h/2,w,h,h/2,1,{fill:it.bg||'rgba(255,255,255,.14)'});txt(it.text||'',0,0,u*2.4,{w:700,col:it.col||'#fff',al:'center'})})},
 // liste à puces ✦ (sans, la puce arrive puis le texte)
 list:async(it,lt,sc)=>{const kx=exitK(lt,it,sc);if(kx<=0)return;const X=W*(it.x||.2),Y=H*(it.y||.6),gap=u*(it.gap||4.6),dark=it.ink=='dark';x.save();x.globalAlpha=kx;(it.items||[]).forEach((s,i)=>{const at=(it.at||0)+i*(it.step||.45),k=eo(rp(lt,at,at+.3));if(k<=0)return;word('✦',X,Y+i*gap,u*2.2,{w:700,f:SANS,col:dark?'#111':'#fff',a:k,sc:.6+.4*k});rich(s,X+u*3.4,Y+i*gap,u*(it.size||3),{lt,at:at+.1,al:'left',col:dark?'#111':'#fff',kcol:dark?LK(sc).hi:'#fff',sh:!dark})});x.restore()}
};
async function uiLayer(lt,sc){if(!sc.ui)return;for(const it of sc.ui){const f=UI[it.kind];if(f)await f(it,lt,sc)}}

/* ---------- masque des sous-titres déjà incrustés ---------- */
function hideBand(y,h){if(y==null)return;const Y=H*y,hh=H*(h||.05);if(!window._HB){_HB=document.createElement('canvas');_HB.width=W;_HB.height=H}const q=_HB.getContext('2d');q.globalCompositeOperation='source-over';q.clearRect(0,0,W,H);q.filter='blur(40px) saturate(.15) brightness(.62)';q.drawImage(x.canvas,0,0);q.filter='none';
 q.globalCompositeOperation='destination-in';q.save();q.translate(W/2,Y);q.scale(1,hh/(W*.42));const g=q.createRadialGradient(0,0,0,0,0,W*.42);g.addColorStop(0,'rgba(0,0,0,1)');g.addColorStop(.6,'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');q.fillStyle=g;q.fillRect(-W,-W,W*2,W*2);q.restore();q.globalCompositeOperation='source-over';x.drawImage(_HB,0,0)}
/* ---------- look de la face-cam ---------- */
function gradeFace(sc){const L=LK(sc);x.save();x.globalCompositeOperation='soft-light';x.fillStyle=L.tint;x.fillRect(0,0,W,H);x.restore();const g=x.createLinearGradient(0,H*.45,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.62)');x.fillStyle=g;x.fillRect(0,H*.45,W,H*.55);const v=x.createRadialGradient(W/2,H*.42,H*.25,W/2,H*.42,H*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.45)');x.fillStyle=v;x.fillRect(0,0,W,H)}
// face-cam « short » : cadrage + push lent + look + sous-titres mix + surcouches
async function sceneShort(t,lt,sc){const {f,m}=await faceAt(t,sc);const d=sc.t1-sc.t0;x.save();const z=(sc.zoom||1)*(1+(sc.push??.05)*eo(rp(lt,0,d)))*(sc.punch?1+.05*(1-eo(rp(lt,0,.3))):1);const fy=sc.fy??.4;x.translate(W/2,H*.4);x.scale(z,z);x.translate(-W/2,-H*.4);cover(f,0,0,W,H,fy);
 // derrière la personne : chiffre géant + cartes en arc (nécessite des masques)
 if(sc.ghost){const g=sc.ghost,at=g.at||0,k=back(rp(lt,at,at+.45));if(k>0){const L=LK(sc);x.save();x.globalAlpha=cl(k);x.translate(W/2,H*(g.y||.22));x.scale(.6+.4*k+.04*Math.sin(lt*3),.6+.4*k);x.font=`900 ${u*(g.size||62)}px ${SANS}`;x.textAlign='center';x.textBaseline='middle';const gr=x.createLinearGradient(0,-u*30,0,u*30);gr.addColorStop(0,g.c1||'#ffe29a');gr.addColorStop(1,g.c2||L.hi||'#e09a1f');x.fillStyle=gr;x.shadowColor=(g.c2||'#e09a1f')+'aa';x.shadowBlur=u*8;x.fillText(g.text||'',0,0);x.restore()}}
 if(sc.ring){const imgs=await Promise.all(sc.ring.map(load)),t0=sc.ringAt||0;if(lt>=t0){const n=imgs.length;imgs.forEach((im,j)=>{const kj=back(rp(lt,t0+j*.05,t0+j*.05+.4));if(kj<=0)return;const a=-Math.PI*.98+j*(Math.PI*.96/Math.max(1,n-1))+(lt-t0)*.25,R=W*.46*(.55+.45*eo(rp(lt,t0,t0+.5)));photo(im,W/2+Math.cos(a)*R,H*.33+Math.sin(a)*R*.85,u*20,u*25,a+Math.PI/2,kj)})}}
 if((sc.ghost||sc.ring)&&m)cutout(f,m,fy);
 x.restore();
 hideBand(sc.hideY??C.hideY,sc.hideH??C.hideH);if(sc.blurFace){x.save();x.filter=`blur(${sc.blurFace}px)`;x.drawImage(x.canvas,0,0);x.restore()}gradeFace(sc);
 if(sc.captions!==false)captions(t,Object.assign({capStyle:'mix'},sc));await uiLayer(lt,sc)}

/* ---------- STAGE : plein écran (bleu Apple, papier, sombre, vert, violet) ---------- */
const STAGE={blue:{ink:'#fff',sub:'rgba(255,255,255,.75)',kcol:'#fff'},paper:{ink:'#1a1a1a',sub:'#6b6b6b',kcol:'#2f5fb3'},dark:{ink:'#fff',sub:'#9ca3af',kcol:'#fff'},green:{ink:'#fff',sub:'#bbf7d0',kcol:'#fff'},violet:{ink:'#fff',sub:'#ddd6fe',kcol:'#fff'}};
function stageBG(kind,lt,Y0=0,Hh=H){x.save();x.beginPath();x.rect(0,Y0,W,Hh);x.clip();
 if(kind=='blue'){const g=x.createLinearGradient(0,Y0,W*.3,Y0+Hh);g.addColorStop(0,'#1c5fd4');g.addColorStop(.55,'#2f7be8');g.addColorStop(1,'#4b98f2');x.fillStyle=g;x.fillRect(0,Y0,W,Hh);
  x.globalCompositeOperation='screen';for(let i=0;i<6;i++){const px=((i*.23+lt*.012)%1.3-.15)*W;const gg=x.createLinearGradient(px,0,px+W*.12,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,`rgba(190,220,255,${.08+.05*hash(i)})`);gg.addColorStop(1,'rgba(255,255,255,0)');x.save();x.translate(px,Y0);x.rotate(.32);x.fillStyle=gg;x.fillRect(0,-H*.2,W*.12,H*1.6);x.restore()}x.globalCompositeOperation='source-over';
  x.globalAlpha=.05;x.strokeStyle='#fff';x.lineWidth=1;for(let i=0;i<W;i+=u*5){x.beginPath();x.moveTo(i,Y0);x.lineTo(i,Y0+Hh);x.stroke()}for(let j=Y0;j<Y0+Hh;j+=u*5){x.beginPath();x.moveTo(0,j);x.lineTo(W,j);x.stroke()}}
 else if(kind=='paper'){x.fillStyle='#f1efea';x.fillRect(0,Y0,W,Hh);const g=x.createRadialGradient(W/2,Y0+Hh*.45,0,W/2,Y0+Hh*.45,Hh*.7);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,Y0,W,Hh);x.globalAlpha=.035;x.strokeStyle='#000';for(let i=0;i<W;i+=u*6){x.beginPath();x.moveTo(i,Y0);x.lineTo(i,Y0+Hh);x.stroke()}for(let j=Y0;j<Y0+Hh;j+=u*6){x.beginPath();x.moveTo(0,j);x.lineTo(W,j);x.stroke()}}
 else{const c={dark:['#06070a','rgba(40,90,200,.28)'],green:['#062615','rgba(34,197,94,.35)'],violet:['#0f0820','rgba(124,58,237,.45)']}[kind]||['#06070a','rgba(40,90,200,.28)'];x.fillStyle=c[0];x.fillRect(0,Y0,W,Hh);const g=x.createRadialGradient(W/2,Y0+Hh*.35,0,W/2,Y0+Hh*.35,Hh*.75);g.addColorStop(0,c[1]);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,Y0,W,Hh)}
 x.restore()}
function cardImg(im,X,Y,w,h,o={}){x.save();x.translate(X,Y);if(o.rot)x.rotate(o.rot);if(o.s)x.scale(o.s,o.s);x.globalAlpha*=cl(o.a??1);if(o.blur)x.filter=`blur(${o.blur}px)`;x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=u*5;x.shadowOffsetY=u*1.5;x.fillStyle='#fff';rr(-w/2,-h/2,w,h,o.r??u*2.2);x.fill();x.shadowColor='transparent';rr(-w/2+(o.pad||0),-h/2+(o.pad||0),w-2*(o.pad||0),h-2*(o.pad||0),(o.r??u*2.2)-(o.pad||0)*.5);x.clip();if(im)cover(im,-w/2,-h/2,w,h,.4);if(o.dim){x.fillStyle=`rgba(0,0,0,${o.dim})`;x.fillRect(-w/2,-h/2,w,h)}x.restore()}
async function sceneStage(t,lt,sc){const kind=sc.bg||'blue',S=STAGE[kind]||STAGE.blue,d=sc.t1-sc.t0;let Y0=0,Hh=H;
 if(sc.split){const {f}=await faceAt(t,sc);Y0=0;Hh=H*sc.split;x.save();x.beginPath();x.rect(0,Hh,W,H-Hh);x.clip();const fh=H-Hh;cover(f,0,Hh,W,fh,sc.fy??.3);x.restore();x.save();x.translate(0,Hh);const g=x.createLinearGradient(0,fh*.5,0,fh);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.5)');x.fillStyle=g;x.fillRect(0,0,W,fh);x.restore()}
 const enterK=sc.split?eo(rp(lt,0,.35)):1;x.save();if(sc.split)x.translate(0,-(1-enterK)*Hh);stageBG(kind,lt,Y0,Hh);x.beginPath();x.rect(0,Y0,W,Hh);x.clip();
 const cy=v=>Y0+Hh*v,ims=await Promise.all((sc.cards||[]).map(c=>load(c.src||c)));const z=1+(sc.push??.04)*eo(rp(lt,0,d));x.translate(W/2,cy(.5));x.scale(z,z);x.translate(-W/2,-cy(.5));
 const L=sc.layout||'single',n=ims.length,cw=W*(sc.cw||.62),ch=cw*(sc.ratio||1.25);
 if(L=='single'&&n){const k=back(rp(lt,.1,.5));cardImg(ims[0],W*(sc.cx||.5),cy(sc.cyy||.52)+(1-eo(k))*u*8,cw,cw*(sc.ratio||.62),{s:.9+.1*k,a:k,blur:(1-cl(k))*14,pad:sc.pad?u:0})}
 if(L=='stack'&&n){for(let i=n-1;i>=0;i--){const k=back(rp(lt,.1+i*.08,.45+i*.08));cardImg(ims[i],W/2+i*u*2.4,cy(.46)-i*u*2.6+(1-eo(k))*u*10,cw*.8,cw*.8*(sc.ratio||.7),{rot:-.04+i*.03,s:1-i*.04,a:k,dim:i?.08*i:0})}}
 if(L=='row'&&n){const gap=u*2.5,w=(W*.9-gap*(n-1))/n;ims.forEach((im,i)=>{const k=back(rp(lt,.1+i*.12,.45+i*.12));cardImg(im,W*.05+w/2+i*(w+gap),cy(sc.cyy||.55)+(1-eo(k))*u*10,w,w*(sc.ratio||1.6),{a:k,s:.9+.1*k,blur:(1-cl(k))*10})})}
 if(L=='carousel'&&n){const every=sc.every||1.1,pos=lt/every,cxx=W/2;for(let j=-3;j<=3;j++){const idx=Math.floor(pos)+j,fr=pos-Math.floor(pos),sm=eo(cl(fr*2.2));const off=j-sm;const im=ims[((idx%n)+n)%n];const a=Math.abs(off);const w=W*.4*(1-.16*Math.min(a,2)),h=w*1.7;cardImg(im,cxx+off*W*.3,cy(.54),w,h,{s:1,dim:Math.min(.45,a*.25),a:1-cl(a-2.2),blur:a>1.2?3:0,r:u*2.6})}}
 if(L=='wall'&&n){const cols=sc.cols||4,tw=W/(cols-.6),th=tw*(sc.ratio||.62),rows=Math.ceil(H/th)+2;const drift=lt*u*(sc.speed||3);for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=r*cols+c,im=ims[i%n],at=.05+hash(i)*.7,k=back(rp(lt,at,at+.4));if(k<=0)continue;const px=(c+.2-(r%2)*.35)*tw,py=Y0+r*th*1.08-drift-th;cardImg(im,px,py,tw*.92,th*.9,{s:.7+.3*k,a:k,blur:(1-cl(k))*12,r:u*1.4})}
  if(sc.title||sc.big){x.save();const g=x.createRadialGradient(W/2,cy(.5),0,W/2,cy(.5),W*.7);g.addColorStop(0,kind=='paper'?'rgba(241,239,234,.92)':'rgba(25,80,190,.82)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,Y0,W,Hh);x.restore()}}
 x.restore();
 // textes du stage
 x.save();if(sc.split)x.translate(0,-(1-enterK)*Hh);
 if(sc.title)rich(sc.title,W/2,cy(sc.ty||(L=='wall'?.47:.17)),u*(sc.tsize||4.6),{lt,at:.1,col:S.ink,kcol:S.kcol,max:W*.86,sh:kind!='paper'});
 if(sc.big!=null){const at=sc.bigAt||.3;let s=sc.big;if(sc.count){const kc=eo(rp(lt,at,at+(sc.count.dur||1)));s=money(lerp(sc.count.from||0,sc.count.to||0,kc),sc.count)}const kb=back(rp(lt,at,at+.4));if(kb>0)word(String(s),W/2,cy(sc.by||(L=='wall'?.53:.5)),u*(sc.bsize||11),{w:800,f:SANS,col:S.ink,sc:.85+.15*kb,a:cl(kb),max:W*.9})}
 if(sc.sub)rich(sc.sub,W/2,cy(sc.sy||(L=='wall'?.59:.58)),u*(sc.ssize||3.3),{lt,at:(sc.bigAt||.3)+.3,col:S.sub,kcol:S.kcol,max:W*.86,sh:kind!='paper'});
 if(sc.step){const st=sc.step,L2=LK(sc);diamond(W*.14,cy(st.y||.12),u*5.4,L2.dia,st.n,back(rp(lt,0,.35)));rich(st.title||'',W*.21,cy(st.y||.12),u*3,{lt,at:.15,al:'left',col:S.ink,kcol:S.kcol})}
 if(sc.bullets){const bx=W*(sc.bx||.7),by=cy(sc.byy||.36);sc.bullets.forEach((b,i)=>{const at=(sc.bulletsAt||.6)+i*(sc.bstep||.5),k=eo(rp(lt,at,at+.3));if(k<=0)return;word('✦',bx,by+i*u*5.4,u*2.6,{w:700,f:SANS,col:S.ink,a:k});rich(b,bx+u*3.4,by+i*u*5.4,u*2.9,{lt,at:at+.05,al:'left',col:S.ink,kcol:S.kcol,max:W-bx-u*6})})}
 if(sc.foot)rich(sc.foot,W/2,cy(.93),u*1.9,{lt,at:.5,col:S.sub,kcol:S.kcol});
 await uiLayer(lt,sc);x.restore()}

/* ---------- POST : publication / témoignage incliné avec surlignage ---------- */
async function scenePost(t,lt,sc){stageBG(sc.bg||'paper',lt);const im=sc.avatar?await load(sc.avatar):null,d=sc.t1-sc.t0,k=eo(rp(lt,0,.5)),tilt=sc.tilt??.12;const w=W*.86,h=u*44;
 x.save();x.translate(W/2,H*.5);const z=.94+(sc.zoomTo||.32)*eo(rp(lt,.6,d));x.scale(z,z);x.transform(1,-tilt*eo(rp(lt,.5,1.4)),0,1,0,0);x.globalAlpha=k;if(k<1)x.filter=`blur(${(1-k)*14}px)`;
 white(-w/2,-h/2,w,h,u*3,1,{shadow:'rgba(0,0,0,.18)'});const L=-w/2+u*4;x.save();x.beginPath();x.arc(L+u*3.2,-h/2+u*6,u*3.2,0,7);x.clip();if(im)cover(im,L,-h/2+u*2.8,u*6.4,u*6.4,.3);else{x.fillStyle='#cbd5e1';x.fillRect(L,-h/2+u*2.8,u*6.4,u*6.4)}x.restore();
 txt(sc.name||'Awa D.',L+u*8,-h/2+u*4.8,u*2.4,{w:700});txt(sc.meta||'il y a 2 j · Général',L+u*8,-h/2+u*7.6,u*1.7,{w:500,col:'#94a3b8'});
 // titre avec surlignage animé du *montant*
 const ps=richParts(sc.title||'');let px=L,ty=-h/2+u*15;const fs=u*3.6;ps.forEach((p,i)=>{x.font=`800 ${fs}px ${SANS}`;const s=p.s+' ';const ww=x.measureText(s).width;if(px+ww>w/2-u*4){px=L;ty+=fs*1.3}if(p.k){const kh=eo(rp(lt,sc.hlAt||1,(sc.hlAt||1)+.4));x.fillStyle='rgba(34,197,94,.22)';rr(px-u*.6,ty-fs*.7,(ww-u*.6)*kh+u*1.2,fs*1.35,u*.8);x.fill();x.strokeStyle='rgba(34,197,94,.7)';x.lineWidth=u*.25;if(kh>0)x.stroke()}x.fillStyle=p.k?'#15803d':'#0f172a';x.textBaseline='middle';x.textAlign='left';x.fillText(p.s,px,ty);px+=ww});
 const body=sc.body||'';x.font=`500 ${u*2.3}px ${SANS}`;const wordsB=body.split(' ');let line='',by=ty+u*6;wordsB.forEach(wd=>{if(x.measureText(line+wd).width>w-u*8){txt(line,L,by,u*2.3,{w:500,col:'#475569'});line='';by+=u*3.4}line+=wd+' '});if(line)txt(line,L,by,u*2.3,{w:500,col:'#475569'});
 txt('🔥 '+(sc.likes||67)+'      💬 '+(sc.comments||24)+' commentaires',L,h/2-u*4,u*2,{w:500,col:'#64748b'});x.restore();
 if(sc.title2)rich(sc.title2,W/2,H*.16,u*3.2,{lt,at:.1,col:'#1a1a1a',kcol:'#2f5fb3'})}

/* ---------- TIMELINE : étapes sur une ligne verticale ---------- */
async function sceneTimeline(t,lt,sc){stageBG(sc.bg||'paper',lt);const S=STAGE[sc.bg||'paper'],steps=sc.steps||[],per=(sc.t1-sc.t0)/Math.max(1,steps.length),gap=H*.36,L2=LK(sc);const ims=await Promise.all(steps.map(s=>s.img?load(s.img):null));
 const act=Math.min(steps.length-1,lt/per),cam=lerp(Math.floor(act),Math.min(steps.length-1,Math.floor(act)+1),eo(cl((act%1-.75)/.25)))*gap;const X=W*.12;
 x.save();x.translate(0,H*.36-cam);x.strokeStyle=sc.bg=='paper'||!sc.bg?'rgba(30,64,175,.25)':'rgba(255,255,255,.3)';x.lineWidth=u*.3;x.beginPath();x.moveTo(X,-H);x.lineTo(X,gap*steps.length+H);x.stroke();
 steps.forEach((s,i)=>{const at=i*per,k=eo(rp(lt,at,at+.4)),past=i<Math.floor(act);const y=i*gap;x.save();x.globalAlpha=past?.35:1;if(past)x.filter='blur(2px)';diamond(X,y,u*6,L2.dia,i+1,back(rp(lt,at,at+.35)));
  if(s.date){x.fillStyle=L2.hi;rr(X+u*6,y-u*7.4,u*8,u*2.6,u*1.3);x.fill();txt(s.date,X+u*10,y-u*6.1,u*1.4,{w:700,col:'#fff',al:'center'})}
  rich(s.title||'',X+u*6,y,u*5,{lt,at:at+.1,al:'left',col:S.ink,kcol:S.kcol,w:700});if(s.sub)rich(s.sub,X+u*6,y+u*5.6,u*2.9,{lt,at:at+.3,al:'left',col:S.sub,kcol:S.kcol});
  if(ims[i]){const kk=back(rp(lt,at+.35,at+.75));cardImg(ims[i],X+u*6+W*.36,y+u*11+W*.36*(s.ratio||.5),W*.72,W*.72*(s.ratio||.5),{a:kk,s:.9+.1*kk,blur:(1-cl(kk))*10})}x.restore()});x.restore()}

/* ---------- ANNOT : image + traits d'annotation + barre de proportions ---------- */
async function sceneAnnot(t,lt,sc){stageBG(sc.bg||'paper',lt);const S=STAGE[sc.bg||'paper'],im=await load(sc.src),L2=LK(sc);const cw=W*(sc.cw||.8),ch=cw*(sc.ratio||.56),cx=W/2,cyy=H*(sc.cy||.45);
 if(sc.title)rich(sc.title,W/2,H*.2,u*(sc.tsize||5.4),{lt,at:.05,col:S.ink,kcol:S.kcol});const k=back(rp(lt,.15,.5));cardImg(im,cx,cyy,cw,ch,{a:k,s:.92+.08*k,blur:(1-cl(k))*10});
 if(sc.grid){const kg=eo(rp(lt,.6,1));x.save();x.globalAlpha=kg;x.setLineDash([u*.8,u*.8]);x.strokeStyle=L2.hi;x.lineWidth=u*.25;for(let i=1;i<3;i++){x.beginPath();x.moveTo(cx-cw/2+cw*i/3,cyy-ch/2);x.lineTo(cx-cw/2+cw*i/3,cyy+ch/2);x.stroke();x.beginPath();x.moveTo(cx-cw/2,cyy-ch/2+ch*i/3);x.lineTo(cx+cw/2,cyy-ch/2+ch*i/3);x.stroke()}x.restore()}
 (sc.labels||[]).forEach((l,i)=>{const at=(sc.labelsAt||.8)+i*(sc.lstep||.6),kl=eo(rp(lt,at,at+.45));if(kl<=0)return;const px=cx-cw/2+cw*l.px,py=cyy-ch/2+ch*l.py,lx=W*l.lx,ly=H*l.ly;x.save();x.strokeStyle=L2.hi;x.lineWidth=u*.3;x.beginPath();x.moveTo(px,py);x.lineTo(lerp(px,lx,kl),lerp(py,ly,kl));x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(px,py,u*.9,0,7);x.fill();x.stroke();x.restore();
  const kt=eo(rp(lt,at+.3,at+.6));word(l.text||'',lx,ly-u*1.6,u*4.4,{w:800,f:SANS,col:S.ink,a:kt});if(l.sub)word(l.sub,lx,ly+u*2.4,u*2.2,{w:500,f:SANS,col:S.sub,a:kt})});
 if(sc.bar){const tot=sc.bar.reduce((a,b)=>a+b.v,0),bw=W*.7,bh=u*4.4,bx=W*.15,by=H*(sc.barY||.8);let px=bx;sc.bar.forEach((b,i)=>{const at=(sc.barAt||1)+i*.5,kb=eo(rp(lt,at,at+.4));const ww=bw*b.v/tot;x.save();x.fillStyle=b.col||['#1e3a5f','#9cc0e8','#2563eb'][i%3];rr(px+u*.4,by,Math.max(u*3,(ww-u*.8)*(.15+.85*kb)),bh,u*1.2);x.fill();x.restore();if(kb>.5)txt(b.label||b.v+' %',px+ww/2,by+bh/2,u*1.7,{w:700,col:'#fff',al:'center',a:kb});px+=ww})}}

/* ---------- PROFILE : fiche de profil réseau social construite pas à pas ---------- */
async function sceneProfile(t,lt,sc){stageBG(sc.bg||'blue',lt);const S=STAGE[sc.bg||'blue'],av=sc.avatar?await load(sc.avatar):null,grid=await Promise.all((sc.grid||[]).map(load));const w=W*.82,X=W/2,top=H*.24,k=back(rp(lt,.05,.45));
 if(sc.title)rich(sc.title,W/2,H*.15,u*3.4,{lt,at:0,col:S.ink,kcol:S.kcol,sh:sc.bg!='paper'});
 x.save();x.translate(X,top+(1-eo(k))*u*10);x.globalAlpha=cl(k);const ch=u*30+(grid.length?w*.66:0);white(-w/2,0,w,ch,u*3,1);
 txt(sc.handle||'mon.compte',0,u*3.6,u*2,{w:700,al:'center'});x.save();x.beginPath();x.arc(-w/2+u*9,u*11,u*5,0,7);x.clip();if(av)cover(av,-w/2+u*4,u*6,u*10,u*10,.3);else{x.fillStyle=LK(sc).acc;x.fill()}x.restore();
 [['posts',sc.posts||'79'],['abonnés',sc.followers||'40 k'],['abonnements',sc.following||'801']].forEach(([l,v],i)=>{const px=-w/2+u*24+i*u*15;txt(v,px,u*9.6,u*2.6,{w:700,al:'center'});txt(l,px,u*12.6,u*1.5,{w:500,col:'#666',al:'center'})});
 txt(sc.name||'',-w/2+u*4,u*19,u*2.2,{w:700});(sc.bio||[]).forEach((b,i)=>{const at=(sc.bioAt||.6)+i*(sc.bioStep||.55),T=b,n=Math.floor(cl((lt-at)*28,0,T.length));if(n>0)txt(T.slice(0,n),-w/2+u*4,u*22.4+i*u*2.9,u*1.9,{w:500,col:'#222',max:w-u*8})});
 if(grid.length){const gw=w/3,gy=u*30;grid.slice(0,9).forEach((im,i)=>{const kk=eo(rp(lt,.3+i*.05,.6+i*.05));x.save();x.globalAlpha=kk;cover(im,-w/2+(i%3)*gw+1,gy+Math.floor(i/3)*gw*.66+1,gw-2,gw*.66-2,.4);x.restore()})}x.restore()}

/* ---------- branchement ---------- */
window._uiLayer=uiLayer;window._hideBand=hideBand;window._rich=rich;
Object.assign(RUN,{short:sceneShort,stage:sceneStage,post:scenePost,timeline:sceneTimeline,annot:sceneAnnot,profile:sceneProfile});
const _seek=window.seek;window.seek=async function(t){const sc=C.scenes.find(s=>t>=s.t0&&t<s.t1)||C.scenes.at(-1),lt=t-sc.t0,d=sc.t1-sc.t0;await _seek(t);
 const bIn=sc.fx=='blur'?1-eo(rp(lt,0,.3)):0,bOut=sc.out=='blur'?rp(lt,d-.22,d):0,b=Math.max(bIn,bOut);if(b>0.01){if(!window._BC){_BC=document.createElement('canvas');_BC.width=W;_BC.height=H}const q=_BC.getContext('2d');q.clearRect(0,0,W,H);q.drawImage(x.canvas,0,0);x.save();x.clearRect(0,0,W,H);x.filter=`blur(${b*26}px)`;const s=1+b*.06;x.translate(W/2,H/2);x.scale(s,s);x.translate(-W/2,-H/2);x.drawImage(_BC,0,0);x.restore()}};
})();
