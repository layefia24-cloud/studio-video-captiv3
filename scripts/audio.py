#!/usr/bin/env python3
"""Son de la vidéo finale : voix mesurée puis réglée, musique de fond en option.

  python3 audio.py voix.wav --out voix_ok.wav                    (réseaux : -14 LUFS, crête -1 dBTP)
  python3 audio.py voix.wav --cible youtube --out voix_ok.wav    (16:9 long : -16 LUFS)
  python3 audio.py voix.wav --musique fond.mp3 --out mix.wav     (musique 20 dB sous la voix, fin en fondu de 2 s)
  python3 audio.py video.mp4 --mesure                            (affiche seulement les mesures)

Toujours mesuré, jamais un réglage fixe : 1re passe de mesure, 2e passe de correction linéaire
(pas de compresseur qui « respire » dans les silences). Mono et stéréo sortent au même niveau.
Le réglage s'applique à toute la piste d'un coup, jamais morceau par morceau (sinon ça claque aux coupes).
"""
import argparse, json, os, re, shutil, subprocess
def _ff():
    if os.environ.get('FFMPEG_PATH'): return os.environ['FFMPEG_PATH']
    if shutil.which('ffmpeg'): return 'ffmpeg'
    try:
        import imageio_ffmpeg; return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception: return 'ffmpeg'
FF = _ff()
CIBLES = {'reseaux': (-14.0, -1.0), 'youtube': (-16.0, -1.0)}

def mesure(path, af=''):
    f = (af + ',' if af else '') + 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json'
    r = subprocess.run([FF, '-hide_banner', '-nostats', '-i', path, '-vn', '-af', f, '-f', 'null', '-'], capture_output=True, text=True).stderr
    j = json.loads(r[r.rindex('{'):r.rindex('}') + 1])
    return {k: float(j[k]) for k in ('input_i', 'input_tp', 'input_lra', 'input_thresh')} | {'offset': float(j['target_offset'])}

if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('src'); ap.add_argument('--out'); ap.add_argument('--cible', default='reseaux', choices=CIBLES)
    ap.add_argument('--musique'); ap.add_argument('--musique-db', type=float, default=-20); ap.add_argument('--mesure', action='store_true')
    a = ap.parse_args(); I, TP = CIBLES[a.cible]
    MONO = "aformat=channel_layouts=mono"
    m = mesure(a.src, MONO)   # mesuré après passage en mono : mono et stéréo sortent au même niveau
    print(f"mesure : {m['input_i']:.1f} LUFS, crête {m['input_tp']:.1f} dBTP, plage {m['input_lra']:.1f} LU")
    if a.mesure: raise SystemExit
    g = I - m['input_i']
    # gain fixe sur toute la piste, puis limiteur doux seulement sur les crêtes (pas de compresseur qui respire)
    voice = f"{MONO},volume={g:.2f}dB,aresample=192000,alimiter=limit={10 ** ((TP - 0.5) / 20):.4f}:attack=5:release=60:level=false,aresample=48000"
    out = a.out or os.path.splitext(a.src)[0] + '_ok.wav'
    if not a.musique:
        subprocess.run([FF, '-v', 'error', '-y', '-i', a.src, '-vn', '-ac', '1', '-af', voice + ',aresample=48000', '-ar', '48000', out], check=True)
        for _ in range(3):  # le limiteur a pu retenir un peu de volume : on complète par petites passes
            r = mesure(out)
            if abs(r['input_i'] - I) <= 0.5: break
            tmp = out + '.tmp.wav'; os.replace(out, tmp)
            subprocess.run([FF, '-v', 'error', '-y', '-i', tmp, '-af', f"volume={I - r['input_i']:.2f}dB,aresample=192000,alimiter=limit={10 ** ((TP - 0.5) / 20):.4f}:attack=5:release=60:level=false,aresample=48000", '-ar', '48000', out], check=True)
            os.remove(tmp)
    else:
        r = subprocess.run([FF, '-i', a.src], capture_output=True, text=True).stderr
        h, mi, s = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', r).groups(); dur = int(h) * 3600 + int(mi) * 60 + float(s)
        mm = mesure(a.musique); gain = (I + a.musique_db) - mm['input_i']
        fc = (f"[0:a]{voice},aresample=48000,aformat=channel_layouts=stereo[v];"
              f"[1:a]aresample=48000,aformat=channel_layouts=stereo,volume={gain:.2f}dB,atrim=0:{dur + 2},afade=t=in:d=0.5,afade=t=out:st={dur}:d=2[m];"
              f"[v][m]amix=inputs=2:duration=longest:normalize=0,alimiter=limit={10 ** (TP / 20):.3f}:level=false[o]")
        subprocess.run([FF, '-v', 'error', '-y', '-i', a.src, '-stream_loop', '-1', '-i', a.musique, '-filter_complex', fc, '-map', '[o]', '-ar', '48000', out], check=True)
    r = mesure(out)
    ok = abs(r['input_i'] - I) <= 1.0 and r['input_tp'] <= TP + 0.3
    print(f"{'✓' if ok else '✗'} {out} : {r['input_i']:.1f} LUFS (cible {I}), crête {r['input_tp']:.1f} dBTP (max {TP})")
