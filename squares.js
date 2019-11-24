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
    var color = box.color;
    var upLeftSquare = findUpLeft(box,color);
    var upRightSquare = findUpRight(box,color);
    var downLeftSquare = findDownLeft(box,color);
    var downRightSquare = findDownRight(box,color);
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

function findUpLeft(box,color) {
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
            if ((leftColor == color) && (upColor == color) && (upLeftColor == color)) {
                upLeftSquare = new Square();
                upLeftSquare.x = box.x - d;
                upLeftSquare.y = box.y - d;
                upLeftSquare.side = d;
                upLeftSquare.color = color;
                console.log("Up left square detected with side " + upLeftSquare.side);
                return upLeftSquare;
                break;
            }
        }
    }
    return null;
}

function findUpRight(box,color) {
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
            if ((rightColor == color) && (upColor == color) && (upRightColor == color)) {
                upRightSquare = new Square();
                upRightSquare.x = box.x;
                upRightSquare.y = box.y - d;
                upRightSquare.side = d;
                upRightSquare.color = color;
                console.log("Up right square detected with side " + upRightSquare.side);
                return upRightSquare;
            }
        }
    }
    return null;
}

function findDownLeft(box,color) {
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
            if ((leftColor == color) && (downColor == color) && (downLeftColor == color)) {
                downLeftSquare = new Square();
                downLeftSquare.x = box.x - d;
                downLeftSquare.y = box.y;
                downLeftSquare.side = d;
                downLeftSquare.color = color;
                console.log("Down left square detected with side " + downLeftSquare.side);
                return downLeftSquare;
            }
        }
    }
    return null;
}

function findDownRight(box,color) {
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
            if ((rightColor == color) && (downColor == color) && (downRightColor == color)) {
                downRightSquare = new Square();
                downRightSquare.x = box.x;
                downRightSquare.y = box.y;
                downRightSquare.side = d;
                downRightSquare.color = color;
                console.log("Down right square detected with side " + downRightSquare.side);
                return downRightSquare;
            }
        }
    }
    return null;
}

function fillSquares(squares) {
    if (squares.length != 0) {
        var s, upLeft, upRight, downLeft, downRight;
        var corners = [];
        for (let k = 0; k < squares.length; k++) {
            s = squares[k];
            x = s.x;
            y = s.y;
            d = s.side;
            c = s.color;
            upLeft = board.box(x, y);
            upRight = board.box(x + d, y);
            downLeft = board.box(x, y + d);
            downRight = board.box(x + d, y + d);
            corners = [upLeft, upRight, downLeft, downRight];
            toggleCorners(corners);
            for (let i = s.x; i <= s.x + s.side; i++) {
                for (let j = s.y; j <= s.y + s.side; j++) {
                    fillBox = board.box(i, j);
                    newColor = getEndColor(fillBox.color, s.color);
                    fillBox.color = newColor;
                    fillBox.fill();
                }
            }
        }
    }
}

function getEndColor(startColor, cornerColor) {
    if ((startColor == "red") || (startColor == "blue")) {
        return startColor;
    } else if (cornerColor == 'red') {
        if ((startColor == 'white') || (startColor == 'lightblue')) {
            return 'lightred';
        } else if (startColor == 'lightred') {
            return 'red';
        }
    } else if (cornerColor == 'blue') {
        if ((startColor == 'white') || (startColor == 'lightred')) {
            return 'lightblue';
        } else if (startColor == 'lightblue') {
            return 'blue';
        }
    }
}