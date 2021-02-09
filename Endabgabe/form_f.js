var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        var form = document.querySelector("form#formular");
        var slider = document.querySelector("input#Amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        var RocketList = document.querySelector("div#RocketList");
        RocketList.innerHTML = "";
        var formData = new FormData(document.forms[0]);
        for (var _i = 0, _a = formData.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            var item = document.querySelector("[value='" + entry[1] + "']");
            RocketList.innerHTML += item.name;
        }
    }
    function displayAmount(_event) {
        console.log("displayAmount");
        var progress = document.querySelector("progress");
        var Amount = _event.target.value;
        progress.value = parseFloat(Amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
