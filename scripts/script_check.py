#!/usr/bin/env python3
"""Vérifie un script AVANT de le proposer : 3 hooks, rétention, fin qui fait commenter, honnêteté.

  python3 script_check.py script.txt [--duree 30]

Format conseillé (une balise par ligne, le texte dit en dessous) :
  [HOOK A] / [HOOK B] / [HOOK C]   la phrase dite de chaque variante
  [ECRAN A] / [ECRAN B] / [ECRAN C] le texte à l'écran (3 à 6 mots)
  [LOCKIN]  [CORPS]  [FIN]
Sans balises, tout le texte est lu comme un seul script (la 1re phrase = le hook).
Méthode : references/script-captivant.md
"""
import argparse, re, statistics, sys
ap = argparse.ArgumentParser(); ap.add_argument('script'); ap.add_argument('--duree', type=float, help='durée visée en secondes')
ap.add_argument('--debit', type=float, default=2.7, help='mots par seconde de la voix (2,7 pour une voix IA rapide)')
a = ap.parse_args()
raw = open(a.script, encoding='utf-8').read()
sec, cur = {}, 'CORPS'
for line in raw.splitlines():
    m = re.match(r'\s*\[([A-ZÉ]+(?: [A-C])?)\]\s*(.*)', line, re.I)
    if m: cur = m[1].upper().replace('É', 'E'); line = m[2]
    if line.strip(): sec[cur] = (sec.get(cur, '') + ' ' + line.strip()).strip()
res = []
def ok(c, t, warn=False):
    res.append(c or warn); print(('✓ ' if c else ('· ' if warn else '✗ ')) + t)
phr = lambda t: [p.strip() for p in re.split(r'(?<=[.!?…])\s+', t) if p.strip()]
mots = lambda t: re.findall(r"[\wÀ-ÿ'’-]+", t)
low = raw.lower()

hooks = {k: v for k, v in sec.items() if k.startswith('HOOK')}
if not hooks:
    allp = phr(' '.join(sec.values())); hooks = {'HOOK': allp[0] if allp else ''}
else:
    ok(len(hooks) >= 3, f"{len(hooks)} variantes de hook (3 attendues, chacune d'un framework différent)")
VAGUE = ['tu ne devineras jamais', 'vous ne croirez pas', 'incroyable mais vrai', 'dans cette vidéo', 'aujourd\'hui je vais', 'salut tout le monde', 'bonjour à tous']
for k, h in sorted(hooks.items()):
    p = phr(h); n = len(mots(p[0])) if p else 0; hl = h.lower()
    ok(0 < n <= 12, f"{k} : 1re phrase de {n} mots (12 max, phrases courtes)")
    ok(not any(v in hl for v in VAGUE), f"{k} : pas d'ouverture vague ou d'intro")
    tension = re.search(r"\b(mais|pourtant|sauf que|cependant|or|alors que|même)\b|\?|\d", hl)
    ok(bool(tension), f"{k} : tension (mot de contraste, question ou chiffre) pour ouvrir la boucle", warn=True)
    e = sec.get('ECRAN ' + k[-1]) if k != 'HOOK' else None
    if e is not None: n2 = len(mots(e)); ok(3 <= n2 <= 6, f"ECRAN {k[-1]} : {n2} mots à l'écran (3 à 6)")

body = ' '.join(v for k, v in sec.items() if not k.startswith(('HOOK', 'ECRAN')))
bl = body.lower(); bp = phr(body); W = len(mots(body)) + (len(mots(sorted(hooks.items())[0][1])) if hooks else 0)
dur = W / a.debit
ok('et ensuite' not in bl and 'et puis ensuite' not in bl, "aucun « et ensuite » (remplace par « mais » ou « donc »)")
nc = len(re.findall(r"\b(mais|donc|par conséquent|pourtant|sauf que|du coup|résultat)\b", bl))
ok(nc >= max(1, round(dur / 15)), f"{nc} articulations mais/donc (au moins 1 toutes les 15 s)")
if len(bp) >= 4:
    L = [len(mots(p)) for p in bp]; sd = statistics.pstdev(L)
    ok(sd >= 2.5, f"rythme varié (écart des longueurs de phrase : {sd:.1f} mots ; vise 2,5 ou plus)")
    ok(max(L) <= 30, f"phrase la plus longue : {max(L)} mots (30 max)")
RH = r"(\?|mais ce n'est pas|et c'est là|le plus important|la (?:deuxième|troisième|dernière)|attends|sauf que|regarde|voici|retiens|le pire|le secret)"
nr = len(re.findall(RH, bl))
ok(nr >= max(1, round(dur / 10) - 1), f"{nr} ré-accrochages (question, « et c'est là… », « la troisième… ») pour {dur:.0f} s")
fin = sec.get('FIN') or ' '.join(bp[-2:])
fl = fin.lower()
ok(bool(re.search(r"\?|commentaire|réponds|écris|dis-moi|raconte", fl)), "fin engageante : une question ou un appel à commenter")
ok(len(re.findall(r"abonne|like|partage", fl)) <= 1, "une seule action demandée à la fin (pas de liste like/abonne/partage)")
BAD = [r'garanti', r'100 ?%', r'devenir riche', r'sans aucun effort', r'derni[eè]re chance', r'plus que \d+ places', r'miracle']
bad = [b for b in BAD if re.search(b, low)]
ok(not bad, "aucune promesse interdite ni fausse urgence" + ('' if not bad else ' : ' + ', '.join(bad)))
if a.duree: ok(abs(dur - a.duree) <= a.duree * .2, f"durée estimée {dur:.0f} s (visée {a.duree:.0f} s ± 20 %)")
else: print(f"· durée estimée : {dur:.0f} s ({W} mots)")
print(f"\n{sum(res)}/{len(res)} contrôles OK" + ('' if all(res) else ' — corrige les ✗ avant de proposer le script.'))
sys.exit(0 if all(res) else 1)
