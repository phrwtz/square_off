//x and y are the coordinates of the top corner of the diamomd, side is the length of the side, color is the color of the four corners.
function Diamond(x, y, side, color) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.color = color;
};

function findDiamonds(box,color) {
    var returnArray = [];
    var leftDiamond = findLeft(box, color);
    var upDiamond = findUp(box, color);
    var downDiamond = findDown(box, color);
    var rightDiamond = findRight(box, color);
    if (leftDiamond) {
        returnArray.push(leftDiamond);
    }
    if (upDiamond) {
        returnArray.push(upDiamond);
    }
    if (downDiamond) {
        returnArray.push(downDiamond);
    }
    if (rightDiamond) {
        returnArray.push(rightDiamond);
    }
    return returnArray;
}

function findLeft(box, color) {
    var leftBox,
        leftColor,
        upBox,
        upColor,
        downBox,
        downColor,
        min;
    if ((box.x > 1) && (box.y > 0)) {
        min = Math.min(Math.floor(box.x / 2), box.y, (board.size - 1) - box.y);
        for (let d = min; d > 0; d--) {
    //        console.log("Searching left. x = " + box.x + ", y = " + box.y + ", min = " + min + ",d = " + d);
            leftBox = board.box(box.x - 2 * d, box.y);
            leftColor = leftBox.color;
            upBox = board.box(box.x - d, box.y - d);
            upColor = upBox.color;
            downBox = board.box(box.x - d, box.y + d);
            downColor = downBox.color;
            if ((leftColor == color) && (upColor == color) && (downColor == color)) {
                leftDiamond = new Diamond();
                leftDiamond.x = upBox.x;
                leftDiamond.y = upBox.y;
                leftDiamond.side = d;
                leftDiamond.color = upBox.color;
                console.log("Left diamond detected with side " + leftDiamond.side + " at " + (box.x + 1) + ", " + (box.y + 1));
                return leftDiamond;
                break;
            }
        }
    }
    return null;
}

function findRight(box, color) {
    var leftBox,
        leftColor,
        upBox,
        upColor,
        downBox,
        downColor,
        min;
    if ((box.x < board.size - 2) && (box.y > 0)) {
        min = Math.min(Math.floor(((board.size - 1) - box.x) / 2), box.y, ((board.size - 1) - box.y));
        for (let d = min; d > 0; d--) {
     //       console.log("Searching right. x = " + box.x + ", y = " + box.y + ", min = " + min + ",d = " + d);
            rightBox = board.box(box.x + 2 * d, box.y);
            rightColor = rightBox.color;
            upBox = board.box(box.x + d, box.y - d);
            upColor = upBox.color;
            downBox = board.box(box.x + d, box.y + d);
            downColor = downBox.color;
            if ((rightColor == color) && (upColor == color) && (downColor == color)) {
                rightDiamond = new Diamond();
                rightDiamond.x = upBox.x;
                rightDiamond.y = upBox.y;
                rightDiamond.side = d;
                rightDiamond.color = upBox.color;
                console.log("Right diamond detected with side " + rightDiamond.side + " at " + (box.x + 1) + ", " + (box.y + 1));
                return rightDiamond;
                break;
            }
        }
    }
    return null;
}

function findDown(box, color) {
    var leftBox,
        leftColor,
        rightBox,
        rightColor,
        downBox,
        downColor,
        min;
    if ((box.x > 0) && (box.x < board.size - 1) && (box.y < board.size - 2)) {
        min = Math.min(Math.floor(((board.size - 1) - box.y) / 2), box.x, ((board.size - 1) - box.x));
        for (let d = min; d > 0; d--) {
   //         console.log("Searching down. x = " + box.x + ", y = " + box.y + ", min = " + min + ",d = " + d);
            rightBox = board.box(box.x + d, box.y + d);
            rightColor = rightBox.color;
            leftBox = board.box(box.x - d, box.y + d);
            leftColor = leftBox.color;
            downBox = board.box(box.x, box.y + 2 * d);
            downColor = downBox.color;
            if ((rightColor == color) && (leftColor == color) && (downColor == color)) {
                downDiamond = new Diamond();
                downDiamond.x = box.x;
                downDiamond.y = box.y;
                downDiamond.side = d;
                downDiamond.color = downBox.color;
                console.log("Down diamond detected with side " + downDiamond.side + " at " + (box.x + 1) + ", " + (box.y + 1));
                return downDiamond;
                break;
            }
        }
    }
    return null;
}

function findUp(box, color) {
    var leftBox,
        leftColor,
        rightBox,
        rightColor,
        upBox,
        upColor,
        min;
    if ((box.x > 0) && (box.x < board.size - 1) && (box.y > 1)) {
        min = Math.min(Math.floor(box.y / 2), box.x, ((board.size - 1) - box.x));
        for (let d = min; d > 0; d--) {
  //          console.log("Searching up. x = " + box.x + ", y = " + box.y + ", min = " + min + ",d = " + d);
            rightBox = board.box(box.x + d, box.y - d);
            rightColor = rightBox.color;
            leftBox = board.box(box.x - d, box.y - d);
            leftColor = leftBox.color;
            upBox = board.box(box.x, box.y - 2 * d);
            upColor = upBox.color;
            if ((rightColor == color) && (upColor == color) && (leftColor == color)) {
                upDiamond = new Diamond();
                upDiamond.x = upBox.x;
                upDiamond.y = upBox.y;
                upDiamond.side = d;
                upDiamond.color = upBox.color;
                console.log("Up diamond detected at box " + (box.x + 1) + ", " + (box.y + 1) + " with side " + upDiamond.side);
                return upDiamond;
                break;
            }
        }
    }
    return null;
}

function fillDiamonds(diamonds) {
    if (diamonds.length != 0) {
        var delta = 1, fillBox, newColor;
        var top, right, left, bottom;
        var corners = [];
        if (diamonds.length > 0) {
            for (var k = 0; k < diamonds.length; k++) {
                x = diamonds[k].x;
                y = diamonds[k].y;
                d = diamonds[k].side;
                c = diamonds[k].color;
                top = board.box(x, y);
                left = board.box(x - d, y + d);
                right = board.box(x + d, y + d);
                bottom = board.box(x, y + 2 * d);
                corners = [top, left, right, bottom];
                toggleCorners(corners);
                for (var i = 1; i <= d; i++) {
                    for (var j = -delta; j <= delta; j++) {
                        fillBox = board.box(x + j, y + i);
                        newColor = getEndColor(fillBox.color, c);
                        fillBox.color = newColor;
                        fillBox.fill();
                    }
                    delta++;
                }
                delta = d - 1;
                for (i = d + 1; i < 2 * d; i++) {
                    for (var j = -delta; j <= delta; j++) {
                        fillBox = board.box(x + j, y + i);
                        newColor = getEndColor(fillBox.color, c);
                        fillBox.color = newColor;
                        fillBox.fill();
                    }
                    delta--;
                }
            }
        }
    }
}