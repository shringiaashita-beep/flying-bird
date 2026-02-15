const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = 200;
let birdX = 50;
let gravity = 0.6;
let velocity = 0;
let lift = -10;

let pipes = [];
let pipeWidth = 50;
let gap = 120;
let frame = 0;
let score = 0;
let gameOver = false;

// Draw Bird
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(birdX, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Pipes
function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + gap, pipeWidth, canvas.height);
    });
}

// Update Pipes
function updatePipes() {
    if (frame % 90 === 0) {
        let topHeight = Math.random() * 250 + 50;
        pipes.push({ x: canvas.width, top: topHeight });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;

        // Collision detection
        if (
            birdX + 15 > pipe.x &&
            birdX - 15 < pipe.x + pipeWidth &&
            (birdY - 15 < pipe.top || birdY + 15 > pipe.top + gap)
        ) {
            gameOver = true;
        }

        // Score
        if (pipe.x === birdX) {
            score++;
        }
    });

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

// Update Game
function update() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", 120, 250);
        ctx.fillText("Score: " + score, 140, 290);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    velocity += gravity;
    birdY += velocity;

    if (birdY > canvas.height || birdY < 0) {
        gameOver = true;
    }

    drawBird();
    drawPipes();
    updatePipes();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);

    frame++;
    requestAnimationFrame(update);
}

// Fly on Space Key
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        velocity = lift;
    }
});

// Start Game
update();
