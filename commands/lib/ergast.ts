import { IErgastCircuit, IErgastRace } from '../../@types/ergast';

export function getErgastCircuits(): Record<number, IErgastCircuit> {
    return (require('../../data/ergast/circuits.json') as IErgastCircuit[])
        .reduce((acc, item) => {
            acc[item.circuitId] = item;

            return acc;
        }, {} as Record<number, IErgastCircuit>);
}

export function getErgastRaces() {
    return require('../../data/ergast/races.json') as IErgastRace[];
}
