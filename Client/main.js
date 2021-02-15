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
    let url = "https://fireworkendabgabe.herokuapp.com"; //Verbindung zu Heroku 
    let buttonClicked = 0;
    let rockets; //rocket nimmt alle Daten des Formulars entgegen und bildet daraus eine Rakete
    let currentRocket;
    let form;
    let fireworks = [];
    let fps = 10;
    let canvas; // fps= frames per second
    function handleLoad(_event) {
        console.log("load");
        form = document.querySelector("form");
        canvas = document.querySelector("canvas");
        if (!canvas) //gibt false zurück, wenn sein einziger Operand in true konvertiert werden kann-->kann als boolescher Wert betrachtet werden(ist ein logischer Operator der einen Wahrheitswert zurück gibt)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d"); //dem Canvas wird der Kontext 2d zugewiesen & crc2 wird definiert-->gibz Zeichnungskodex oder null zurück(wenn Kontextnennung nicht unterstützt wird, wird null zurück gegeben)
        Feuerwerk.imgData = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
        Feuerwerk.drawCanvas(); //verbindung zu drawCanvas in Background.ts
        // den Button werden EventListener gegeben, damit sie auf ein "click" Event lauschen, dass dann in der jeweiligen Funktion ausgeführt wird.
        document.querySelector("#displayButton").addEventListener("click", displayRocket); //stellt die Rakte in der rocketlist da
        document.querySelector("#updateButton").addEventListener("click", updateRocket); //damit kann das Formular geupdatet werden
        document.querySelector("#resetButton").addEventListener("click", resetRocketlist); //damit werden alle Raketen aus der rocketlist gelöscht-->sie wird reseted
        document.querySelector("#saveButton").addEventListener("click", saveRocket); //schicken der Rakete an den Server-->Server gibt ein POP UP Fenster mit den Daten der Rakete zurück
        document.querySelector("#deleteButton").addEventListener("click", deleteRocket); //current Rocket wird gelöscht
        document.querySelector("#dropButton").addEventListener("click", showSavedRockets); //Rakten werden aus der Datenbank zurückgeholt und in die Rocketlist gepusht
        canvas.addEventListener("click", handleClick); //Canvas bekommt ebenfalls ein "click" Event, damit er reagieren kann, wenn Nutzer Rakete zum explodieren bringen will.
        window.setInterval(update, 10 / fps); //in diesem Intervall wird das Fenster geupdatet 
    }
    //Teil 1: Client 
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]); //das Neue FormData Element wird mit den Schlüssel-Werte Paaren aus dem Formular gefüllt--> alle Formulare werden eigens vom Programm verwaltet und da ich nur eines habe, greift man auf die Stelle 0 des Arrays zu 
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize") + "pixel"; //Schlüssel-Werte Paare werden in Typescript gespeichert
        document.querySelector("div#rocketlist").innerHTML = rocket; //damit sollen die Daten/Die Rakete, der rocketlist hinzugefüht werden 
    }
    function updateRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = new FormData(document.forms[0]); //update des Formulars -->anschließend wird mit await fetch eine POP UP ausgabe zurück gegeben
            let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
            let response = yield fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString()); //Schlüsselwort await ist eine syntaktische Abkürzung, die anzeigt, dass ein Codeteil asynchron auf einen anderen warten soll
            let responseText = yield response.text(); //fetch holt sich die URL und die Befehle update, sowie Rocket und fügt sie dem current Rocket hinzug & ordnet einen query zu
            alert(responseText); //daraufhin wird dem Nutzer ein response Text per alert zurückgegeben
        });
    }
    function resetRocketlist() {
        document.forms[0].reset(); //Methode reset stellt Standartwerte eines Formulars wieder her
        document.getElementById("rocketlist").innerHTML = ""; //Inhalt im div leeren
    }
    function saveRocket(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Save rocket");
            let form = new FormData(document.forms[0]);
            let query = new URLSearchParams(form); //Daten aus Form holen-->Auf Server in Datenbank speichern
            let response = yield fetch(url + "?" + query.toString()); //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
            let responseText = yield response.text(); //Daten in Textform in responseText speichern und ausgeben lassen--> werden dem Nutzer in alert Fenster ausgegeben
            alert(responseText);
        });
    }
    function getSavedRocketsFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url + "?" + "command=retrieve"); //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: gibt ein promise zurück das zu einem response Objekt aufgeöst wird.
            rockets = yield response.json();
            for (let rocket of rockets) { //Durchlauf jeder Rakete in Collection rockets
                let rocketName = document.createElement("a"); //Element a wird erstellt --> in rocketName gespeichert
                rocketName.innerHTML = rocket["rocketName"]; //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
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
            if (rocket["rocketName"] == currentRocket) { //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?   
                document.querySelector("div#rocketlist").innerHTML = "Name: " + "<br>" + rocket["rocketName"] + "<br>" + "Explosion:  " + rocket["ExplosionSize"] + "<br>" + "Lifetime: " + rocket["Lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Amount of Particles: " + rocket["Amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["ParticleType"] + "<br>" + "Size of Particle: " + rocket["ParticleSize"]; //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillRocketFields(rocket);
            }
        }
        buttonClicked++; //Arithmetischer Operator: Zuwachs
    }
    //Raket wird mit den Daten des Formulars gefüllt 
    function fillRocketFields(rocket) {
        document.querySelector("input#name").value = rocket["rocketName"];
        document.querySelector("input#explosion").value = rocket["ExplosionSize"];
        document.querySelector("input#lifetime_f").value = rocket["Lifetime"];
        document.querySelector("select#color").value = rocket["Color"];
        document.querySelector("input#amount").value = rocket["Amount"];
        document.querySelector("select#particleType").value = rocket["ParticleType"];
        document.querySelector("input#Size_P").value = rocket["ParticleSize"];
    }
    function deleteRocket() {
        return __awaiter(this, void 0, void 0, function* () {
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
        let canvas; //null= primitiver TypeScript Wert
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