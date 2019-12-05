//Come here for a hint. First find the best square, then the best diamond.
function findP() {
    bestSquare = findPsquares(board.turnColor);
    bestDiamond = findPdiamonds(board.turnColor);
    if (bestSquare) {
        infoPara.innerHTML += ("<br>You can make a square worth " + bestSquare[1] + " points by clicking on " + (bestSquare[0].x + 1) + ", " + (bestSquare[0].y + 1) + ".")
    }
    if (bestDiamond) {
        infoPara.innerHTML += ("<br>You can make a diamond worth " + bestDiamond[1] + " points by clicking on " + (bestDiamond[0].x + 1) + ", " + (bestDiamond[0].y + 1) + ".")
    }
}

//Run through all the available boxes and return every psquare (every square that would be created if that box were either blue or red) and its score
function findPsquares(color) {
    var returnScore = 0,
        thisScore,
        allScores = 0,
        thisBox,
        upLeftScore,
        upRightScore,
        downLeftScore,
        downRightScore;
    for (let x = 0; x < board.size; x++) {
        for (let y = 0; y < board.size; y++) {
            thisBox = board.box(x, y);
            thisScore = 0;
            if ((thisBox.color == "white") || (thisBox.color == "lightred") || (thisBox.color == "lightblue")) {
                upLeftScore = scoreSquare(findUpLeft(thisBox, color));
                if (upLeftScore > thisScore) {
                    thisScore = upLeftScore;
                }
                upRightScore = scoreSquare(findUpRight(thisBox, color));
                if (upRightScore > thisScore) {
                    thisScore = upRightScore;
                }
                downLeftScore = scoreSquare(findDownLeft(thisBox, color));
                if (downLeftScore > thisScore) {
                    thisScore = downLeftScore;
                }
                downRightScore = scoreSquare(findDownRight(thisBox, color));
                if (downRightScore > thisScore) {
                    thisScore = downRightScore;
                }
            }
            if (thisScore > 0) {
                if (thisScore > allScores) {
                    allScores = thisScore;
                    allX = x;
                    allY = y;
                }
                console.log("Clicking the box at (" + (x + 1) +
                    ", " + (y + 1) + ") scores " + thisScore + " for " + color);
            }
        }
    }
    if (allScores == 0) {
        return null;
    } else {
        return [board.box(allX, allY), allScores];
    }
}

//Run through all the available boxes and return every pdiamond (every diamond that would be created if that box were either blue or red) and its score
function findPdiamonds(color) {
    var returnScore = 0,
        thisScore,
        allScores = 0,
        thisBox,
        upScore,
        rightScore,
        downScore,
        leftScore;
    for (let x = 0; x < board.size; x++) {
        for (let y = 0; y < board.size; y++) {
            thisBox = board.box(x, y);
            thisScore = 0;
            if ((thisBox.color == "white") || (thisBox.color == "lightred") || (thisBox.color == "lightblue")) {
                upScore = scoreDiamond(findUp(thisBox, color));
                if (upScore > thisScore) {
                    thisScore = upScore;
                }
                rightScore = scoreDiamond(findRight(thisBox, color));
                if (rightScore > thisScore) {
                    thisScore = rightScore;
                }
                downScore = scoreDiamond(findDown(thisBox, color));
                if (downScore > thisScore) {
                    thisScore = downScore;
                }
                leftScore = scoreDiamond(findLeft(thisBox, color));
                if (leftScore > thisScore) {
                    thisScore = leftScore;
                }
            }
            if (thisScore > 0) {
                if (thisScore > allScores) {
                    allScores = thisScore;
                    allX = x;
                    allY = y;
                }
                console.log("Clicking the box at (" + (x + 1) + ", " + (y + 1) + ") scores " + thisScore + " for " + color);
            }
        }
    }
    if (allScores == 0) {
        return null;
    } else {
        return [board.box(allX, allY), allScores];
    }
}

function scoreDiamond(d) {
    if (!d) {
        return 0;
    }
    var x = d.x,
        y = d.y,
        side = d.side,
        c = d.color,
        top = board.box(x, y),
        left = board.box(x - side, y + side),
        right = board.box(x + side, y + side),
        bottom = board.box(x, y + 2 * side),
        delta = 1,
        diamondScore = 0,
        fillBox, fillScore;
    for (let i = 1; i <= side; i++) {
        for (let j = -delta; j <= delta; j++) {
            fillBox = board.box(x + j, y + i);
            fillScore = scoreBox(fillBox.color, d.color);
            diamondScore = diamondScore + fillScore;
        }
        delta++;
    }
    delta = side - 1;
    for (i = side + 1; i < 2 * side; i++) {
        for (var j = -delta; j <= delta; j++) {
            fillBox = board.box(x + j, y + i);
            fillScore = scoreBox(fillBox.color, d.color);
            diamondScore = diamondScore + fillScore;
        }
        delta--;
    }
    return diamondScore;
}

//Return a numerical score for <square> counting one point every white fill box that turns lightblue or lightred, two points for every lightblue box that turns lightred or lightblue box that turns lightred, and three points for every lightred box that turn red or lightblue box that turns blue.
function scoreSquare(s) {
    if (!s) {
        return 0;
    }
    //   console.log("Square detected at " + s.x + ", " + s.y + " with side " + s.side);
    var score = 0,
        fillBox;
    for (let i = s.x; i <= s.x + s.side; i++) {
        for (let j = s.y; j <= s.y + s.side; j++) {
            fillBox = board.box(i, j);
            if (!corner(s, fillBox)) {
                score = score + scoreBox(fillBox.color, s.color);
                //           console.log("fill box at " + i + ", " + j + " with color " + fillBox.color + " gets a score of " + scoreBox(fillBox.color, s.color) + ". Score is now " + score);
            }
        }
    }
    //    console.log("Score = " + score);
    return score;
}

//Returns true is box is a corner of square
function corner(square, box) {
    var x = square.x,
        y = square.y,
        side = square.side;
    return ((box.x == x && box.y == y) || (box.x == x + side && box.y == y) || (box.x == x && box.y == y + side) || (box.x == x + side && box.y == y + side));
}

function scoreBox(boxColor, squareColor) {
    if ((boxColor == "red") || (boxColor == "blue")) {
        return 0;
    }
    if (squareColor == 'red') {
        if (boxColor == 'white') {
            return 1;
        } else if (boxColor == 'lightblue') {
            return 2;
        } else if (boxColor == 'lightred') {
            return 3;
        }
    }
    if (squareColor == 'blue') {
        if (boxColor == 'white') {
            return 1;
        } else if (boxColor == 'lightred') {
            return 2;
        } else if (boxColor == 'lightblue') {
            return 3;
        }
    }
}