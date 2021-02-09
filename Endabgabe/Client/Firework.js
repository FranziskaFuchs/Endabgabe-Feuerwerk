"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    var V2 = Feuerwerk.Vector2D;
    class Rocket extends V2 {
        constructor(_position) {
            super(_position.x, _position.y);
            this.move = new V2(Math.random() * 10 - 5, Math.random() * 7 - 6);
            this.explosionRadius = Math.random() * 2 + 2;
            this.particleFall = new V2(0, this.exlposionRadius * 0.5);
        }
        fall() {
            var diff = this.particleFall.getDiff(this.move);
            diff.scale(0.1);
            this.move.add(diff);
            this.move.x += Math.random() * 0.4 - 0.2;
            this.add(this.move);
        }
        display() {
            Feuerwerk.crc2.fillStyle = "#ffffff";
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI);
            Feuerwerk.crc2.fill();
        }
    }
    Feuerwerk.Rocket = Rocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Firework.js.map