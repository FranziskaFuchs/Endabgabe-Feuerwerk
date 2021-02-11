"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    let imgData;
    let form;
    let slider_E = document.querySelector("input#explosion");
    let slider_A = document.querySelector("input#lifetime");
    let slider_L = document.querySelector("input#amount");
    let slider_S = document.querySelector("input#particleSize");
    //   let savedRockets: Rocket[]; // soll alle Raketen der Database enthalten
    //  let rockets: Rocket[]; // Raketen in rocketlist
    function handleLoad(_event) {
        console.log("load Feuerwerk_form");
        Feuerwerk.canvas = document.querySelector("canvas");
        if (!Feuerwerk.canvas)
            return;
        Feuerwerk.crc2 = Feuerwerk.canvas.getContext("2d");
        Feuerwerk.drawCanvas();
        imgData = Feuerwerk.crc2.getImageData(0, 0, Feuerwerk.canvas.width, Feuerwerk.canvas.height); //implementierung meines Hintergrunds
        Feuerwerk.canvas.addEventListener("click", handleClick); // durch klicken auf den Canvas, sollen Raketen explodieren können
        form = document.querySelector("form");
        form.addEventListener("change", handleChange);
        slider_E.addEventListener("input", displayExplosion);
        slider_A.addEventListener("input", displayLifetime);
        slider_L.addEventListener("input", displayAmount);
        slider_S.addEventListener("input", displayParticleSize);
        //   let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=Submit_Btn");
        //   submit.addEventListener("click",sendRocket); //erstellte Rakete zu rocketlist hinzufügen.
    }
    function handleChange(_event) {
        let rocketlist = document.querySelector("div#rocketlist");
        rocketlist.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            rocketlist.innerHTML += item.name;
        }
    }
    function displayExplosion(_event) {
        let explosion = _event.target.value;
        console.log(explosion);
    }
    function displayAmount(_event) {
    }
    function displayLifetime(_event) {
    }
    function displayParticleSize(_event) {
    }
    function handleClick(_event) {
        //   let tempPosition: Vector = new Vector(_event.offsetX, _evnet.offsetY);
        //    createFirework(tempPosition)
        console.log("handleClick");
    }
    // function createSavedRockets(_rocketData: string[],_index:string): void{
    //    let section: HTMLElement | null = document.getElementById("rockets");
    //     console.log(_rocketData);
    //    let rocket: Rocket;
    //    switch(_rocketData[4]){
    //        case "rectangle":
    //       break;
    //      case "dot":
    //       break;
    //      case: "line":
    //      break;
    //    }
    // }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map