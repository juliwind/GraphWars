circles = [];



class Circle {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}


initCircles();


function initCircles(x, y, r) {
    for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) {
        x = Math.floor(Math.random() * 750);
        y = Math.floor(Math.random() * 450);
        r = Math.floor(Math.random() * 100) + 5;
        circles.push(new Circle(x, y, r));;
    }

    for (let i = 0; i < circles.length; i++) {
        circles[i].draw();
    }
}
function getCircles() {
    return circles;
}