let saveCircle_doc = document.getElementById("saveCircle");
let trail_doc = document.getElementById("trail");
let player_doc = document.getElementById("player");
let func;
let inputGraph = document.getElementById("inputGraph");
//---


function checkFunc(func) {
    let error = false;

    func.replaceAll(" ", "");

    if (!checkBrackets(func)) {
        alert("The Brackets are wrong placed! :(");
        error = true;
    }
    if (!checkChars(func)) {
        alert("There is something wrong written or not avaiable");
        error = true;
    }
    func = placeMissingChars(func);
    func = replaceFormation(func);

    let curr_player = players[getCurrPlayerIdx()];
    console.log(func);

    if (!error) draw(0, curr_player.x + 32, curr_player.y + 16, curr_player.y + 16, calcFunc(0, func), func, curr_player.team, curr_player, []);
}


function replaceFormation(func) {
    func = func.replaceAll("^", "**");
    func = func.replaceAll("e", "Math.E");
    func = func.replaceAll("pi", "Math.PI");
    func = func.replaceAll("ln", "Math.log");
    func = func.replaceAll("abs", "Math.abs");
    func = func.replaceAll("exp", "Math.exp");
    func = func.replaceAll("log", "Math.log");
    func = func.replaceAll("atan", "Math.atan");
    func = func.replaceAll("sqrt", "Math.sqrt");
    func = func.replaceAll("sin", "Math.sin");
    func = func.replaceAll("cos", "Math.cos");
    let text_array = func.split("");
    for (let i = 0; i < text_array.length; i++) {
        if (text_array[i] == "t" && text_array[i + 1] == "a") {
            if (i != 0) {
                if (text_array[i - 1] != "a") {
                    text_array[i] = "%";
                }
            }
            else text_array[i] = "%";
        }
    }
    func = text_array.join("");

    func = func.replaceAll("%an", "Math.tan");
    return func;
}

//(3+x)*(2+x)
function placeMissingChars(func) {
    let text_array = func.split("");
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let operators = ["+", "-", "*", "/", "^"]
    let operators_with_endings = ["+", "-", "*", "/", "^", "t", "g", "n", "s", "p"]
    let others = ["(", "x", "s", "l", "a", "c", "t", "e", "p"]
    for (let i = 0; i < text_array.length - 1; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (text_array[i] == numbers[j]) {
                for (let k = 0; k < others.length; k++) {
                    if (text_array[i + 1] == others[k]) {
                        text_array.splice(i + 1, 0, "*");
                    }
                }
            }
        }
        if (text_array[i] == ")" && i != text_array.length - 1) {
            operators.push(")");
            let is_operator = false;
            for (let j = 0; j < operators.length; j++) {
                if (text_array[i + 1] == operators[j]) {
                    is_operator = true;
                }
            }
            if (!is_operator) {
                text_array.splice(i + 1, 0, "*");
            }
            operators.pop();
        }
        if (text_array[i] == "(" && i != 0) {
            operators_with_endings.push("(");
            let is_operator = false;
            for (let j = 0; j < operators_with_endings.length; j++) {
                if (text_array[i - 1] == operators_with_endings[j]) {
                    is_operator = true;
                }
            }
            if (!is_operator) {
                text_array.splice(i, 0, "*");
            }
            operators.pop();
        }
        if (text_array[i] == "x" && i != text_array.length - 1) {
            for (let j = 0; j < numbers.length; j++) {
                if (text_array[i + 1] == numbers[j]) {
                    let curr_i = text_array[i];
                    text_array[i] = text_array[i + 1];
                    text_array[i + 1] = curr_i;
                }
            }

        }
    }
    return text_array.join("");
}

//d = 64px => r = 32px
function checkBrackets(func) {
    let text_array = func.split("");
    let idx = 0;
    for (let i = 0; i < text_array.length; i++) {
        if (text_array[i] == "(") {
            idx++;
        }
        if (text_array[i] == ")") {
            idx--;
        }
        if (idx < 0) {
            return false;
        }

    }
    if (idx != 0) {
        return false;
    }
    else return true;
}


