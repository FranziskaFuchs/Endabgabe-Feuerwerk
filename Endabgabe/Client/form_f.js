"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        displayRocketlist();
    }
    function displayRocketlist() {
        let rocketlist = document.querySelector("div#rocketlist");
        rocketlist.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let selector = "[name = '" + entry[0] + "']";
            let item = document.querySelector(selector);
            rocketlist.innerHTML += item.value + "<br>";
        }
    }
    function displayAmount(_event) {
        let amount = _event.target.value;
        console.log(amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=form_f.js.map