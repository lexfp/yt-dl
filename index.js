#!/usr/bin/env node
const path = require('path');
const { download } = require('./lib/downloader');

const argv = process.argv.slice(2);
if (argv.length < 1) {
    console.error('Usage: node index.js <youtube-video-or-playlist-url> [out-dir]');
    process.exit(1);
}

const url = argv[0];
const outDir = argv[1] ? path.resolve(argv[1]) : path.resolve(process.cwd(), 'downloads');

download(url, outDir)
    .then(() => console.log('Done'))
    .catch(err => {
        console.error('Error:', err.message || err);
        process.exit(1);
    });
