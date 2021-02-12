"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    window.addEventListener("load", handleLoad);
    Feuerwerk.url = "https://fireworkendabgabe.herokuapp.com";
    Feuerwerk.buttonClicked = 0;
    function handleLoad(_event) {
        let canvas;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        let imgData;
        imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
        Feuerwerk.drawCanvas();
        document.querySelector("#displayButton").addEventListener("click", displayRocket);
        document.querySelector("#updateButton").addEventListener("click", updateRocket);
        document.querySelector("#resetButton").addEventListener("click", resetOrder);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showSavedRockets);
        document.querySelector("canvas").addEventListener("click", handleAnimate);
    }
    //Teil 1: Client Seite
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("explosion") + "<br>" + "Lifetime: " + formComponents.get("lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("color") + "<br>" + "Amount of Particle: " + formComponents.get("amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("particleType") + "<br>" + "Size of Particle: " + formComponents.get("particleSize"); //Schlüssel und Wert jeweils in rocket speichern
        rocket = document.querySelector("div#rocketlist").innerHTML;
    }
    async function updateRocket() {
        let newData = new FormData(document.forms[0]);
        let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
        let response = await fetch(Feuerwerk.url + "?" + "command=update&rocket=" + Feuerwerk.currentRocket + "&" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function resetOrder() {
        document.forms[0].reset(); //Formular Daten zurücksetzen
        document.getElementById("rocketlist").innerHTML = ""; //Inhalt im div leeren
    }
    async function saveRocket(_event) {
        console.log("Save rocket");
        let form = new FormData(document.forms[0]); //Daten aus Form holen
        let query = new URLSearchParams(form);
        let response = await fetch(Feuerwerk.url + "?" + query.toString()); //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
        let responseText = await response.text(); //Daten in Textform in responseText speichern und ausgeben lassen
        alert(responseText);
    }
    async function getSavedRocketsFromDb() {
        let response = await fetch(Feuerwerk.url + "?" + "command=retrieve"); //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
        Feuerwerk.rockets = await response.json();
        for (let rocket of Feuerwerk.rockets) { //Durchlauf jeder Rakete in Collection rockets
            let rocketName = document.createElement("a"); //Element a wird erstellt --> in rocketName gespeichert
            rocketName.innerHTML = rocket["Name"]; //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
            document.querySelector("div#dropupContent").appendChild(rocketName); //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
            rocketName.addEventListener("click", chooseRocket); //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
        }
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
                document.querySelector("div#rocketlist").innerHTML = "Name: " + rocket["rocketname"] + "<br>" + "Explosion:  " + rocket["explosion"] + "<br>" + "Lifetime: " + rocket["lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["color"] + "<br>" + "Amount of Particles: " + rocket["amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["particleType"] + "<br>" + "Size of Particle: " + rocket["particleSize"]; //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }
        Feuerwerk.buttonClicked++;
    }
    function fillInputFields(rocket) {
        document.querySelector("input#rocketname").value = rocket["Name"];
        document.querySelector("input#explosion").value = rocket["Explosion"];
        document.querySelector("input#lifetime").value = rocket["Lifetime"];
        document.querySelector("select#color").value = rocket["Color"];
        document.querySelector("input#amount").value = rocket["ParticleAmount"];
        document.querySelector("select#particleType").value = rocket["ParticleType"];
        document.querySelector("input#particleSize").value = rocket["ParticleSize"];
        switch (rocket["color"]) {
            case "red":
                document.querySelector("select#red").selectedOptions;
                break;
            case "orange":
                document.querySelector("select#orange").selectedOptions;
                break;
            case "blue":
                document.querySelector("select#blue").selectedOptions;
                break;
        }
    }
    async function deleteRocket() {
        console.log(Feuerwerk.currentRocket);
        let response = await fetch(Feuerwerk.url + "?" + "command=delete&rocket=" + Feuerwerk.currentRocket); //Abfrage über url --> hier: löschen über command "delete"
        let text = await response.text();
        alert(text); //rocket deleted!
        document.querySelector("div#rocketlist").innerHTML = "";
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
    // TEIL 2: CANVAS
    function drawLightRays(x, y, color, radius, radiusEnde) {
        for (let grade = -1; grade <= 1; grade = grade + 0.2) {
            let jump = grade * Math.PI;
            Feuerwerk.crc2.moveTo(x, y);
            Feuerwerk.crc2.lineTo(x + radius * Math.cos(jump), y + radius * Math.sin(jump));
            Feuerwerk.crc2.strokeStyle = color;
            Feuerwerk.crc2.stroke();
            if (radius >= radiusEnde) {
                Feuerwerk.crc2.clearRect(0, 0, 421, 503); //Nach der letzten Schleife Leinwand leeren
            }
            Feuerwerk.crc2.beginPath();
        }
    }
    function handleAnimate(_event) {
        let cursorX = _event.pageX - document.querySelector("canvas").offsetLeft; //Position Maus X-Achse
        let cursorY = _event.pageY - document.querySelector("canvas").offsetTop; //Position Maus Y-Achse
        let form = new FormData(document.forms[0]); //Daten aus Form holen
        let color = form.get("Color");
        let duration = Number(form.get("Duration")) * 1000; //1 Mili sec. * 1000 = 1 sec
        let radiusEnde = Number(form.get("Radius")) * 10; //1mm * 10 = 1cm
        animateLightRays(cursorX, cursorY, color, duration, 0, radiusEnde);
    }
    function animateLightRays(x, y, color, duration, radius, radiusEnde) {
        function oneLoop() {
            setTimeout(function () {
                drawLightRays(x, y, color, radius, radiusEnde);
                radius++;
                if (radius <= radiusEnde) {
                    oneLoop();
                }
            }, duration / radiusEnde);
        }
        oneLoop();
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map