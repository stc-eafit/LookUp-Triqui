'use strict';
class Jugador{
    private partidasGanadas : number;
    private letra : string;
    get PartidasGanadas(){
        return this.partidasGanadas;
    }
    set PartidasGanadas(cantidad: number){
        this.partidasGanadas = cantidad;
    }
    constructor(letra){
        this.partidasGanadas = 0;
        this.letra = letra;
    }
    get Letra() : string{
        return this.letra;
    }
}
class Maquina extends Jugador{

}

class partida{
    private tablero : number[][] = [[3],[3]];
    private persona : Jugador;
    private maquina : Maquina;
    public inicio () : void{
        
    } 
}

/**
 * Inicio de Listeners
 */
function CargarListeners() : void{
    console.log("Evento");
   var canvasElementos : NodeListOf<HTMLCanvasElement> = <NodeListOf<HTMLCanvasElement>>document.getElementsByClassName('canvas-seleccion');
   for(var i = 0;i < canvasElementos.length;++i){
       canvasElementos[i].addEventListener('click',(ev: MouseEvent)=>{
           var id : string = ev.srcElement.id
           alert(id);
       });
   }
}
document.addEventListener("DOMContentLoaded",CargarListeners);