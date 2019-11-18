//Global variables
var sizeForm = document.getElementById("sizeForm");
var board;

function drawBoard(size) {
    board = new Board(size);
    board.init();
    board.draw();
}
function Board(size, boxes, init, draw) {
    var container = document.getElementById("cont");
    this.size = size;
    this.boxesObj = Object;
    this.boxesArr = [];
    this.turnNumber = 0;
    this.turnColor = "red";
    this.init = function () {
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                thisBox = new Box(i, j);
                this.boxesObj[thisBox.id] = thisBox;
                this.boxesArr.push(thisBox);
                if ((i + j) % 2 == 0) {
                    thisBox.color = "white";
                } else {
                    thisBox.color = "wheat";;
                }
                thisBox.rect.setAttribute("onclick", "handleMove(this.id)");
            }
        }
    };
    this.draw = function (size) {
        var thisBox,
            outerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        outerRect.setAttribute("fill", "none");
        outerRect.setAttribute("stroke", "black");
        outerRect.setAttribute("stroke-width", "3");
        outerRect.setAttribute("x", "40");
        outerRect.setAttribute("y", "40");
        outerRect.setAttribute("width", (this.size * 40).toString());
        outerRect.setAttribute("height", (this.size * 40).toString());
        container.appendChild(outerRect);
        for (let i = 0; i < this.boxesArr.length; i++) {
            thisBox = this.boxesArr[i];
            thisBox.draw();
            container.appendChild(thisBox.rect);
        }
        container.style.display = "block";
    }
}

function Box(x, y) {
    var hex = new Object,
        boxId = x.toString() + "." + y.toString();
    rectId = x.toString() + "_" + y.toString();
    hex["white"] = "#ffffff";
    hex["wheat"] = "#f5deb3";
    hex["red"] = "ff0000";
    hex["lightred"] = "ffc0cb";
    hex["lightblue"] = "add8e6";
    hex["blue"] = "#0000ff";
    this.x = x;
    this.y = y;
    this.id = boxId;
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("id", rectId);
    this.rect.setAttribute("width", "40");
    this.rect.setAttribute("height", "40");
    this.rect.setAttribute("x", ((x + 1) * 40).toString());
    this.rect.setAttribute("y", ((y + 1) * 40).toString());
    this.rect.setAttribute("stroke", "black");
    this.rect.setAttribute("stroke-width", "1");
    this.draw = function () {
        this.rect.setAttribute("fill", this.color);
    };
}