"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    function generateContent(_data) {
        for (let category in _data) {
            console.log(category);
        }
    }
    Feuerwerk.generateContent = generateContent;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=generateContent.js.map