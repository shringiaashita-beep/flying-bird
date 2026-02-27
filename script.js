// ==============================
// 1️⃣ Canvas Setup (Game Engine)
// ==============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1300;
canvas.height = 1700;


// ==============================
// 2️⃣ Bird Object
// ==============================

let bird = {
    x: 80,
    y: 200,
    width: 30,
    height: 30,
    gravity: 0.5,
    lift: -10,
    velocity: 0
};


// ==============================
// 3️⃣ Pipes Array
// ==============================

let pipes = [];
let gap = 150;
let score = 0;
let gameOver = false;


// ==============================
// 4️⃣ Controls (Spacebar Jump)
// ==============================

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !gameOver) {
        bird.velocity = bird.lift;
    }

    // Restart game
    if (e.code === "Enter" && gameOver) {
        restartGame();
    }
});


// ==============================
// 5️⃣ Create Pipes
// ==============================

function createPipe() {
    let topHeight = Math.random() * 300;

    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: canvas.height - topHeight - gap,
        width: 50
    });
}


// ==============================
// 6️⃣ Draw Bird
// ==============================

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}


// ==============================
// 7️⃣ Draw Pipes
// ==============================

function drawPipes() {
    ctx.fillStyle = "green";

    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);

        // Bottom pipe
        ctx.fillRect(
            pipe.x,
            canvas.height - pipe.bottom,
            pipe.width,
            pipe.bottom
        );
    });
}


// ==============================
// 8️⃣ Collision Detection
// ==============================

function checkCollision(pipe) {
    if (
        bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.top ||
         bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
        gameOver = true;
    }
}


// ==============================
// 9️⃣ Draw Score
// ==============================

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 40);
}


// ==============================
// 🔟 Game Over Screen
// ==============================

function drawGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 100, 250);

    ctx.font = "18px Arial";
    ctx.fillText("Press Enter to Restart", 90, 300);
}


// ==============================
// 1️⃣1️⃣ Restart Game
// ==============================

function restartGame() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}


// ==============================
// 1️⃣2️⃣ Game Loop (Main Engine)
// ==============================

function update() {

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {

        // Bird physics
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Create pipes randomly
        if (Math.random() < 0.02) {
            createPipe();
        }

        // Move pipes
        pipes.forEach(pipe => {
            pipe.x -= 2;

            // Check collision
            checkCollision(pipe);

            // Increase score
            if (pipe.x + pipe.width === bird.x) {
                score++;
            }
        });

        drawBird();
        drawPipes();
        drawScore();

        // Ground collision
        if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
            gameOver = true;
        }

    } else {
        drawBird();
        drawPipes();
        drawScore();
        drawGameOver();
    }

    requestAnimationFrame(update);
}


// ==============================
// 🚀 Start Game
// ==============================

update();
