#!/usr/bin/env node
const path = require('path');
const { download } = require('./lib/downloader');

const argv = process.argv.slice(2);
if (argv.length < 1) {
    console.error('Usage: node index.js <youtube-video-or-playlist-url> [out-dir] [format]');
    console.error('  format: mp3 (default) or mp4');
    process.exit(1);
}

const url = argv[0];
const outDir = argv[1] ? path.resolve(argv[1]) : path.resolve(process.cwd(), 'downloads');
const format = (argv[2] || 'mp3').toLowerCase();

if (format !== 'mp3' && format !== 'mp4') {
    console.error('Error: format must be "mp3" or "mp4"');
    process.exit(1);
}

download(url, outDir, format)
    .then(() => console.log('Done'))
    .catch(err => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });
