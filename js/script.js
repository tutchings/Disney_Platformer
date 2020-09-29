//canvas variable declarations
var canvas = document.querySelector("#platformer-canvas");
var context = canvas.getContext("2d");

//game variable declarations
var gameLoop; 
var player; 



//run function when page loads
window.onload = function() {

    //create player
    player = new Player(100, 400); 

    //create game loop
    //calls step function 30 times per second
    gameLoop = setInterval(step, 1000/30);


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

} //end function draw()