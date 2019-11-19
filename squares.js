//x and y are the coordinates of the up-left corner of the square, side is the length of the side, color is the color of the four corners.
function Square(x, y, side, color) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.color = color;
};

//Starting from the location of <box>, look up-left, up-right, down-left, and down-right for any combination of three boxes filled with the color of box. Return an array with the largest such square in each direction. 
function findSquares(box) {
    var returnArray = [];
    var upLeftSquare = findUpLeft(box);
    var upRightSquare = findUpRight(box);
    var downLeftSquare = findDownLeft(box);
    var downRightSquare = findDownRight(box);
    if (upLeftSquare) {
        returnArray.push(upLeftSquare);
    }
    if (upRightSquare) {
        returnArray.push(upRightSquare);
    }
    if (downLeftSquare) {
        returnArray.push(downLeftSquare);
    }
    if (downRightSquare) {
        returnArray.push(downRightSquare);
    }
    return returnArray;
}

function findUpLeft(box) {
    var leftBox,
        leftColor,
        upBox,
        upColor,
        upLeftBox,
        upLeftColor,
        min, id;
    if ((box.x > 1) && (box.y > 1)) {
        min = Math.min(box.x, box.y);
        for (let d = min; d > 1; d--) {
            //       console.log("Searching up and left. x = " + box.x + ", y = " + box.y + ",d = " + d);
            leftBox = board.box(box.x - d, box.y);
            leftColor = leftBox.color;
            upBox = board.box(box.x, box.y - d);
            upColor = upBox.color;
            upLeftBox = board.box(box.x - d, box.y - d);
            upLeftColor = upLeftBox.color;
            if ((leftColor == box.color) && (upColor == box.color) && (upLeftColor == box.color)) {
                upLeftSquare = new Square;
                upLeftSquare.x = box.x - d;
                upLeftSquare.y = box.y - d;
                upLeftSquare.side = d;
                upLeftSquare.color = box.color;
                console.log("Up left square detected with side " + upLeftSquare.side);
                return upLeftSquare;
                break;
            }
        }
    }
    return null;
}

function findUpRight(box) {
    var rightBox, rightColor, upBox, upColor, upRightBox, upRightColor, min, id;
    if ((box.x < (board.size - 1)) && (box.y > 1)) {
        min = Math.min((board.size - 1) - box.x, box.y);
        for (let d = min; d > 1; d--) {
            //        console.log("Searching up and right. x = " + box.x + ", y = " + box.y + ",d = " + d);
            rightBox = board.box(box.x + d, box.y);
            rightColor = rightBox.color;
            upBox = board.box(box.x, box.y - d);
            upColor = upBox.color;
            upRightBox = board.box(box.x + d, box.y - d);
            upRightColor = upRightBox.color;
            if ((rightColor == box.color) && (upColor == box.color) && (upRightColor == box.color)) {
                upRightSquare = new Square;
                upRightSquare.x = box.x;
                upRightSquare.y = box.y - d;
                upRightSquare.side = d;
                upRightSquare.color = box.color;
                console.log("Up right square detected with side " + upRightSquare.side);
                return upRightSquare;
                break;
            }
        }
    }
    return null;
}

function findDownLeft(box) {
    var leftBox, leftColor, downBox, downColor, downLeftBox, downLeftColor, min, id;
    if ((box.x > 1) && (box.y < board.size - 1)) {
        min = Math.min(box.x, (board.size - 1) - box.y);
        for (let d = min; d > 1; d--) {
            //        console.log("Searching down and left. x = " + box.x + ", y = " + box.y + ",d = " + d);
            leftBox = board.box(box.x - d, box.y);
            leftColor = leftBox.color;
            downBox = board.box(box.x, box.y + d);
            downColor = downBox.color;
            downLeftBox = board.box(box.x - d, box.y + d);
            downLeftColor = downLeftBox.color;
            if ((leftColor == box.color) && (downColor == box.color) && (downLeftColor == box.color)) {
                downLeftSquare = new Square;
                downLeftSquare.x = box.x - d;
                downLeftSquare.y = box.y;
                downLeftSquare.side = d;
                downLeftSquare.color = box.color;
                console.log("Down left square detected with side " + downLeftSquare.side);
                return downLeftSquare;
                break;
            }
        }
    }
    return null;
}

function findDownRight(box) {
    var rightBox, rightColor, downBox, downColor, downRightBox, downRightColor, min, id;
    if ((box.x < board.size - 1) && (box.y < board.size - 1)) {
        min = Math.min((board.size - 1) - box.x, (board.size - 1) - box.y);
        for (let d = min; d > 1; d--) {
            //         console.log("Searching down and right. x = " + box.x + ", y = " + box.y + ",d = " + d);
            rightBox = board.box(box.x + d, box.y);
            rightColor = rightBox.color;
            downBox = board.box(box.x, box.y + d);
            downColor = downBox.color;
            downRightBox = board.box(box.x + d, box.y + d);
            downRightColor = downRightBox.color;
            if ((rightColor == box.color) && (downColor == box.color) && (downRightColor == box.color)) {
                downRightSquare = new Square;
                downRightSquare.x = box.x;
                downRightSquare.y = box.y;
                downRightSquare.side = d;
                downRightSquare.color = box.color;
                console.log("Down right square detected with side " + downRightSquare.side);
                return downRightSquare;
                break;
            }
        }
    }
    return null;
}

function getFillSquares(squares) {
    var returnArray = [];
    if (squares.length > 0) {
        var thisSquare, s,
            cornerColor;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i]) {
                s = squares[i];
                cornerColor = board.box(s.x, s.y).color;
                for (let i = s.x; i < s.x + s.side; i++) {
                    for (let j = s.y; j < s.y + s.side; j++) {
                        fillBox = board.box(i, j);
                        fillBox.endColor = getEndColor(fillBox.color, cornerColor);
                        returnArray.push(fillBox);
                    }
                }
            }
        }
    }
}

function getEndColor(startColor, cornerColor) {
    if ((startColor == "red") || (startColor == "blue")) {
        return startColor;
    } else {
        switch (startColor) {
            case "white":
                return cornerColor;
            case "lightred":
                if (cornerColor == "red") {
                    return "red";
                } else {
                    return "lightblue";
                }
            case "lightblue":
                if (cornerColor == "red") {
                    return "lightred";
                } else {
                    return "blue";
                }
        }
    }
}