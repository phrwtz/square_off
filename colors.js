colorValue = {};
colorValue.white = ["#FFFFFF", "	#FFF8DC"];
colorValue.red = ["#FA3860","#FF0000"];
colorValue.blue = ["#3333ff", "#0010BB"];
colorValue.lightred = ["#ffb3d9","#ff99cc"];
colorValue.lightblue = ["#B0E0E6", "#87CEEB"];

function toggleCorners(corners) {
    for (let j = 0; j < corners.length; j++) {
        corners[j].rect.setAttribute("stroke-width", 6);
        corners[j].rect.setAttribute("stroke", "gold");
    }
    setTimeout(
        function () {
            for (let j = 0; j < corners.length; j++) {
                corners[j].rect.setAttribute("stroke-width", 1);
                corners[j].rect.setAttribute("stroke", "black");
            }
        }, 1000);
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

