//Global variables
var board;

function drawBoard(size) {
    var sizeForm = document.getElementById("sizeForm"),
        infoPara = document.getElementById("infoPara");
    sizeForm.style.display = "none";
    infoPara.innerHTML = "<h2><span style='color:red'>Red's first turn</span></h2>"

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
        this.won = false;
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                thisBox = new Box(i, j);
                this.boxesObj[thisBox.id] = thisBox;
                this.boxesArr.push(thisBox);
                thisBox.rect.setAttribute("onclick", "handleMove(this.id)");
                thisBox.color = "white";
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
    this.box = function (x, y) {
        boxId = x.toString() + "_" + y.toString();
        return this.boxesObj[boxId];
    }
}

function Box(x, y) {
    var id = x.toString() + "_" + y.toString();
    this.x = x;
    this.y = y;
    this.id = id;
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("id", id);
    this.rect.setAttribute("width", "40");
    this.rect.setAttribute("height", "40");
    this.rect.setAttribute("x", ((x + 1) * 40).toString());
    this.rect.setAttribute("y", ((y + 1) * 40).toString());
    this.rect.setAttribute("stroke", "black");
    this.rect.setAttribute("stroke-width", "1");
    this.draw = function () {
        this.rect.style.transition = "fill 0.1s";
        var polarity = (this.x + this.y) % 2;
        this.rect.color = this.color;
        this.rect.setAttribute("fill", colorValue[this.color][polarity]);
    };
    this.fill = function () {
        this.rect.style.transition = "fill 2s";
        var polarity = (this.x + this.y) % 2;
        this.rect.color = this.color;
        this.rect.setAttribute("fill", colorValue[this.color][polarity]);
    };
}