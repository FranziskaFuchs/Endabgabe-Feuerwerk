"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    console.log("load_Particle");
    var Vector2D = Feuerwerk.Vector2D;
    class singleParticle {
        constructor(_position, _size, _form) {
            this.move = new Vector2D(Math.random() * 10, Math.random() * 5);
            this.explosionRadius = Math.random() * 3;
            this.normalFall = new Vector2D(0, this.explosionRadius * 0.5);
        }
        fall() {
            let difference = this.normalFall.getDifference(this.move);
            difference.scale(0.1);
            this.move.add(difference);
            this.move.x += Math.random() * 0.4 - 0.2;
            this.move.add(this.move);
        }
        displayParticle1() {
            Feuerwerk.crc2.fillStyle = "red";
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI);
        }
    }
    Feuerwerk.singleParticle = singleParticle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Particle.js.map