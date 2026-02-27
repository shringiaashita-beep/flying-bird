// ===============================
// 1️⃣ Canvas Setup
// ===============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;


// ===============================
// 2️⃣ Bird Setup
// ===============================

let bird = {
    x: 80,
    y: 250,
    width: 25,
    height: 25,
    gravity: 0.6,
    lift: -12,
    velocity: 0
};


// ===============================
// 3️⃣ Game Variables
// ===============================

let pipes = [];
let gap = 220;
let score = 0;
let gameOver = false;


// ===============================
// 4️⃣ Keyboard Controls
// ===============================

document.addEventListener("keydown", function (e) {

    // Jump
    if ((e.code === "Space" || e.key === " ") && !gameOver) {
        bird.velocity = bird.lift;
    }

    // Restart
    if (e.code === "Enter" && gameOver) {
        restartGame();
    }
});


// ===============================
// 5️⃣ Create Pipes
// ===============================

function createPipe() {

    let minHeight = 50;
    let maxHeight = canvas.height - gap - 50;

    let topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

    pipes.push({
        x: canvas.width,
        width: 60,
        top: topHeight,
        bottom: canvas.height - topHeight - gap
    });
}


// ===============================
// 6️⃣ Draw Bird (Circle)
// ===============================

function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(
        bird.x + bird.width / 2,
        bird.y + bird.height / 2,
        bird.width / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}


// ===============================
// 7️⃣ Draw Pipes
// ===============================

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


// ===============================
// 8️⃣ Collision Detection
// ===============================

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


// ===============================
// 9️⃣ Draw Score
// ===============================

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 40);
}


// ===============================
// 🔟 Restart Game
// ===============================

function restartGame() {
    bird.y = 250;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}


// ===============================
// 1️⃣1️⃣ Game Loop
// ===============================

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {

        // Bird physics
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Prevent going out of screen
        if (bird.y < 0) bird.y = 0;
        if (bird.y + bird.height > canvas.height) {
            gameOver = true;
        }

        // Create pipes randomly
        if (Math.random() < 0.02) {
            createPipe();
        }

        // Move pipes
        pipes.forEach(pipe => {
            pipe.x -= 2;
            checkCollision(pipe);

            if (pipe.x + pipe.width === bird.x) {
                score++;
            }
        });

        drawBird();
        drawPipes();
        drawScore();

    } else {

        drawBird();
        drawPipes();
        drawScore();

        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", 120, 300);
        ctx.font = "18px Arial";
        ctx.fillText("Press Enter to Restart", 90, 340);
    }

    requestAnimationFrame(update);
}


// ===============================
// 🚀 Start Game
// ===============================

update();
