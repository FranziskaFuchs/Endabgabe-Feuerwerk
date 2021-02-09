"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Vector2D {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        getDifference(_subtract) {
            return new Vector2D(this.x - _subtract.x, this.y - _subtract.y);
        }
        subtract(_subtract) {
            this.x -= _subtract.x;
            this.y -= _subtract.y;
        }
        add(_add) {
            this.x += _add.x;
            this.y += _add.y;
        }
        scale(_scale) {
            this.x *= _scale;
            this.y *= _scale;
        }
    }
    Feuerwerk.Vector2D = Vector2D;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Vector.js.map