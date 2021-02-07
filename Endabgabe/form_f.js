var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("start_handleLoad");
        var form = document.querySelector("div#form");
        var slider = document.querySelector("input#Amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        // console.log("_event");
        var formData = new FormData(document.forms[0]);
        console.log(formData);
    }
    function displayAmount(_event) {
        console.log("displayAmount");
        var progress = document.querySelector("progress");
        var Amount = _event.target.value;
        progress.value = parseFloat(Amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
