var Feuerwerk;
(function (Feuerwerk) {
    console.log("background");
    function drawCanvas() {
        let horizon = Feuerwerk.crc2.canvas.height / 2;
        drawBackground();
        drawMoon({ x: 90, y: 80 });
        drawSingleStar({ x: 180, y: 200 });
        drawStar();
        drawSkyline({ x: 0, y: horizon });
        drawSkylinetwo({ x: 0, y: 300 });
        function drawBackground() {
            // console.log("drawBackground");
            let gradient = Feuerwerk.crc2.createLinearGradient(0, 0, 0, Feuerwerk.crc2.canvas.height);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.4, "#0A122A");
            gradient.addColorStop(0.8, "#3B0B17");
            gradient.addColorStop(1, "#B43104");
            Feuerwerk.crc2.fillStyle = gradient;
            Feuerwerk.crc2.fillRect(0, 0, Feuerwerk.crc2.canvas.width, Feuerwerk.crc2.canvas.height);
        }
        function drawMoon(_position) {
            //console.log("moon",_position);
            let r1 = 35;
            let r2 = 120;
            let gradient = Feuerwerk.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
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
            //console.log("Star");
            let starCount = 100;
            for (let i = 0; i < starCount; i++) {
                let x = Math.random() * 1000 + 100;
                let y = Math.random() * 300 + 20;
                drawSingleStar({ x: x, y: y });
            }
        }
        function drawSingleStar(_position) {
            // console.log("SingleStar",_position);
            let r1 = 1;
            let r2 = 3;
            let gradient = Feuerwerk.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(_position.x, _position.y);
            Feuerwerk.crc2.fillStyle = gradient;
            Feuerwerk.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
        function drawSkyline(_position) {
            //  console.log("Skyline");
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
            Feuerwerk.crc2.lineTo(200, 75);
            Feuerwerk.crc2.lineTo(200, 300);
            Feuerwerk.crc2.lineTo(200, 120);
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
            Feuerwerk.crc2.lineTo(800, 90);
            Feuerwerk.crc2.lineTo(800, 300);
            Feuerwerk.crc2.lineTo(800, 70);
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
            Feuerwerk.crc2.fillStyle = "#140718";
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
        function drawSkylinetwo(_position) {
            Feuerwerk.crc2.save();
            Feuerwerk.crc2.translate(_position.x, _position.y);
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.moveTo(0, 300);
            Feuerwerk.crc2.lineTo(0, 150);
            Feuerwerk.crc2.lineTo(70, 150);
            Feuerwerk.crc2.lineTo(70, 300);
            Feuerwerk.crc2.lineTo(70, 90);
            Feuerwerk.crc2.lineTo(100, 90);
            Feuerwerk.crc2.lineTo(100, 300);
            Feuerwerk.crc2.lineTo(100, 60);
            Feuerwerk.crc2.lineTo(150, 60);
            Feuerwerk.crc2.lineTo(150, 300);
            Feuerwerk.crc2.lineTo(150, 90);
            Feuerwerk.crc2.lineTo(175, 90);
            Feuerwerk.crc2.lineTo(175, 300);
            Feuerwerk.crc2.lineTo(175, 100);
            Feuerwerk.crc2.lineTo(225, 100);
            Feuerwerk.crc2.lineTo(225, 300);
            Feuerwerk.crc2.lineTo(225, 120);
            Feuerwerk.crc2.lineTo(300, 120);
            Feuerwerk.crc2.lineTo(300, 300);
            Feuerwerk.crc2.lineTo(300, 90);
            Feuerwerk.crc2.lineTo(350, 90);
            Feuerwerk.crc2.lineTo(350, 300);
            Feuerwerk.crc2.lineTo(350, 70);
            Feuerwerk.crc2.lineTo(420, 70);
            Feuerwerk.crc2.lineTo(420, 300);
            Feuerwerk.crc2.lineTo(420, 150);
            Feuerwerk.crc2.lineTo(500, 150);
            Feuerwerk.crc2.lineTo(500, 300);
            Feuerwerk.crc2.lineTo(500, 120);
            Feuerwerk.crc2.lineTo(550, 120);
            Feuerwerk.crc2.lineTo(550, 300);
            Feuerwerk.crc2.lineTo(550, 150);
            Feuerwerk.crc2.lineTo(620, 150);
            Feuerwerk.crc2.lineTo(620, 300);
            Feuerwerk.crc2.lineTo(620, 90);
            Feuerwerk.crc2.lineTo(700, 90);
            Feuerwerk.crc2.lineTo(700, 300);
            Feuerwerk.crc2.lineTo(700, 100);
            Feuerwerk.crc2.lineTo(800, 100);
            Feuerwerk.crc2.lineTo(800, 300);
            Feuerwerk.crc2.lineTo(800, 120);
            Feuerwerk.crc2.lineTo(820, 120);
            Feuerwerk.crc2.lineTo(820, 300);
            Feuerwerk.crc2.lineTo(820, 70);
            Feuerwerk.crc2.lineTo(900, 70);
            Feuerwerk.crc2.lineTo(900, 300);
            Feuerwerk.crc2.lineTo(900, 170);
            Feuerwerk.crc2.lineTo(990, 170);
            Feuerwerk.crc2.lineTo(990, 300);
            Feuerwerk.crc2.lineTo(990, 100);
            Feuerwerk.crc2.lineTo(1200, 100);
            Feuerwerk.crc2.lineTo(1200, 300);
            Feuerwerk.crc2.lineTo(1200, 70);
            Feuerwerk.crc2.lineTo(1400, 70);
            Feuerwerk.crc2.lineTo(1400, 300);
            Feuerwerk.crc2.closePath();
            Feuerwerk.crc2.fillStyle = "#1B0A2A";
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.restore();
        }
    }
    Feuerwerk.drawCanvas = drawCanvas;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=background.js.map