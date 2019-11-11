function Board(size, boxes, init, draw) {
    this.size = size;
    this.boxes = [];
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
    };
    this.draw = function () {
        var container = document.getElementById("cont");
        var outerRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        outerRect.setAttribute("fill", "none");
        outerRect.setAttribute("stroke", "black");
        outerRect.setAttribute("stroke-width", "3");
        outerRect.setAttribute("x", "40");
        outerRect.setAttribute("y", "40");
        outerRect.setAttribute("width", (this.size * 40).toString());
        outerRect.setAttribute("height", (this.size * 40).toString());
        container.appendChild(outerRect);
        for (let i = 0; i < this.boxes.length; i++) {
            container.appendChild(this.boxes[i].rect);
        }
    }
}

var myBoard = new Board(12);
myBoard.init();

function Box(x, y, rect) {
    this.x = x;
    this.y = y;
    this.id = x.toString() + "_" + y.toString();
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute("width", "40");
    this.rect.setAttribute("height", "40");
    this.rect.setAttribute("x", ((x + 1) * 40).toString());
    this.rect.setAttribute("y", ((y + 1) * 40).toString());
    this.rect.setAttribute("stroke", "black");
    this.rect.setAttribute("stroke-width", "1");
}