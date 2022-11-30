import PacWarrior from "./PacWarrior.js";
import MovingDirection from "./MovingDirection.js";
import Enemy from "./Enemy.js";
export default class TileMap{
  constructor(tileSize){
    this.tileSize = tileSize;
    //WALL PNG ----
    // EXTERIORS WALLS
    this.DLCornerWall = new Image()
    this.DLCornerWall.src = "../img/DLCornerWall.png"; 
    this.DRCornerWall = new Image()
    this.DRCornerWall.src = "../img/DRCornerWall.png"; 
    this.ULCornerWall = new Image()
    this.ULCornerWall.src = "../img/ULCornerWall.png"; 
    this.URCornerWall = new Image()
    this.URCornerWall.src = "../img/URCornerWall.png";
    this.DownWall = new Image();
    this.DownWall.src = "../img/DownWall.png";
    this.LeftWall = new Image();
    this.LeftWall.src = "../img/LeftWall.png";
    this.RightWall = new Image();
    this.RightWall.src = "../img/RightWall.png";
    this.UpWall = new Image();
    this.UpWall.src = "../img/UpWall.png";
    //MID MAP WALLS
    this.MidDLCornerWall = new Image();
    this.MidDLCornerWall.src = "../img/MidDLCornerWall.png";
    this.MidDRCornerWall = new Image();
    this.MidDRCornerWall.src = "../img/MidDRCornerWall.png";
    this.MidULCornerWall = new Image();
    this.MidULCornerWall.src = "../img/MidULCornerWall.png";
    this.MidURCornerWall = new Image();
    this.MidURCornerWall.src = "../img/MidURCornerWall.png";
    this.MidHWall = new Image();
    this.MidHWall.src = "../img/MidHWall.png";
    this.MidVWall = new Image();
    this.MidVWall.src = "../img/MidVWall.png";
    //FOOD PNG value = 0 ----
    this.Food = new Image();
    this.Food.src = "../img/Food.png";  
  }
/* POSITION VALUES
    1 = UpWal     5 = MidHWall        12 = DRCronerWall 91 = MidDRCornerWall 44 = Empty
    2 = DownWall  6 = MidVWall        13 = DLCornerWall 92 = MidDLCornerWall
    3 = LeftWall  7 = MidURCornerWall 21 = URCornerWall 11 = PacWarrior
    4 = RightWall 8 = MidULCornerWall 22 = ULCornerWall 31 = EnemyBlue/EnemyGreen/EnemyPink
*/
  map = [
    [12,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,13],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [3,0,5,5,5,0,0,0,6,0,6,0,0,0,5,5,5,0,4],
    [3,0,0,0,0,0,91,5,8,0,7,5,92,0,0,0,0,0,4],
    [3,0,6,0,6,0,0,31,0,32,0,33,0,0,6,0,6,0,4],
    [3,0,7,5,8,0,7,5,5,5,5,5,8,0,7,5,8,0,4],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [3,0,5,5,5,0,5,5,5,5,5,5,5,0,5,5,5,0,4],
    [3,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,4],
    [3,0,91,5,92,0,5,5,5,0,5,5,5,0,91,5,92,0,4],
    [3,0,6,0,6,0,0,0,0,0,0,0,0,0,6,0,6,0,4],
    [3,0,0,0,0,0,6,0,6,0,6,0,6,0,0,0,0,0,4],
    [3,0,5,5,5,0,7,5,8,0,7,5,8,0,5,5,5,0,4],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    [21,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,22],
  ];

