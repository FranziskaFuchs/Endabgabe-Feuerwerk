"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    console.log("main_form");
    window.addEventListener("load", handleLoadForm);
    let form;
    // let url: string = Link zur Herokuapp
    //let url: string = "index.html";
    let Submit_Btn;
    let canvas;
    let fireworks = [];
    let savedArray = [];
    let fps = 100;
    // let serverPage: string ="";
    async function handleLoadForm(_event) {
        form = document.querySelector("form");
        canvas.addEventListener("click", handleCanvasClick);
        Submit_Btn.addEventListener("click", sendFireWork);
        window.setInterval(update, 1000 / fps);
        getSelect();
    }
    function handleCanvasClick(_event) {
        let tempPosition = new Feuerwerk.Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);
    }
    async function sendFireWork(_event) {
        console.log("submit firework");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        savedArray.push(formData);
        alert(responseText);
    }
    Feuerwerk.sendFireWork = sendFireWork;
    async function getSelect() {
        console.log(savedArray.length);
        let select = document.getElementById("save");
        for (let i = 0; i < savedArray.length; i++) {
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.name;
            select.appendChild(element);
        }
    }
    function createFirework(_tempPosition) {
        console.log("create firework");
        let explosionTarget = document.getElementById("explosionSize");
        let explosionValue = explosionTarget.value;
        let lifetimeTarget = document.getElementById("lifetime");
        let lifetimeValue = lifetimeTarget.value;
        let colorTarget = document.getElementById("color");
        let colorValue = colorTarget.value;
        let amountTarget = document.getElementById("amount");
        let amountValue = amountTarget.value;
        let typeTarget = document.getElementById("particleType");
        let typeValue = typeTarget.value;
        let sizeTarget = document.getElementById("particleSize");
        let sizeValue = sizeTarget.value;
        let firework = new Feuerwerk.Firework(tempPosition, explosionValue, lifetimeValue, colorValue, amountValue, typeValue, sizeValue * fps);
        fireworks.push(firework);
    }
    function update() {
        Feuerwerk.crc2.globalAlpha = 0.05;
        Feuerwerk.crc2.fillStyle = "black";
        Feuerwerk.crc2.fillRect(0, 0, canvas.width, canvas.height);
        Feuerwerk.crc2.fill;
        Feuerwerk.crc2.globalAlpha = 1;
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);
            }
        }
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main_form.js.map