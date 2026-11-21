#!/usr/bin/env bash
# Installe le moteur du studio. À lancer une fois par session :  bash <studio>/scripts/setup.sh
# Ajoute --omni pour la voix IA française et wolof OmniVoice (plusieurs Go) :  bash <studio>/scripts/setup.sh --omni
# Ne passe que par npm et pip (autorisés dans presque toutes les sessions), avec des solutions de secours
# quand Chrome ou ffmpeg ne peuvent pas être téléchargés depuis leurs sites.
cd "$(dirname "$0")" || exit 1
ok(){ echo "✓ $1"; }; ko(){ echo "✗ $1"; }

# 1. Moteur de rendu (puppeteer-core)
npm i --silent --no-audit --no-fund >/dev/null 2>&1 && ok "moteur (puppeteer-core)" || ko "npm i a échoué : vérifie l'accès réseau sortant (registre npm)"

# 2. Navigateur : Chrome du système, sinon Chrome téléchargé, sinon Chromium livré par npm
have_chrome(){ for p in "$CHROME_PATH" /usr/bin/google-chrome /usr/bin/chromium /usr/bin/chromium-browser; do [ -n "$p" ] && [ -x "$p" ] && return 0; done
  for d in /opt/pw-browsers "$HOME/.cache/ms-playwright" "$HOME/.cache/puppeteer"; do [ -d "$d" ] && find "$d" -type f \( -name chrome -o -name chrome-headless-shell -o -name headless_shell \) 2>/dev/null | grep -q . && return 0; done; return 1; }
if have_chrome; then ok "navigateur déjà présent"
elif timeout 120 npx --yes @puppeteer/browsers install chrome-headless-shell@stable --path "$HOME/.cache/puppeteer" >/dev/null 2>&1 && have_chrome; then ok "navigateur téléchargé"
elif npm i --silent --no-audit --no-fund @sparticuz/chromium >/dev/null 2>&1; then ok "navigateur de secours (Chromium livré par npm)"
else ko "aucun navigateur : active l'accès réseau sortant puis ouvre une NOUVELLE session"; fi

# 3. ffmpeg : celui du système, sinon celui livré par pip
if command -v ffmpeg >/dev/null 2>&1; then ok "ffmpeg déjà présent"
elif pip install -q imageio-ffmpeg --break-system-packages >/dev/null 2>&1 || pip install -q imageio-ffmpeg >/dev/null 2>&1; then ok "ffmpeg de secours (livré par pip)"
else ko "ffmpeg introuvable"; fi

# 4. Voix IA et mots minutés (facultatifs)
pip install -q kokoro-onnx soundfile faster-whisper --break-system-packages >/dev/null 2>&1 || pip install -q kokoro-onnx soundfile faster-whisper >/dev/null 2>&1
python3 -c "import kokoro_onnx, faster_whisper" 2>/dev/null && ok "voix IA et sous-titres" || ko "voix IA ou sous-titres non installés (la vidéo reste possible avec ta propre voix)"
# 5. Voix IA français + wolof OmniVoice (facultative, seulement avec --omni : PyTorch et modèle de plusieurs Go)
if [ "$1" = "--omni" ]; then
  pip install -q omnivoice soundfile --break-system-packages >/dev/null 2>&1 || pip install -q omnivoice soundfile >/dev/null 2>&1
  python3 -c "import omnivoice" 2>/dev/null && ok "voix IA français + wolof (OmniVoice ; modèle ~3,3 Go téléchargé au premier usage depuis huggingface.co)" || ko "OmniVoice non installé (voix Kokoro en français ou ta propre voix restent possibles)"
fi
echo "Studio prêt."