  draw(context) {
    for (let row = 0; row < this.map.length; row++){
      for (let column = 0; column < this.map[row].length; column++){
        let tile = this.map[row][column];
        if(tile === 1){
          this.#drawUpWall(context, column, row, this.tileSize);
        } else if(tile === 12){
          this.#drawDRCornerWall(context, column, row, this.tileSize);
        } else if(tile === 13){
          this.#drawDLCornerWall(context, column, row, this.tileSize);
        } else if(tile === 3){
          this.#drawLeftWall(context, column, row, this.tileSize);
        } else if(tile === 4){
          this.#drawRightWall(context, column, row, this.tileSize);
        } else if(tile === 21){
          this.#drawURCornerWall(context, column, row, this.tileSize);
        } else if(tile === 22){
          this.#drawULCornerWall(context, column, row, this.tileSize);
        } else if(tile === 2){
          this.#drawDownWall(context, column, row, this.tileSize);
        } else if(tile === 5){
          this.#drawMidHWall(context, column, row, this.tileSize);
        } else if(tile === 6){
          this.#drawMidVWall(context, column, row, this.tileSize);
        } else if(tile === 7){
          this.#drawMidURCornerWall(context, column, row, this.tileSize);
        } else if(tile === 8){
          this.#drawMidULCornerWall(context, column, row, this.tileSize);
        } else if(tile === 91){
          this.#drawMidDRCornerWall(context, column, row, this.tileSize);
        } else if(tile === 92){
          this.#drawMidDLCornerWall(context, column, row, this.tileSize);
        } else if(tile === 0){
          this.#drawFood(context, column, row, this.tileSize);
        } else {
          this.#drawBlank(context, column, row, this.tileSize);
        }
      }
    }
  }

  #drawFood(context,column,row,size){
    context.drawImage(
      this.Food,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidDLCornerWall(context,column,row,size){
    context.drawImage(
      this.MidDLCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidDRCornerWall(context,column,row,size){
    context.drawImage(
      this.MidDRCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidULCornerWall(context,column,row,size){
    context.drawImage(
      this.MidULCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidURCornerWall(context,column,row,size){
    context.drawImage(
      this.MidURCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidVWall(context,column,row,size){
    context.drawImage(
      this.MidVWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawMidHWall(context,column,row,size){
    context.drawImage(
      this.MidHWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawDownWall(context,column,row,size){
    context.drawImage(
      this.DownWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawULCornerWall(context,column,row,size){
    context.drawImage(
      this.ULCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawURCornerWall(context,column,row,size){
    context.drawImage(
      this.URCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawRightWall(context,column,row,size){
    context.drawImage(
      this.RightWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawLeftWall(context,column,row,size){
    context.drawImage(
      this.LeftWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawDLCornerWall(context,column,row,size){
    context.drawImage(
      this.DLCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawDRCornerWall(context,column,row,size){
    context.drawImage(
      this.DRCornerWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawUpWall(context,column,row,size){
    context.drawImage(
      this.UpWall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    )
  }
  #drawBlank(context,column,row,size){
    context.fillStyle = "black";
    context.fillRect(
      column * this.tileSize,
      row * this.tileSize,
      size,
      size);
  }

  getPacWarrior(velocity){
    for (let row = 0; row < this.map.length; row++){
      for (let column = 0; column < this.map[row].length; column++){
        let tile = this.map[row][column];
        if(tile === 11){
          this.map[row][column] = 0;
          return new PacWarrior(
            column * this.tileSize,
            row * this.tileSize, 
            this.tileSize,
            velocity, 
            this);
        }
      }
    }
  }

  getEnemies(velocity){

    const enemies = [];

    for (let row = 0; row < this.map.length; row++){      
      for (let column = 0; column < this.map[row].length; column++){
        const tile = this.map[row][column];
        if(tile == 31){
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this,
              0
            )
          );
        } else if(tile == 32){
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this,
              1
            )
          );
        } else if(tile == 33){
          this.map[row][column] = 0;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this,
              2
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas){
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x,y,direction){

    if(direction == null){
      return;
    }

    if(Number.isInteger(x/this.tileSize) &&
    Number.isInteger(y / this.tileSize)
    ){
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch(direction){
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if(tile !== 0 && tile !== 44){
          return true;
      }      
    }
    return false;
  }

  didWin(){
    return this.#foodLeft() === 0;
  }

  #foodLeft (){
    return this.map.flat().filter((tile)=> tile ===0).length;
  }

  eatFood(x,y){
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if(Number.isInteger(row) && Number.isInteger(column)){
      if(this.map[row][column] === 0){
        this.map[row][column] = 44;
        return true;
      }
    }
    return false;
  }
}