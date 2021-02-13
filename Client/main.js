"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    Feuerwerk.url = "https://fireworkendabgabe.herokuapp.com";
    Feuerwerk.buttonClicked = 0;
    Feuerwerk.fireworks = [];
    let fps = 10;
    let form;
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let canvas;
            form = document.querySelector("form");
            canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            Feuerwerk.crc2 = canvas.getContext("2d");
            Feuerwerk.imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
            Feuerwerk.drawCanvas();
            document.querySelector("#displayButton").addEventListener("click", displayRocket);
            document.querySelector("#updateButton").addEventListener("click", updateRocket);
            document.querySelector("#resetButton").addEventListener("click", resetRocketlist);
            document.querySelector("btnSubmit").addEventListener("click", sendFireWork);
            document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
            document.querySelector("#dropButton").addEventListener("click", showSavedRockets);
            //   (<HTMLCanvasElement>document.querySelector("canvas")).addEventListener("click", handleClick);
            canvas.addEventListener("click", handleClick);
            window.setInterval(update, 100 / fps);
        });
    }
    //Teil 1: Client 
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize") + "pixel"; //Schlüssel und Wert jeweils in rocket speichern
        document.querySelector("div#rocketlist").innerHTML = rocket;
    }
    function updateRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = new FormData(document.forms[0]);
            let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
            let response = yield fetch(Feuerwerk.url + "?" + "command=update&rocket=" + Feuerwerk.currentRocket + "&" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function resetRocketlist() {
        document.forms[0].reset(); //Formular Daten zurücksetzen
        document.getElementById("rocketlist").innerHTML = ""; //Inhalt im div leeren
    }
    function saveRocket(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Save rocket");
            let form = new FormData(document.forms[0]); //Daten aus Form holen
            let query = new URLSearchParams(form);
            let response = yield fetch(Feuerwerk.url + "?" + query.toString()); //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
            let responseText = yield response.text(); //Daten in Textform in responseText speichern und ausgeben lassen
            alert(responseText);
        });
    }
    function getSavedRocketsFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(Feuerwerk.url + "?" + "command=retrieve"); //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
            Feuerwerk.rockets = yield response.json();
            for (let rocket of Feuerwerk.rockets) { //Durchlauf jeder Rakete in Collection rockets
                let rocketName = document.createElement("a"); //Element a wird erstellt --> in rocketName gespeichert
                rocketName.innerHTML = rocket["Name"]; //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
                document.querySelector("div#dropupContent").appendChild(rocketName); //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
                rocketName.addEventListener("click", chooseRocket); //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
            }
        });
    }
    function chooseRocket(_event) {
        Feuerwerk.currentRocket = _event.target.innerHTML; //currentRocket entspricht Rakete die angezeigt werden soll
        let parent = document.querySelector("div#dropupContent");
        parent.style.display = "none";
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        for (let rocket of Feuerwerk.rockets) { //Durchlauf jeder Rakete in Collection rockets
            if (rocket["rocketName"] == Feuerwerk.currentRocket) {
                //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?   
                document.querySelector("div#rocketlist").innerHTML = "Name: " + rocket["rocketName"] + "<br>" + "Explosion:  " + rocket["ExplosionSize"] + "<br>" + "Lifetime: " + rocket["Lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Amount of Particles: " + rocket["Amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["ParticleType"] + "<br>" + "Size of Particle: " + rocket["ParticleSize"]; //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }
        Feuerwerk.buttonClicked++;
    }
    function fillInputFields(rocket) {
        document.querySelector("input#rocketname").value = rocket["rocketName"];
        document.querySelector("input#explosion").value = rocket["explosion"];
        document.querySelector("input#lifetime").value = rocket["lifetime"];
        document.querySelector("select#color").value = rocket["color"];
        document.querySelector("input#amount").value = rocket["amount"];
        document.querySelector("select#particleType").value = rocket["particleType"];
        document.querySelector("input#ParticleSize").value = rocket["ParticleSize"];
    }
    function deleteRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Feuerwerk.currentRocket);
            let response = yield fetch(Feuerwerk.url + "?" + "command=delete&rocket=" + Feuerwerk.currentRocket); //Abfrage über url --> hier: löschen über command "delete"
            let text = yield response.text();
            alert(text); //rocket deleted!
            document.querySelector("div#rocketlist").innerHTML = "";
        });
    }
    function showSavedRockets() {
        let parent = document.querySelector("div#dropupContent");
        if (Feuerwerk.buttonClicked % 2 == 0) { //button geklickt = gerade Zahl (auf)
            getSavedRocketsFromDb();
            parent.style.display = "block";
        }
        else { //button nochmal geklickt = ungerade (zu)
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        Feuerwerk.buttonClicked++;
    }
    //Teil 2: Canvas
    function handleClick(_event) {
        let tempPosition = new Feuerwerk.Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);
    }
    function createFirework(tempPosition) {
        console.log("createFirework");
        let ExplosionTarget = document.getElementById("explosion");
        let ExplosionValue = ExplosionTarget.value;
        let LifetimeTarget = document.getElementById("lifetime_f");
        let LifetimeValue = LifetimeTarget.value;
        let ColorTarget = document.getElementById("color");
        let ColorValue = ColorTarget.value;
        let AmountTarget = document.getElementById("amount");
        let AmountValue = AmountTarget.value;
        let TypeTarget = document.getElementById("particleType");
        let TypeValue = TypeTarget.value;
        let particleSizeTarget = document.getElementById("Size_P");
        let particleSizeValue = particleSizeTarget.value;
        let firework = new Feuerwerk.Firework(tempPosition, ExplosionValue, LifetimeValue, ColorValue, AmountValue, TypeValue, particleSizeValue * fps / 2);
        Feuerwerk.fireworks.push(firework);
    }
    function update() {
        let canvas;
        let imgData;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
        Feuerwerk.drawCanvas();
        for (let i = Feuerwerk.fireworks.length - 1; i >= 0; i--) {
            Feuerwerk.fireworks[i].draw();
            Feuerwerk.fireworks[i].update();
            if (!Feuerwerk.fireworks[i].isAlive()) {
                Feuerwerk.fireworks.splice(i, 1);
            }
        }
    }
    function sendFireWork(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("submit fire work");
            let formData = new FormData(form);
            let query = new URLSearchParams(formData);
            let response = yield fetch(Feuerwerk.url + "?" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    Feuerwerk.sendFireWork = sendFireWork;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map