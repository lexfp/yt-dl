const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function downloadWithYtDlp(url, outDir, isPlaylist = false, format = 'mp3') {
    ensureDir(outDir);
    const outTemplate = path.join(outDir, '%(title)s.%(ext)s');

    return new Promise((resolve, reject) => {
        const args = [
            '-o', outTemplate,
            '--no-warnings',
            '--js-runtimes', 'node',
            '--extractor-args', 'youtube:player_client=ios,web',
        ];

        if (format === 'mp3') {
            args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
        } else {
            args.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best', '--merge-output-format', 'mp4');
        }

        // For playlists, add playlist handling flags
        if (isPlaylist) {
            args.push('--yes-playlist');
        } else {
            args.push('--no-playlist');
        }

        args.push(url);

        console.log(`Downloading as ${format.toUpperCase()}:`, url);
        const proc = spawn('yt-dlp', args, { stdio: 'inherit' });

        proc.on('error', (err) => {
            reject(new Error(`Failed to spawn yt-dlp. Is yt-dlp installed and on your PATH? (${err.message})`));
        });

        proc.on('close', (code) => {
            if (code === 0) {
                console.log('Download complete');
                resolve();
            } else {
                reject(new Error(`yt-dlp exited with code ${code}`));
            }
        });
    });
}

async function download(url, outDir = path.resolve(process.cwd(), 'downloads'), format = 'mp3') {
    ensureDir(outDir);

    // Detect playlist by URL pattern
    const isPlaylist = /[?&]list=/.test(url);

    await downloadWithYtDlp(url, outDir, isPlaylist, format);
}

module.exports = { download };
