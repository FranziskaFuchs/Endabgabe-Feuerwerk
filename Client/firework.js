var Feuerwerk;
(function (Feuerwerk) {
    console.log("firework");
    class Firework {
        constructor(_position, _particleType, _color, _amount, _explosion, _particleRadius, _lifetime) {
            this.particleArray = []; //im Particle Array, werden die gewählten Partikel gelistet
            this.position = _position;
            this.color = _color;
            this.amount = _amount;
            this.particleRadius = _particleRadius;
            this.lifeTime = _lifetime;
            switch (_particleType) {
                case 0:
                    for (let i = 0; i < this.amount; i++) { //i wird gleich 0 gesetzt, solange i kliener als die Anzahl ist wird in das particle Array ein neues Rectangel gepusht 
                        this.particleArray.push(new Feuerwerk.Rectangle(this.position, Feuerwerk.Vector.getuberVector(_explosion, Feuerwerk.Vector.getRandom(-1, 1))));
                        console.log("Rectangle");
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.amount; i++) {
                        this.particleArray.push(new Feuerwerk.Dot(this.position, Feuerwerk.Vector.getuberVector(_explosion, Feuerwerk.Vector.getRandom(-1, 1))));
                        console.log("Dot");
                    }
                    break;
                default:
                    console.log("wrong type");
                    return;
                // wenn keiner der gennanten Typen ausgewählt wurde, wird "wrong type" ausgegeben.                    
            }
        }
        draw() {
            for (let i = 0; i < this.particleArray.length; i++) { //for Schleife: erster Ausdruck wird ausgeführt, bevor Schleife beginnt.Der zweite ist die Bedingung für die Ausführung der Schleife.Der 3. wird nach der Ausführung jeden Codeblocks ausgeführt.
                this.particleArray[i].draw(this.color, this.particleRadius);
            }
        }
        update() {
            console.log(this.lifeTime);
            this.lifeTime--; //verringer lifeTime wenn i kleiner als die Länge des particle Arrays ist,dann führe die move Funktion von Particle aus, anschließend erhöhe  i um 1
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].move();
            }
        }
        isAlive() {
            if (this.lifeTime == 0) { //wenn die beiden Operatoren gleich sind, wird false zurückgegeben, ansonsten true
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