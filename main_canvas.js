"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    let imgData;
    function handleLoad(_even) {
        console.log("handleload");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        Feuerwerk.drawCanvas();
        imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main_canvas.js.map