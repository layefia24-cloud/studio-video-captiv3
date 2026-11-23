# Exemple réel : remake d'une vidéo d'inspiration (femme, NAN) sur la vidéo brute d'un homme. Voir references/remake.md.
# Usage : python3 exemple-remake.py [work/words.json]  (depuis le dossier du projet, avec img/ et work/)
"""Construit config.json (scène remake) en calant chaque calque sur les mots de work/words.json.
Correspondance avec la référence (femme) établie avec reanimate : voir spec.md."""
import json, re, sys, unicodedata

W = json.load(open(sys.argv[1] if len(sys.argv)>1 else 'work/words.json'))
norm = lambda s: ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn')
toks = [re.sub(r"[^a-z0-9_']", '', norm(w[0])) for w in W]
_pos = 0
def at(word, after=None):
    """temps de début du prochain mot qui commence par `word` (dans l'ordre du discours)."""
    global _pos
    word = norm(word)
    for i in range(_pos, len(W)):
        if toks[i].startswith(word):
            _pos = i + 1
            return round(W[i][1], 2)
    sys.exit(f'mot introuvable : {word} (après {_pos})')
def at_any(*words):
    global _pos
    for i in range(_pos, len(W)):
        if any(toks[i].startswith(norm(w)) for w in words):
            _pos = i + 1; return round(W[i][1], 2)
    sys.exit('mots introuvables : ' + ' / '.join(words))
def end_of(word):
    word = norm(word)
    for i in range(len(W)):
        if toks[i].startswith(word): return round(W[i][2], 2)
    sys.exit('mot introuvable : ' + word)

L = []
def T(text, t0, t1, style='thin', y=None, x=.5, **k):
    d = dict(kind='text', text=text, at=t0, out=t1, style=style, x=x)
    if y is not None: d['y'] = y
    d.update(k); L.append(d)

THIN_Y, BOLD_Y = .565, .615   # petite ligne fine au-dessus, mot fort en dessous (réf. : .52 / .58, décalé de la tête)
END = 15.97

# 1. « Ces vidéos, je les fais toutes depuis mon téléphone. »  (réf. 0–2,9 s : ? + why NAN, PIP + in house production team)
t_ces = at('ces'); t_vid = at('videos'); t_je = at('je'); t_fais = at('fais'); t_toutes = at('toutes')
t_depuis = at('depuis'); t_mon = at('mon'); t_tel = at('telephone')
L.append(dict(kind='qmarks', at=0, out=t_toutes - .02, items=[[.18,.35,.055,-.25],[.33,.25,.085,-.12],[.52,.165,.105,.05],[.7,.25,.075,.15],[.84,.35,.06,.22],[.62,.37,.042,.3]]))
T('Ces', t_ces, t_je, 'thin', THIN_Y, x=.4)
T('VIDÉOS', t_vid, t_toutes - .02, 'orange', BOLD_Y, size=9.4)
T('je les fais', t_je, t_toutes - .02, 'thin', THIN_Y, x=.62)
T('toutes', t_toutes, t_depuis, 'thin', THIN_Y, size=6.2)
T('depuis mon', t_depuis, END_1 := round(t_tel + 1.0, 2), 'thin', THIN_Y)
T('téléphone', t_tel, END_1, 'glow', BOLD_Y, size=8.2)
T('100 % mobile', round(t_tel + .3, 2), END_1, 'purple', BOLD_Y + .045)
L.append(dict(kind='pip', at=round(t_toutes - .05, 2), out=END_1, swaps=[t_tel, round(t_tel + .45, 2)], imgs=['img/femme_tel.jpg', 'img/boutique_tel.jpg', 'img/livraison.jpg'], y=.125, h=.15, w=.64, z='back'))

# 2. « Ouvre mon dossier, il y en a des dizaines. »  (réf. 3–5,5 s : arc de drapeaux + international, affiliations + molécule)
t_ouvre = at('ouvre'); t_mon2 = at('mon'); t_dossier = at('dossier'); t_il = at('il'); t_diz = at('dizaines')
t_chaque = at('chaque')
T('Ouvre mon', t_ouvre, t_dossier, 'thin', BOLD_Y - .01)
T('dossier', t_dossier, t_il, 'glow', BOLD_Y, size=8.4)
T('il y en a', t_il, t_diz, 'thin', BOLD_Y - .01)
T('des dizaines', t_diz, t_chaque - .02, 'bold', BOLD_Y, size=7.6)
L.append(dict(kind='ring', at=t_dossier - .05, out=t_chaque - .02, imgs=['img/lait.jpg','img/karite.jpg','img/pompe.jpg','img/boutique_tel.jpg','img/femme_tel.jpg','img/livraison.jpg','img/cosmetiques.jpg','img/boutique.jpg','img/abidjan.jpg'], n=22, cx=.5, cy=.34, r=.37, size=6.6, z='back'))
L.append(dict(kind='nodes', at=t_diz, out=t_chaque - .02, x=.78, y=.6, s=.1))

# 3. « Chaque semaine, j'en imprime de nouvelles. »  (réf. 5,6–7,9 s : part / of / the, puis largest relocation en haut, derrière la tête)
t_sem = at('semaine'); t_jen = at("j'en") if "j'en" in toks else at('j'); t_imp = at('imprime'); t_de = at('de'); t_nouv = at('nouvelles')
t_cest = at("c'est") if "c'est" in toks else at('c')
T('Chaque', t_chaque, t_sem, 'thin', BOLD_Y - .01)
T('semaine', t_sem, t_imp, 'thin', BOLD_Y - .01, size=6)
T('imprime', t_imp, round(t_cest + 1.0, 2), 'ice', .2, x=.36, size=10, z='back')
T('de nouvelles', t_nouv - .05, round(t_cest + 1.0, 2), 'thin', .238, x=.6, al='left', size=6.4, z='back')

