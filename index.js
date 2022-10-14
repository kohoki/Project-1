const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const gameState1 = document.querySelector("#gameState1");
const gameState2 = document.querySelector("#gameState2");
const gameState3 = document.querySelector("#gameState3");

// background
const background = new Image();
background.src = "../images/Background01.png"



function startGame() {
    gameState1.style.display = "none";
    gameState2.style.display = "block";
    //animate();
  };


  window.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    document.getElementById('playBtn').onclick = () => {
    startGame();
    };
  
  };



