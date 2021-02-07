namespace Feuerwerk{
  window.addEventListener("load", handleLoad);

function handleLoad(_event: Event):void {

  let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
  let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#Amount");

  form.addEventListener("change",handleChange);
  slider.addEventListener("input", displayAmount);

}

function handleChange(_event:Event): void {
 //console.log("_event");

 let rocketname: HTMLInputElement = document.querySelector("input#Rocketname");
 console.log(rocketname.value);
 }

function displayAmount(_event:Event): void{
  console.log("displayAmount");

 let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
 let Amount: string = (<HTMLInputElement>_event.target).value;
 progress.value = parseFloat(Amount);
}
 
 }