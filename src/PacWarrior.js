import MovingDirection from "./MovingDirection.js";

export default class PacWarrior {
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestMovingDirection = null;

    this.pacWarriorAnimationTimerDefault = 10;
    this.pacWarriorAnimationTimer = null;

    this.pacWarriorRotation = this.Rotation.right;
    this.waka = new Audio("../sound/Waka.wav");

    this.madeFirstMove = false;

    document.addEventListener("keydown",this.#keydown);

    this.#loadPacWarriorImg();
  }

  Rotation = {
    right:0,
    down:1,
    left:2,
    up:3,
  }

  draw(context,pause){
    if(!pause){
      this.#move();
      this.#animate();
    }
    this.#eatFood();

    const size = this.tileSize/2;
    context.save();
    context.translate(this.x + size, this.y + size);
    context.rotate((this.pacWarriorRotation * 90 * Math.PI) / 180);
    context.drawImage(
      this.PacImgs[this.PacImgsIdx],
      -size,
      -size,
      this.tileSize,
      this.tileSize
    );
    context.restore();    
  };

  #loadPacWarriorImg(){

    const PacWarriorOne = new Image();
    PacWarriorOne.src = "../img/PacWarriorOne.png";

    const PacWarriorTwo = new Image();
    PacWarriorTwo.src = "../img/PacWarriorTwo.png";

    const PacWarriorThree = new Image();
    PacWarriorThree.src = "../img/PacWarriorThree.png";

    const PacWarriorFour = new Image();
    PacWarriorFour.src = "../img/PacWarriorTwo.png";

    this.PacImgs = [
      PacWarriorOne,
      PacWarriorTwo,
      PacWarriorThree,
      PacWarriorFour,
    ];

    this.PacImgsIdx = 0;

  }

  #keydown =(e)=>{
    //up
    if(e.keyCode == 38){
      if(this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestMovingDirection = MovingDirection.up;
      this.madeFirstMove = true;
    }
    //down
    if(e.keyCode == 40){
      if(this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestMovingDirection = MovingDirection.down;
      this.madeFirstMove = true;
    }    
    //left
    if(e.keyCode == 37){
      if(this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestMovingDirection = MovingDirection.left;
      this.madeFirstMove = true;    
    }
    //right
    if(e.keyCode == 39){
      if(this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestMovingDirection = MovingDirection.right;
      this.madeFirstMove = true;
    }
  }

  #move(){
    if(this.currentMovingDirection !== this.requestMovingDirection){
      if(Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)){
          if(!this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestMovingDirection
          ))
          this.currentMovingDirection = this.requestMovingDirection;
        }
    }

    if(this.tileMap.didCollideWithEnvironment(
      this.x,
      this.y,
      this.currentMovingDirection)
      ){
        this.pacWarriorAnimationTimer = null;
        return;
      }
      else if (this.currentMovingDirection != null &&
        this.pacWarriorAnimationTimer == null){
          this.pacWarriorAnimationTimer = this.pacWarriorAnimationTimerDefault;
        }

    switch(this.currentMovingDirection){
      case MovingDirection.up:
        this.y -= this.velocity;
        this.pacWarriorRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.pacWarriorRotation = this.Rotation.down;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        this.pacWarriorRotation = this.Rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.pacWarriorRotation = this.Rotation.right;
        break;
    }
  }

  #animate(){
    if(this.pacWarriorAnimationTimer == null){
      return;
    }
    this.pacWarriorAnimationTimer--
    if(this.pacWarriorAnimationTimer == 0){
      this.pacWarriorAnimationTimer = this.pacWarriorAnimationTimerDefault;
      this.PacImgsIdx++;
      if(this.PacImgsIdx == this.PacImgs.length)
      this.PacImgsIdx = 0;
    }
  }

  #eatFood(){
    if(this.tileMap.eatFood(this.x, this.y) && this.madeFirstMove){
      this.waka.play();
    }
  }
}