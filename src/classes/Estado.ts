import Movimiento from "./Movimiento";

class Estado {

    tablero: number[][];
    pVy: number; // Posicion en y vacia
    pVx: number; // Posicion en x vacia
    h: number; // Heuristica

    constructor(tablero: number[][]){
        this.tablero = tablero;

        // Iniializar los indices de la posicion vacia del tablero
        let posVacia: number[] = this.posicionVacia();
        this.pVy = posVacia[0];
        this.pVx = posVacia[1];
    }



    // Obteneer la posicion vacia del tablero
    posicionVacia(): number[]{
        let fila: number = this.tablero.findIndex((e) => e.includes(0)); 
        let columna : number = this.tablero[fila].indexOf(0);

        return [fila, columna];
    }


    // Calculo de la heuristica pasando el estado objetivo
    calculaHeuristica(objetivo: Estado): number{
        this.h =0;
        this.tablero.forEach((fila, py) =>{
            fila.forEach((e, px) => {
                let nPy: number = objetivo.tablero.findIndex((f) => f.includes(e)); 
                let nPx: number = objetivo.tablero[nPy].indexOf(e);
                if(e != 0)
                    this.h += Math.abs(nPy -py) + Math.abs(nPx - px);
            });
        });
        return this.h;
    }

    // Mover los elmentos del tablero pasando un movimiento
    realizarMovimiento(movimiento: Movimiento): Estado {
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


    // Verificar si los tableros de dos estados son iguales
    igual(estado: Estado){
        let t = estado.tablero;
        let iguales = true;
        for (let i = 0; i < t.length; i++) {
            for (let j = 0; j < t.length; j++) {
                const elemento = t[i][j];
                if(iguales){
                    iguales =  this.tablero[i][j] == elemento;
                }
            }
        }
        return iguales;
    }

    // Matriz a String
    tableroStr(){
        return this.tablero.toString();
    }

}

export default  Estado;