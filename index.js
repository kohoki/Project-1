const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const gameState1 = document.querySelector("#gameState1");
const gameState2 = document.querySelector("#gameState2");
const gameState3 = document.querySelector("#gameState3");
const gameState4 = document.querySelector("#gameState4");

// background
const background = new Image();
background.src = "../images/Background01.png"

// asteroid
const asteroid = new Image();
const asteroidArray =[
    "../images/asteroid/asteroid_01.png",
    "../images/asteroid/asteroid_02.png",
    "../images/asteroid/asteroid_03.png",
    "../images/asteroid/asteroid_04.png",
    "../images/asteroid/asteroid_05.png",
    "../images/asteroid/asteroid_06.png",
    "../images/asteroid/asteroid_07.png",
    "../images/asteroid/asteroid_08.png",
    "../images/asteroid/asteroid_09.png",
    "../images/asteroid/asteroid_10.png",
    "../images/asteroid/asteroid_11.png",
    "../images/asteroid/asteroid_12.png",
    "../images/asteroid/asteroid_13.png",
    "../images/asteroid/asteroid_14.png",
    "../images/asteroid/asteroid_15.png",
    "../images/asteroid/asteroid_16.png",
    "../images/asteroid/asteroid_17.png",
    "../images/asteroid/asteroid_18.png",
    "../images/asteroid/asteroid_19.png",
    "../images/asteroid/asteroid_20.png",
    "../images/asteroid/asteroid_21.png",
    "../images/asteroid/asteroid_22.png",
    "../images/asteroid/asteroid_23.png",
    "../images/asteroid/asteroid_24.png",
];

// SpaceShip
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

