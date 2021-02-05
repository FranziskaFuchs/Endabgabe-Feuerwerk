var Feuerwerk;
(function (Feuerwerk) {
    console.log("background");
    //interface Vector{
    //x:number;
    // y:number;
    //}
    function drawCanvas() {
        var horizon = Feuerwerk.crc2.canvas.height / 2;
        drawBackground();
        drawMoon({ x: 90, y: 80 });
        drawSingleStar({ x: 180, y: 200 });
        drawStar();
        drawSkyline({ x: 0, y: horizon }, 75, 150);
        function drawBackground() {
            console.log("Background");
            var gradient = Feuerwerk.crc2.createLinearGradient(0, 0, 0, Feuerwerk.crc2.canvas.height);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.6, "#0A122A");
            gradient.addColorStop(1, "#610B5E");
            Feuerwerk.crc2.fillStyle = gradient;
            Feuerwerk.crc2.fillRect(0, 0, Feuerwerk.crc2.canvas.width, Feuerwerk.crc2.canvas.height);
        }
        function drawMoon(_position) {
            console.log("moon", _position);
            var r1 = 35;
            var r2 = 120;
            var gradient = Feuerwerk.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(_position.x, _position.y);
            Feuerwerk.crc2.fillStyle = gradient;
            Feuerwerk.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
        function drawStar() {
            console.log("Star");
            var starCount = 100;
            for (var i = 0; i < starCount; i++) {
                var x = Math.random() * 1000 + 100;
                var y = Math.random() * 300 + 20;
                drawSingleStar({ x: x, y: y });
            }
        }
        function drawSingleStar(_position) {
            console.log("SingleStar", _position);
            var r1 = 1;
            var r2 = 3;
            var gradient = Feuerwerk.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(_position.x, _position.y);
            Feuerwerk.crc2.fillStyle = gradient;
            Feuerwerk.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
        function drawSkyline(_position, _min, _max) {
            console.log("Skyline");
            var stepMin = 75;
            var stepMax = 150;
            var x = 0;
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(_position.x, _position.y);
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.moveTo(0, 300);
            Feuerwerk.crc2.lineTo(0, 125);
            Feuerwerk.crc2.lineTo(75, 125);
            Feuerwerk.crc2.lineTo(75, 300);
            Feuerwerk.crc2.lineTo(75, 90);
            Feuerwerk.crc2.lineTo(125, 90);
            Feuerwerk.crc2.lineTo(125, 300);
            Feuerwerk.crc2.lineTo(125, 75);
            Feuerwerk.crc2.lineTo(150, 75);
            Feuerwerk.crc2.lineTo(150, 300);
            Feuerwerk.crc2.lineTo(125, 120);
            Feuerwerk.crc2.lineTo(250, 120);
            Feuerwerk.crc2.lineTo(250, 300);
            Feuerwerk.crc2.lineTo(250, 80);
            Feuerwerk.crc2.lineTo(350, 80);
            Feuerwerk.crc2.lineTo(350, 300);
            Feuerwerk.crc2.lineTo(350, 140);
            Feuerwerk.crc2.lineTo(650, 140);
            Feuerwerk.crc2.lineTo(650, 300);
            Feuerwerk.crc2.lineTo(650, 70);
            Feuerwerk.crc2.lineTo(725, 70);
            Feuerwerk.crc2.lineTo(725, 300);
            Feuerwerk.crc2.lineTo(725, 90);
            Feuerwerk.crc2.lineTo(770, 90);
            Feuerwerk.crc2.lineTo(770, 300);
            Feuerwerk.crc2.lineTo(770, 70);
            Feuerwerk.crc2.lineTo(850, 70);
            Feuerwerk.crc2.lineTo(850, 300);
            Feuerwerk.crc2.lineTo(850, 120);
            Feuerwerk.crc2.lineTo(900, 120);
            Feuerwerk.crc2.lineTo(900, 300);
            Feuerwerk.crc2.lineTo(900, 150);
            Feuerwerk.crc2.lineTo(960, 150);
            Feuerwerk.crc2.lineTo(960, 300);
            Feuerwerk.crc2.lineTo(960, 100);
            Feuerwerk.crc2.lineTo(1300, 100);
            Feuerwerk.crc2.lineTo(1300, 300);
            Feuerwerk.crc2.closePath();
            Feuerwerk.crc2.fillStyle = "#2E2E2E";
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
    }
    Feuerwerk.drawCanvas = drawCanvas;
})(Feuerwerk || (Feuerwerk = {}));
