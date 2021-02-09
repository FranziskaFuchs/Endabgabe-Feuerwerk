"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        Feuerwerk.generateContent(data);
        let form = document.querySelector("form#formular");
        let slider = document.querySelector("input#Amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
        displayRocketList();
    }
    function handleChange(_event) {
        displayRocketList();
    }
    function displayRocketList() {
        let RocketList = document.querySelector("div#RocketList");
        RocketList.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        for (let entry of formData.entries()) {
            //console.log(entry);
            let selector = "[value='" + entry[1] + "']";
            let item = document.querySelector(selector);
            RocketList.innerHTML += item.name;
        }
        function displayAmount(_event) {
            let progress = document.querySelector("progress");
            let Amount = _event.target.value;
            progress.value = parseFloat(Amount);
        }
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=form_f.js.map