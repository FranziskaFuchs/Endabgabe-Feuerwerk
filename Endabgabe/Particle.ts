namespace Feuerwerk {
    console.log("load_Particle");

    import Vector2D = Feuerwerk.Vector2D;

    export class singleParticle {
        public x: number;
        public y: number;
        public move: Vector2D;
        public explosionRadius: number;
        public normalFall: Vector2D;

        constructor(_position: Vector2D, _size: number, _form: string) {
            this.move = new Vector2D(Math.random() * 10, Math.random() * 5);
            this.explosionRadius = Math.random() * 3;
            this.normalFall = new Vector2D(0, this.explosionRadius * 0.5);       
        
    }
     public fall(): void {
         let difference: Vector2D = this.normalFall.getDifference(this.move);
         difference.scale(0.1);
         this.move.add(difference);
         this.move.x += Math.random()* 0.4 - 0.2;
         this.add(this.move);
     }

     public displayParticle1(): void {
            crc2.fillStyle = "red";
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI);

     }
    }
}

