import Estado from "./Estado";

class Nodo {

    padre: Nodo; // Referencia al nodo padre

    estado: Estado;

    profundidad: number; // Costo acumulado (g)

    costo: number; // Suma de la heuristica del estado + profundidad (Costo acumulado)


    constructor(estado: Estado, profundidad,  padre: Nodo){
        this.estado = estado;
        this.padre = padre;
        this.profundidad = profundidad;
    }


    // Calcular el costo total del nodo f(n) = g(n) + h(n)
    calcularCosto(estadoObjetivo: Estado): number {
        let h = this.estado.calculaHeuristica(estadoObjetivo);
        this.costo = h + this.profundidad;
        return this.costo;
    }

}

export default Nodo;