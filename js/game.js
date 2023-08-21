let canvas;

let world;
let keyboard = new Keyboard();




function gameStart(){
  let game = document.getElementById('start_screen');
  game.style.display = "none";
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
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

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
