namespace Feuerwerk {
    export class Vector2D {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        getDifference(_subtract: Vector2D): Vector2D{
            return new Vector2D(this.x - _subtract.x, this.y - _subtract.y);
        }

        subtract(_subtract: Vector2D): void{
            this.x -= _subtract.x;
            this.y -= _subtract.y;
        }
        
        add(_add: Vector2D): void{
            this.x += _add.x;
            this.y += _add.y;
        }

        scale(_scale: number):void{
            this.x *= _scale;
            this.y *= _scale;
        }

    }
}