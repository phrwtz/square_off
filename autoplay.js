//Run through all the available boxes and return every psquare (every square that would be created if that box were either blue or red) and its score
function find psquares(){
    for (let x = 0; x < board.size; x++) {
        for (let y = 0; y < board.size; y++) {
            thisBox = board.box(x, y);
            if ((thisBox.color = "white") || (thisBox.color = "lightred") || (thisBox.color = "lightblue")) {
                for (d = 2; d < board.size)
            }
    }
    }
}