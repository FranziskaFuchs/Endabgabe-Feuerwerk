var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Firework;
(function (Firework) {
    var V2 = Vector.Vector2D;
    var Rocket = /** @class */ (function (_super) {
        __extends(Rocket, _super);
        function Rocket(_position) {
            var _this = _super.call(this, _position.x, _position.y) || this;
            _this.move = new V2(Math.random() * 10 - 5, Math.random() * 7 - 6);
            _this.explosionRadius = Math.random() * 2 + 2;
            _this.particleFall = new V2(0, _this.exlposionRadius * 0.5);
            return _this;
        }
        Rocket.prototype.fall = function () {
            var diff = this.particleFall.getDiff(this.move);
            diff.scale(0.1);
            this.move.add(diff);
            this.move.x += Math.random() * 0.4 - 0.2;
            this.add(this.move);
        };
        Rocket.prototype.display = function () {
            crc2.fillStyle = "#ffffff";
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.explosionRadius, 0, 2 * Math.PI);
            crc2.fill();
        };
        return Rocket;
    }(V2));
    Firework.Rocket = Rocket;
})(Firework || (Firework = {}));
