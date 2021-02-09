var Feuerwerk;
(function (Feuerwerk) {
    var Vector2D = /** @class */ (function () {
        function Vector2D(_x, _y) {
            this.set(_x, _y);
        }
        Vector2D.prototype.set = function (_x, _y) {
            this.x = _x;
            this.y = _y;
        };
        Vector2D.prototype.getDifference = function (_subtract) {
            return new Vector2D(this.x - _subtract.x, this.y - _subtract.y);
        };
        Vector2D.prototype.subtract = function (_subtract) {
            this.x -= _subtract.x;
            this.y -= _subtract.y;
        };
        Vector2D.prototype.add = function (_add) {
            this.x += _add.x;
            this.y += _add.y;
        };
        Vector2D.prototype.scale = function (_scale) {
            this.x *= _scale;
            this.y *= _scale;
        };
        return Vector2D;
    }());
    Feuerwerk.Vector2D = Vector2D;
})(Feuerwerk || (Feuerwerk = {}));
