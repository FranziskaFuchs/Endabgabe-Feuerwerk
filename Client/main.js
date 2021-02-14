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
    window.addEventListener("load", handleLoad); // "load" = Ereignistyp auf den gewartet werden soll ; handleLoad: Objekt das die Benachrichtigung erhält
    let url = "https://kolkrabbi.heroku.com/hooks/github";
    //  let url: string = "https://fireworkendabgabe.herokuapp.com"; //Verbindung zu Heroku 
    //   let url: string = "http://localhost:5002"; 
    let buttonClicked = 0;
    let rockets;
    let currentRocket;
    let form;
    let fireworks = [];
    let fps = 10;
    let canvas; // fps= frames per second
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("load"); //die async Funktion läuft außerhalb des Kontrolflusses & gibt impliziertes Promise Objekt zurüc
            form = document.querySelector("form");
            canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            Feuerwerk.crc2 = canvas.getContext("2d");
            Feuerwerk.imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height);
            Feuerwerk.drawCanvas(); //implementierung meines Hintergrunds
            document.querySelector("#displayButton").addEventListener("click", displayRocket);
            document.querySelector("#updateButton").addEventListener("click", updateRocket);
            document.querySelector("#resetButton").addEventListener("click", resetRocketlist);
            document.querySelector("#saveButton").addEventListener("click", saveRocket);
            document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
            document.querySelector("#dropButton").addEventListener("click", showSavedRockets); // den Button werden EventListener gegeben, damit sie auf ein "click" Event lauschen, dass dann in der jeweiligen Funktion ausgeführt wird.
            canvas.addEventListener("click", handleClick); //Canvas bekommt ebenfalls ein "click" Event, damit er reagieren kann, wenn Nutzer Rakete zum explodieren bringen will.
            window.setInterval(update, 10 / fps); //in diesem Intervall wird das Fenster geupdatet 
        });
    }
    //Teil 1: Client 
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize") + "pixel"; //Schlüssel und Wert wird jeweils in rocket gespeichern
        document.querySelector("div#rocketlist").innerHTML = rocket; //damit sollen die Daten, der rocketlist hinzugefüht werden 
    }
    function updateRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = new FormData(document.forms[0]); //update des Formulars 
            let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
            let response = yield fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
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
            let response = yield fetch(url + "?" + query.toString()); //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
            let responseText = yield response.text(); //Daten in Textform in responseText speichern und ausgeben lassen
            alert(responseText);
        });
    }
    function getSavedRocketsFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url + "?" + "command=retrieve"); //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
            rockets = yield response.json();
            for (let rocket of rockets) { //Durchlauf jeder Rakete in Collection rockets
                let rocketName = document.createElement("a"); //Element a wird erstellt --> in rocketName gespeichert
                rocketName.innerHTML = rocket["Name"]; //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
                document.querySelector("div#dropupContent").appendChild(rocketName); //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
                rocketName.addEventListener("click", chooseRocket); //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
            }
        });
    }
    function chooseRocket(_event) {
        currentRocket = _event.target.innerHTML; //currentRocket entspricht Rakete die angezeigt werden soll
        let parent = document.querySelector("div#dropupContent");
        parent.style.display = "none";
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        for (let rocket of rockets) { //Durchlauf jeder Rakete in Collection rockets
            if (rocket["rocketName"] == currentRocket) {
                //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?   
                document.querySelector("div#rocketlist").innerHTML = "Name: " + rocket["rocketName"] + "<br>" + "Explosion:  " + rocket["ExplosionSize"] + "<br>" + "Lifetime: " + rocket["Lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Amount of Particles: " + rocket["Amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["ParticleType"] + "<br>" + "Size of Particle: " + rocket["ParticleSize"]; //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }
        buttonClicked++;
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
            console.log(currentRocket);
            let response = yield fetch(url + "?" + "command=delete&rocket=" + currentRocket); //Abfrage über url --> hier: löschen über command "delete"
            let text = yield response.text();
            alert(text); //rocket deleted!
            document.querySelector("div#rocketlist").innerHTML = "";
        });
    }
    function showSavedRockets() {
        let parent = document.querySelector("div#dropupContent");
        if (buttonClicked % 2 == 0) { //button geklickt = gerade Zahl (auf)
            getSavedRocketsFromDb();
            parent.style.display = "block";
        }
        else { //button nochmal geklickt = ungerade (zu)
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
        buttonClicked++;
    }
    //Teil 2: Canvas
    function handleClick(_event) {
        let tempPosition = new Feuerwerk.Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition); //für das Feuerwerk wird eine Temporäre Position gegeben
    }
    function createFirework(tempPosition) {
        console.log("createFirework"); //createFirework holt sich die Input Elemente über deren ID und erstellt damit das gewünscht Feuerwerk des Nutzers
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
        console.log(TypeTarget.value);
        let particleSizeTarget = document.getElementById("Size_P");
        let particleSizeValue = particleSizeTarget.value;
        let firework = new Feuerwerk.Firework(tempPosition, ExplosionValue, LifetimeValue, ColorValue, AmountValue, TypeValue, particleSizeValue * fps / 2);
        fireworks.push(firework);
    }
    function update() {
        //Der Hintergrund wird geupdatet
        let canvas;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        Feuerwerk.imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height);
        Feuerwerk.drawCanvas();
        for (let i = fireworks.length - 1; i >= 0; i--) { //solange noch Daten im Firework Array sind, wird die function update ausgeführt, firework ist also noch Alive 
            //sobald i>= 0 ist, wird die Funktion beendet und das Feuerwerk ebenso
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);
            }
        }
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=main.js.map