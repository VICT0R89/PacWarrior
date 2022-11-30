import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const pacWarrior = tileMap.getPacWarrior(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio("../sound/Over.wav");
const gameWinSound = new Audio("../sound/Win.wav");

function gameLoop(){
  tileMap.draw(context);
  drawGameEnd();
  pacWarrior.draw(context,pause());
  enemies.forEach((enemy) => enemy.draw(context,pause()));
  checkGameOver();
  checkGameWin();
}

function checkGameWin(){
  if(!gameWin){
    gameWin = tileMap.didWin();
    if(gameWin){
      gameWinSound.play();
    }
  }
}

function checkGameOver(){
  if (!gameOver){
    gameOver = isGameOver();
  if(gameOver){
    gameOverSound.play();
  }
  }
}

function isGameOver(){
  return enemies.some(
    (enemy)=> enemy.collideWith(pacWarrior)
    );
}

function pause(){
  return !pacWarrior.madeFirstMove || gameOver ||gameWin;
}

function drawGameEnd(){
  if(gameOver || gameWin){
    let text = " YOU WIN!! ";
    if(gameOver){
      text = "GAME OVER";
    }
    context.fillStyle = "black";
    context.fillRect(0, canvas.height / 3, canvas.width, 100);
    context.font = "80px comic sans";
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop('0','magenta');
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    context.fillStyle = gradient;
    context.fillText(text,70, canvas.height /2);
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);