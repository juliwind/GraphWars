
const playerImageLeft = new Image();
playerImageLeft.src = "rcs/player_links.png";

const playerImageRight = new Image();
playerImageRight.src = "rcs/player_rechts.png";


let circle_doc = document.getElementById("circle");
let utils_doc = document.getElementById("utils");


let players = [];
let player_round = [];
let turnInProgress = true;


class Player {

    constructor(x, y, team, isDead) {
        this.x = x;
        this.y = y;
        this.team = team;
        this.isDead = isDead;
    }

    draw() {
        if (this.isDead) return;
    
        if (this.x < canvas.width / 2) {
            this.img = playerImageLeft;
        } else {
            this.img = playerImageRight;
        }
    
        ctx.drawImage(this.img, this.x, this.y);
    
        let currPlayerIdx = getCurrPlayerIdx();
        if (players[currPlayerIdx] === this && turnInProgress) {
            ctx.beginPath();
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 3;
            ctx.arc(this.x + 16, this.y + 16, 20, 0, 2 * Math.PI);
            ctx.stroke();
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
            console.log("test");
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
        console.log("asdsd");
        players.push(new Player(x, y, 2, false));
    }
    for (let i = 0; i < players.length; i++) {
        players[i].draw();
    }
    for (let i = 0; i < players.length; i++) {
        console.log("test3");
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
    turnInProgress = true;

    if (player_round[player_round.length - 1] == 1) {
        player_round[player_round.length - 1] = 0;
        player_round[0] = 1;
    } else {
        for (let i = 0; i < player_round.length - 1; i++) {
            if (player_round[i] == 1) {
                player_round[i] = 0;
                player_round[i + 1] = 1;
                break;
            }
        }
    }

    updateCurrentPlayerDisplay();
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
    turnInProgress = false;

    let idx = 0;
    let img = new Image();
    img.src = "rcs/player_shooting.png";
    let sprite_width = 500;
    let sprite_height = 223;
    let sprite_offset_x = 148;
    let sprite_offset_y = 94;
    let sprite_origin_y = 0;

    img.onload = () => drawFrame(idx);

    function drawFrame(idx) {
        resetScreen(false);

        let sprite_origin_x = idx * sprite_width;
        ctx.drawImage(
            img,
            sprite_origin_x,
            sprite_origin_y,
            sprite_width,
            sprite_height,
            players[getCurrPlayerIdx()].x - sprite_offset_x,
            players[getCurrPlayerIdx()].y - sprite_offset_y,
            sprite_width,
            sprite_height
        );

        idx++;
        for (let i = 0; i < players.length; i++) {
            if (players[i] !== players[getCurrPlayerIdx()]) {
                players[i].draw();
            }
        }

        if (idx < 36) {
            setTimeout(() => drawFrame(idx), 30);
        } else {
            resetScreen(true);
            checkFunc(func);
        }
    }
}


