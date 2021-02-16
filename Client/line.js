var Feuerwerk;
(function (Feuerwerk) {
    console.log("line");
    class Line extends Feuerwerk.Particle {
        constructor(_position, _velocity) {
            super();
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.lineTo(this.position.x, this.position.y);
            Feuerwerk.crc2.fill();
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=line.js.map