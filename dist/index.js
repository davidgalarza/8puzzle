"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Estado_1 = __importDefault(require("./classes/Estado"));
const Movimiento_1 = __importDefault(require("./classes/Movimiento"));
const Problema_1 = __importDefault(require("./classes/Problema"));
let ti = [
    [7, 2, 4],
    [5, 0, 6],
    [8, 3, 1]
];
// [3, 1, 2],
// [4, 7, 5],
// [6, 0, 8]
let tf = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
let estadoInicial = new Estado_1.default(ti);
let estadoObjetivo = new Estado_1.default(tf);
let movimientos = [
    new Movimiento_1.default(1, 0),
    new Movimiento_1.default(0, 1),
    new Movimiento_1.default(-1, 0),
    new Movimiento_1.default(0, -1)
];
let problema = new Problema_1.default(estadoInicial, estadoObjetivo, movimientos);
problema.resolver();
//# sourceMappingURL=index.js.map