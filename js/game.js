let canvas;
let world;
let keyboard = new Keyboard();
let audio_muted;
let music = new Audio("audio/bg_music.mp3");
let walking_sound = new Audio("/audio/walking.mp3");
let hurt_sound = new Audio("audio/hurt.mp3");
let coin_sound = new Audio("audio/coin.mp3");
let negative_sound = new Audio("audio/negative.mp3");
let boss_music = new Audio("audio/boss_music.mp3");
let congrats = new Audio("audio/congrats.mp3");
let buy_audio = new Audio("audio/buy.mp3");

function gameStart() {
  startLevel();
  initWorld();
  removeStartScreen();
  moveButtons();
  if(!audio_muted){
    playAudio();
  }
  
}

window.addEventListener("orientationchange", function() {                   
  if (window.matchMedia("(orientation: portrait)").matches) {
      document.getElementById('portrait').style.display = "flex";
      document.getElementById('game_container').style.display= "none";
   }
  if (window.matchMedia("(orientation: landscape)").matches) {
    document.getElementById('portrait').style.display = "none";
      document.getElementById('game_container').style.display= "flex";
   }
}, false);




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
  showOpenFullscreenButton();
  changeCanvasSize();
  enterFullscreen(container);
}

function closeFullscreen() {
  showCloseFullscreenButton();
  exitFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
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

function changeCanvasSize() {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
}

function showOpenFullscreenButton() {
  document.getElementById("close_fullscreen").style.display = "flex";
  document.getElementById("open_fullscreen").style.display = "none";
}

function showCloseFullscreenButton() {
  document.getElementById("close_fullscreen").style.display = "none";
  document.getElementById("open_fullscreen").style.display = "flex";
}

function isGameOver() {
  if (world.character.energy <= 0) {
    lostGame();
    clearAllIntervals();
    music.pause();
  }
}

function restartGame() {
  resetObjects();
  clearScreen();
  gameStart();
}

function wonGame() {
  if(!audio_muted){
    congrats.play();
  }
  resetAudio();
  let endscreen = document.getElementById("endgame");
  let endImg = document.getElementById("end_img");
  let span = document.getElementById("winMsg");
  span.style.display = "flex";
  endscreen.style.display = "flex";
  endImg.src = "img/9_intro_outro_screens/game_over/game over!.png";
}

function lostGame() {
  resetAudio();
  let endscreen = document.getElementById("endgame");
  let endImg = document.getElementById("end_img");
  endscreen.style.display = "flex";
  endImg.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
}

function clearScreen() {
  let endscreen = document.getElementById("endgame");
  endscreen.style.display = "none";
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function resetObjects() {
  Chicken.nextX = 550;
  Coin.nextX = 250;
  Bottle.nextX = 350;
}

function resetAudio(){
  walking_sound.pause();
  hurt_sound.pause();
  coin_sound.pause();
  negative_sound.pause();
  music.pause();
  boss_music.pause();
  buy_audio.pause();
  setTimeAudio();
}

function setTimeAudio(){
  buy_audio.currentTime = 0;
  boss_music.currentTime = 0;
  music.currentTime = 0;
  coin_sound.currentTime = 0;
  hurt_sound.currentTime = 0;
  negative_sound.currentTime = 0;
  walking_sound.currentTime = 2;
}