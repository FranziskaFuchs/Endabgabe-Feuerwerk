namespace Feuerwerk {
    console.log("line");

    export class Line extends Particle {        //Line = Subklasse von Particle

        constructor(_position: Vector, _velocity: Vector) {
            super();
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }

        public draw(_color: string): void {
            crc2.beginPath();
            crc2.fillStyle = _color;
            crc2.lineTo(this.position.x, this.position.y);
            crc2.fill();
        }
    }
}