"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(estado, profundidad, padre) {
        this.estado = estado;
        this.padre = padre;
        this.profundidad = profundidad;
    }
    calcularCosto(estadoObjetivo) {
        let h = this.estado.calculaHeuristica(estadoObjetivo);
        this.costo = h + this.profundidad;
        return this.costo;
    }
}
exports.default = Nodo;
//# sourceMappingURL=Nodo.js.map