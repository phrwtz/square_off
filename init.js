function Board(size, boxes, init, draw) {
    this.size = size;
    this.boxes = [];
    this.draw = function () {
        console.log("drawing board of size " + this.size);
    }
    this.init = function () {
        for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
                thisBox = new Box(i, j);
                if ((i + j) % 2 == 0) {
                    thisBox.color = "white";
                    thisBox.rect.setAttribute("fill", "#FFFFFF");
                } else {
                thisBox.color = "wheat";
                    thisBox.rect.setAttribute("fill", "#F5DEB3");
                }
                this.boxes.push(thisBox);
            }
        }
    }
}

var myBoard = new Board(12);

function Box(x, y, rect) {
    this.x = x;
    this.y = y;
    this.id = x.toString() + "_" + y.toString();
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("width", "40");
    this.rect.setAttribute("height", "40");
}