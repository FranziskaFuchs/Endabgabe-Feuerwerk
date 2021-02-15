var Feuerwerk;
(function (Feuerwerk) {
    class Vector {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
            this.calcLength();
        }
        //Statische Methoden werden ohne Instanzierung einer Klasse aufgerufen und sind über eine erzeugte Instanz nicht aufrufbar. Oft werden in statische Methoden für Hilfsfunktionen verwendet.
        static getRandom(_min, _max) {
            let tempVector = new Vector(0, 0);
            tempVector.set(_min + Math.random() * (_max - _min), _min + Math.random() * (_max - _min));
            return tempVector;
        }
        //   public static getDifference(_v0: Vector, _v1: Vector): Vector {
        //      let tempVector: Vector = new Vector(0, 0);
        //     tempVector.set(_v0.x - _v1.x, _v0.y - _v1.y);
        //      return tempVector;
        //   }
        //  public static getSum(_v0: Vector, _v1: Vector): Vector {
        //      let tempVector: Vector = new Vector(0, 0);
        //     tempVector.set(_v0.x + _v1.x, _v0.y + _v1.y);
        //      return tempVector;
        //  }
        static getScaled(_v, _scale) {
            let tempVector = new Vector(0, 0);
            tempVector.set(_v.x * _scale, _v.y * _scale);
            return tempVector;
        }
        //   public static getLength(_vector: Vector): number {
        //      let templength: number;
        //       templength = Math.sqrt((_vector.x * _vector.x) + (_vector.y * _vector.y));
        //       return templength;
        //   }
        static getuberVector(_length, _direction) {
            let tempVector = new Vector(_direction.x / (_direction.length), _direction.y / (_direction.length));
            tempVector = this.getScaled(tempVector, _length);
            return tempVector;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
            this.calcLength();
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
            this.calcLength();
        }
        clone() {
            return new Vector(this.x, this.y);
        }
        calcLength() {
            this.length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        }
    }
    Feuerwerk.Vector = Vector;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Vector.js.map