#!/usr/bin/env python3
"""Guide des références avec aperçus.

Rend chaque option A/B/C de chaque scène en image fixe, avec le vrai contenu
(texte, photos, couleurs), puis fabrique :
  - <out>/guide.html : page autonome (images incluses), choix par scène,
    bouton « Copier mes choix » qui donne « 1.1 : A, 1.2 : C, … » ;
  - <out>/planche_<groupe>.jpg : une planche par séquence (lignes = scènes,
    colonnes = options A/B/C), à insérer dans un document ;
  - <out>/scene_<id>.jpg : une image par scène.

Usage :
  python3 guide.py guide.json --out apercus [--chrome /chemin/chrome]

guide.json :
{
  "title": "Vidéo lait Hydra-Glow",
  "base": { ...réglages globaux d'un config.json : width, height, palette, brand, special, look, theme, source, words... },
  "dur": 2.5,
  "scenes": [
    {"id": "1.1", "vo": "Peau sèche et terne ?",
     "options": [
       {"code": "P16", "label": "Photo plein écran + question", "at": 1.6,
        "scene": {"type": "photo", "src": "img/visage.jpg", "title": "Peau sèche et *terne* ?"}},
       {"code": "P8",  "label": "Texte plein écran", "scene": {"type": "ptext", "lines": [...]}},
       {"code": "SS · ai-chat", "label": "Interface Stageshow"}          # sans "scene" : vignette du look book
     ]}
  ]
}
Une option sans "scene" (Stageshow, look 3D…) prend la vignette du code dans references/vignettes/.
"""
import argparse, base64, html, io, json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
VIG = os.path.join(HERE, '..', 'references', 'vignettes')
FONTS = os.path.join(HERE, 'fonts')
LETTERS = 'ABCDEF'


def norm(code):
    c = (code or '').strip().upper().replace(' ', '')
    if c.startswith('SS'):
        return 'SS'
    m = re.match(r'^([LPAB])0*(\d+)', c)
    return f'{m.group(1)}{m.group(2)}' if m else c


