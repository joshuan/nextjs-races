import { IErgastCircuit } from './ergast';
import { TRaces, TSeries } from './fields';

export interface YearRace {
    series: TSeries;
    round: number;
    name: string;
    datetime: string;
    url: string;
    circuit: IErgastCircuit;
    races: { race: TRaces; datetime: string; }[];
}
