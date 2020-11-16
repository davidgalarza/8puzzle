import Estado from "./Estado";
import Movimiento from "./Movimiento";
import Nodo from "./Nodo";

class Problema {

    movimientos: Movimiento[]; // Movimientos que se pueden realizar
    estadoInicial: Estado; 
    estadoObjetivo: Estado;

    cola: Nodo[] = []; // Cola de nodos por visitar
    tablerosEncontrados: Set<string> = new Set<string>(); // Tableros encontrados


    constructor(estadoInicial: Estado, estadoObjetivo: Estado, movimientos: Movimiento[]){
        this.estadoInicial = estadoInicial;
        this.estadoObjetivo = estadoObjetivo;
        this.movimientos = movimientos;
    }


    imprimirCamino(nodo: Nodo): void {
        if(nodo == null) return;
        this.imprimirCamino(nodo.padre);
        console.log(`==== h: ${nodo.estado.h}, g: ${nodo.profundidad}, f: ${nodo.costo} ===`)
        this.imprimirMatriz(nodo.estado.tablero);
        console.log('\n');
    }

    imprimirMatriz(matriz: number[][]){
        let matrizString = matriz.map((c) => c.join(' ')).join('\n');
    
        console.log(matrizString);
    }

    // Ejecutar el acclgoritmo de A*
    resolver() {
        // Crear el nodo raiz con el estado inicial
        let nodoRaiz = new Nodo(this.estadoInicial, 0, null);
        nodoRaiz.calcularCosto(this.estadoObjetivo);  // calcular el costo del nodo raiz


        this.cola.push(nodoRaiz); // Anadir a la cola el nodo raiz

        
        // Mientras exita algo en la cola
        while(this.cola.length > 0){
            
            // Ordenar la cola de manera de MAYOR a MENOR en funcion de su costo
            this.cola = this.cola.sort((na, no) => no.costo - na.costo);
            // Sacar el ultimo nodo de la cola (menor costo)
            let nodoMenorCosto =  this.cola.pop();
            // Anadir a los tableros encontrados
            this.tablerosEncontrados.add(nodoMenorCosto.estado.tableroStr())
            

            // Condicion de parada
            // Cuando se llega al nodo objetivo imprimir el camino
            if(nodoMenorCosto.estado.h == 0){
                this.imprimirCamino(nodoMenorCosto);
                return;
            }


            // Generar los hijo del nodo actual
            this.movimientos.forEach((movimiento) => {

                // Posion vacio del actual (menor costo)
                let vacioX = nodoMenorCosto.estado.pVx;
                let vacioY = nodoMenorCosto.estado.pVy;

                // Movimiento en los ejes
                let ax = movimiento.ax;
                let ay = movimiento.ay;


                // Verificar que se puede realizar el movimiento
                if(this.posicionValida(vacioX, vacioY, ax, ay)){
                    // Ejecuar el moviento en el estado
                    let nuevoEstado = nodoMenorCosto.estado.realizarMovimiento(movimiento);
                    // Crear un nodo hijo con el estado resultante
                    let hijo = new Nodo(nuevoEstado, nodoMenorCosto.profundidad + 1, nodoMenorCosto);
                    hijo.calcularCosto(this.estadoObjetivo); // Calcula el costo del hijo
                    
                    // Verificar que el tablero de el hijo no esta en cola aun
                    if(!this.tablerosEncontrados.has(hijo.estado.tableroStr())){
                        this.cola.push(hijo);
                        this.tablerosEncontrados.add(hijo.estado.tableroStr());
                    }

                }
            });
        }
    }

    // Verficar que se pueda realizar el movimiento
    posicionValida(x, y, aX, aY) : boolean{
        let nx = x + aX;
        let ny = y + aY;

        return nx >= 0 && nx < 3 && ny >= 0 && ny < 3;
    }

}

export default Problema;