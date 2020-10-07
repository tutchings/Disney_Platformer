function Player(x, y) {

    //player variables
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6; //determines how quick or slow player slows on keyup
    this.maxSpeed = 10;
    this.width = 10;
    this.height = 10;
    this.active = true;
    var score = 0;

    this.step = function() {
        //movement
        if (this.active) {

            //horizontal movement
            if (!leftKey && !rightKey || leftKey && rightKey) {
                //slow down
                this.xspeed *= this.friction;
            } else if (rightKey) {
                //move right
                this.xspeed+=3;
            } else if (leftKey) {
                //move left
                this.xspeed-=3;
            }

            //vertical movement with gravity
            // if (upKey) {
            //     this.yspeed -= 10;
            // }

            // gravity
            // this.yspeed += 5;

            //vartical movement without gravity
            if (!upKey && !downKey || upKey && downKey) {
                this.yspeed *= this.friction
            } else if (upKey) {
                this.yspeed-=3;
            } else if (downKey) {
                this.yspeed+=3;
            }



            //speed corrections
            if (this.xspeed > this.maxSpeed) {
                this.xspeed = this.maxSpeed;
            } else if (this.xspeed < -this.maxSpeed) {
                this.xspeed = -this.maxSpeed;
            }

            if (this.yspeed > this.maxSpeed) {
                this.yspeed = this.maxSpeed;
            } else if (this.xspeed < -this.maxSpeed) {
                this.yspeed = -this.maxSpeed;
            }

            // if (this.xspeed > 0) {
            //     this.xspeed = Math.floor(this.xspeed);
            // } else {
            //     this.xspeed = Math.ceil(this.xspeed);
            // }

            // if (this.yspeed > 0) {
            //     this.yspeed = Math.floor(this.yspeed);
            // } else {
            //     this.yspeed = Math.ceil(this.yspeed);
            // }

            // ensures xspeed and yspeed are whole numbers
            this.xspeed = parseInt(this.xspeed);
            this.yspeed = parseInt(this.yspeed);

            //horizontal collision detection
            var horizontalRect = {
                x: this.x + this.xspeed,
                y: this.y,
                width: this.width,
                height: this.height
            }

            //vertical collision detection
            var verticalRect = {
                x: this.x,
                y: this.y + this.yspeed,
                width: this.width,
                height: this.height
            }

            //check for intersections with map pieces
            for (var i = 0; i < mapTextures.length; i++) {

                var borderRect = {
                    x: mapTextures[i].x,
                    y: mapTextures[i].y,
                    width: mapTextures[i].width,
                    height: mapTextures[i].height
                }

                if (checkIntersection(horizontalRect, borderRect)) {
                    while (checkIntersection(horizontalRect, borderRect)) {
                        horizontalRect.x -= Math.sign(this.xspeed);
                    }
                    this.x = horizontalRect.x;
                    this.xspeed = 0;
                }

                if (checkIntersection(verticalRect, borderRect)) {
                    while (checkIntersection(verticalRect, borderRect)) {
                        verticalRect.y -= Math.sign(this.yspeed);
                    }
                    this.y = verticalRect.y;
                    this.yspeed = 0;
                }
            }



            //check for intersection of treats and merch
            for (var i = 0; i < treatsAndMerch.length; i++) {

                var borderRect2 = {
                    x: treatsAndMerch[i].x,
                    y: treatsAndMerch[i].y,
                    width: treatsAndMerch[i].width,
                    height: treatsAndMerch[i].height,
                    type: treatsAndMerch[i].type
                }

                //removes treat or merch if player interacts with it
                if (checkIntersection(horizontalRect, borderRect2)) {
                    while (checkIntersection(horizontalRect, borderRect2)) {
                        horizontalRect.x -= Math.sign(this.xspeed);
                    }
                    this.x = horizontalRect.x;
                    this.xspeed = 0;
                    var removedTreat = treatsAndMerch.splice(i, 1);
                    score++;
                }

                if (checkIntersection(verticalRect, borderRect2)) {
                    while (checkIntersection(verticalRect, borderRect2)) {
                        verticalRect.y -= Math.sign(this.yspeed);
                    }
                    this.y = verticalRect.y;
                    this.yspeed = 0;
                    var removedTreat = treatsAndMerch.splice(i, 1);
                    score++;
                }

                if (score === 8){
                    var playAgain = confirm('You Win! You helped Mickey Mouse collect all of the treats and merchandise in Magic Kingdom. Do you want to play again?');
                    if (playAgain) {
                        location.reload();
                    }
                }

                
            }

            this.x += this.xspeed;
            this.y += this.yspeed;

        }
    }

    this.draw = function() {

        // var img = document.getElementById('mickeyMouse');
        // context.fillStyle = context.createPattern(img, 'repeat');
        context.fillStyle = 'purple';
        context.fillRect(this.x, this.y, this.width, this.height);
    }


}