function createCanvas() {

    var body = document.getElementById("body");
    var div = document.createElement("div");
    div.id = "gameContainer";
    var game = document.createElement("canvas");
    game.id = "gameCanvas";

    var height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 5;
    if (height < 100) {
        document.getElementById("mainTitle").style.fontSize = "6px";
        document.getElementById("options").style.fontSize = "6px";
        height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 10;
    } else if (height < 200) {
        document.getElementById("mainTitle").style.fontSize = "8px";
        document.getElementById("options").style.fontSize = "8px";
        height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 10;
    } else if (height < 300) {
        document.getElementById("mainTitle").style.fontSize = "12px";
        document.getElementById("options").style.fontSize = "12px";
        height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 10;
    } else if (height < 400) {
        document.getElementById("mainTitle").style.fontSize = "16px";
        document.getElementById("options").style.fontSize = "16px";
        height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 10;
    } else if (height < 500) {
        document.getElementById("mainTitle").style.fontSize = "18px";
        document.getElementById("options").style.fontSize = "18px";
        height = $(window).height() - $("#mainTitle").height() * 2 - $(".options").height() - 10;
    };


    game.width = height * 2;
    game.height = height;
    var paddle = {
        paddleWidth: height / 32,
        paddleHeight: height / 6
    };
    var ctx = game.getContext("2d");

    div.appendChild(game);
    body.appendChild(div);

    startGame(paddle, height, ctx, game);
};
