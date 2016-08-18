/// <reference path="jquery.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TODO resta comprobar quien gana, actualizar puntaje, agregar botones, Dialog para pedir circulo o cruz
var Jugador = (function () {
    function Jugador(letra) {
        this.partidasGanadas = 0;
        this.caracter = letra;
    }
    Object.defineProperty(Jugador.prototype, "PartidasGanadas", {
        get: function () {
            return this.partidasGanadas;
        },
        set: function (cantidad) {
            this.partidasGanadas = cantidad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jugador.prototype, "Caracter", {
        get: function () {
            return this.caracter;
        },
        enumerable: true,
        configurable: true
    });
    return Jugador;
}());
var Maquina = (function (_super) {
    __extends(Maquina, _super);
    function Maquina() {
        _super.apply(this, arguments);
    }
    Maquina.prototype.realizarJugada = function (tablero) {
        var jugadaValida = false;
        while (!jugadaValida) {
            var fila = Math.floor((Math.random() * 10)) % 3;
            var columna = Math.floor((Math.random() * 10)) % 3;
            if (tablero[fila][columna] == 2) {
                jugadaValida = true;
                tablero[fila][columna] = this.Caracter;
            }
        }
        return [fila, columna];
    };
    return Maquina;
}(Jugador));
var Partida = (function () {
    function Partida() {
        this.tablero = [[2, 2, 2], [2, 2, 2,], [2, 2, 2]];
    }
    Partida.prototype.inicio = function () {
        this.tablero = [[2, 2, 2], [2, 2, 2,], [2, 2, 2]];
        this.maquina = new Maquina(0);
        this.persona = new Maquina(1);
    };
    Partida.prototype.dibujarJugada = function (ctx, caracter) {
        if (caracter == Partida.CARACTER_O) {
            var centerX = ctx.canvas.width / 2;
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
        if (caracter == Partida.CARACTER_X) {
            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.moveTo(0, 0);
            ctx.lineTo(120, 120);
            ctx.moveTo(120, 0);
            ctx.lineTo(0, 120);
            ctx.strokeStyle = "rgb(220,20,60)";
            ctx.stroke();
        }
    };
    Partida.prototype.revisarMovimiento = function (idCanvas, caracter) {
        var numero = parseInt(idCanvas.charAt(1));
        $('#' + idCanvas).unbind('click');
        var canvas = $('#' + idCanvas)[0];
        var ctx = canvas.getContext('2d');
        this.dibujarJugada(ctx, caracter);
        //alert(idCanvas);
        switch (numero) {
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
        }
        ;
        var jugadaMaquina = this.maquina.realizarJugada(this.tablero);
        var etiqueta = Partida.tableroEtiquetas[jugadaMaquina[0]][jugadaMaquina[1]];
        $('#' + etiqueta).unbind('click');
        canvas = $('#' + etiqueta)[0];
        ctx = canvas.getContext('2d');
        if (caracter == 0) {
            caracter = 1;
        }
        else {
            caracter = 0;
        }
        this.dibujarJugada(ctx, caracter);
    };
    Partida.tableroEtiquetas = [['c0', 'c1', 'c2'], ['c3', 'c4', 'c5'], ['c6', 'c7', 'c8']];
    Partida.CARACTER_O = 0;
    Partida.CARACTER_X = 1;
    return Partida;
}());
/**
 * Inicio de Listeners
 */
function cargarListeners() {
    $('.canvas-seleccion').bind('click', function (eventoJQuery) {
        //TODO
        juego.revisarMovimiento(eventoJQuery.target.id, 0);
    });
}
var juego = new Partida();
juego.inicio();
$(cargarListeners);
