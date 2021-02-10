namespace Feuerwerk {
  window.addEventListener("load", handleLoad);
  let form: HTMLFormElement;
  let url: string;


  async function handleLoad(_event: Event): Promise <void> {
    console.log("start_handleLoad");

    let response: Response = await fetch("Data.json");
    let offer: string = await response.text();
    let data: Data = JSON.parse(offer);

    generateContent(data);

    form = <HTMLFormElement>document.querySelector("form");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#Amount");
    let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);
    submit.addEventListener("click", sendRocketList);

    displayRocketList();
  }

  async function sendRocketList(_event:Event): Promise<void>{
    console.log("Send Rocketlist");
    let formData: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    let response: Response = await fetch(url + "?" + query.toString());
    let responseText: string = await response.text();
    alert(responseText);
  }

  function handleChange(_event:Event): void{
    displayRocketList();
  }

  function displayRocketList():void{
      let RocketList: HTMLDivElement = <HTMLDivElement>document.querySelector("div#RocketList");
      RocketList.innerHTML = "";

      let formData: FormData = new FormData(form);

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


