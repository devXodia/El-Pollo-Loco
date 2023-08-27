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

/**
 * This function is used to start the Game
 */
function gameStart() {
  startLevel();
  activateMobileButtons();
  initWorld();
  removeStartScreen();
  moveButtons();

  if (!audio_muted) {
    playAudio();
  }
}

/**
 * This function is used to check touch on the mobile device.
 */
function activateMobileButtons() {
  document.getElementById("left").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById("left").addEventListener("touchend", (e) => {
    keyboard.LEFT = false;
  });
  document.getElementById("right").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById("right").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("buy_btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.B = true;
  });
  document.getElementById("buy_btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.B = false;
  });

  document.getElementById("throw_btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById("throw_btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });

  document.getElementById("jump_btn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById("jump_btn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}

/**
 * This event listener is used to check which key is being pressed right now and setting its state to true.
 */
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

/**
 * This event listener is used to check which key is currently not being pressed and setting its state to false.
 */
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

/**
 * This eventlistener is being used to check when the orientation of the mobile device changes it should check the screen size and reload the page.
 */
window.addEventListener("orientationchange", function () {
  checkScreenSize();
  location.reload();
});

/**
 * This function is being used to display the game in fullscreen.
 * @param {HTMLElement} element 
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * This function is being used to display the game in full screen and show the Image for Fullscreen State.
 */
function goFullscreen() {
  let container = document.getElementById("game_container");
  showOpenFullscreenButton();
  changeCanvasSize();
  enterFullscreen(container);
}

/**
 * This function is being used to display the game in its original State and show the Image for Fullscreen State.
 */
function closeFullscreen() {
  showCloseFullscreenButton();
  exitFullscreen();
}

/**
 * This function is being used to exit the Fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * This function is being used to play the background music.
 */
function playMusic() {
  music.loop = true;
  music.play();
}

/**
 * This function is being used to play all Audio and show the current state of audio with the corresponding image.
 */
function playAudio() {
  let play_audio = (document.getElementById("play_audio").style.display =
    "none");
  let mute_audio = (document.getElementById("mute_audio").style.display =
    "flex");
  audio_muted = false;
  playMusic();
}

/**
 * This function is being used to mute all Audio and show the current state of audio with the corresponding image.
 */
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


/**
 * this function is being used to move the audio and fullscreen buttons after the game has loaded to the right side
 */
function moveButtons() {
  document.getElementById("ingame_container").style = "right: 0";
}

/**
 * This function is used to remove the Start screen.
 */
function removeStartScreen() {
  let game = document.getElementById("start_screen");
  game.style.display = "none";
}

/**
 * This function is being used to initate the world.
 */
function initWorld() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

/**
 * This function is being used to change canvas size.
 */
function changeCanvasSize() {
  canvas.style.width = "100%";
  canvas.style.height = "100%";
}

/**
 * This function is being used to show close full screen button and to remove open full screen button 
 */
function showOpenFullscreenButton() {
  document.getElementById("close_fullscreen").style.display = "flex";
  document.getElementById("open_fullscreen").style.display = "none";
}

/**
 * This function is being used to remove close full screen button and to show open full screen button 
 */
function showCloseFullscreenButton() {
  document.getElementById("close_fullscreen").style.display = "none";
  document.getElementById("open_fullscreen").style.display = "flex";
}

/**
 * This function is used to end the Game when the Character has no hp left.
 */
function isGameOver() {
  if (world.character.energy <= 0) {
    lostGame();
    clearAllIntervals();
    music.pause();
  }
}

/**
 * This function restarts the Game.
 */
function restartGame() {
  resetObjects();
  clearScreen();
  gameStart();
}

/**
 * This function is used to display when the game is over and the user has beat the boss.
 */
function wonGame() {
  if (!audio_muted) {
    congrats.play();
  }
  clearAllIntervals();
  resetAudio();
  let endscreen = document.getElementById("endgame");
  let endImg = document.getElementById("end_img");
  let span = document.getElementById("winMsg");
  span.style.display = "flex";
  endscreen.style.display = "flex";
  endImg.src = "img/9_intro_outro_screens/game_over/game over!.png";
}

/**
 * This function is used to display that the game is over and the user has died before defeating the boss.
 */
function lostGame() {
  resetAudio();
  let endscreen = document.getElementById("endgame");
  let endImg = document.getElementById("end_img");
  let span = document.getElementById("winMsg");
  span.style.display = "none";
  endscreen.style.display = "flex";
  endImg.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
}

/**
 * This function clears the end screen.
 */
function clearScreen() {
  let endscreen = document.getElementById("endgame");
  endscreen.style.display = "none";
}

/**
 * This function stops all currently running Intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * This function resets the current x of chicken, coin and bottle objects on the map.
 */
function resetObjects() {
  Chicken.nextX = 550;
  Coin.nextX = 250;
  Bottle.nextX = 350;
}

/**
 * This function pauses all the Audio and resets the timer.
 */
function resetAudio() {
  walking_sound.pause();
  hurt_sound.pause();
  coin_sound.pause();
  negative_sound.pause();
  music.pause();
  boss_music.pause();
  buy_audio.pause();
  setTimeAudio();
}

/**
 * This function resets the Timer of every audio.
 */
function setTimeAudio() {
  buy_audio.currentTime = 0;
  boss_music.currentTime = 0;
  music.currentTime = 0;
  coin_sound.currentTime = 0;
  hurt_sound.currentTime = 0;
  negative_sound.currentTime = 0;
  walking_sound.currentTime = 2;
}

/**
 * This function checks if the screen size is mobile or not and if it is the user is being told to turn the device to landscape mode
 */
function checkScreenSize() {
  if (screen.availHeight > screen.availWidth) {
    document.getElementById("portrait").style.display = "flex";
    document.getElementById("game_container").style.display = "none";
  } else if (screen.availHeight < screen.availWidth) {
    document.getElementById("portrait").style.display = "none";
    document.getElementById("game_container").style.display = "flex";
  }
}

/**
 * This function shows the mobile controls in the game on mobile.
 */
function showControls() {
  let modal = document.getElementById("modal");
  let controls = document.getElementById("controls");
  modal.style.display = "flex";
  controls.style =
    "position: absolute; z-index: 5; bottom: 30%; display:flex; width:100%";
}

/**
 * This function closes the mobile controls modal.
 */
function closeModal() {
  let modal = document.getElementById("modal");
  let controls = document.getElementById("controls");
  modal.style.display = "none";
  controls.style.display = "none";
}
