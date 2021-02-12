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
        document.querySelector("#resetButton").addEventListener("click", resetRocketlist);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
        document.querySelector("#dropButton").addEventListener("click", showSavedRockets);
    }
    //Teil 1: Client Seite
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "<br>" + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "<br>" + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize"); //Schlüssel und Wert jeweils in rocket speichern
        document.querySelector("div#rocketlist").innerHTML = rocket;
    }
    async function updateRocket() {
        let newData = new FormData(document.forms[0]);
        let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
        let response = await fetch(Feuerwerk.url + "?" + "command=update&rocket=" + Feuerwerk.currentRocket + "&" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function resetRocketlist() {
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
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map