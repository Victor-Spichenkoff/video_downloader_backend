- A render funciona, mas dá o erro:
/opt/render/project/src/tmp\teste.mp3
Arquivo /opt/render/project/src/tmp\teste.mp3 não existe.
Executando: "/opt/render/project/src/tmp/yt-dlp" -x --audio-format mp3 --ffmpeg-location "/tmp/ffmpeg" -o "/opt/render/project/src/tmp/teste.mp3" "https://www.youtube.com/watch?v=tsduflwerJc"
Erro ao baixar: /bin/sh: 1: /opt/render/project/src/tmp/yt-dlp: not found

- A vercel nem builda:
Downlaod: /var/task/tmp
YT_DPL: /var/task/tmp/yt-dlp
FFmPEG: /tmp/ffmpeg
Temp YT_DPL ./bin/yt-dlp
Temp FFmPEG ./bin/ffmpeg
Error: ENOENT: no such file or directory, mkdir '/var/task/tmp'