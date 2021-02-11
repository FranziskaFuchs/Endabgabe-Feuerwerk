"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    console.log("Rectangle");
    class Rectangle extends Feuerwerk.Particle {
        constructor(_positon, _velocity) {
            super();
            this.position = new Feuerwerk.Vector(0, 0);
            this.position.x = _positon.x;
            this.position.y = _positon.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.fillRect(this.position.x, this.position.y, _particleRadius);
            _particleRadius;
            ;
            Feuerwerk.crc2.fill();
        }
    }
    Feuerwerk.Rectangle = Rectangle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=rectangle.js.map