const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Circle {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
    }
}