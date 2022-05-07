import { IErgastCircuit } from '../../@types/ergast';

const data = require('../../data/ergast/circuits.json') as IErgastCircuit[];

export function getCircuits() {
    return data;
}

export function getCircuit(id: number): IErgastCircuit | undefined {
    return getCircuits().find((item) => {
        return item.circuitId === id;
    });
}
