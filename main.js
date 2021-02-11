"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    console.log("load_main");
    window.addEventListener("load", handleLoad);
    let imgData;
    let form;
    // let url: string = Link zur Herokuapp
    let url = "index.html";
    window.addEventListener("load", handleLoad);
    let canvas;
    let fireworks = [];
    let savedArray = [];
    let fps = 100;
    async function handleLoad(_event) {
        console.log("load");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        //let Submit_Btn: HTMLElement = document.getElementById("submit");
        Feuerwerk.crc2 = canvas.getContext("2d");
        //   canvas.addEventListener("click", handleCanvasClick);
        // Submit_Btn.addEventListener("click", sendFirework);
        Feuerwerk.drawCanvas();
        imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height);
        form = document.querySelector("form");
        canvas = document.querySelector("canvas");
        window.setInterval(update, 1000 / fps);
        getSelect();
    }
    //  function handleCanvasClick(_event: MouseEvent): void {
    //     let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
    //     createFirework(tempPosition);
    // }
    async function sendFirework(_event) {
        console.log("submit firework");
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        savedArray.push(formData);
        alert(responseText);
    }
    Feuerwerk.sendFirework = sendFirework;
    async function getSelect() {
        console.log(savedArray.length);
        let select = document.getElementById("save");
        for (let i = 0; i < savedArray.length; i++) {
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.name;
            select ? .appendChild(element) : ;
        }
    }
    //  function createFirework(tempPosition: Vector) {
    //     console.log("create firework");
    //     let explosionTarget: HTMLInputElement = document.getElementById("explosionSize");
    //     let explosionValue = explosionTarget.value;
    //    let lifetimeTarget: HTMLInputElement = document.getElementById("lifetime");
    //     let lifetimeValue = lifetimeTarget.value;
    //      let colorTarget: HTMLInputElement = document.getElementById("color");
    //     let colorValue = colorTarget.value;
    //    let amountTarget: HTMLInputElement = document.getElementById("amount");
    //     let amountValue = amountTarget.value;
    //    let typeTarget: HTMLInputElement = document.getElementById("particleType");
    //   let typeValue = typeTarget.value;
    //   let sizeTarget: HTMLInputElement = document.getElementById("particleSize");
    //   let sizeValue = sizeTarget.value;
    //   let firework: Firework = new Firework(tempPosition, explosionValue, lifetimeValue, colorValue, amountValue, typeValue, sizeValue * fps);
    //   fireworks.push(firework);
    //   }
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
//# sourceMappingURL=main.js.map