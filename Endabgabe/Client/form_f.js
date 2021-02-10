"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#Amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        console.log(_event);
    }
    function displayAmount(_event) {
        let Amount = _event.target.value;
        console.log(Amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=form_f.js.map