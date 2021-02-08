namespace Feuerwerk {
  window.addEventListener("load", handleLoad);
  let form: HTMLFormElement;

  function handleLoad(_event: Event): void {
    console.log("start_handleLoad");

    form = <HTMLFormElement>document.querySelector("form");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#Amount");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);

    displayRocketList();
  }

 function sendRocketList(_event: Event): void {
    console.log("send RocketList");

    let formData: FormData = new FormData(form);

  }


  function handleChange(_event: Event): void {

    displayRocketList();
  }

  function displayRocketList(): void {
    let RocketList: HTMLDivElement = <HTMLDivElement>document.querySelector("div#RocketList");
    RocketList.innerHTML = "";

    let formData: FormData = new FormData(form);

    for (let entry of formData) {
      let selector: string = "[vale= '" + entry[1] + "']";
      let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

      RocketList.innerHTML += item.value;
    }
  }

}

function displayAmount(_event: Event): void {
  console.log("displayAmount");

  let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
  let Amount: string = (<HTMLInputElement>_event.target).value;
  progress.value = parseFloat(Amount);
}

