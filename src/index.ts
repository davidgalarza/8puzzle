import Estado from './classes/Estado';
import Movimiento from './classes/Movimiento';
import Problema from './classes/Problema';


// Tablero inicial
let ti = [
    [7, 2, 4],
    [5, 0, 6],
    [8, 3, 1]
];

// Tablero objetivo
let tf = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];


// Crear el estado Inicial y el objetivo
let estadoInicial: Estado = new Estado(ti);
let estadoObjetivo: Estado = new Estado(tf);


// Movimientos a realizar
let movimientos: Movimiento[] = [
    new Movimiento(1, 0),
    new Movimiento(0, 1),
    new Movimiento(-1, 0),
    new Movimiento(0, -1)
];



//  Crer un problema con estadoInicial, estadoObjetivo, movimientos
let problema = new Problema(estadoInicial, estadoObjetivo, movimientos);


problema.resolver();


