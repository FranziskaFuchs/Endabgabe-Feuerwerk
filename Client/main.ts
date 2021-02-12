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
        (<HTMLInputElement>document.querySelector("#resetButton")).addEventListener("click", resetRocketlist);
        (<HTMLInputElement>document.querySelector("#saveButton")).addEventListener("click", saveRocket);
        (<HTMLInputElement>document.querySelector("#deleteButton")).addEventListener("click", deleteRocket);
        (<HTMLInputElement>document.querySelector("#dropButton")).addEventListener("click", showSavedRockets);
        


    }

    //Teil 1: Client Seite

    function displayRocket(): void {
        let formComponents: FormData = new FormData(document.forms[0]);  
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "<br>" + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") +"<br>" + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize"); //Schlüssel und Wert jeweils in rocket speichern

        
     (<HTMLDivElement>document.querySelector("div#rocketlist")).innerHTML = rocket;  
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>newData);                         //umformatieren um url mitgeben zu können
        let response: Response = await fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }
    function resetRocketlist(): void {
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
                (<HTMLInputElement>document.querySelector("div#rocketlist")).innerHTML = "Name: " + rocket["rocketName"] + "<br>" + "Explosion:  " + rocket["ExplosionSize"] + "<br>" + "Lifetime: " + rocket["Lifetime"] + "<br" + "sec" + "<br>" + "Color: " + rocket["Color"] + "<br>" + "Amount of Particles: " + rocket["Amount"] + "<br>" + "stk." + "<br>" + "Type of Paricle: " + rocket["ParticleType"] + "<br>" + "Size of Particle: " + rocket["ParticleSize"];    //ja: Schlüssel-Werte-Paare sollen wieder in yourorder div gepusht werden
                fillInputFields(rocket);
            }
        }

        buttonClicked++;
    }

    function fillInputFields(rocket: any): void {
        (<HTMLInputElement>document.querySelector("input#rocketname")).value = rocket["rocketName"];
        (<HTMLInputElement>document.querySelector("input#explosion")).value = rocket["explosion"];
        (<HTMLInputElement>document.querySelector("input#lifetime")).value = rocket["lifetime"];
        (<HTMLSelectElement>document.querySelector("select#color")).value = rocket["color"];
        (<HTMLInputElement>document.querySelector("input#amount")).value = rocket["amount"];
        (<HTMLSelectElement>document.querySelector("select#particleType")).value = rocket["particleType"];
        (<HTMLInputElement>document.querySelector("input#ParticleSize")).value = rocket["ParticleSize"];

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
}