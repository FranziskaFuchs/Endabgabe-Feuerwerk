var Feuerwerk;
(function (Feuerwerk) {
    console.log("Particle");
    class Particle {
        constructor() {
        }
        draw(_color, _particleRadius) {
        }
        move() {
            this.velocity = Feuerwerk.Vector.getSum(this.velocity, new Feuerwerk.Vector(0, 0.01)); //Gravitaion
            this.position = Feuerwerk.Vector.getSum(this.position, this.velocity);
        }
    }
    Feuerwerk.Particle = Particle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=particle.js.map