namespace Feuerwerk {
    console.log("firework");

    export class Firework {

        public position: Vector;
        public color: string;
        public speed: number;
        public amount: number;
        public particleRadius: number;
        private lifeTime: number;

        protected particleArray: Particle[] = [];

        constructor(_position: Vector, _type: string, _color: string, _speed: number, _amount: number, _particleRadius: number, _lifetime: number) {
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;

            switch (_type) {
                case "rectangle":
                    for (let i: number = 0; i < this.amount; i++) {
                        this.particleArray.push(new Rectangle(this.position, Vector.getuberVector(_speed, Vector.getRandom(-1, 1))));
                    }
                    break;

                case "dot":
                    for (let i: number = 0; i < this.amount; i++) {
                        this.particleArray.push(new Dot(this.position, Vector.getuberVector(_speed, Vector.getRandom(-1, 1))));
                    }
                    break;

                case "line":
                    for (let i: number = 0; i < this.amount; i++) {
                        this.particleArray.push(new Line(this.position, Vector.getuberVector(_speed, Vector.getRandom(-1, 1))));
                    }
                default: console.log("wrong type");
                    return;
            }
        }

        public draw(): void {
            for (let i: number = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].draw(this.color, this.particleRadius);
            }

        }

        public update(): void {
            console.log(this.lifeTime);
            this.lifeTime--;
            for (let i: number = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }

        public isAlive(): boolean {
            if (this.lifeTime == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}