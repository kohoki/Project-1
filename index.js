const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const gameState1 = document.querySelector("#gameState1");
const gameState2 = document.querySelector("#gameState2");
const gameState3 = document.querySelector("#gameState3");

// background
const background = new Image();
background.src = "../images/Background01.png"

// gamer
const ship = new Image();
ship.src = "../images/Spaceship.png"
let shipWidth = 100;
let shipHeight = 110;
let shipX = canvas.width / 2;
let shipY = canvas.height - shipHeight;
let isShipGoingLeft = false;
let shipSpeed = 1.5;

let animationFrameId = 0;
let gameOver = false;

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
    if (isShipGoingLeft) {
        if (shipX > 0) {
            shipX -=  shipSpeed;
        }
      };

      if (gameOver) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
}

function startGame() {
    gameState1.style.display = "none";
    gameState2.style.display = "block";
    animate();
  };


  window.onload = () => {
    document.getElementById('playBtn').onclick = () => {
    startGame();
    };
    document.addEventListener("keydown", event => {
        if (event.code === "ArrowLeft") {
            isShipGoingLeft = true;
            console.log(isShipGoingLeft);
        }
        
      });
      
      document.addEventListener("keyup", event => {
        isShipGoingLeft = false;
      });
  };



