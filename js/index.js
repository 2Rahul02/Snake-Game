// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let speed = 0.2;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    //recursively calling main function to get frames
    window.requestAnimationFrame(main);
    console.log(ctime)
        //to slow down the speed according to our requirement when ever current
        //bw currentTime and LastPainttime is < speed just return from that position of call stack
    if ((ctime - lastPaintTime) / 1000 < speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        speed = 0.2;
        const gameOver = document.getElementById('gameover');
        gameOver.style.display = 'block';
        setTimeout(() => {
            gameOver.style.display = 'none';
            location.reload();
        }, 3000);
        snakeArr = [{ x: 13, y: 15 }];

        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed = speed - 0.01;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        //unshift is a predefined function which add one more element or object to first index of array
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
            //by multiplying (b-a)to math.random we get random numbers from 0 to (b-a) but according to our need 
            //we will add a to the result and we will get random numbers from a to b
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
        //i have use spread operator here because spread operator give us all the values that are conatained by an object 
        //if we simply assign then i+1 pointer will start pointing to i pointer and that will go contiuesly and in the end all elements will start pointing to one element
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = " "; //first clearing everything from board otherwise our board will fill out with snakes
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) { //if firstIndex then create head of snake
            snakeElement.classList.add('head');
        } else { //tail of snake
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); //append as child in board grid at particular index
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
const startbtn = document.getElementById('btn');
startbtn.addEventListener('click', startGame);
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

function startGame() {
    inputDir = { x: 0, y: 1 }

    // window.addEventListener('keydown', e => 
    document.onkeydown = function(e) {
        inputDir = { x: 0, y: 1 } // Start the game
        moveSound.play();
        switch (e.key) {
            case "ArrowUp":
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
        }

    };
}