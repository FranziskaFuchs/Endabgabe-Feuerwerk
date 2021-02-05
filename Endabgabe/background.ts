namespace Feuerwerk {
    //console.log("background")
    interface Vector{
        x:number;
        y:number;
 }
    
    export function drawCanvas(): void{
        let horizon: number = crc2.canvas.height / 2;

        drawBackground();
        drawMoon({x: 90, y: 80});
        drawSingleStar({x: 180, y: 200});
        drawStar();
        drawSkyline({x: 0, y:horizon},75, 150);

    function drawBackground(): void {
       // console.log("drawBackground");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(0.6, "#0A122A");
        gradient.addColorStop(1, "#610B5E");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    
    }

    function drawMoon(_position:Vector): void{
        //console.log("moon",_position);

        let r1: number = 35;
        let r2: number = 120;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0,"HSLA(360,0%,70%,1)");
        gradient.addColorStop(1,"HSLA(360,0%,20%,0)");

        crc2.save();
        crc2.translate(_position.x,_position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2* Math.PI);
        crc2.fill();
        crc2.restore();

    }

    function drawStar():void{
        //console.log("Star");

        let starCount: number = 100;

        for(let i: number = 0; i< starCount; i++){
            let x: number= Math.random() * 1000 + 100;
            let y: number= Math.random() * 300 + 20 ;
            drawSingleStar({x: x, y: y});
        }

    }

    function drawSingleStar(_position:Vector): void{
       // console.log("SingleStar",_position);

        
        let r1: number = 1;
        let r2: number = 3;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0,"HSLA(360,0%,70%,1)");
        gradient.addColorStop(1,"HSLA(360,0%,20%,0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2* Math.PI);
        crc2.fill();
        crc2.restore();

        }

        function drawSkyline(_position: Vector,_min:number, _max:number):void {
          //  console.log("Skyline");

            let stepMin: number = 75;
            let stepMax: number = 150;
            let x: number = 0;

            crc2.save();
            crc2.translate(_position.x,_position.y);
            
            crc2.beginPath();
            crc2.moveTo(0,300);
            crc2.lineTo(0,125);
            crc2.lineTo(75,125);
            crc2.lineTo(75,300);

            crc2.lineTo(75,90);
            crc2.lineTo(125,90);
            crc2.lineTo(125,300);

            crc2.lineTo(125,75);
            crc2.lineTo(150,75);
            crc2.lineTo(150,300);

            crc2.lineTo(125,120);
            crc2.lineTo(250,120);
            crc2.lineTo(250,300);

            crc2.lineTo(250,80);
            crc2.lineTo(350,80);
            crc2.lineTo(350,300);

            crc2.lineTo(350,140);
            crc2.lineTo(650,140);
            crc2.lineTo(650,300);

            crc2.lineTo(650,70);
            crc2.lineTo(725,70);
            crc2.lineTo(725,300);

            crc2.lineTo(725,90);
            crc2.lineTo(770,90);
            crc2.lineTo(770,300);

            crc2.lineTo(770,70);
            crc2.lineTo(850,70);
            crc2.lineTo(850,300);

            crc2.lineTo(850,120);
            crc2.lineTo(900,120);
            crc2.lineTo(900,300);

            crc2.lineTo(900,150);
            crc2.lineTo(960,150);
            crc2.lineTo(960,300);

            crc2.lineTo(960,100);
            crc2.lineTo(1300,100);
            crc2.lineTo(1300,300);

            crc2.closePath();

            crc2.fillStyle= "#2E2E2E";
            crc2.fill();

            crc2.restore();


        }

    }
}