// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
//import { firestore } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
import {  getFirestore, collection, getDocs  } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js'
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt_8_xWyk2bFakexqfM7ZkXFTRCx42OKI",
  authDomain: "touche-1c021.firebaseapp.com",
  projectId: "touche-1c021",
  storageBucket: "touche-1c021.appspot.com",
  messagingSenderId: "166127349399",
  appId: "1:166127349399:web:3ff697a006ca3cfdc2c3d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;
let trigger = 1;


// Initially load song details into DOM
loadSong(songs[songIndex]);


// Update song details
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// update progress bar 
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = clickX / width * duration;
}

// Event listeners
// playBtn.addEventListener('click', () => {
//     const isPlaying = musicContainer.classList.contains('play');
//     if(isPlaying) {
//         pauseSong();
//     } else {
//         playSong();
//     }
// });

playBtn.addEventListener('click', () => {
    updateData();
});

//change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


// Time/song update event
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// song ends
audio.addEventListener('ended', nextSong);