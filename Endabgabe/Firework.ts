module Firework {
    import V2 = Vector.Vector2D;

    export class Rocket extends V2{
        privat: particleFall: V2;
        public: explosionRadius: number;
        private: move: V2;

        constructor(_position: V2) {
            super(_position.x, _position.y);
            this.move= new V2(Math.random()* 10 -5, Math.random()*7 - 6);
            this.explosionRadius = Math.random() * 2 + 2;
            this.particleFall = new V2(0, this.exlposionRadius * 0.5);
        }

        public fall(): void {
            var diff: V2 = this.particleFall.getDiff(this.move);
            diff.scale(0.1);
            this.move.add(diff);
            this.move.x += Math.random() * 0.4 - 0.2;
            this.add(this.move);
        }

        public display(): void {
            crc2.fillStyle = "#ffffff";
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI);
            crc2.fill();
        }
    }
}