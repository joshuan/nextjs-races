import { ErgastCircuit, ErgastRace } from '../../@types/ergast';

export function getErgastCircuits(): Record<number, ErgastCircuit> {
    return (require('../../data/ergast/circuits.json') as ErgastCircuit[])
        .reduce((acc, item) => {
            acc[item.circuitId] = item;

            return acc;
        }, {} as Record<number, ErgastCircuit>);
}

export function getErgastRaces() {
    return require('../../data/ergast/races.json') as ErgastRace[];
}