function checkChars(func) {
    func = func.replaceAll("sqrt", "");
    func = func.replaceAll("asin", "");
    func = func.replaceAll("acos", "");
    func = func.replaceAll("atan", "");
    func = func.replaceAll("log", "");
    func = func.replaceAll("ln", "");
    func = func.replaceAll("abs", "");
    func = func.replaceAll("sin", "");
    func = func.replaceAll("cos", "");
    func = func.replaceAll("tan", "");
    func = func.replaceAll("exp", "");
    func = func.replaceAll("pi", "");
    func = func.replaceAll(".", "");
    func = func.replaceAll("0", "");
    func = func.replaceAll("1", "");
    func = func.replaceAll("2", "");
    func = func.replaceAll("3", "");
    func = func.replaceAll("4", "");
    func = func.replaceAll("5", "");
    func = func.replaceAll("6", "");
    func = func.replaceAll("7", "");
    func = func.replaceAll("8", "");
    func = func.replaceAll("9", "");
    func = func.replaceAll("+", "");
    func = func.replaceAll("-", "");
    func = func.replaceAll("*", "");
    func = func.replaceAll("/", "");
    func = func.replaceAll("x", "");
    func = func.replaceAll("(", "");
    func = func.replaceAll(")", "");
    func = func.replaceAll("e", "");
    func = func.replaceAll("^", "");


    func = func + " "

    if (func == " ") {
        return true;
    }
    return false;
}


function calcFunc(input_x, func) {
    str_x = input_x.toString();
    let text_array = func.split("");
    let final_term = "";

    if (text_array.length > 1) {
        for (let i = 0; i < text_array.length; i++) {
            if (text_array[i] == "x") {

                if (i == text_array.length - 1 || text_array[i + 1] != "p") {

                    text_array[i] = str_x;
                }
            }
        }
        final_term = text_array.join("");
    }
    else {
        final_term = text_array.join("");

        final_term = final_term.replaceAll("x", input_x);
    }
    return eval(final_term);
}


function draw(calc_x, pos_x, pos_y, startY, y_axis, func, team, player, playersHit) {

    let curr_y = canvas.height - ((calcFunc(calc_x, func) - y_axis) * 15) - (canvas.height - startY);

    ctx.beginPath();
    ctx.moveTo(pos_x, pos_y);
    ctx.lineTo((pos_x + 1), curr_y);
    ctx.stroke();

    pos_x += 1;
    calc_x += 1 / 15;
    pos_y = curr_y;

    circles = getCircles();
    for (i = 0; i < circles.length; i++) {
        if (euclideanDistance(pos_x, pos_y, circles[i].x, circles[i].y) <= circles[i].r) {
            let cs_touched = false;
            for (j = 0; j < saveCircles.length; j++) {
                if (euclideanDistance(pos_x, pos_y, saveCircles[j].x, saveCircles[j].y) <= saveCircles[j].r) {
                    cs_touched = true;
                }
            }
            if (!cs_touched) {
                explode(pos_x, pos_y);
                deleteLine();
                rotatePlayerRound();
                mirror_screen();
                checkWin();
                return;
            }
            cs_touched = false;
        }
    }
    let players = getPlayers();
    let alreadyHit = false;
    for (let i = 0; i < players.length; i++) {
        if (JSON.stringify(players[i]) !== JSON.stringify(player)) {
            if (euclideanDistance(pos_x, pos_y, players[i].x + 16, players[i].y + 16) <= 17) {
                for (let j = 0; j < playersHit.length; j++) {
                    if (JSON.stringify(players[i]) === JSON.stringify(playersHit[j])) {
                        alreadyHit = true;
                    }
                }
                if (!alreadyHit) {
                    //players[i].img = null;
                    playersHit.push(players[i]);
                    players[i].isDead = true;
                    ctx.fillStyle = "rgb(0, 49, 83)";
                    ctx.beginPath();
                    ctx.arc(players[i].x + 16, players[i].y + 16, 17, 0, 2 * Math.PI, false);
                    ctx.fill();
                    ctx.fillStyle = "black";
                }
            }
        }
    }
    if (pos_x >= 0 && pos_x <= canvas.width && pos_y >= 0 && pos_y <= canvas.height) {
        setTimeout(() => draw(calc_x, pos_x, pos_y, startY, y_axis, func, team, player, playersHit), 10);
    }
    else {
        deleteLine();
        rotatePlayerRound();
        mirror_screen();
        checkWin();
    }
}

function explode(x, y) {
    let sc = new SaveCircle(x, y);
    sc.draw();
    sc.appendToList();
}

function deleteLine() {

    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0, 49, 83)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black"

    let circles = getCircles();
    let save_circles = getSaveCircles();

    for (let i = 0; i < circles.length; i++) {
        circles[i].draw();
    }

    for (let i = 0; i < save_circles.length; i++) {
        save_circles[i].draw();
    }

    for (let i = 0; i < players.length; i++) {
        if (players[i].isDead == false) {
            players[i].draw();
        }
    }

}


/*
*/