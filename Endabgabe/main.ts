namespace Feuerwerk{ 
    
    window.addEventListener("load", handleLoad);
    
   export let crc2: CanvasRenderingContext2D;
    let imgData: ImageData;
    

    function handleLoad():void {
        console.log("start")
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if(!canvas)
        return;

        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawCanvas();
        imgData = crc2.getImageData(0,0,canvas.width, canvas.height);

      
    }


 }
