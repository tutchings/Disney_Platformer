function Player(x, y) {

    //player variables
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6; //determines how quick or slow player slows on keyup
    this.maxSpeed = 10;
    this.width = 25;
    this.height = 25;
    this.active = true;

    console.log("player this", this);

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
            //     this.yspeed -= 9;
            // }

            //gravity
            //this.yspeed += 5;

            //vartical movement
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

            if (this.xspeed > 0) {
                this.xspeed = Math.floor(this.xspeed);
            } else {
                this.xspeed = Math.ceil(this.xspeed);
            }

            if (this.yspeed > 0) {
                this.yspeed = Math.floor(this.yspeed);
            } else {
                this.yspeed = Math.ceil(this.yspeed);
            }

            //ensures xspeed and yspeed are whole numbers
            // this.xspeed = parseInt(this.xspeed);
            // this.yspeed = parseInt(this.yspeed);

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

            //check for intersections
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