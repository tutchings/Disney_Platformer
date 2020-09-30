//canvas variable declarations
var canvas = document.querySelector("#platformer-canvas");
var context = canvas.getContext("2d");

//game variable declarations
var gameLoop; 
var player;
var mapTextures = [];

//player input variable declarations
var upKey;
var rightKey;
var downKey;
var leftKey;


//run function when page loads
window.onload = function() {

    //create player
    player = new Player(100, 400); 
    
    //build map
    for (var i = 0; i < 6; i++) {
        mapTextures.push(new Border(0 + 100 * i, 620, 100, 100, 1));
    }
    mapTextures.push(new Border(0, 520, 100, 100, 2));
    for (var i = 0; i < 3; i++) {
        mapTextures.push(new Border(600, 420 + 100 * i, 100, 100, 2));
    }

    //create game loop
    //calls step function 30 times per second
    gameLoop = setInterval(step, 1000/30);

    setupInputs();


} //end onload function



function step() {

    //player step
    player.step();

    draw();

} //end function step()



function draw() {

    //clear canvas
    context.fillStyle = "#a4def9";
    context.fillRect(0,0,1280,720);

    //draw player
    player.draw();

    //draw map
    for (var i = 0; i < mapTextures.length; i++){
        mapTextures[i].draw();
    }

} //end function draw()



function setupInputs(){
    document.addEventListener("keydown", function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp') {
            upKey = true;
        } else if (event.key === 'a' || event.key === 'ArrowLeft') {
            leftKey = true;
        } else if (event.key === 's' || event.key === 'ArrowDown') {
            downKey = true;
        } else if (event.key === 'd' || event.key === 'ArrowRight') {
            rightKey = true;
        }
    }); //end keydown event listener

    document.addEventListener("keyup", function(event) {
        if (event.key === 'w' || event.key === 'ArrowUp') {
            upKey = false;
        } else if (event.key === 'a' || event.key === "ArrowLeft") {
            leftKey = false;
        } else if (event.key === 's' || event.key === "ArrowDown") {
            downKey = false;
        } else if (event.key === 'd' || event.key === "ArrowRight") {
            rightKey = false;
        }
    }); //end keyup event listener

} //end function setupInputs()



function checkIntersection(r1, r2) {

    if (r1.x >= r2.x + r2.width) {
        return false;
    } else if (r1.x + r1.width <= r2.x) {
        return false;
    }  else if (r1.y >= r2.y + r2.height) {
        return false;
    } else if (r1.y + r1.height <= r2.y) {
        return false;
    } else {
        return true;
    }

} //end function checkIntersection()