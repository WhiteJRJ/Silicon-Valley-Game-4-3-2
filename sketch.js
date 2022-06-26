const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 500;

var score = 5000;

function preload() {
  backgroundImg = loadImage("./assets/scifi.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(300, playerBase.body.position.y - 153, 180, 180);
  playerArcher = new PlayerArcher(
    360,
    playerBase.body.position.y - 150,
    120,
    120
  );

  board1 = new Board(width - 300, 330, 150, 200);
  board2 = new Board(width - 550, height - 300, 150, 200);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();
  //board1.debug = true
  //board2.debug = true
  if(score <=0){
    swal(
      {
        title: `You Win!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    )
  }

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var board1Collision = Matter.SAT.collides(
        board1.body,
        playerArrows[i].body
      );

      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

      /*if (board1Collision || board2Collision) {
        score += 5;
      }*/

      /*if (board1Collision.collided && board2Collision.collided) {
        score += 5;
      }*/

      if (board1Collision.collided || board2Collision.collided) {
        score -= 5;
      }

      /*if (board1Collision.collided || board2Collision.collided) {
        score = 5;
      }*/

      
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EARTH GOO", width / 2, 100);

  // Score
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Boss Health " + score, width - 200, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Bullets : " + numberOfArrows, 200, 100);

  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

  if (numberOfArrows == 0) {
    gameOver();
  }

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x + 80;
      var posY = playerArcher.body.position.y - 10;
      var angle = playerArcher.body.angle - 90

      var arrow = new PlayerArrow(posX, posY, 50, 35, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


