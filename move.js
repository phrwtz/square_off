function handleMove(rectId) {
    if (!board.won) {
        var boxesToBeFilled = [],
            fillBox;
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
            fillSquares(squares);
            diamonds = findDiamonds(thisBox);
            fillDiamonds(diamonds);
            score();
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

function score() {
    var redCount = 0,
        blueCount = 0,
        lightRedCount = 0,
        lightBlueCount = 0,
        color,
        infoPara = document.getElementById("infoPara"),
        hintButton = document.getElementById("hintButton");
    for (var x = 0; x < board.size; x++) {
        for (var y = 0; y < board.size; y++) {
            color = board.box(x, y).color;
            switch (color) {
                case "red":
                    redCount++;
                    break;
                case "blue":
                    blueCount++;
                    break;
                case "lightred":
                    lightRedCount++;
                    break;
                case "lightblue":
                    lightBlueCount++;
                    break;
            }
        }
    }
    infoPara.innerHTML += ("<span style='color:red; font-size:24'>" + redCount + ", </span> <span style='color:blue; font-size:24'>" + blueCount + ", </span> <span style='color:hotpink; font-size:24'>" + lightRedCount + ", </span><span style='color:cornflowerblue; font-size:24'>" + lightBlueCount + "</span >");
    if (redCount > board.boxesArr.length / 2) {
        board.won = true;
        hintButton.style.display = "none";
        infoPara.innerHTML += ("<br><br><span style='color:red; font-size:24'>Red wins!</span>");
    } else if (blueCount > board.boxesArr.length / 2) {
        board.won = true;
        hintButton.style.display = "none";
        infoPara.innerHTML += "<br><br><span style='color:blue; font-size:24'>Blue wins!</span>";
    }
}