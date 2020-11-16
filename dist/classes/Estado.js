"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estado {
    constructor(tablero) {
        this.tablero = tablero;
        let posVacia = this.posicionVacia();
        this.pVy = posVacia[0];
        this.pVx = posVacia[1];
    }
    // Obteneer la posicion vacia del tablero
    posicionVacia() {
        let fila = this.tablero.findIndex((e) => e.includes(0));
        let columna = this.tablero[fila].indexOf(0);
        return [fila, columna];
    }
    calculaHeuristica(objetivo) {
        this.h = 0;
        this.tablero.forEach((fila, py) => {
            fila.forEach((e, px) => {
                let nPy = objetivo.tablero.findIndex((f) => f.includes(e));
                let nPx = objetivo.tablero[nPy].indexOf(e);
                if (e != 0)
                    this.h += Math.abs(nPy - py) + Math.abs(nPx - px);
            });
        });
        return this.h;
    }
    realizarMovimiento(movimiento) {
        let nuevoTablero = this.tablero.map((f) => f.map((c) => c));
        let ax = movimiento.ax;
        let ay = movimiento.ay;
        let nXVacio = this.pVx + ax;
        let nYVacio = this.pVy + ay;
        let aux = nuevoTablero[nYVacio][nXVacio];
        nuevoTablero[nYVacio][nXVacio] = 0;
        nuevoTablero[this.pVy][this.pVx] = aux;
        return new Estado(nuevoTablero);
    }
    igual(estado) {
        let t = estado.tablero;
        let iguales = true;
        for (let i = 0; i < t.length; i++) {
            for (let j = 0; j < t.length; j++) {
                const elemento = t[i][j];
                if (iguales) {
                    iguales = this.tablero[i][j] == elemento;
                }
            }
        }
        //console.log(iguales);
        return iguales;
    }
    tableroStr() {
        return this.tablero.toString();
    }
}
exports.default = Estado;
//# sourceMappingURL=Estado.js.map