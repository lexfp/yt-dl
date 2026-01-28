# YouTube to MP3 Downloader

Simple Node.js CLI to download a YouTube video or playlist and convert to MP3.

Prerequisites
- Install Node.js (14+).
- Install `ffmpeg` and ensure `ffmpeg` is in your PATH.
- (Recommended) Install `yt-dlp` and ensure it's in your PATH — the app falls back to `yt-dlp` when `ytdl-core` cannot extract signatures.

On Windows you can install `yt-dlp` and `ffmpeg` with Chocolatey:

```powershell
choco install yt-dlp
choco install ffmpeg
```

Or with Scoop:

```powershell
scoop install yt-dlp
scoop install ffmpeg
```

Or with Python/pip (requires Python):

```powershell
pip install -U yt-dlp
```

Install

```bash
npm install
```

Usage

```bash
node index.js <youtube-video-or-playlist-url> [out-dir]
# example
node index.js https://www.youtube.com/watch?v=... ./my-music
node index.js https://www.youtube.com/playlist?list=... ./my-music
```

Notes
- This uses `ytdl-core` + `ytpl` to fetch videos and `fluent-ffmpeg` to convert audio. `ffmpeg` must be installed separately.
- Filenames are sanitized. Existing files are skipped.
