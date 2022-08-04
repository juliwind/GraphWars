saveCircles = [];

class SaveCircle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

    appendToList() {
        saveCircles.push(this);
    }
}

function getSaveCircles() {
    return saveCircles;
}