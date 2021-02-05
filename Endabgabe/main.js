var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    var imgData;
    function handleLoad() {
        console.log("start");
        var canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        Feuerwerk.drawCanvas();
        imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height);
    }
})(Feuerwerk || (Feuerwerk = {}));
