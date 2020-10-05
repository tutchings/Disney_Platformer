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
    player = new Player(1, 600); 

    //build map, row 1
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 0, 50, 50, i));
    }

    //build map, row 2
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 50, 50, 50, (i + 26)));
    }

    //build map, row 3
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 100, 50, 50, (i + 52)));
    }

    //build map, row 4
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 150, 50, 50, (i + 78)));
    }

    //build map, row 5
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 200, 50, 50, (i + 104)));
    }

    //build map, row 6
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 250, 50, 50, (i + 130)));
    }

    //build map, row 7
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 300, 50, 50, (i + 156)));
    }

    //build map, row 8
    for (let i = 0; i < 26; i++){
        if (i !== 5){
            mapTextures.push(new Border(0 + (i * 50), 350, 50, 50, (i + 182)));
        }
    }

    //build map, row 9
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 400, 50, 50, (i + 208)));
    }

    //build map, row 10
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 450, 50, 50, (i + 234)));
    }

    //build map, row 11
    for (let i = 0; i < 26; i++){
        mapTextures.push(new Border(0 + (i * 50), 500, 50, 50, (i + 260)));
    }

    //build map, row 12
    for (let i = 0; i < 26; i++){
        if (i !== 0){
            mapTextures.push(new Border(0 + (i * 50), 550, 50, 50, (i + 286)));
        }
        
    }

    //build map, row 13
    for (let i = 0; i < 26; i++){
        if (i !== 0 && i !== 1 && i !== 2){
            mapTextures.push(new Border(0 + (i * 50), 600, 50, 50, (i + 312)));
        }
    }

    //build map, row 14
    for (let i = 0; i < 26; i++){
        if (i !== 0 && i !== 2) {
            mapTextures.push(new Border(0 + (i * 50), 650, 50, 50, (i + 338)));
        }
        
    }

    //build borders around outside of canvas
    //ensures user cannot move off map
    mapTextures.push(new Border(0, 550, .001, 50, 364));
    mapTextures.push(new Border(0, 600, .001, 50, 364));
    mapTextures.push(new Border(0, 650, .001, 50, 364));
    mapTextures.push(new Border(0, 700, 50, .001, 364));


    //create game loop
    //calls step function 30 times per second
    gameLoop = setInterval(step, 1000/30);

    setupInputs();


} //end onload function

console.log('mapTextures: ', mapTextures);



function step() {

    //player step
    player.step();

    draw();

} //end function step()



function draw() {

    //clear canvas
    context.fillStyle = "red";
    context.fillRect(0,0,1300,700);

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