namespace Feuerwerk {
    console.log("Particle");

    export class Particle {
        protected position: Vector;     //Klasse Particle mit den Eigenschaften position und velocity sowie den Methoden draw und move
        protected velocity: Vector;

        constructor() {

        }

        public draw(_color: string, _particleRadius: number) {
        }

        public move(): void {
            this.velocity = Vector.getSum(this.velocity, new Vector(0, 0.01)) //Gravitaion
            this.position = Vector.getSum(this.position, this.velocity);
        }
    }
}