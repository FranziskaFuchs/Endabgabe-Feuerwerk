namespace Feuerwerk {
  window.addEventListener("load", handleLoad);

 // let url: string =;
//let buttonClick: number = 0;
// let rockets: any;
// let singleRocket: string;
 export let crc2: CanvasRenderingContext2D;
 let imgData: ImageData;
 

  function handleLoad(_event: Event): void {
      let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
      if(!canvas)
      return;

      crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
      
      drawCanvas();
      imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);

     }


      //document.querySelector("#saveButton").addEventListener("click", saveRocket);
     // document.querySelector("#updateButton").addEventListener("click", updateRocket);
     // document.querySelector("#resetButton").addEventListener("click", resetRocketList);
     // document.querySelector("#saveServerButton").addEventListener("click", saveServer);
     // document.querySelector("#deleteButton").addEventListener("click", deleteRocket);
     // document.querySelector("#showButton").addEventListener("click", showAllRockets);
     // document.querySelector("canvas").addEventListener("click", handleAnimate);


}

function displayRocket(): void {
    let formComponents: FormData = new FormData(document.forms[0]); // Mit dieser Funktion werden die Daten aus dem Formular übergeben. 
    let rocket = "Name of your rocket: " + formComponents.get("name") + "<br>" + "Explosion radius" + formComponents.get("explosion") + "<br>" + "Lifetime: " + formComponents.get("lifetime") + "sec" + "<br>" + "Particle Color: " + formComponents.get("color") + "<br>" + "Amount of Particle: " + formComponents.get("amount") + "stk." + "<br>" + "Form of Particle: " + formComponents.get("form") + "<br>" + "Size of Particle: " + formComponents.get("particleSize") + "<br>" + "<br>" ;

    document.querySelector("div#rocketlist")?.innerHTML = rocket;

}




}
    //console.log("start_handleLoad");
    //let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
   // let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");

   // form.addEventListener("change", handleChange);
   // slider.addEventListener("input", displayAmount);

 // }

 // function handleChange(_event: Event): void {
 //   displayRocketlist();

 // }

 // function displayRocketlist(): void {
 //   let rocketlist: HTMLDivElement = <HTMLDivElement>document.querySelector("div#rocketlist");
  //  rocketlist.innerHTML = "";

   // let formData: FormData = new FormData(document.forms[0]);

  //  for (let entry of formData) {
   //   let selector: string = "[name = '" + entry[0] + "']";
   //   let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

   //       rocketlist.innerHTML += item.value + "<br>";
   //   }
  //  }

//function displayAmount(_event: Event): void {
//let amount: string = (<HTMLInputElement>_event.target).value;
//console.log(amount);

//}
//}
