var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("handleLoad_form");
        var form = document.querySelector("div#form");
        var slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        console.log("handleChange");
    }
    function displayAmount(_event) {
        console.log("displayAmount");
        var progress = document.querySelector("progress");
        var Amount = _event.target.value;
        progress.value = parseFloat(Amount);
    }
})(Feuerwerk || (Feuerwerk = {}));
