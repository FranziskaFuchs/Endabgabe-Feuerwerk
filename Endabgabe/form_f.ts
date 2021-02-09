namespace Feuerwerk {
  window.addEventListener("load", handleLoad);


  function handleLoad(_event: Event): void {
    console.log("start_handleLoad");

    let form = <HTMLFormElement>document.querySelector("form#formular");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#Amount");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);
  }


  function handleChange(_event: Event): void {
    let RocketList: HTMLDivElement = <HTMLDivElement>document.querySelector("div#RocketList");
    RocketList.innerHTML = "";

    let formData: FormData = new FormData(document.forms[0]);
   // console.log(formData);
    for (let entry of formData.entries) {
      let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']")
      RocketList.innerHTML += item.name;
    }
  }

  function displayAmount(_event: Event): void {
    console.log("displayAmount");

    let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
    let Amount: string = (<HTMLInputElement>_event.target).value;
    progress.value = parseFloat(Amount);
  }
}