# 4. « C'est une vraie usine à contenu. »  (réf. 7,4–9,9 s : network métal + in the world)
t_une = at('une'); t_vraie = at('vraie'); t_usine = at('usine'); t_a = at('a'); t_contenu = at('contenu')
t_et = at('et')
T("C'est une vraie", t_cest, t_usine, 'thin', BOLD_Y - .01)
T('usine', t_usine, t_et - .02, 'metal', BOLD_Y, size=10.6)
T('à contenu', t_a, t_et - .02, 'thin', BOLD_Y + .045)

# 5. « Et non, je ne m'appelle pas final, underscore, final. »  (réf. 8–9,8 s : 3 chiffres en haut, derrière la tête)
t_non = at('non'); t_je3 = at('je'); t_pas = at('pas'); t_final = at('final')
t_le = at('le')
T('Et non,', t_et, t_je3, 'thin', BOLD_Y - .01, size=6)
T("je ne m'appelle pas", t_je3, t_final, 'thin', BOLD_Y - .01)
T('final_final', t_final, round(t_le - .45, 2), 'metal', BOLD_Y, size=9.6)
L.append(dict(kind='stats', at=round(t_et - .05, 2), out=t_le - .02, size=3.3, items=[['final.mp4', .3, .185, 0], ['final_v2.mp4', .7, .185, .2], ['final_final_OK.mp4', .5, .14, .4]], z='back'))

# 6. « Le secret ? Un studio dans Claude. »  (réf. 10–13,6 s : carrousel de photos + house / team, puis hologramme + an agent)
t_secret = at('secret'); t_un = at('un'); t_studio = at('studio'); t_dans = at_any('dans', "d'en", 'den'); t_claude = at('claude')
t_ecris = at('ecris')
T('Le', t_le, t_secret, 'thin', BOLD_Y - .01)
T('secret', t_secret, t_un - .02, 'glow', BOLD_Y, size=8.6)
T('Un', t_un, t_studio, 'thin', BOLD_Y - .01)
T('studio', t_studio, t_dans, 'glow', BOLD_Y, size=8.6)
L.append(dict(kind='carousel', at=round(t_le - .5, 2), out=t_dans - .02, imgs=['img/cosmetiques.jpg','img/lait.jpg','img/boutique.jpg','img/karite.jpg','img/livraison.jpg','img/pompe.jpg'], cy=.12, r=.3, w=.26, h=.15, z='back'))
T('dans', t_dans, t_ecris - .02, 'thin', THIN_Y)
T('Claude', t_claude, t_ecris - .02, 'duo', BOLD_Y, size=9)
L.append(dict(kind='holo', at=t_dans, out=t_ecris - .02, y=.13, s=.16, icon='bulle', z='back'))
L.append(dict(kind='flare', at=round(t_claude + .35, 2), out=round(t_ecris + .25, 2), y=.3, z='back'))

# 7. « Écris studio en commentaire et je t'envoie tout. »  (réf. 13,8–16,7 s : business / your, compteur + vague, year / the first)
t_studio2 = at('studio'); t_en = at('en'); t_comm = at('commentaire'); t_et2 = at('et'); t_je4 = at('je'); t_env = at("t'envoie") if "t'envoie" in toks else at('t'); t_tout = at('tout')
T('Écris', t_ecris, t_studio2, 'thin', BOLD_Y - .01)
T('STUDIO', t_studio2, t_et2 - .02, 'big', .17, size=13, z='back')
T('en', t_en, t_comm, 'thin', THIN_Y)
T('commentaire', t_comm, t_et2 - .02, 'duo', BOLD_Y, size=8.4)
L.append(dict(kind='counter', at=t_et2 - .02, out=t_tout - .02, from_=0, to=100, y=.16, size=13, z='back'))
L.append(dict(kind='wave', at=t_et2 - .02, out=t_tout - .02, y=.33, z='back'))
T('et je', t_et2, t_env, 'thin', BOLD_Y - .01)
T("je t'envoie", t_env, END, 'thin', THIN_Y)
T('TOUT', t_tout, END, 'big', .17, size=15, z='back')
T('tout.', t_tout, END, 'duo', BOLD_Y, size=9)
for d in L:
    if 'from_' in d: d['from'] = d.pop('from_')

cfg = dict(width=720, height=1280, fps=30, duration=END,
           brand=dict(name='STUDIO CAPTIV', font='Poppins'),
           source=dict(frames='work/frames', masks='work/masks', fps=30, count=479),
           captions=dict(on=False),
           scenes=[dict(t0=0, t1=END, type='remake', fy=.45, zoomY=.33,
                        zoom=[[0, 1.0], [t_ouvre, 1.07], [t_chaque, 1.0], [t_cest, 1.12], [t_et, 1.0], [t_le, 1.1], [t_ecris, 1.0]],
                        textScale=1.25, grade=dict(warm=.55, bottom=.92, **{'from': .6}),
                        logo=dict(text='STUDIO', sub='C A P T I V', y=.865, size=6.4),
                        layers=L)])
json.dump(cfg, open('config.json', 'w'), ensure_ascii=False, indent=1)
print(len(L), 'calques ; mots :', ' '.join(w[0] for w in W))
