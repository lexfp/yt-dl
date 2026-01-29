const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function downloadWithYtDlp(url, outDir, isPlaylist = false) {
    ensureDir(outDir);
    const outTemplate = path.join(outDir, '%(title)s.%(ext)s');

    return new Promise((resolve, reject) => {
        const args = [
            '-x',
            '--audio-format', 'mp3',
            '--audio-quality', '0',
            '-o', outTemplate,
            '--no-warnings',
            '--js-runtimes', 'node',
            '--extractor-args', 'youtube:player_client=ios,web',
        ];

        // For playlists, add playlist handling flags
        if (isPlaylist) {
            args.push('--yes-playlist');
        } else {
            args.push('--no-playlist');
        }

        args.push(url);

        console.log('Downloading:', url);
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

async function download(url, outDir = path.resolve(process.cwd(), 'downloads')) {
    ensureDir(outDir);

    // Detect playlist by URL pattern
    const isPlaylist = /[?&]list=/.test(url);

    await downloadWithYtDlp(url, outDir, isPlaylist);
}

module.exports = { download };
