namespace Feuerwerk {
    console.log("Particle");

    export class Particle {
        protected position: Vector;     
        protected velocity: Vector;

        constructor() {

        }

        public draw(_color: string, _particleRadius: number) {
        }

        public move(): void {
            this.velocity = Vector.getSum(this.velocity, new Vector(0, 0.01)); 
            this.position = Vector.getSum(this.position, this.velocity);
        }
    }
}