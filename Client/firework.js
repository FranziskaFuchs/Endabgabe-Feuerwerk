"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    console.log("firework");
    class Firework {
        constructor(_position, _type, _color, _speed, _amount, _particleRadius, _lifetime) {
            this.particleArray = []; //im Particle Array, werden die gewählten Partikel gelistet
            console.log(_lifetime); //ist ausschlaggebend wie lanege Rakte sichtbar ist
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            switch (_type) {
                case "Rectangle":
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Feuerwerk.Rectangle(this.position, Feuerwerk.Vector.getuberVector(_speed, Feuerwerk.Vector.getRandom(-1, 1))));
                    }
                    break;
                case "Dot":
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Feuerwerk.Dot(this.position, Feuerwerk.Vector.getuberVector(_speed, Feuerwerk.Vector.getRandom(-1, 1))));
                    }
                    break;
                case "Line":
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Feuerwerk.Line(this.position, Feuerwerk.Vector.getuberVector(_speed, Feuerwerk.Vector.getRandom(-1, 1))));
                    }
                default: console.log("wrong type"); // wenn keiner der gennanten Typen ausgewählt wurde, wird "wrong type" ausgegeben.                    return;
            }
        }
        draw() {
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].draw(this.color, this.particleRadius);
            }
        }
        update() {
            console.log(this.lifeTime);
            this.lifeTime--;
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }
        isAlive() {
            if (this.lifeTime == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    Feuerwerk.Firework = Firework;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=firework.js.map