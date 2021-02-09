"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    function generateContent(_data) {
        for (let category in _data) {
            console.log(category);
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Explosion":
                    group = createExplosion(category);
                    break;
                case "Lifetime":
                    group = createLifetime(category);
                    break;
                case "BaseColor":
                    group = createBaseColor(category);
                    break;
                case "GradientColor":
                    group = createGradientColor(category);
                    break;
                case "ParticleAmount":
                    group = createParticleAmount(category);
                    break;
                case "ParticleForm":
                    group = createParticleForm(category);
                    break;
                case "ParticleSize":
                    group = createParticleSize(category);
                    break;
                default:
                    break;
            }
            let fielset = document.querySelector("fieldset#" + category);
            if (fielset && group)
                fielset.appendChild(group);
        }
    }
    Feuerwerk.generateContent = generateContent;
    function createExplosion(_category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
        }
    }
    Feuerwerk.createExplosion = createExplosion;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=generateContent.js.map