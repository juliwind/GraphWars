const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}