//game constants
var lastPaintTime = 0;
let SNAKE_SPEED = 2;
let inputDirection = {
   x: 0,y: 0
}
let lastInputDirection = inputDirection;
let gameOver = false;
window.addEventListener('click' , () =>{
   document.getElementById("Theme song").play();
})


const EXPENTION_AMOUNT = 1;
var score = 0;
const snakeBody = [
    {x: 8,y: 8},
];
let food = getFoodrandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");

function paint(currentTime) {
   var TimeSeconds = (currentTime - lastPaintTime) / 1000;
   requestAnimationFrame(paint);
   if (TimeSeconds < 1 / SNAKE_SPEED) return;
   lastPaintTime = currentTime;

   if (gameOver != true) {
      update();
      draw();
   }
}

window.requestAnimationFrame(paint);
//display snake and food
function draw() {
   drawSnake();
   drawFood();
}

function update() {
   gameBoard.innerHTML = "";
   snakeMove();
   snakeEatFood();
}
//display snkae on board
function drawSnake() {
   snakeBody.forEach((segment, index) => {
      var snakeElement = document.createElement("div");
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.style.gridRowStart = segment.y;
      // snakeElement.innerHTML = index;
      snakeElement.style.transform = "rotate(0deg)";
      if (index == 0) {
         snakeElement.classList.add("head");

         if (inputDirection.x == 1) {
            snakeElement.style.transform = "rotate(-90deg)";
         } else if (inputDirection.x == -1) {
            snakeElement.style.transform = "rotate(90deg)";
         } else if (inputDirection.y == -1) {
            snakeElement.style.transform = "rotate(180deg)";
         } else if (inputDirection.y == 1) {
            snakeElement.style.transform = "rotate(0deg)";
         }
      } else {
         snakeElement.classList.add("snake");
      }
      gameBoard.appendChild(snakeElement);

   });
}
//display food on board
function drawFood() {
   var foodElement = document.createElement("div");
   foodElement.style.gridColumnStart = food.x;
   foodElement.style.gridRowStart = food.y;
   foodElement.classList.add("food");
   gameBoard.appendChild(foodElement);
}
//moving the snake
function snakeMove() {
   inputDirection = getInputDirection();

   for (i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = {
         ...snakeBody[i]
      }
   }
   snakeBody[0].x += inputDirection.x;
   snakeBody[0].y += inputDirection.y;
   checkGameOver();
}

//controlling movement with help of keys
function getInputDirection() {
   window.addEventListener("keydown", e => {
      switch (e.key) {
         case 'ArrowUp':
            if (lastInputDirection.y == 1) break;
            inputDirection = {
               x: 0,
               y: -1
            }
            break;
         case 'ArrowDown':
            if (lastInputDirection.y == -1) break;
            inputDirection = {
               x: 0,
               y: 1
            }
            break;
         case 'ArrowLeft':
            if (lastInputDirection.x == 1) break;
            inputDirection = {
               x: -1,
               y: 0
            }
            break;
         case 'ArrowRight':
            if (lastInputDirection.x == -1) break;
            inputDirection = {
               x: 1,
               y: 0
            }
            break;
         default:
            inputDirection = {
               x: 0,
               y: 0
            }
      }
   })
   lastInputDirection = inputDirection;
   return inputDirection;
}

//when food is eaten
function snakeEatFood() {
   if (isEat()) {
      score += 10;
      scoreBox.innerHTML = score;
      console.log("eated")
      food = getFoodrandomPosition();
      SNAKE_SPEED++;
      expendSnake();
   }
}


function isEat() {
   return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
}
//placing food and diff. random position
function getFoodrandomPosition() {

   let a, b, myCondition = true;
   while (myCondition) {
      a = Math.ceil(Math.random() * 16);
      b = Math.ceil(Math.random() * 16);

      myCondition = snakeBody.some(segment => {
         return segment.x === a && segment.y === b;
      })
   }
   return {
      x: a,
      y: b
   };
}
//joining each unit after eat the food
function expendSnake() {
   for (i = 0; i < EXPENTION_AMOUNT; i++) {
      snakeBody.push(snakeBody[snakeBody.length - 1]);
   }
}
//alert when game is over
function checkGameOver() {
   if (snakeOutOfGrid() || snakeIntersection()) {
      alert("Game Over : You Loose, Press any key to replay!");
      gameOver = true;
      location.reload();
   }
}
//when snake move out of grid game is over
function snakeOutOfGrid() {
   return snakeBody[0].x < 0 || snakeBody[0].x > 16 || snakeBody[0].y < 0 || snakeBody[0].y > 16;
}
//when snake collides with its own body game is over.
function snakeIntersection() {
   for (i = 1; i < snakeBody.length; i++) {
      if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
         return true;
      }
   }
}