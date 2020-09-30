function Player(x, y) {

    //player variables
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6; //determines how quick or slow player slows on keyup
    this.maxSpeed = 10;
    this.width = 50;
    this.height = 100;
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
                this.xspeed++;
            } else if (leftKey) {
                //move left
                this.xspeed--;
            }

            //vertical movement
            if (upKey) {
                //check if on ground

                this.yspeed -= 15;
            }

            //gravity
            this.yspeed += 5;

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



            this.x += this.xspeed;
            this.y += this.yspeed;
        }
    }

    this.draw = function() {
        context.fillStyle = "purple";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}