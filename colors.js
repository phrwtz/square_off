colorValue = {};
colorValue.white = ["#FFFFFF", "	#FFF8DC"];
colorValue.red = ["#FF4070","#FF0000"];
colorValue.blue = ["#3333ff", "#0010BB"];
colorValue.lightred = ["#ff99cc","#ffb3d9"];
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