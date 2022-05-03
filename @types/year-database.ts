import { ErgastCircuit } from './ergast';

export type Series = 'f1' | 'f2' | 'f3';

export interface YearRace {
    series: Series;
    round: number;
    name: string;
    datetime: string;
    url: string;
    circuit: ErgastCircuit;
    races: { race: string; datetime: string; }[];
}
