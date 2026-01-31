# YouTube Downloader

Simple Node.js CLI to download a YouTube video or playlist as MP3 (audio) or MP4 (video).

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
node index.js <youtube-video-or-playlist-url> [out-dir] [format]
```

- `out-dir`: Output directory (default: `./downloads`)
- `format`: `mp3` (default) or `mp4`

Examples:

```bash
# Download as MP3 (audio only)
node index.js https://www.youtube.com/watch?v=... ./my-music mp3

# Download as MP4 (video)
node index.js https://www.youtube.com/watch?v=... ./my-videos mp4

# Download playlist as MP3
node index.js https://www.youtube.com/playlist?list=... ./my-music mp3

# Download playlist as MP4
node index.js https://www.youtube.com/playlist?list=... ./my-videos mp4
```

Notes
- This uses `yt-dlp` to download and `ffmpeg` for conversion. Both must be installed separately.
- Filenames are sanitized using the video title.
