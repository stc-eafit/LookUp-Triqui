/// <reference path="jquery.d.ts" />

// TODO resta comprobar quien gana, actualizar puntaje, agregar botones, Dialog para pedir circulo o cruz
class Jugador{
    private partidasGanadas : number;
    private partidasEmpatadas : number;
    private partidasPerdidas : number;
    private caracter : number;
    get PartidasGanadas(){
        return this.partidasGanadas;
    }
    set PartidasGanadas(cantidad: number){
        this.partidasGanadas = cantidad;
    }
    constructor(letra){
        this.partidasGanadas = 0;
        this.caracter = letra;
    }
    get Caracter() : number{
        return this.caracter;
    }
}
class Maquina extends Jugador{
    public realizarJugada(tablero: number[][]) : number[]{
        var jugadaValida = false;
        while(!jugadaValida){
            var fila = Math.floor((Math.random() * 10)) % 3;
            var columna = Math.floor((Math.random() * 10)) % 3;
            if(tablero[fila][columna] == 2){
                jugadaValida = true;
                tablero[fila][columna] = this.Caracter
            }  
        }
        return [fila,columna];
    }
}

class Partida{
    private tablero : number[][] = [[2,2,2],[2,2,2,],[2,2,2]];
    static tableroEtiquetas : string[][] = [['c0','c1','c2'],['c3','c4','c5'],['c6','c7','c8']]; 
    private persona : Jugador;
    private maquina : Maquina;
    static CARACTER_O : number = 0;
    static CARACTER_X : number = 1;
    public inicio () : void{
        this.tablero = [[2,2,2],[2,2,2,],[2,2,2]];
        this.maquina = new Maquina(0);
        this.persona = new Maquina(1);
    }
    public dibujarJugada(ctx: CanvasRenderingContext2D, caracter : number  ){
        if(caracter == Partida.CARACTER_O){
                var centerX = ctx.canvas.width/ 2
                var centerY = ctx.canvas.height / 2;
                var radius = 60;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#003300';
                ctx.stroke();
        }
         if(caracter == Partida.CARACTER_X){
                ctx.beginPath();
                ctx.lineWidth=20;
                ctx.moveTo(0,0);
                ctx.lineTo(120,120);
                ctx.moveTo(120,0);
                ctx.lineTo(0,120);
                ctx.strokeStyle = "rgb(220,20,60)";
                ctx.stroke();   

        }
    }
    public revisarMovimiento(idCanvas : string, caracter : number){
        var numero =  parseInt(idCanvas.charAt(1));
        $('#'+idCanvas).unbind('click');
        var canvas = <HTMLCanvasElement>$('#'+idCanvas)[0];
        var ctx = canvas.getContext('2d');
        this.dibujarJugada(ctx,caracter);
        //alert(idCanvas);
        switch(numero){
            case 0:
                this.tablero[0][0] = caracter;
                break;
            case 1:
                this.tablero[0][1] = caracter;
                break;
            case 2:
                this.tablero[0][2] = caracter;
                break;
            case 3:
                this.tablero[1][0] = caracter;
                break;
            case 4:
                this.tablero[1][1] = caracter;
                break;
            case 5:
                this.tablero[1][2] = caracter;
                break;
            case 6:
                this.tablero[2][0] = caracter;
                break;
            case 7:
                this.tablero[2][1] = caracter;
                break;
            case 8:
                this.tablero[2][2] = caracter;
                break;
            default:
                break;
        };
        var jugadaMaquina: number[] = this.maquina.realizarJugada(this.tablero);
        var etiqueta = Partida.tableroEtiquetas[jugadaMaquina[0]][jugadaMaquina[1]];
        $('#'+etiqueta).unbind('click');
        canvas = <HTMLCanvasElement> $('#'+etiqueta)[0];
        ctx = canvas.getContext('2d');
        if(caracter == 0){
            caracter = 1;
        }else{
            caracter = 0;
        }
        this.dibujarJugada(ctx,caracter);
    } 
}

/**
 * Inicio de Listeners
 */
function cargarListeners() : void{
   $('.canvas-seleccion').bind('click',(eventoJQuery: JQueryEventObject) =>{
       //TODO
       juego.revisarMovimiento(eventoJQuery.target.id,0);
   });
}
var juego : Partida = new Partida();
juego.inicio();
$(cargarListeners);
