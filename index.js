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
ship.src = "../images/Spaceship.png";
const burner = new Image();
burner.src = "../images/Thruster_01.png";

let shipWidth = 100;
let shipHeight = 110;
let shipX = canvas.width / 2;
let shipY = canvas.height - shipHeight;
let isShipGoingLeft = false;
let isShipGoingRight = false;
let isShipGoingUp = false;
let isShipGoingDown = false;


let shipSpeed = 1.5;

let animationFrameId = 0;
let gameOver = false;
let background1Y = 0;
let background2Y = -canvas.height;

function animate(){
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, background1Y, canvas.width, canvas.height);
    ctx.drawImage(background, 0, background2Y, canvas.width, canvas.height);
    if (isShipGoingUp)
    {
        if(shipY > 0)
        {
            shipY -=  shipSpeed;
            ctx.drawImage(burner, shipX + 25 , shipY + shipWidth, shipWidth/2, shipHeight/2);
        }
    }
    else if (isShipGoingDown)
    {
        if(shipY < canvas.height - shipHeight)
        {
            shipY +=  shipSpeed;
        }
    }
    
    if (isShipGoingLeft) {
        if (shipX > 0) {
            shipX -=  shipSpeed;
            ship.src = "../images/Spaceship_left.png";
        }
    }
    else if (isShipGoingRight)
    {
        if(shipX < canvas.width - shipWidth)
        {
            shipX +=  shipSpeed;
            ship.src = "../images/Spaceship_right.png";
        }
    }
    else if (!isShipGoingLeft) {
        ship.src = "../images/Spaceship.png";
    }

    ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
    
    // Sky is moving
    background1Y += 1.5
    background2Y += 1.5
    if (background1Y > canvas.height) {
        background1Y = -canvas.height;
    }
    if (background2Y > canvas.height) {
        background2Y = -canvas.height;
    }


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
        if (event.code === "KeyW" || event.code === "ArrowUp") {
            isShipGoingUp = true;    
        }
        if (event.code === "KeyS"|| event.code === "ArrowDown") {
            isShipGoingDown = true;    
        }
        if (event.code === "KeyA" || event.code === "ArrowLeft") {
            isShipGoingLeft = true;    
        }
        if (event.code === "KeyD" || event.code === "ArrowRight"){
            isShipGoingRight = true;
        }
        
      });
      
      document.addEventListener("keyup", event => {
        if (event.code === "KeyW" || event.code === "ArrowUp") {
            isShipGoingUp = false;    
        }
        if (event.code === "KeyS"|| event.code === "ArrowDown") {
            isShipGoingDown = false;    
        }
        if (event.code === "KeyA" || event.code === "ArrowLeft") {
            isShipGoingLeft = false;    
        }
        if (event.code === "KeyD" || event.code === "ArrowRight"){
            isShipGoingRight = false;
        }

      });
  };