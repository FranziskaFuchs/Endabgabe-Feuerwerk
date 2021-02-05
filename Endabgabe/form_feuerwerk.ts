namespace Feuerwerk{

    window.addEventListener("load", handleLoad);
    let form: HTMLFormElement;
    let saveRocket_Btn: HTMLButtonElement;
    let DeleteLast_Btn: HTMLButtonElement;
    let DeleteAll_Btn: HTMLButtonElement;
    let SaveServer_Btn: HTMLButtonElement;
    let GetServerData_Btn: HTMLButtonElement;
    //let serverPage: string=""

}

function handleLoad(_event: Event):void {
  

    generateContent(data);

    form = <HTMLFormElement>document.querySelector("form#oderform");


}
    

}