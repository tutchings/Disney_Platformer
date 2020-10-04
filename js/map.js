function Border (x, y, width, height, type) {
    this.x = x
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.draw = function() {
        if (this.type === 1) {
            context.fillStyle = "#a4def9";
        } else if (this.type === 2) {
            var castle = document.getElementById('castle');
            context.fillStyle = context.createPattern(castle, 'repeat');
        } else if (this.type === 3) {
            var img = document.getElementById('building1');
            context.fillStyle = context.createPattern(img, 'repeat');
        }

        context.fillRect(this.x, this.y, this.width, this.height);

    };
}