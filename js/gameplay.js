var canvas = null;
var ended = false;
var goals = 5;
var ctx = null;
var yPlayer = 0;
var yOpponent = 0;
var height = 0;
var movement = 0;
var paddle = new Object();
var dt = 50;
var dtPaddle = 25;
var difficulty = .4;
var ball = {
    r: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
};
var yMin = 8;
var yMax = 0;
var score = {
    player: 0,
    opponent: 0
};

function startGame(paddle, height, context, canvas) {
    yPlayer = 8;
    yOpponent = height - 8 - paddle.paddleHeight;
    yMax = yOpponent;
    this.paddle = paddle;
    this.height = height;
    ctx = context;
    this.canvas = canvas;
    movement = 10 * height / 512;
    ball.x = height;
    ball.y = height / 2;
    ball.r = height / 40;
    drawBoard();
    drawPaddles();
    drawBall();
    ctx.fillStyle = "rgba(119, 110, 226, 0.8)";
    ctx.fillRect(0, 0, height * 2, height);
    var font = "px Courier New";
    var size = height / 5;
    ctx.fillStyle = "#060606";
    ctx.font = size + font;
    ctx.fillText("Press 'up' key", 2 * height / 11, 2 * height / 3 - height / 5);
    ctx.fillText("to play", 2 * height / 9 + height / 3, 2 * height / 3);
};


// Move paddle
window.addEventListener('keydown', this.check, false);


function check(e) {
    ended = false;
    switch (e.keyCode) {
        case 38: // Move up
            if (ball.vx === 0) {
                startMoving();
            }
            drawBoard();
            if (yPlayer - movement >= yMin) {
                yPlayer -= movement;
            } else {
                yPlayer = yMin;
            }
            drawPaddles();
            drawBall();
            break;
        case 40: // Move down
            if (ball.vx === 0) {
                startMoving();
            }
            drawBoard();
            if (yPlayer + movement <= yMax) {
                yPlayer += movement;
            } else {
                yPlayer = yMax;
            }
            drawPaddles();
            drawBall();
            break;
    }
};

function startMoving() {
    if (Math.random() < .5) {
        ball.vx = 20 * height / 512;
    } else {
        ball.vx = -20 * height / 512;
    }
    if (Math.random() < .5) {
        ball.vy = 20 * height / 512;
    } else {
        ball.vy = -20 * height / 512;
    }
    doTimer();
};


function doTimer() {
    timerID = setInterval("moveBall()", dt);
    timerID2 = setInterval("moveOpponent()", dtPaddle);
};

// Move ball
function moveBall() {

    drawBoard();
    // Update ball direction
    var yCenter = ball.y + ball.vy * dt / 100;
    if (yCenter < ball.r || yCenter > height - ball.r) {
        ball.vy *= -1;
    }
    var xLeft = ball.x + ball.vx * dt / 100 - ball.r;
    var xRight = ball.x + ball.vx * dt / 100 + ball.r;

    if (xLeft <= 8 + paddle.paddleWidth || xRight >= height * 2 - 8 - paddle.paddleWidth) {
        if (yCenter >= yPlayer && yCenter <= yPlayer + paddle.paddleHeight && xLeft < height) {
            ball.vx *= -1.1;
        } else if (yCenter >= yOpponent && yCenter <= yOpponent + paddle.paddleHeight && xLeft > height) {
            ball.vx *= -1.1;
        } else if (xLeft < height) {
            // Opponent scores
            score.opponent += 1;
            ball.x = height;
            ball.y = height / 2;
            ball.vx = 0;
            ball.vy = 0;
            clearInterval(timerID);
            clearInterval(timerID2);
            if (score.opponent === goals) {
                endGame("You Lose!");
                ended = true;
            }
        } else {
            // Player scores
            score.player += 1;
            ball.x = height;
            ball.y = height / 2;
            ball.vx = 0;
            ball.vy = 0;
            clearInterval(timerID);
            clearInterval(timerID2);
            if (score.player === goals) {
                endGame("You Win!");
                ended = true;
            }
        }
    }
    // Update ball position
    if (!ended) {
        ball.x += ball.vx * dt / 100;
        ball.y += ball.vy * dt / 100;
        drawBall();
        drawPaddles();
    }
};


function moveOpponent() {
    var paddleUp = yOpponent + paddle.paddleHeight;
    var paddleDown = yOpponent;
    var paddleCenter = yOpponent + paddle.paddleHeight / 2;
    var error = 0;
    if (ball.vy < 0) {
        error = paddleUp - ball.y;
    } else {
        error = paddleDown - ball.y;
    }

    if (Math.random() < difficulty) {
        if (ball.x < height) { // Move to the center position
            if (height / 2 - paddleCenter > -movement - 1 && height / 2 - paddleCenter < movement + 1) {
                yOpponent = height / 2 - paddle.paddleHeight / 2;
            } else {
                if (height / 2 - paddleCenter < -movement) {
                    yOpponent -= movement;
                } else {
                    yOpponent += movement;
                }
            }
        } else { // Move to the ball position
            if (error > 0) {
                if (yOpponent - movement >= yMin) {
                    yOpponent -= movement;
                } else {
                    yOpponent = yMin;
                }
            } else {
                if (yOpponent + movement <= yMax) {
                    yOpponent += movement;
                } else {
                    yOpponent = yMax;
                }
            }
        }
    }
};

function endGame(winner) {
    score.player = 0;
    score.opponent = 0;
    ctx.fillStyle = "rgba(119, 110, 226, 0.8)";
    ctx.fillRect(0, 0, height * 2, height);
    var font = "px Courier New";
    var size = height / 5;
    ctx.fillStyle = "#060606";
    ctx.font = size + font;
    ctx.fillText(winner, height / 2, height / 2 - height / 5);
    ctx.fillText("Press 'up' key", 2 * height / 11, 2 * height / 3 - height / 5);
    ctx.fillText("to play again", 2 * height / 11, 6 * height / 7 - height / 5);
    yPlayer = 8;
    yOpponent = height - 8 - paddle.paddleHeight;
};

function drawBoard() {
    /*
    $(window).resize(function() {
        height = $(window).height() - $("#mainTitle").height() * 2 - 5;
    });*/

    ctx.fillStyle = "#c4d8e2";
    ctx.fillRect(0, 0, height * 2, height);
    ctx.clearRect(5, 5, height - 7.5, height - 10);
    ctx.clearRect(height + 2.5, 5, height - 7.5, height - 10);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#c4d8e2";
    ctx.arc(height, height / 2, height / 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "#060606";
    ctx.beginPath();
    ctx.arc(height, height / 2, height / 8 - 2, 0, 2 * Math.PI);
    ctx.fill();
};

function drawBall() {
    drawScore();
    ctx.fillStyle = "#c4d8e2";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fill();
}

function drawPaddles() {
    ctx.fillStyle = "#c4d8e2";
    ctx.fillRect(8, yPlayer, paddle.paddleWidth, paddle.paddleHeight);
    ctx.fillRect(height * 2 - 8 - paddle.paddleWidth, yOpponent, paddle.paddleWidth, paddle.paddleHeight);
};

function drawScore() {
    var font = "px Courier New";
    var size = height / 2;
    ctx.fillStyle = "#587fcc";
    ctx.font = size + font;
    ctx.fillText(score.player, height / 3, 2 * height / 3);
    ctx.fillText(score.opponent, 4 * height / 3, 2 * height / 3);
}

function changeDifficulty(difficulty) {
    this.difficulty = difficulty;
};
