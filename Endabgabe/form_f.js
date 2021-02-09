"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        let form = document.querySelector("form#formular");
        let slider = document.querySelector("input#Amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        let RocketList = document.querySelector("div#RocketList");
        RocketList.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        // console.log(formData);
        for (let entry of formData.entries()) {
            console.log(entry);
            //   let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']")
            //   RocketList.innerHTML += item.name;
        }
    }
    function displayAmount(_event) {
        console.log("displayAmount");
        let progress = document.querySelector("progress");
        let Amount = _event.target.value;
        progress.value = parseFloat(Amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=form_f.js.map