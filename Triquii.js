'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Jugador = (function () {
    function Jugador(letra) {
        this.partidasGanadas = 0;
        this.letra = letra;
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
    Object.defineProperty(Jugador.prototype, "Letra", {
        get: function () {
            return this.letra;
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
    return Maquina;
}(Jugador));
var partida = (function () {
    function partida() {
        this.tablero = [[3], [3]];
    }
    partida.prototype.inicio = function () {
    };
    return partida;
}());
/**
 * Inicio de Listeners
 */
function CargarListeners() {
    console.log("Evento");
    var canvasElementos = document.getElementsByClassName('canvas-seleccion');
    for (var i = 0; i < canvasElementos.length; ++i) {
        canvasElementos[i].addEventListener('click', function (ev) {
            var id = ev.srcElement.id;
            alert(id);
        });
    }
}
document.addEventListener("DOMContentLoaded", CargarListeners);
