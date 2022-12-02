let team1_size = 1;
let team2_size = 1;

initPlayers(team1_size, team2_size);

inputGraph.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        func = inputGraph.value;
        startShooting(func);
    }
})

function submitFire() {
    func = inputGraph.value;
    startShooting(func);
}

function mirror_screen() {
    let mid = canvas.width / 2;
    let circles = getCircles();
    let players = getPlayers();
    let saveCircles = getSaveCircles();
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 49, 83)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black"
    for (let i = 0; i < circles.length; i++) {
        x = circles[i].x;
        y = circles[i].y;
        let dist = Math.abs(circles[i].x - mid);
        if (circles[i].x < mid) {
            x = mid + dist;
        }
        else if (circles[i].x > mid) {
            x = mid - dist;
        }
        circles[i].x = x;
        circles[i].draw();
    }

    for (let i = 0; i < saveCircles.length; i++) {
        x = saveCircles[i].x;
        y = saveCircles[i].y;
        let dist = Math.abs(saveCircles[i].x - mid);
        if (saveCircles[i].x < mid) {
            x = mid + dist;
        }
        else if (saveCircles[i].x > mid) {
            x = mid - dist;
        }
        saveCircles[i].x = x;
        saveCircles[i].draw();
    }

    for (let i = 0; i < players.length; i++) {
        x = players[i].x;
        y = players[i].y;
        let dist = Math.abs(players[i].x - mid);
        if (players[i].x < mid) {
            x = mid + dist;
        }
        else if (players[i].x > mid) {
            x = mid - dist;
        }
        players[i].x = x;
        players[i].draw();
    }
}

