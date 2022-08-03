const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let inputGraph = document.getElementById("inputGraph");
let func;

inputGraph.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        func = inputGraph.value;
        checkFunc(func);
    }
})
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
    func = replaceFormation(func);
    if (!error) drawLine(100, 500, func);
}


function replaceFormation(func) {
    func = func.replaceAll("pi", "Math.PI");
    func = func.replaceAll("e", "Math.E");
    func = func.replaceAll("^", "**");
    func = func.replaceAll("sqrt", "Math.sqrt");
    func = func.replaceAll("log", "Math.log");
    func = func.replaceAll("ln", "Math.log");
    func = func.replaceAll("abs", "Math.abs");
    func = func.replaceAll("sin", "Math.sin");
    func = func.replaceAll("cos", "Math.cos");
    func = func.replaceAll("tan", "Math.tan");
    func = func.replaceAll("asin", "Math.asin");
    func = func.replaceAll("acos", "Math.acos");
    func = func.replaceAll("atan", "Math.atan");
    func = func.replaceAll("exp", "Math.exp");
    return func;
}


function checkBrackets(func) {
    let text_array = func.split("");
    let idx = 0;
    for (i = 0; i < text_array.length; i++) {
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
    func = func.replaceAll("pi", "");
    func = func.replaceAll("e", "");
    func = func.replaceAll("^", "");
    func = func.replaceAll("sqrt", "");
    func = func.replaceAll("log", "");
    func = func.replaceAll("ln", "");
    func = func.replaceAll("abs", "");
    func = func.replaceAll("sin", "");
    func = func.replaceAll("cos", "");
    func = func.replaceAll("tan", "");
    func = func.replaceAll("asin", "");
    func = func.replaceAll("acos", "");
    func = func.replaceAll("atan", "");
    func = func.replaceAll("exp", "");
    func = func + " "
    if (func == " ") {
        return true;
    }
    return false;
}
// preprocessing finished!
// canvas = 1000x600

function calcFunc(input_x, func) {
    str_x = input_x.toString();
    term = func.replaceAll("x", str_x);
    return eval(term);
}

function drawLine(startX, startY, func) {
    let y_axis = calcFunc(0, func);
    let pos_x = startX;
    let pos_y = startY;
    let calc_x = 1;
    while (pos_x >= 0 && pos_x <= canvas.width && pos_y >= 0 && pos_y <= canvas.height) {
        let curr_y = canvas.height - (calcFunc(calc_x, func) * 40) + y_axis - startX
        ctx.beginPath();
        ctx.moveTo(pos_x, pos_y);
        ctx.lineTo((pos_x + 40), curr_y);
        ctx.stroke();
        pos_x += 40;
        calc_x += 1;
        pos_y = curr_y;
    }
}



/*
//Kurven besser, nicht nah ran gezoomt
function drawLine(startX, startY, func) {
    console.log(func);
    let y_axis = calcFunc(0, func);
    let pos_x = startX;
    let pos_y = startY;
    let calc_x = 1;
    while (pos_x >= 0 && pos_x <= canvas.width && pos_y >= 0 && pos_y <= canvas.height) {
        let curr_y = canvas.height - calcFunc(calc_x, func) + y_axis - startX;
        ctx.beginPath();
        ctx.moveTo(pos_x, pos_y);
        ctx.lineTo(pos_x + 1, curr_y);
        ctx.stroke();
        pos_x++;
        calc_x++;
        pos_y = curr_y;
    }
}
*/
// x-25 25
//y -15 15

