//Run through all the available boxes and return every psquare (every square that would be created if that box were either blue or red) and its score
function findPsquares() {
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
                upLeftScore = scoreSquare(findUpLeft(thisBox, board.turnColor));
                if (upLeftScore > thisScore) {
                    thisScore = upLeftScore;
                }
                upRightScore = scoreSquare(findUpRight(thisBox, board.turnColor));
                if (upRightScore > thisScore) {
                    thisScore = upRightScore;
                }
                downLeftScore = scoreSquare(findDownLeft(thisBox, board.turnColor));
                if (downLeftScore > thisScore) {
                    thisScore = downLeftScore;
                }
                downRightScore = scoreSquare(findDownRight(thisBox, board.turnColor));
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
                console.log("Clicking the box at (" + x + ", " + y + ") scores " + thisScore + " for " + board.turnColor);
            }
        }
    }
    if (allScores == 0) {
        alert("No hint available for " + board.turnColor);
    } else {
        alert("Try clicking on (" + (allX + 1) + ", " + (allY + 1) + ")!");
    }
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