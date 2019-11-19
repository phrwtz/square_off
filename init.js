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
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                thisBox = new Box(i, j);
                this.boxesObj[thisBox.id] = thisBox;
                this.boxesArr.push(thisBox);
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
    this.box = function (x, y) {
        boxId = x.toString() + "_" + y.toString();
        return this.boxesObj[boxId];
    }
}

function Box(x, y) {
    var hex = new Object,
        dec = new Object,
        boxId = x.toString() + "_" + y.toString();
    rectId = x.toString() + "_" + y.toString();
    hex["white"] = "#ffffff";
    hex["wheat"] = "#f5deb3";
    hex["red"] = "ff0000";
    hex["lightred"] = "ffc0cb";
    hex["lightblue"] = "add8e6";
    hex["blue"] = "#0000ff";

    dec["white"] = [255, 0, 0];
    dec["wheat"] = [245, 222, 179];
    dec["red"] = "ff0000";
    dec["lightred"] = [255, 192, 203];
    dec["lightblue"] = [175, 238, 238];
    dec["blue"] = [0, 0, 255];

    this.x = x;
    this.y = y;
    this.id = boxId;
    this.color = "white";
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("id", rectId);
    this.rect.setAttribute("width", "40");
    this.rect.setAttribute("height", "40");
    this.rect.setAttribute("x", ((x + 1) * 40).toString());
    this.rect.setAttribute("y", ((y + 1) * 40).toString());
    this.rect.setAttribute("stroke", "black");
    this.rect.setAttribute("stroke-width", "1");
    this.draw = function () {
        try {
            var polarity = (this.x + this.y) % 2;
            this.rect.setAttribute("fill", colorValue[this.color][polarity]);
        } catch (err) {
            console.log("color");
        }
    };
    this.fill = function () {
        var tempColor = [];
        var startColor = this.color;
        var endColor = this.endColor;
        var startRed, tempRed, endRed,
            startGreen, tempGreen, endGreen,
            startBlue, tempBlue, endBlue;
        var int = setInterval(paint, 25);

        function paint() {
            if (i >= 100) {
                clearInterval(int);
            } else {
                startRed = dec[startColor][0];
                startGreen = dec[startColor][1];
                startBlue = dec[startColor][2];
                endRed = dec[endColor][0];
                endGreen = dec[endColor][1];
                endBlue = dec[endColor][2];
                tempColor.push(startColor);
                for (let i = 1; i < 99; i++) {
                    tempRed = parseInt(((endRed * i + startRed * (100 - i)) / 100)).toString();
                    tempBlue = parseInt(((endBlue * i + startBlue * (100 - i)) / 100)).toString();
                    tempGreen = parseInt(((endGreen * i + startGreen * (100 - i)) / 100)).toString();
                    tempColor.push("rgb(" + tempRed.toString() + ", " + tempBlue.toString() + ", " + tempGreen.toString() + ")");
                }
                tempColor.push(endColor);
            }
            i++
        }
    }
}