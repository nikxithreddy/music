const playlists = {
  "Bollywood Hits": [
    {
      title: "vikram",
      artist: "Artist 1",
      file: "songs/vikram.mp3",
      cover: "https://wallpaperaccess.com/full/8412315.jpg",
      lyrics: `[00:00.000]
[00:20.50]Kaalame kampinchina Marala vachchenu nayakudu
[00:32.50]Okade iddaru kadaa Ramudu mariyu rakshasudu
[00:43.50]Taramulu paade charitam veedu
[00:48.50]Kathanamu pogide kathanam veedu
[00:54.50]Palu gaayaala deham veedu Ranageyanga gelupautaadu
[01:08.50]Thakita thak dhim Thak dhim thak dhim Thakita thak dhim
[01:12.50]Thak dhim thak dhim Thakita thak dhim Thak dhim thak dhim
[01:18.50]Thakita thak dhim Thak dhim thak dhim..hahahaha..
[01:22.50]Vikram.. vikram Vikram ..vikram.. Vikram..vikram.. Vikram..vikram..
[02:07.50]Kaalame kampinchina
[02:11.50]Marala vachchenu nayakudu
[02:19.50]Okade iddaru kada 
[02:24.50]Ramudu mariyu rakshasudu
[02:30.50]Itado mananam yedalo jwalana
[02:35.50]Gatame shishira batuke samarm Shikharam tanai niliche pantam Poraadatame tana siddhantam Longadu veedu, yamudiki saitam Ika modaleddama
[02:55.50]Thakita thak dhim Thak dhim thak dhim Thakita thak dhim
[03:00.50]Thak dhim thak dhim Thakita thak dhim Thak dhim thak dhim
[03:05.50]Thakita thak dhim Thak dhim thak dhim..hahahaha..
[03:09.50]Vikram.. vikram Vikram ..vikram.. Vikram..vikram.. Vikram..vikram..`
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      file: "songs/song2.mp3",
      cover: "https://picsum.photos/300?random=2",
      lyrics: `
[00:00.00] Intro music for song 2
[00:03.00] Welcome to this song lyrics
[00:08.00] Enjoy every line carefully
[00:14.00] Singing along is fun`
    }
  ],
  "English Pop": [
    {
      title: "Song 3",
      artist: "Artist 3",
      file: "songs/song3.mp3",
      cover: "https://picsum.photos/300?random=3",
      lyrics: `
[00:00.00] Intro English song
[00:04.00] Here is line number one
[00:09.00] Next line comes easy
[00:13.00] Last line for you`
    },
    {
      title: "Song 4",
      artist: "Artist 4",
      file: "songs/song4.mp3",
      cover: "https://picsum.photos/300?random=4",
      lyrics: `
[00:00.00] Song 4 intro
[00:06.00] Some cool lyric line
[00:11.00] Another cool lyric
[00:16.00] Final lyric line`
    }
  ]
};

const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const lyricsDisplay = document.getElementById('lyricsDisplay');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const coverImage = document.getElementById('coverImage');
const playlistEl = document.getElementById('playlist');
const playlistSelect = document.getElementById('playlistSelect');
const coverArtDiv = document.querySelector('.cover-art');
const playPauseSymbol = playPauseBtn.textContent;

let currentPlaylistName = null;
let currentPlaylist = [];
let currentSongIndex = 0;
let isPlaying = false;

let lyricsLines = []; // Array of {time: seconds, text: string}
let currentLyricIndex = -1;

// Parse LRC style lyrics into timed array
function parseLyrics(lrcText) {
  const lines = lrcText.split('\n');
  const result = [];
  const timeRegex = /\[(\d{2}):(\d{2}\.\d{2})\]/;

  for (let line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const mins = parseInt(match[1]);
      const secs = parseFloat(match[2]);
      const time = mins * 60 + secs;
      const text = line.replace(timeRegex, '').trim();
      result.push({ time, text });
    }
  }
  return result;
}

function loadPlaylists() {
  for (let name in playlists) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    playlistSelect.appendChild(option);
  }
}

function loadPlaylist(name) {
  currentPlaylistName = name;
  currentPlaylist = playlists[name];
  currentSongIndex = 0;
  loadSong(currentSongIndex);
  updatePlaylistUI();
}

function loadSong(index) {
  const song = currentPlaylist[index];
  if (!song) return;

  audio.src = song.file;
  audio.load();
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  coverImage.src = song.cover;

  // Parse lyrics from embedded text
  lyricsLines = parseLyrics(song.lyrics);
  currentLyricIndex = -1;
  renderLyrics();

  // Reset progress bar and times
  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";

  updatePlaylistUI();

  // Remove spinning animation initially
  coverArtDiv.classList.remove('playing');
}

function renderLyrics() {
  lyricsDisplay.innerHTML = '';
  lyricsLines.forEach((line, index) => {
    const p = document.createElement('p');
    p.textContent = line.text;
    p.setAttribute('data-index', index);
    lyricsDisplay.appendChild(p);
  });
}
console.log('Time:', audio.currentTime.toFixed(2), '/', audio.duration?.toFixed(2));

function updateLyricsHighlight(currentTime) {
  if (lyricsLines.length === 0) return;

  // Find the current lyric index for the current time
  for (let i = lyricsLines.length - 1; i >= 0; i--) {
    if (currentTime >= lyricsLines[i].time) {
      if (currentLyricIndex !== i) {
        currentLyricIndex = i;
        highlightLyric(i);
      }
      break;
    }
  }
}

function highlightLyric(index) {
  const paragraphs = lyricsDisplay.querySelectorAll('p');
  paragraphs.forEach(p => p.classList.remove('active'));
  const activeP = lyricsDisplay.querySelector(`p[data-index="${index}"]`);
  if (activeP) {
    activeP.classList.add('active');
    // Auto scroll lyrics container
    const container = lyricsDisplay.parentElement;
    const offset = activeP.offsetTop - container.offsetTop - container.clientHeight / 2 + activeP.clientHeight / 2;
    container.scrollTop = offset > 0 ? offset : 0;
  }
}

function playSong() {
    audio.playbackRate = 1.0;
  audio.play();
  isPlaying = true;
  playPauseBtn.textContent = '❚❚';
  coverArtDiv.classList.add('playing');
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.textContent = '▶';
  coverArtDiv.classList.remove('playing');
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) pauseSong();
  else playSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  loadSong(currentSongIndex);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener('loadedmetadata', () => {
  if (isFinite(audio.duration)) {
    durationEl.textContent = formatTime(audio.duration);
  }
});


audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);

    updateLyricsHighlight(audio.currentTime);
  }
});

progressBar.addEventListener('mouseup', () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

playlistSelect.addEventListener('change', () => {
  loadPlaylist(playlistSelect.value);
});

function updatePlaylistUI() {
  playlistEl.innerHTML = "";
  currentPlaylist.forEach((song, idx) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (idx === currentSongIndex) {
      li.classList.add('active');
    }
    li.addEventListener('click', () => {
      currentSongIndex = idx;
      loadSong(idx);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Init
loadPlaylists();
loadPlaylist(Object.keys(playlists)[0]);
