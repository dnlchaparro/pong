function createCanvas() {

    var body = document.getElementById("body");

    var div = document.createElement("div");
    div.id = "gameContainer";

    var game = document.createElement("canvas");
    game.id = "gameCanvas";

    var height = $(window).height() - $("#mainTitle").height() * 2 - 5;

    if (height < 200) {
        document.getElementById("mainTitle").style.fontSize = "12px";
        height = $(window).height() - $("#mainTitle").height() * 2 - 5;
    } else if (height < 400) {
        document.getElementById("mainTitle").style.fontSize = "18px";
        height = $(window).height() - $("#mainTitle").height() * 2 - 5;
    };

    game.width = height * 2;
    game.height = height;

    var paddle = {
        paddleWidth: height / 32,
        paddleHeight: height / 6
    };

    /*var message = document.createElement("div");
    div.id = "return";
    var button = document.createElement("BUTTON");
    div.id = "return";
    */

    div.appendChild(game);
    body.appendChild(div);
    //message.appendChild(button);
    //body.appendChild(message);

    var ctx = game.getContext("2d");
    // Create Board
    ctx.fillStyle = "#c4d8e2";
    ctx.fillRect(0, 0, height * 2, height);
    ctx.clearRect(5, 5, height - 7.5, height - 10);
    ctx.clearRect(height + 2.5, 5, height - 7.5, height - 10);
    ctx.strokeStyle = "#c4d8e2";
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(height, height / 2, height / 8, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = "#1d1d1d";
    ctx.beginPath();
    ctx.arc(height, height / 2, height / 8 - 2, 0, 2 * Math.PI);
    ctx.fill();

    // Create Player and Opponent
    startPaddle(paddle, height, ctx, game);
};
