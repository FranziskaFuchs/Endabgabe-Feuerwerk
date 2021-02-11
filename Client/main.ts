namespace Feuerwerk {

    window.addEventListener("load", handleLoad);

    export let canvas: HTMLCanvasElement | null;
    export let crc2: CanvasRenderingContext2D;
    export let url: string = "https://fireworkendabgabe.herokuapp.com";

    let imgData: ImageData;
    let form: HTMLFormElement;
    let slider_E: HTMLInputElement = <HTMLInputElement>document.querySelector("input#explosion");
    let slider_A: HTMLInputElement = <HTMLInputElement>document.querySelector("input#lifetime");
    let slider_L: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");
    let slider_S: HTMLInputElement = <HTMLInputElement>document.querySelector("input#particleSize");


    //   let savedRockets: Rocket[]; // soll alle Raketen der Database enthalten
    //  let rockets: Rocket[]; // Raketen in rocketlist


    function handleLoad(_event: Event): void {
        console.log("load Feuerwerk_form");

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        drawCanvas();
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds

        canvas.addEventListener("click", handleClick); // durch klicken auf den Canvas, sollen Raketen explodieren können


        form = <HTMLFormElement>document.querySelector("form");
        form.addEventListener("change", handleChange);

        slider_E.addEventListener("input", displayExplosion);
        slider_A.addEventListener("input", displayLifetime);
        slider_L.addEventListener("input", displayAmount);
        slider_S.addEventListener("input", displayParticleSize);

        //   let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[id=Submit_Btn");
        //   submit.addEventListener("click",sendRocket); //erstellte Rakete zu rocketlist hinzufügen.

    }


    function handleChange(_event: Event): void {
        let rocketlist: HTMLDivElement = <HTMLDivElement>document.querySelector("div#rocketlist");
        rocketlist.innerHTML = "";

        let formData: FormData = new FormData(document.forms[0]);
        console.log(formData);
        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");

            rocketlist.innerHTML += item.name
           
        }
    }

    function displayExplosion(_event: Event): void {
        let explosion: string = (<HTMLInputElement>_event.target).value;
        console.log(explosion);

    }

    function displayAmount(_event: Event): void {

    }

    function displayLifetime(_event: Event): void {

    }

    function displayParticleSize(_event: Event): void {

    }


    function handleClick(_event: MouseEvent): void {
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

}