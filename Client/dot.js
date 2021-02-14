var Feuerwerk;
(function (Feuerwerk) {
    console.log("dot");
    class Dot extends Feuerwerk.Particle {
        constructor(_position, _velocity) {
            super();
            this.position = new Feuerwerk.Vector(0, 0); //Entkopplung von der Client Posiiton
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.arc(this.position.x, this.position.y, _particleRadius, 0, 2 * Math.PI);
            Feuerwerk.crc2.fill();
        }
    }
    Feuerwerk.Dot = Dot;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=dot.js.map