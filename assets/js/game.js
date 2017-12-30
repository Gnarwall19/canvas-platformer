(function () {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    player = {
        x: width / 2,
        y: height - 5,
        width: 5,
        height: 5,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false
    },
    keys = [];
friction = 0.8,
    gravity = 0.3;

var boxes = [];

// Dimensions
boxes.push({
    x: 0,
    y: 0,
    width: 10,
    height: height
});

boxes.push({
    x: 0,
    y: height - 2,
    width: width,
    height: 50
});

boxes.push({
    x: width - 10,
    y: 0,
    width: 50,
    height: height
});


canvas.width = width;
canvas.height = height;

function update() {
    // Check keys
    if (keys[38] || keys[32]) {
        // Up arrow or space
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
        }

    }
    if (keys[39]) {
        // Right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37]) {
        // Left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    // Stats that look cool
    /*
        console.log(player.velY);
        console.log(player.x);
    */

    player.velX *= friction;
    player.velY += gravity;

    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= width - player.width) {
        player.x = width - player.width;
        // Adds 'elevator' wall jump on +x
        player.jumping = false;
    } else if (player.x <= 0) {
        player.x = 0;
        // Adds 'elevetor' wall jump on -x
        player.jumping = false;
    }

    if (player.y >= height - player.height) {
        player.y = height - player.height;
        player.jumping = false;
    }

    // Draw a small red box / our Player
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "black";
    ctx.beginPath();

    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    }

    ctx.fill();

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Run through the loop again
    requestAnimationFrame(update);
}


document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load", function () {
    update();
})