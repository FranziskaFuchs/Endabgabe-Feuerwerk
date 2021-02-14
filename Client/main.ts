namespace Feuerwerk {  // zur organisation des Codes in seperaten Dateien (Globaler Bereich soll dadurch nicht verschmutzt werden)

    window.addEventListener("load", handleLoad);   // "load" = Ereignistyp auf den gewartet werden soll ; handleLoad: Objekt das die Benachrichtigung erhält

  let url: string = "https://fireworkendabgabe.herokuapp.com"; //Verbindung zu Heroku 
//   let url: string = "http://localhost:5002"; 
    let buttonClicked: number = 0;
    let rockets: any;
    let currentRocket: string;
    export let imgData: ImageData;
    export let crc2: CanvasRenderingContext2D;
    let form: HTMLFormElement;

    let fireworks: Firework[] = [];
    let fps: number = 10;
    let canvas: HTMLCanvasElement | null;              // fps= frames per second


    async function handleLoad(_event: Event): Promise<void> { 
        console.log("load");                           //die async Funktion läuft außerhalb des Kontrolflusses & gibt impliziertes Promise Objekt zurüc

        form = <HTMLFormElement>document.querySelector("form");
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        drawCanvas();          //implementierung meines Hintergrunds

        (<HTMLInputElement>document.querySelector("#displayButton")).addEventListener("click", displayRocket);
        (<HTMLInputElement>document.querySelector("#updateButton")).addEventListener("click", updateRocket);
        (<HTMLInputElement>document.querySelector("#resetButton")).addEventListener("click", resetRocketlist);
        (<HTMLInputElement>document.querySelector("#saveButton")).addEventListener("click", saveRocket);
        (<HTMLInputElement>document.querySelector("#deleteButton")).addEventListener("click", deleteRocket);
        (<HTMLInputElement>document.querySelector("#dropButton")).addEventListener("click", showSavedRockets);  // den Button werden EventListener gegeben, damit sie auf ein "click" Event lauschen, dass dann in der jeweiligen Funktion ausgeführt wird.


        canvas.addEventListener("click", handleClick); //Canvas bekommt ebenfalls ein "click" Event, damit er reagieren kann, wenn Nutzer Rakete zum explodieren bringen will.
        window.setInterval(update, 10 / fps); //in diesem Intervall wird das Fenster geupdatet 

    }

    //Teil 1: Client 

    function displayRocket(): void {     // In dieser Funktion wird auf das Formular zugegriffen, aus dem die Raketendaten geholt werden 
        let formComponents: FormData = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize") + "pixel"; //Schlüssel und Wert wird jeweils in rocket gespeichern

        (<HTMLDivElement>document.querySelector("div#rocketlist")).innerHTML = rocket; //damit sollen die Daten, der rocketlist hinzugefüht werden 
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);                   //update des Formulars 
        let query: URLSearchParams = new URLSearchParams(<any>newData);            //umformatieren um url mitgeben zu können
        let response: Response = await fetch(url + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }
    function resetRocketlist(): void {
        document.forms[0].reset();                                                              //Formular Daten zurücksetzen
        (<HTMLInputElement>document.getElementById("rocketlist")).innerHTML = "";               //Inhalt im div leeren
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


    //Teil 2: Canvas

    function handleClick(_event: MouseEvent): void {                                  //wenn "click" auf den Canvas gehört wird, wird offsetX & offset Y ausgelöst
        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);                                                 //für das Feuerwerk wird eine Temporäre Position gegeben

    }

    function createFirework(tempPosition: Vector) {                                     //tempPosition ist eine Methode von createFirework und wird als Vector dargestellt
        console.log("createFirework");                                                  //createFirework holt sich die Input Elemente über deren ID und erstellt damit das gewünscht Feuerwerk des Nutzers

        let ExplosionTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("explosion");
        let ExplosionValue: any = ExplosionTarget.value;

        let LifetimeTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("lifetime_f");
        let LifetimeValue: string = LifetimeTarget.value;

        let ColorTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("color");
        let ColorValue: any = ColorTarget.value;

        let AmountTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("amount");
        let AmountValue: any = AmountTarget.value;

        let TypeTarget: HTMLSelectElement = <HTMLSelectElement>document.getElementById("particleType");
        let TypeValue: any = TypeTarget.value;
        console.log(TypeTarget.value);

        let particleSizeTarget: HTMLInputElement = <HTMLInputElement>document.getElementById("Size_P");
        let particleSizeValue: any = particleSizeTarget.value;

        let firework: Firework = new Firework(tempPosition, ExplosionValue, LifetimeValue, ColorValue, AmountValue, TypeValue, particleSizeValue * fps / 2);
        fireworks.push(firework);
    }

    function update() {
        //Der Hintergrund wird geupdatet
        let canvas: HTMLCanvasElement | null;


        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

        drawCanvas();


        for (let i: number = fireworks.length - 1; i >= 0; i--) {           //solange noch Daten im Firework Array sind, wird die function update ausgeführt, firework ist also noch Alive 
            //sobald i>= 0 ist, wird die Funktion beendet und das Feuerwerk ebenso
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);

            }
        }


    }
}