def vignette(code, size):
    p = os.path.join(VIG, norm(code) + '.jpg')
    if os.path.exists(p):
        return Image.open(p).convert('RGB')
    im = Image.new('RGB', size, '#222')
    ImageDraw.Draw(im).text((20, size[1] // 2), code, fill='#fff')
    return im


def fit(im, w, h, bg='#111'):
    """Place l'image dans un cadre w×h sans la déformer."""
    r = min(w / im.width, h / im.height)
    t = im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)
    out = Image.new('RGB', (w, h), bg)
    out.paste(t, ((w - t.width) // 2, (h - t.height) // 2))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('guide')
    ap.add_argument('--out', default='apercus')
    ap.add_argument('--chrome')
    a = ap.parse_args()
    G = json.load(open(a.guide))
    os.makedirs(a.out, exist_ok=True)
    base = dict(G.get('base', {}))
    W, H = base.get('width', 1080), base.get('height', 1920)
    D = float(G.get('dur', 2.5))

    # 1. une scène par option à rendre, bout à bout
    scenes, stills, slots = [], [], {}
    t = 0.0
    for s in G['scenes']:
        for j, o in enumerate(s['options']):
            if not o.get('scene'):
                continue
            sc = dict(o['scene'])
            sc['t0'], sc['t1'] = round(t, 3), round(t + D, 3)
            sc.setdefault('captions', False)
            if 'srcAt' in o:  # moment de la vidéo source à montrer (face caméra)
                sc['srcOffset'] = round(o['srcAt'] - t, 3)
            scenes.append(sc)
            ts = round(t + float(o.get('at', min(1.6, D * 0.7))), 2)
            stills.append(ts)
            slots[(s['id'], j)] = ts
            t += D
    rendered = {}
    if scenes:
        cfg = dict(base, scenes=scenes, duration=round(t, 3))
        cfg_path = os.path.join(a.out, '_apercus.json')
        json.dump(cfg, open(cfg_path, 'w'), ensure_ascii=False)
        cmd = ['node', os.path.join(HERE, 'render.mjs'), '--config', cfg_path,
               '--stills', ','.join(str(x) for x in stills), '--out', os.path.join(a.out, '_st')]
        if a.chrome:
            cmd += ['--chrome', a.chrome]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode:
            sys.exit(r.stderr[-2000:])
        for k, ts in slots.items():
            rendered[k] = os.path.join(a.out, f'_st_{ts}.jpg')

    # 2. une image par scène (options côte à côte)
    vertical = H > W
    pw, ph = (300, 533) if vertical else (480, 270)
    head = 64
    fb = ImageFont.truetype(os.path.join(FONTS, 'Poppins-Bold.ttf'), 28)
    fm = ImageFont.truetype(os.path.join(FONTS, 'Poppins-Medium.ttf'), 18)

    def row_image(s):
        n = len(s['options'])
        img = Image.new('RGB', (n * pw + (n + 1) * 12, ph + head + 24), '#111')
        d = ImageDraw.Draw(img)
        for j, o in enumerate(s['options']):
            x = 12 + j * (pw + 12)
            src = rendered.get((s['id'], j))
            im = Image.open(src).convert('RGB') if src and os.path.exists(src) else vignette(o.get('code'), (pw, ph))
            img.paste(fit(im, pw, ph), (x, head + 12))
            d.text((x, 6), f"{LETTERS[j]} · {o.get('code', '')}", font=fb, fill='#FFD400')
            lab = o.get('label', '')
            while lab and fm.getlength(lab) > pw:
                lab = lab[:-2] + '…' if not lab.endswith('…') else lab[:-2] + '…'
            d.text((x, 40), lab, font=fm, fill='#fff')
            if not src:
                d.text((x + 8, head + ph - 16), 'exemple du look book' if not str(o.get('code','')).upper().startswith('SS') else 'exemple Stageshow (générique)', font=fm, fill='#bbb')
        return img

    rows = {}
    for s in G['scenes']:
        im = row_image(s)
        rows[s['id']] = im
        im.save(os.path.join(a.out, f"scene_{s['id']}.jpg"), quality=82)

    # 3. une planche par séquence (préfixe de l'id avant le point)
    groups = {}
    for s in G['scenes']:
        groups.setdefault(str(s['id']).split('.')[0], []).append(s)
    for g, ss in groups.items():
        lab_w = 90
        ims = [rows[s['id']] for s in ss]
        sheet = Image.new('RGB', (max(i.width for i in ims) + lab_w, sum(i.height for i in ims) + 8 * len(ims)), '#111')
        d = ImageDraw.Draw(sheet)
        y = 0
        for s, im in zip(ss, ims):
            d.text((10, y + im.height // 2 - 16), str(s['id']), font=fb, fill='#fff')
            sheet.paste(im, (lab_w, y))
            y += im.height + 8
        sheet.save(os.path.join(a.out, f'planche_{g}.jpg'), quality=80)

    # 4. page HTML autonome
    def b64(im):
        buf = io.BytesIO()
        im.save(buf, 'JPEG', quality=78)
        return base64.b64encode(buf.getvalue()).decode()

    parts = []
    for s in G['scenes']:
        opts = ''.join(
            f'<label><input type="radio" name="s{html.escape(str(s["id"]))}" value="{LETTERS[j]}"{" checked" if j == 0 else ""}> '
            f'<b>{LETTERS[j]}</b> {html.escape(o.get("code", ""))} — {html.escape(o.get("label", ""))}</label>'
            for j, o in enumerate(s['options']))
        parts.append(
            f'<section><h2>Scène {html.escape(str(s["id"]))}</h2>'
            f'<p class="vo">{html.escape(s.get("vo", ""))}</p>'
            f'<img src="data:image/jpeg;base64,{b64(rows[s["id"]])}" alt="Options de la scène {html.escape(str(s["id"]))}">'
            f'<div class="opts">{opts}</div></section>')
    page = f'''<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(G.get("title", "Guide des références"))}</title>
<style>body{{margin:0;font-family:system-ui,sans-serif;background:#0d0d0f;color:#eee}}main{{max-width:980px;margin:auto;padding:16px}}
h1{{font-size:22px}}h2{{font-size:17px;margin:0 0 4px}}section{{background:#17171b;border-radius:14px;padding:14px;margin:14px 0}}
.vo{{color:#bbb;font-size:14px;margin:0 0 10px}}img{{width:100%;border-radius:8px}}.opts{{display:flex;flex-direction:column;gap:6px;margin-top:10px;font-size:15px}}
button{{position:sticky;bottom:12px;width:100%;padding:14px;border:0;border-radius:12px;background:#FF6B5B;color:#fff;font-size:16px;font-weight:700}}
#out{{white-space:pre-wrap;background:#222;padding:10px;border-radius:8px;display:none}}</style></head><body><main>
<h1>{html.escape(G.get("title", "Guide des références"))}</h1>
<p>Pour chaque scène, regarde les aperçus et choisis A, B ou C. Puis appuie sur le bouton et colle le résultat dans la conversation.</p>
{''.join(parts)}
<div id="out"></div><button onclick="copier()">Copier mes choix</button></main>
<script>function copier(){{const r=[...document.querySelectorAll('input:checked')].map(i=>i.name.slice(1)+' : '+i.value).join(', ');
const o=document.getElementById('out');o.style.display='block';o.textContent=r;try{{navigator.clipboard.writeText(r)}}catch(e){{}}}}</script>
</body></html>'''
    open(os.path.join(a.out, 'guide.html'), 'w').write(page)
    print('Guide :', os.path.join(a.out, 'guide.html'))
    print('Planches :', ', '.join(f'planche_{g}.jpg' for g in groups))


if __name__ == '__main__':
    main()
