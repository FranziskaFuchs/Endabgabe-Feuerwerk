namespace Feuerwerk {
    console.log("load_main");

    window.addEventListener("load",handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let imgData: ImageData;

    let form: HTMLFormElement;
    // let url: string = Link zur Herokuapp
    let url: string = "index.html";

    window.addEventListener("load", handleLoad);
    let canvas: HTMLCanvasElement;

    let fireworks: Firework[] = [];
    let savedArray: any[] = [];
    let fps: number = 100;

    async function handleLoad(_event: Event): Promise<void> {
        console.log("load");

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if(!canvas)
        return;
        
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawCanvas();
        imgData = crc2.getImageData(0,0,canvas.width, canvas.height);


        form = <HTMLFormElement>document.querySelector("form");
        canvas = document.querySelector("canvas");
        
        let Submit_Btn: HTMLElement = document.getElementById("submit");

        canvas.addEventListener("click", handleCanvasClick);
        Submit_Btn.addEventListener("click", sendFirework);

        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.fill

        window.setInterval(update, 1000 / fps);

        getSelect();

    }

    function handleCanvasClick(_event: MouseEvent): void {

        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);

    }
    export async function sendFirework(_event: MouseEvent): Promise<void> {
        console.log("submit firework");

        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        savedArray.push(formData);
        alert(responseText);
    }

    async function getSelect() {
        console.log(savedArray.length);
        let select = document.getElementById("save");
        for (let i: number = 0; i < savedArray.length; i++) {
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.name;
            select?.appendChild(element);
        }

    }

    function createFirework(tempPosition: Vector) {
        console.log("create firework");

        let explosionTarget: HTMLElement = document.getElementById("explosionSize");
        let explosionValue = explosionTarget.value;

        let lifetimeTarget: HTMLElement = document.getElementById("lifetime");
        let lifetimeValue = lifetimeTarget.value;

        let colorTarget: HTMLElement = document.getElementById("color");
        let colorValue = colorTarget.value;

        let amountTarget: HTMLElement = document.getElementById("amount");
        let amountValue = amountTarget.value;

        let typeTarget: HTMLElement = document.getElementById("particleType");
        let typeValue = typeTarget.value;

        let sizeTarget: HTMLElement = document.getElementById("particleSize");
        let sizeValue = sizeTarget.value;

        let firework: Firework = new firework(tempPosition, explosionValue, lifetimeValue, colorValue, amountValue, typeValue, sizeValue * fps);
        firework.push(firework);
    }

    function update() {
        crc2.globalAlpha = 0.05;
        crc2.fillStyle = "black";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.fill
        crc2.globalAlpha = 1;

        for (let i: number = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            fireworks[i].update();
            if (!fireworks[i].isAlive()) {
                fireworks.splice(i, 1);
            }
        }

    }

}