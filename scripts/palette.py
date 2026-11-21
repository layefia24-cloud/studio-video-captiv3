#!/usr/bin/env python3
"""Tire les couleurs de marque d'un logo, d'une photo produit ou d'une image de la vidéo.

Usage :
  python3 palette.py logo.png [autre_image.jpg …]
Affiche le bloc à coller dans config.json :
  "ed": {"primary": "#…", "secondary": "#…"}
puis l'aperçu des teintes dérivées. Si l'utilisateur donne ses couleurs (codes hex), utilise-les
directement à la place : elles priment toujours sur l'extraction.
"""
import colorsys, json, sys
from PIL import Image


def colors(path, n=8):
    im = Image.open(path).convert('RGBA')
    im.thumbnail((200, 200))
    data = im.get_flattened_data() if hasattr(im, 'get_flattened_data') else im.getdata()
    px = [(r, g, b) for r, g, b, a in data if a > 200]
    if not px:
        return []
    q = Image.new('RGB', (len(px), 1))
    q.putdata(px)
    q = q.quantize(colors=n, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()
    out = []
    for count, idx in sorted(q.getcolors(), reverse=True):
        r, g, b = pal[idx * 3: idx * 3 + 3]
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        out.append({'hex': '#%02X%02X%02X' % (r, g, b), 'share': count / len(px), 'l': l, 's': s})
    return out


def pick(paths):
    allc = []
    for p in paths:
        allc += colors(p)
    # écarte les quasi-blancs, quasi-noirs et gris : ce sont des fonds, pas la marque
    brand = [c for c in allc if 0.1 < c['l'] < 0.8 and c['s'] > 0.25 and c['share'] > 0.01]
    brand.sort(key=lambda c: (c['share'] ** 0.5) * c['s'] * (1 - abs(c['l'] - 0.45)), reverse=True)
    if not brand:
        return None, None
    primary = brand[0]['hex']
    h0 = colorsys.rgb_to_hls(*[int(primary[i:i + 2], 16) / 255 for i in (1, 3, 5)])[0]
    second = next((c['hex'] for c in brand[1:]
                   if min(abs(colorsys.rgb_to_hls(*[int(c['hex'][i:i + 2], 16) / 255 for i in (1, 3, 5)])[0] - h0),
                          1 - abs(colorsys.rgb_to_hls(*[int(c['hex'][i:i + 2], 16) / 255 for i in (1, 3, 5)])[0] - h0)) > 0.06 or abs(c['l'] - brand[0]['l']) > 0.3), None)
    return primary, second


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    p, s = pick(sys.argv[1:])
    if not p:
        sys.exit('Aucune couleur de marque nette trouvée : demande ses couleurs à l\'utilisateur.')
    block = {'primary': p}
    if s:
        block['secondary'] = s
    print(json.dumps({'ed': block}, ensure_ascii=False))
