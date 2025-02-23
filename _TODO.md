- A render:
Downlaod: /opt/render/project/src/tmp
YT_DPL: /opt/render/project/src/tmp/yt-dlp
FFmPEG: /tmp/ffmpeg
Detino das copias: /opt/render/project/src/tmp
Temp YT_DPL /opt/render/project/src/not_bin/yt-dlp.exe
Temp FFmPEG /opt/render/project/src/not_bin/ffmpeg.exe
📂 Verificando not_binários em: /opt/render/project/src/not_bin
🚨 ERRO: Pasta 'not_bin' não existe!
Copying YT_DLP to: /opt/render/project/src/tmp/yt-dlp
Error: ENOENT: no such file or directory, copyfile '/opt/render/project/src/not_bin/yt-dlp.exe' -> '/opt/render/project/src/tmp/yt-dlp'

- A vercel nem builda:
Downlaod: /var/task/tmp
YT_DPL: /var/task/tmp/yt-dlp
FFmPEG: /tmp/ffmpeg
Temp YT_DPL ./bin/yt-dlp
Temp FFmPEG ./bin/ffmpeg
Error: ENOENT: no such file or directory, mkdir '/var/task/tmp'