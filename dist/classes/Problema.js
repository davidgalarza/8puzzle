"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("./Nodo"));
class Problema {
    constructor(estadoInicial, estadoObjetivo, movimientos) {
        this.cola = [];
        this.tablerosEncontrados = new Set();
        this.estadoInicial = estadoInicial;
        this.estadoObjetivo = estadoObjetivo;
        this.movimientos = movimientos;
    }
    imprimirCamino(nodo) {
        if (nodo == null)
            return;
        this.imprimirCamino(nodo.padre);
        console.log(`==== h: ${nodo.estado.h}, g: ${nodo.profundidad}, f: ${nodo.costo} ===`);
        this.imprimirMatriz(nodo.estado.tablero);
        console.log('\n');
    }
    imprimirMatriz(matriz) {
        let matrizString = matriz.map((c) => c.join(' ')).join('\n');
        console.log(matrizString);
    }
    resolver() {
        let nodoRaiz = new Nodo_1.default(this.estadoInicial, 0, null);
        nodoRaiz.calcularCosto(this.estadoObjetivo);
        this.cola.push(nodoRaiz);
        while (this.cola.length > 0) {
            this.cola = this.cola.sort((na, no) => no.costo - na.costo);
            let nodoMenorCosto = this.cola.pop();
            this.tablerosEncontrados.add(nodoMenorCosto.estado.tableroStr());
            if (nodoMenorCosto.estado.h == 0) {
                this.imprimirCamino(nodoMenorCosto);
                return;
            }
            this.movimientos.forEach((movimiento) => {
                let vasioX = nodoMenorCosto.estado.pVx;
                let vasioY = nodoMenorCosto.estado.pVy;
                let ax = movimiento.ax;
                let ay = movimiento.ay;
                if (this.posicionValida(vasioX, vasioY, ax, ay)) {
                    let nuevoEstado = nodoMenorCosto.estado.realizarMovimiento(movimiento);
                    let hijo = new Nodo_1.default(nuevoEstado, nodoMenorCosto.profundidad + 1, nodoMenorCosto);
                    hijo.calcularCosto(this.estadoObjetivo);
                    if (!this.tablerosEncontrados.has(hijo.estado.tableroStr())) {
                        this.cola.push(hijo);
                        this.tablerosEncontrados.add(hijo.estado.tableroStr());
                    }
                }
            });
        }
    }
    posicionValida(x, y, aX, aY) {
        let nx = x + aX;
        let ny = y + aY;
        return nx >= 0 && nx < 3 && ny >= 0 && ny < 3;
    }
}
exports.default = Problema;
//# sourceMappingURL=Problema.js.map