let circle_doc = document.getElementById("circle");
let utils_doc = document.getElementById("utils");


let players = [];
let player_round = [];

class Player {

    constructor(x, y, team, isDead) {
        this.x = x;
        this.y = y;
        this.team = team;
        this.isDead = isDead;
        this.img;
    }

    draw() {
        if (this.x < canvas.width / 2) {
            let img = new Image();
            img.src = "rcs/player_links.png";
            this.img = img;
            ctx.drawImage(img, this.x, this.y);
        }
        if (this.x > canvas.width / 2) {
            let img = new Image();
            img.src = "rcs/player_rechts.png";
            this.img = img;
            ctx.drawImage(img, this.x, this.y);
        }

    }
}

function initPlayers(team1_size, team2_size) {
    let circles = getCircles();

    for (let i = 0; i < team1_size; i++) {
        let x;
        let y;
        let distanceCheck = false;
        while (!distanceCheck) {
            distanceCheck = true;
            x = Math.floor(Math.random() * (canvas.width / 2 - 100)) + 50
            y = Math.floor(Math.random() * (canvas.height - 100)) + 50
            for (let i = 0; i < circles.length; i++) {
                if (euclideanDistance(x, y, circles[i].x, circles[i].y) < circles[i].r + 30) {
                    distanceCheck = false;
                }
            }
            for (let i = 0; i < players.length; i++) {
                if (euclideanDistance(x, y, players[i].x, players[i].y) < 70) {
                    distanceCheck = false;
                }
            }
        }
        players.push(new Player(x, y, 1, false));
    }

    for (let i = 0; i < team2_size; i++) {
        let x;
        let y;
        let distanceCheck = false;
        while (!distanceCheck) {
            distanceCheck = true;
            x = Math.floor(Math.random() * (canvas.width / 2 - 100)) + 50 + canvas.width / 2;
            y = Math.floor(Math.random() * (canvas.height - 100)) + 50
            for (let i = 0; i < circles.length; i++) {
                if (euclideanDistance(x, y, circles[i].x, circles[i].y) < circles[i].r + 30) {
                    distanceCheck = false;
                }
            }
            for (let i = 0; i < players.length; i++) {
                if (euclideanDistance(x, y, players[i].x, players[i].y) < 50) {
                    distanceCheck = false;
                }
            }
        }
        players.push(new Player(x, y, 2, false));
    }
    for (i = 0; i < players.length; i++) {
        players[i].draw();
    }
    for (let i = 0; i < players.length; i++) {
        player_round.push(0);
    }
    player_round[0] = 1
}


function getCurrPlayerIdx() {
    for (i = 0; i < player_round.length; i++) {
        if (player_round[i] == 1) {
            return i;
        }
    }
}

function rotatePlayerRound() {
    if (player_round[player_round.length - 1] == 1) {
        player_round[player_round.length - 1] = 0;
        player_round[0] = 1;
    }
    else {
        for (i = 0; i < player_round.length - 1; i++) {
            if (player_round[i] == 1) {
                player_round[i] = 0;
                player_round[i + 1] = 1;
            }
        }
    }
}

function getPlayers() {
    return players;
}


function checkWin() {
    let team_1_alive = false;
    let team_2_alive = false;
    for (let i = 0; i < players.length; i++) {
        if (players[i].team == 1 && !players[i].isDead) {
            team_1_alive = true
        }
        if (players[i].team == 2 && !players[i].isDead) {
            team_2_alive = true
        }
    }
    if (!team_1_alive) alert("Team 2 won!");
    if (!team_2_alive) alert("Team 1 won!");
}

function startShooting(func) {
    idx = 1;
    img = new Image()
    img.src = "rcs/player_shooting.png"
    img.onload = drawFrame(idx);
    function drawFrame(idx) {
        src_newImg = idx * 1000;
        resetScreen(false);
        //console.log(img, x, 0, 500, 222, players[getCurrPlayerIdx()].x, players[getCurrPlayerIdx()].y, 500, 222)
        //console.log("x", players[getCurrPlayerIdx()].x, "y", players[getCurrPlayerIdx()].y, "idx", idx)
        //ctx.drawImage(img, src_x, 0, 1000, 445, players[getCurrPlayerIdx()].x, players[getCurrPlayerIdx()].y, 320, 320);
        console.log(img, src_newImg / 2 + 223, 95, 1000, 224, players[getCurrPlayerIdx()].x, players[getCurrPlayerIdx()].y, 1000, 224)
        ctx.drawImage(img, src_newImg / 2 + 223, 95, 1000, 224, players[getCurrPlayerIdx()].x, players[getCurrPlayerIdx()].y, 1000, 224)
        idx++;
        if (idx < 36) {
            setTimeout(() => drawFrame(idx), 1000);
        }
        else {
            resetScreen(true);
            checkFunc(func);
        }
    }

}