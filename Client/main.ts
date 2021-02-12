namespace Feuerwerk {

    window.addEventListener("load", handleLoad);

    export let url: string = "https://fireworkendabgabe.herokuapp.com";
    export let buttonClicked: number = 0;
    export let rockets: any;
    export let currentRocket: string;
    export let crc2: CanvasRenderingContext2D;


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null;

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        let imgData: ImageData;
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds

        drawCanvas();

        (<HTMLInputElement>document.querySelector("#displayButton")).addEventListener("click", displayRocket);
        (<HTMLInputElement>document.querySelector("#updateButton")).addEventListener("click", updateRocket);
        (<HTMLInputElement>document.querySelector("#resetButton")).addEventListener("click", resetOrder);
        (<HTMLInputElement>document.querySelector("#saveButton")).addEventListener("click", saveRocket);
        (<HTMLInputElement>document.querySelector("#deleteButton")).addEventListener("click", deleteRocket);
        (<HTMLInputElement>document.querySelector("#dropButton")).addEventListener("click", showSavedRockets);
        (<HTMLCanvasElement>document.querySelector("canvas")).addEventListener("click", handleAnimate);


    }

    //Teil 1: Client Seite

    function displayRocket(): void {
        let formComponents: FormData = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("explosion") + "<br>" + "Lifetime: " + formComponents.get("lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("color") + "<br>" + "Amount of Particle: " + formComponents.get("amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("particleType") + "<br>" + "Size of Particle: " + formComponents.get("particleSize"); //Schlüssel und Wert jeweils in rocket speichern

        rocket = (<HTMLInputElement>document.querySelector("div#rocketlist")).innerHTML;
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>newData);                         //umformatieren um url mitgeben zu können
        let response: Response = await fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }
    function resetOrder(): void {
        document.forms[0].reset();                                                              //Formular Daten zurücksetzen
        (<HTMLInputElement>document.getElementById("rocketlist")).innerHTML = "";                                    //Inhalt im div leeren
    }

    async function saveRocket(_event: Event): Promise<void> {
        console.log("Save rocket");
        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let query: URLSearchParams = new URLSearchParams(<any>form);
        let response: Response = await fetch(url + "?" + query.toString());                      //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
        let responseText: string = await response.text();                                        //Daten in Textform in responseText speichern und ausgeben lassen

        alert(responseText);
    }

    async function getSavedRocketsFromDb(): Promise<void> {
        let response: Response = await fetch(url + "?" + "command=retrieve");                    //Abfrage über url ob Daten gespeichert, geholt oder gelöscht werden sollen --> hier: holen über command "retrieve"
        rockets = await response.json();

        for (let rocket of rockets) {                                                                   //Durchlauf jeder Rakete in Collection rockets
            let rocketName: HTMLElement = document.createElement("a");                                  //Element a wird erstellt --> in rocketName gespeichert
            rocketName.innerHTML = rocket["Name"];                                                      //Inhalt des Elements soll passendem Wert zum Schlüssel "Name" entsprechen
            (<HTMLElement>document.querySelector("div#dropupContent")).appendChild(rocketName);         //Wert (Kind) von Schlüssel "Name" (Parent) in dropContent div speichern
            rocketName.addEventListener("click", chooseRocket);                                         //click-Listener installieren --> damit Rocket Name klickbar wird, ruft neue Funktion auf
        }
    }

    function chooseRocket(_event: Event): void {
        currentRocket = (<HTMLElement>_event.target).innerHTML;                                          //currentRocket entspricht Rakete die angezeigt werden soll
        let parent = (<HTMLElement>document.querySelector("div#dropupContent"));
        parent.style.display = "none";

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        for (let rocket of rockets) {                                                                   //Durchlauf jeder Rakete in Collection rockets
            if (rocket["rocketName"] == currentRocket) {
                //entspricht der jeweilige Eintrag in db dem geklickter Wert von currentRocket?   
                (<HTMLInputElement>document.querySelector("div#rocketlist")).innerHTML = "Name: " + rocket["rocketname"] + "<br>" + "Explosion:  " + rocket["explosion"] + "<br>" + "Lifetime: " + rocket["lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["color"] + "<br>" + "Amount of Particles: " + rocket["amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["particleType"] + "<br>" + "Size of Particle: " + rocket["particleSize"];    //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }

        buttonClicked++;
    }

    function fillInputFields(rocket: any): void {
        (<HTMLInputElement>document.querySelector("input#rocketname")).value = rocket["Name"];
        (<HTMLInputElement>document.querySelector("input#explosion")).value = rocket["Explosion"];
        (<HTMLInputElement>document.querySelector("input#lifetime")).value = rocket["Lifetime"];
        (<HTMLSelectElement>document.querySelector("select#color")).value = rocket["Color"];
        (<HTMLInputElement>document.querySelector("input#amount")).value = rocket["ParticleAmount"];
        (<HTMLSelectElement>document.querySelector("select#particleType")).value = rocket["ParticleType"];
        (<HTMLInputElement>document.querySelector("input#particleSize")).value = rocket["ParticleSize"];
        switch (rocket["color"]) {
            case "red":
                (<HTMLSelectElement>document.querySelector("select#red")).selectedOptions;
                break;
            case "orange":
                (<HTMLSelectElement>document.querySelector("select#orange")).selectedOptions;
                break;
            case "blue":
                (<HTMLSelectElement>document.querySelector("select#blue")).selectedOptions;
                break;
        }

    }

    async function deleteRocket(): Promise<void> {
        console.log(currentRocket);
        let response: Response = await fetch(url + "?" + "command=delete&rocket=" + currentRocket);       //Abfrage über url --> hier: löschen über command "delete"
        let text: string = await response.text();
        alert(text);                                                                                     //rocket deleted!
        (<HTMLInputElement>document.querySelector("div#rocketlist")).innerHTML = "";

    }

    function showSavedRockets(): void {
        let parent = (<HTMLElement>document.querySelector("div#dropupContent"));

        if (buttonClicked % 2 == 0) {                                                                    //button geklickt = gerade Zahl (auf)
            getSavedRocketsFromDb();
            parent.style.display = "block";
        }
        else {                                                                                           //button nochmal geklickt = ungerade (zu)
            parent.style.display = "none";
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        buttonClicked++;
    }


    // TEIL 2: CANVAS

    function drawLightRays(x: number, y: number, color: string, radius: number, radiusEnde: number) {

        for (let grade: number = -1; grade <= 1; grade = grade + 0.2) {

            let jump: number = grade * Math.PI;
            crc2.moveTo(x, y);
            crc2.lineTo(x + radius * Math.cos(jump), y + radius * Math.sin(jump));

            crc2.strokeStyle = color;
            crc2.stroke();

            if (radius >= radiusEnde) {
                crc2.clearRect(0, 0, 421, 503);                                                 //Nach der letzten Schleife Leinwand leeren
            }

            crc2.beginPath();
        }
    }

    function handleAnimate(_event: MouseEvent): void {
        let cursorX: number = _event.pageX - (<HTMLCanvasElement>document.querySelector("canvas")).offsetLeft;        //Position Maus X-Achse
        let cursorY: number = _event.pageY - (<HTMLCanvasElement>document.querySelector("canvas")).offsetTop;         //Position Maus Y-Achse

        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let color: string = <string>form.get("Color");
        let duration: number = Number(form.get("Duration")) * 1000;                                //1 Mili sec. * 1000 = 1 sec
        let radiusEnde: number = Number(form.get("Radius")) * 10;                                  //1mm * 10 = 1cm

        animateLightRays(cursorX, cursorY, color, duration, 0, radiusEnde);
    }

    function animateLightRays(x: number, y: number, color: string, duration: number, radius: number, radiusEnde: number): void {
        function oneLoop() {
            setTimeout(function () {

                drawLightRays(x, y, color, radius, radiusEnde);
                radius++;
                if (radius <= radiusEnde) {
                    oneLoop();
                }

            }, duration / radiusEnde)
        }

        oneLoop();
    }
}