namespace Feuerwerk {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    console.log("start_handleLoad");
    let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);

  }

  function handleChange(_event: Event): void {
    displayRocketlist();

  }

  function displayRocketlist(): void {
    let rocketlist: HTMLDivElement = <HTMLDivElement>document.querySelector("div#rocketlist");
    rocketlist.innerHTML = "";

    let formData: FormData = new FormData(document.forms[0]);

    for (let entry of formData) {
      let selector: string = "[name = '" + entry[0] + "']";
      let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

          rocketlist.innerHTML += item.value + "<br>";
      }
    }

function displayAmount(_event: Event): void {
let amount: string = (<HTMLInputElement>_event.target).value;
console.log(amount);

}
}
