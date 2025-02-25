- A render:
Não reconhece porque é windows, preciso dos dois na versão linux
- A vercel nem builda:
Downlaod: /var/task/tmp
YT_DPL: /var/task/tmp/yt-dlp
FFmPEG: /tmp/ffmpeg
Temp YT_DPL ./bin/yt-dlp
Temp FFmPEG ./bin/ffmpeg
Error: ENOENT: no such file or directory, mkdir '/var/task/tmp'

- Dwonload ffmpeg:
        execSync(`
            curl -L https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz -o /tmp/ffmpeg.tar.xz
            tar -xvf /tmp/ffmpeg.tar.xz -C /tmp/
            mv /tmp/ffmpeg-*-static/ffmpeg /tmp/ffmpeg
            chmod +x /tmp/ffmpeg
        `)