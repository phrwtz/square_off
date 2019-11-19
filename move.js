function handleMove(rectId) {
    var boxesToBeFilled = [], fillBox;
    var infoPara = document.getElementById("infoPara");
    var squares = [];
    var boxId = rectId;
    var thisBox = board.boxesObj[boxId];
    //Do nothing if box is already either red or blue
    if (thisBox.color == "red" || thisBox.color == "blue") {
        console.log("Clicked on a red or blue box. No go.");
    } else {
        //If it's any other color, make it turnColor
        thisBox.color = board.turnColor;
        handleTurn();
        thisBox.draw();
        squares = findSquares(thisBox);
        if (squares.length > 0) {
            boxesToBeFilled = getFillSquares(squares);
            for (let j = 0; j < boxesToBeFilled.length; j++) {
                boxesToBeFilled[j].fill();
                boxesToBeFilled[j].draw();    
            }
        }
    }
}

function handleTurn() {
    var turnNumberStr,
        turnColorStr,
        infoStr,
        infoColor,
        infoPara = document.getElementById("infoPara");
    //If this is the zero'th or second turn, we change the turn color
    if ((board.turnNumber == 0) || (board.turnNumber == 2)) {
        if (board.turnColor == "red") {
            board.turnColor = "blue";
        } else if (board.turnColor == "blue") {
            board.turnColor = "red";
        }
        //and turnNumber is now 1
        board.turnNumber = 1;
        //If this is the first turn, we don't change the turn color, we just change the turn number.
    } else {
        board.turnNumber = 2;
    }
    infoColor = board.turnColor;
    turnNumberStr = (board.turnNumber == 1 ? "first turn" : "second turn");
    turnColorStr = (infoColor == "red" ? "Red's " : "Blue's ");
    infoStr = turnColorStr + turnNumberStr;
    infoPara.innerHTML = "<h2><span style=\"color:" + infoColor + "\">" + infoStr + "</span></h2>"
}