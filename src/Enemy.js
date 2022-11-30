import MovingDirection from "./MovingDirection.js";
  export default class Enemy{

    constructor(x, y, tileSize, velocity, tileMap, nro){
      this.x = x;
      this.y = y;
      this.tileSize = tileSize;
      this.velocity = velocity;
      this.tileMap = tileMap;


      this.#loadImg(nro);

      this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
      
      this.directionTimerDefault = this.#random(5,10);
      this.directionTimer = this.directionTimerDefault;

    }

    draw(context, pause){
      if(!pause){
        this.#move();
        this.#changeDirection();
      }
      context.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    collideWith(pacWarrior){
      const size = this.tileSize /2;
      if(this.x < pacWarrior.x + size &&
        this.x + size > pacWarrior.x &&
        this.y < pacWarrior.y + size &&
        this.y + size > pacWarrior.y){
          return true;
        }
        else{
          return false;
        }
    }

    #move(){
      if(!this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection
      )){
        switch(this.movingDirection){
          case MovingDirection.up:
            this.y -= this.velocity;
            break;
          case MovingDirection.down:
            this.y += this.velocity;
            break;
          case MovingDirection.left:
            this.x -= this.velocity;
            break;
          case MovingDirection.right:
            this.x += this.velocity;
            break;
        }
      }
    }

    #changeDirection(){
      this.directionTimer--;
      let newMoveDirection = null;
      if(this.directionTimer == 0){
        this.directionTimer = this.directionTimerDefault;
        newMoveDirection = Math.floor(
          Math.random() * Object.keys(MovingDirection).length
        );
      }

      if(newMoveDirection != null && this.movingDirection != newMoveDirection){
        if(Number.isInteger(this.x/this.tileSize)&&
          Number.isInteger(this.y/this.tileSize)){
            if(!this.tileMap.didCollideWithEnvironment(this.x,this.y,newMoveDirection)){
              this.movingDirection = newMoveDirection;
            }
          }
      }
    }

    #random(min, max){
      return Math.floor(Math.random() * (max - min + 1 ) + min);
    }

    #loadImg(nro){
      this.enemyPink = new Image();
      this.enemyPink.src = "../img/EnemyPink.png";
      this.enemyBlue = new Image();
      this.enemyBlue.src = "../img/EnemyBlue.png";
      this.enemyGreen = new Image();
      this.enemyGreen.src = "../img/EnemyGreen.png";
      if(nro==0)
        this.image = this.enemyPink;
      else if (nro==1) 
        this.image =this.enemyBlue;
      else if(nro == 2)
        this.image =this.enemyGreen;
    }    

  }