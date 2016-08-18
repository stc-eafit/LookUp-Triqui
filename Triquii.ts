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
    get PartidasEmpatadas(){
        return this.partidasEmpatadas;
    }
    set PartidasEmpatadas(partidasEmp:number){
        this.partidasEmpatadas = partidasEmp;
    }
    get PartidasPerdidas(){
        return this.partidasPerdidas;
    }
    set PartidasPerdidas(partidasPer:number){
        this.partidasPerdidas = partidasPer;
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
    private partidaActiva: boolean;
    public inicio () : void{
        this.tablero = [[2,2,2],[2,2,2,],[2,2,2]];
        this.maquina = new Maquina(0);
        this.persona = new Jugador(1);
        this.partidaActiva = true;
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
    public revisarMovimiento(idCanvas : string){
        if(this.partidaActiva){
            var caracter = this.persona.Caracter;
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
            if(!this.verSiTerminoPartida()){
                var jugadaMaquina: number[] = this.maquina.realizarJugada(this.tablero);
                var etiqueta = Partida.tableroEtiquetas[jugadaMaquina[0]][jugadaMaquina[1]];
                $('#'+etiqueta).unbind('click');
                canvas = <HTMLCanvasElement> $('#'+etiqueta)[0];
                var ctx = canvas.getContext('2d');
                caracter = this.maquina.Caracter;
                this.dibujarJugada(ctx,caracter);
                if(this.verSiTerminoPartida()){
                    this.partidaActiva = false;
                    alert("Fin partida gana maquina");
                }
            }else{
                this.partidaActiva = false;
                alert("Fin partida Gana persona");
            }
        }
    }
    private verSiTerminoPartida() : boolean{
        for(var comparador = 0; comparador < 2;comparador++){
            //Primera linea horizontal
            if(this.tablero[0][0] == comparador && this.tablero[0][1] == comparador && this.tablero[0][2] == comparador){
                return true;
            }
            //Segunda linea horizontal
            if(this.tablero[1][0] == comparador && this.tablero[1][1] == comparador && this.tablero[1][2] == comparador){
                return true;
            }
            //Tercera linea horizontal
            if(this.tablero[2][0] == comparador && this.tablero[2][1] == comparador && this.tablero[2][2] == comparador){
                return true;
            }
            //Primera linea vertical
            if(this.tablero[0][0] == comparador && this.tablero[1][0] == comparador && this.tablero[2][0] == comparador){
                return true;
            }
            //Segunda linea vertical
            if(this.tablero[0][1] == comparador && this.tablero[1][1] == comparador && this.tablero[2][1] == comparador){
                return true;
            }
            //tercera linea vertical
            if(this.tablero[0][2] == comparador && this.tablero[1][2] == comparador && this.tablero[2][2] == comparador){
                return true;
            }
             //diagonal de izquierda a derecha
            if(this.tablero[0][0] == comparador && this.tablero[1][1] == comparador && this.tablero[2][2] == comparador){
                return true;
            }
              //diagonal de derecha a izquierda
            if(this.tablero[0][2] == comparador && this.tablero[1][1] == comparador && this.tablero[2][0] == comparador){
                return true;
            }
        }
        //Revisar si se lleno la matriz
        for(var i = 0; i < this.tablero.length;i++){
            for(var j = 0; j < this.tablero[0].length;j++){
                if(this.tablero[i][j] == 2){
                    return false;
                }
            }
        }
        alert("Empate");
        return true;
    } 
}

/**
 * Inicio de Listeners
 */
function reiniciar(){
    juego.inicio();
    limpiarCanvas();
    cargarListeners();
}
function limpiarCanvas(){
    $('.canvas-seleccion').each((index:number,elem:Element) => {
        var can : HTMLCanvasElement = <HTMLCanvasElement>elem;
        var context = can.getContext('2d');
        context.clearRect(0, 0, can.width, can.height);
    });
}
function cargarListeners() : void{
   $('.canvas-seleccion').unbind('click');
   $('.canvas-seleccion').bind('click',(eventoJQuery: JQueryEventObject) =>{
       //TODO
       juego.revisarMovimiento(eventoJQuery.target.id);
   });
   $('#reiniciar').bind('click',reiniciar);
}
/** 
 * Inicio de partida
*/
var juego : Partida = new Partida();
juego.inicio();
$(cargarListeners);
