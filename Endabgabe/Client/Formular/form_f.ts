namespace Feuerwerk {
  window.addEventListener("load", handleLoad);


  function handleLoad(_event: Event): void {
    console.log("start_handleLoad");

    generateContent(data);

    let form = <HTMLFormElement>document.querySelector("form#formular");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#Amount");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);

    displayRocketList();
  }


  function handleChange(_event: Event): void {
      displayRocketList();
    }


    function displayRocketList():void{
      let RocketList: HTMLDivElement = <HTMLDivElement>document.querySelector("div#RocketList");
      RocketList.innerHTML = "";

      let formData: FormData = new FormData(document.forms[0]);
      for (let entry of formData.entries()) {
        //console.log(entry);
        let selector: string = "[value='" + entry[1] + "']";
        let item: HTMLInputElement =<HTMLInputElement>document.querySelector(selector);
        
        RocketList.innerHTML += item.name; 
  }


  function displayAmount(_event: Event): void {

    let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
    let Amount: string = (<HTMLInputElement>_event.target).value;
    progress.value = parseFloat(Amount);

     }
  }
}