// Health bar SpaceShip
let barHealth = 50;
let colorBar = "green";
function healthBar () {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = colorBar;
    ctx.rect(shipX + shipWidth + 5, shipY + 50, 10, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = colorBar;
    ctx.fillRect(shipX + shipWidth + 5, shipY + 50, 10, barHealth);
    ctx.stroke();
}

// 
let animationFrameId = 0;
let gameOver = false;
let background1Y = 0;
let background2Y = -canvas.height;

// Boss
const boss = new Image();
boss.src = "../images/boss.png";
const burnerBoss = new Image();
burnerBoss.src = "../images/Thruster_boss.png";
let bossWidth = 120;
let bossHeight = 130;
let bossX = canvas.width / 2 - bossWidth/2;
let bossY = 0;

// Health bar Boss
let bossHealth = 50;
let colorBarBoss = "green";
function healthBarBoss () {
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = colorBarBoss;
    ctx.rect(bossX + bossWidth - 5, bossY + 50, 10, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = colorBarBoss;
    ctx.fillRect(bossX + bossWidth - 5, bossY + 50, 10, bossHealth);
    ctx.stroke();
}


// Asteroids

let asteroidX = Math.floor(Math.random() * (550 - 10) + 10);
let asteroidY = -70;
let asteroidSpeed = 1;
let Asteroids = [];
let timeOfAsteroids = 200;

class Asteroid {
    constructor(){
        this.x = Math.floor(Math.random() * (550 - 10) + 10);
        this.y = -70; 
        this.index = Math.floor(Math.random() * (23 - 0) + 0);
        this.life = true;
    }
    move()
    {
        this.y += asteroidSpeed;
    }
}

// Bullets

let bulletFly = false;
let reloading = false;
let bullets = [];
class Bullet {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.life = true;
    }
    draw()
    {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 8, 0, Math.PI *2, false);
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
    move()
    {   
        this.y = this.y -2; 
    }
}

// Score
let score = 0;
function drawScore() {
  ctx.beginPath();
  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.fillText(`Score : ${score}`, 20, 40);
  ctx.closePath();
};

// reset all Values
function setValuesToBegin()
{
    shipX = canvas.width / 2;
    shipY = canvas.height - shipHeight;
    score = 0;
    barHealth = 50;
    animationFrameId = 0;
    gameOver = false;
    colorBar = "green";
    Asteroids = [];
    bullets = [];
    shipSpeed = 1.5;
    asteroidSpeed = 1;
    startTime = 121;
    timeOfAsteroids = 200;
}

// timer
let startTime = 120;
function drawTimer()
{
    ctx.beginPath();
    ctx.font = "20px Impact";
    ctx.fillStyle = "white";
    ctx.fillText(`Timer : ${startTime}s`, canvas.width - 150, 38);
    ctx.closePath();
    if(animationFrameId % 140 === 0)
    {
        if (startTime > 0)
        {
            startTime -= 1;
        }
        if (startTime === 100)
        {
            asteroidSpeed = 3;
            timeOfAsteroids = 150;
        }
        else if(startTime === 80)
        {
            asteroidSpeed = 4;
            timeOfAsteroids = 100;
        }
        else if(startTime === 50)
        {
            timeOfAsteroids = 50;
        }
        else if(startTime === 30)
        {
            timeOfAsteroids = 20;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, background1Y, canvas.width, canvas.height);
    ctx.drawImage(background, 0, background2Y, canvas.width, canvas.height);
    drawScore();
    drawTimer();
    // Boss is drawing
    ctx.drawImage(boss, bossX, bossY, bossWidth, bossWidth);
    healthBarBoss ();

    //Check distance between bullet and asteroid and set life to false if needed
    bullets.forEach(bullet => {
        Asteroids.forEach(asteroid => {
            const distance = Math.hypot((asteroid.x + 30) - bullet.x, (asteroid.y + 30) - bullet.y);
            
            if (distance < 25)
            {
                asteroid.life = false;
                bullet.life = false;
                score += 10;
            }
        });
    });
    //Check distance between bullet (SpaceShip) and Boss
    bullets.forEach(bullet => {
        const distance = Math.hypot(bullet.x  - (bossX + bossWidth/2) , bullet.y - (bossY + bossHeight/2));
        if (distance < 50)
        {
            bullet.life = false;
            if(bossHealth > 0)
            {
                bossHealth -= 2.5;
            }
        }
    });
    //Check distance between SpaceShip and Boss
    const distanceShipBoss = Math.hypot((shipX + shipWidth/2)  - (bossX + bossWidth/2) , (shipY + shipHeight/2) - (bossY + bossHeight/2));
    if (distanceShipBoss < 60)
    {         
        if(barHealth > 0)
        {
            barHealth -= 0.2;
        }
        if(bossHealth > 0)
        {
            bossHealth -= 0.1;
        }
    }



    // Check distance between asteroids and SpaceShip
    Asteroids.forEach(asteroid => {
        const distanceShip = Math.hypot((asteroid.x + 30) - (shipX + shipWidth/2) , (asteroid.y + 30) - (shipY + shipHeight/2) );
            if (distanceShip < 60)
            {
                asteroid.life = false;
                if(barHealth > 0)
                {
                    barHealth -= 5;
                }
            }
    });
    // check Health
    if(bossHealth < 30)
    {
        colorBarBoss = "yellow";
    }
    if(bossHealth < 15)
    {
        colorBarBoss = "red";
    
    }
    // check Health from Ship
    if(barHealth < 30)
    {
        colorBar = "yellow";
    }
    if(barHealth < 15)
    {
        colorBar = "red";
    }
    // Ship is destroyed - GameOver 
    if(barHealth <= 0)
    {
        gameOver = true;
    }

    const nextBullet = bullets.filter(element => element.y > 0 && element.life);
    
    if(bulletFly)
    {
        setTimeout(()=>{reloading = false}, 200);
        nextBullet.push(new Bullet(shipX + 50,shipY)); 
        bulletFly = false; 
        reloading = true;
    }
     
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
    // Ship is drawing
    ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);

    // Bullet draw and move
    nextBullet.forEach(element => {
        element.draw();
        element.move();
        });

    bullets = nextBullet; 

    // HealthBar is created
    healthBar ();
    
    // Asteroids

    let Asteroids2 = Asteroids.filter(element => element.y < canvas.height && element.life);

    if(animationFrameId % timeOfAsteroids === 0)
    {
        Asteroids2.push(new Asteroid())
    }
    
    Asteroids2.forEach(element => {
        ctx.drawImage(asteroid, element.x, element.y, 60, 60);
        asteroid.src = asteroidArray[1];
        element.move();
    });

    Asteroids = Asteroids2;
    
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
        gameState2.style.display = "none";
        gameState3.style.display = "block";
    } 
    else
    {
        animationFrameId = requestAnimationFrame(animate);
    }

    if(startTime === 0)
    {
        cancelAnimationFrame(animationFrameId);
        gameState2.style.display = "none"; 
        gameState4.style.display = "block"; 
    }
    
}

function startGame() {
    gameState1.style.display = "none";
    gameState2.style.display = "block";
    gameState3.style.display = "none";
    gameState4.style.display = "none";
    animate();
  };


  window.onload = () => {
    document.getElementById('playBtn').onclick = () => {
    startGame();
    };
    document.getElementById('tryAgainBtn').onclick = () => {
        setValuesToBegin();
        startGame();
    };
    document.getElementById('tryAgainBtn2').onclick = () => {
        setValuesToBegin();
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
        if (event.code === "Space"){
            if(!reloading)
            {
                bulletFly = true;
            }
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
        if (event.code === "Space"){
                bulletFly = false;
        } 

      });
  };