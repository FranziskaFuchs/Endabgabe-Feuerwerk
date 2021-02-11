namespace Feuerwerk {
    console.log("main_form");

  window.addEventListener("load", handleLoadForm);
    let form: HTMLFormElement;
    // let url: string = Link zur Herokuapp
    //let url: string = "index.html";
    let Submit_Btn: any;
    let canvas: HTMLCanvasElement;
    let fireworks: Firework [] = [];
    let savedArray: any[] = [];
    let fps: number = 100;
   // let serverPage: string ="";
   
    async function handleLoadForm(_event: Event): Promise<void> {

        form = <HTMLFormElement>document.querySelector("form");

        canvas.addEventListener("click", handleCanvasClick);
        Submit_Btn.addEventListener("click", sendFireWork);

        window.setInterval(update, 1000 / fps);

        getSelect();

    }

    function handleCanvasClick(_event: MouseEvent): void {

        let tempPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        createFirework(tempPosition);

    }
    export async function sendFireWork(_event: MouseEvent): Promise<void> {
        console.log("submit firework");

        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        savedArray.push(formData);
        alert(responseText);
    }

    async function getSelect(){
        console.log(savedArray.length);
        let select = document.getElementById("save");
        for (let i: number = 0; i < savedArray.length; i++){
            let options = savedArray[i];
            let element = document.createElement("option");
            element.textContent = options.name;
            select.appendChild(element);
    
        }

     }

    function createFirework(_tempPosition: Vector) {
        console.log("create firework");

        let explosionTarget: HTMLInputElement = document.getElementById("explosionSize");
        let explosionValue = explosionTarget.value;

        let lifetimeTarget: HTMLInputElement = document.getElementById("lifetime");
        let lifetimeValue = lifetimeTarget.value;

        let colorTarget: HTMLInputElement = document.getElementById("color");
        let colorValue = colorTarget.value;

        let amountTarget: HTMLInputElement = document.getElementById("amount");
        let amountValue = amountTarget.value;

        let typeTarget: HTMLInputElement = document.getElementById("particleType");
        let typeValue = typeTarget.value;

        let sizeTarget: HTMLInputElement = document.getElementById("particleSize");
        let sizeValue = sizeTarget.value;

        let firework: Firework = new Firework(tempPosition, explosionValue, lifetimeValue, colorValue, amountValue, typeValue, sizeValue * fps);
        fireworks.push(firework);
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