let canvas;
let world;
let keyboard = new Keyboard();

let audio_muted;
let music = new Audio("audio/bg_music.mp3");
let walking_sound = new Audio("/audio/walking.mp3");
let hurt_sound = new Audio("audio/hurt.mp3");
let coin_sound = new Audio("audio/coin.mp3");
let negative_sound = new Audio("audio/negative.mp3");

function gameStart() {
  startLevel();
  initWorld();

  removeStartScreen();
  moveButtons();
  playMusic();
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == "39") {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == "37") {
    keyboard.LEFT = true;
  }
  if (event.keyCode == "38") {
    keyboard.UP = true;
  }
  if (event.keyCode == "40") {
    keyboard.DOWN = true;
  }
  if (event.keyCode == "32") {
    keyboard.SPACE = true;
  }
  if (event.keyCode == "68") {
    keyboard.D = true;
  }
  if (event.keyCode == "66") {
    keyboard.B = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == "39") {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == "37") {
    keyboard.LEFT = false;
  }
  if (event.keyCode == "38") {
    keyboard.UP = false;
  }
  if (event.keyCode == "40") {
    keyboard.DOWN = false;
  }
  if (event.keyCode == "32") {
    keyboard.SPACE = false;
  }
  if (event.keyCode == "68") {
    keyboard.D = false;
  }
  if (event.keyCode == "66") {
    keyboard.B = false;
  }
});

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function goFullscreen() {
  let container = document.getElementById("game_container");
  document.getElementById("close_fullscreen").display = "flex";
  document.getElementById("open_fullscreen").display = "none";
  enterFullscreen(canvas);
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById("close_fullscreen").display = "none";
  document.getElementById("open_fullscreen").display = "flex";
}

function playMusic() {
  music.loop = true;
  music.play();
}

function playAudio() {
  let play_audio = (document.getElementById("play_audio").style.display =
    "none");
  let mute_audio = (document.getElementById("mute_audio").style.display =
    "flex");
  audio_muted = false;
  playMusic();
}

function muteAudio() {
  let mute_audio = (document.getElementById("mute_audio").style.display =
    "none");
  let play_audio = (document.getElementById("play_audio").style.display =
    "flex");
  audio_muted = true;
  music.pause();
  hurt_sound.pause();
  walking_sound.pause();
}

function moveButtons() {
  document.getElementById("ingame_container").style = "right: 0";
}

function removeStartScreen() {
  let game = document.getElementById("start_screen");
  game.style.display = "none";
}

function initWorld() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}
