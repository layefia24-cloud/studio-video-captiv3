#!/usr/bin/env node
// Render a face-cam motion design video from a JSON config.
// Usage (run from your project folder):
//   node <skill>/scripts/render.mjs --config config.json --out sortie.mp4 [--audio voix.wav]
//   node <skill>/scripts/render.mjs --config config.json --stills 0.5,2,4.2 --out apercu   (images de contrôle)
// Needs: Node 18+, `npm i puppeteer-core` (in this scripts folder or your project), ffmpeg, Chrome/Chromium.
import http from 'http'; import fs from 'fs'; import path from 'path'; import {spawn} from 'child_process'; import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));
const A=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,arr)=>{if(v.startsWith('--'))a.push([v.slice(2),arr[i+1]&&!arr[i+1].startsWith('--')?arr[i+1]:true]);return a},[]));
const cfgPath=A.config||'config.json', out=A.out||'sortie.mp4', root=process.cwd();
let puppeteer;try{puppeteer=(await import('puppeteer-core')).default}catch{try{puppeteer=(await import(path.join(here,'node_modules','puppeteer-core','lib','esm','puppeteer','puppeteer-core.js'))).default}catch{console.error('Installe puppeteer-core :  npm i puppeteer-core');process.exit(1)}}
const CANDS=[A.chrome,process.env.CHROME_PATH,'/usr/bin/google-chrome','/usr/bin/chromium','/usr/bin/chromium-browser','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean);
function findChrome(){for(const root of ['/opt/pw-browsers',(process.env.HOME||'')+'/.cache/ms-playwright',(process.env.HOME||'')+'/.cache/puppeteer']){try{const st=[root];while(st.length){const d=st.pop();for(const e of fs.readdirSync(d,{withFileTypes:true})){const q=d+'/'+e.name;if(e.isDirectory())st.push(q);else if(['chrome','chrome-headless-shell','headless_shell'].includes(e.name))return q}}}catch{}}}
const chrome=CANDS.find(p=>{try{return fs.existsSync(p)}catch{return false}})||findChrome();if(!chrome){console.error('Chrome introuvable : passe --chrome /chemin/vers/chrome ou CHROME_PATH');process.exit(1)}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ttf':'font/ttf','.otf':'font/otf'};
const srv=http.createServer((q,s)=>{let u=decodeURIComponent(q.url.split('?')[0]);const f=u.startsWith('/__engine/')?path.join(here,u.slice(10)):path.join(root,u);try{const b=fs.readFileSync(f);s.writeHead(200,{'content-type':types[path.extname(f).toLowerCase()]||'application/octet-stream'});s.end(b)}catch{s.writeHead(404);s.end()}}).listen(0);
const port=srv.address().port;
const b=await puppeteer.launch({executablePath:chrome,args:['--no-sandbox','--disable-gpu','--force-device-scale-factor=1']});
const p=await b.newPage();p.on('pageerror',e=>console.log('ERREUR page:',e.message));
const cfg=JSON.parse(fs.readFileSync(cfgPath,'utf8'));await p.setViewport({width:cfg.width||1080,height:cfg.height||1920});
await p.goto(`http://localhost:${port}/__engine/engine.html?config=/${cfgPath}`,{timeout:120000});await p.waitForFunction('window.READY',{timeout:120000});
const grab=async t=>{const d=await p.evaluate(async t=>{await window.seek(t);return document.getElementById('c').toDataURL('image/jpeg',.92)},t);return Buffer.from(d.split(',')[1],'base64')};
if(A.stills){for(const t of String(A.stills).split(','))fs.writeFileSync(`${out}_${t}.jpg`,await grab(+t));console.log('Images écrites :',out+'_*.jpg')}
else{const D=await p.evaluate('window.DUR'),fps=cfg.fps||30,N=Math.round(D*fps);
 const args=['-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-i','-'];if(A.audio)args.push('-i',A.audio);
 args.push('-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p');if(A.audio)args.push('-map','0:v','-map','1:a','-af','apad','-c:a','aac','-b:a','192k');args.push('-t',String(D));args.push('-movflags','+faststart',out);
 const ff=spawn('ffmpeg',args,{stdio:['pipe','inherit','inherit']});let dead=false;const closed=new Promise(r=>ff.on('close',()=>{dead=true;r()}));ff.stdin.on('error',()=>{dead=true});
 for(let i=0;i<N&&!dead;i++){const buf=await grab(i/fps);if(!ff.stdin.write(buf))await Promise.race([new Promise(r=>ff.stdin.once('drain',r)),closed]);if(i%60==0)process.stdout.write(`\r${Math.round(i/N*100)} %`)}
 if(!dead)ff.stdin.end();await closed;console.log(`\nVidéo écrite : ${out} (${D.toFixed(1)} s)`)}
await b.close();srv.close();process.exit(0);
