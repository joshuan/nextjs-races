import { YearRace } from '../../@types/year-database';
import { TSeries } from '../../@types/fields';

const data2021 = require('../../data/2021/races.json') as YearRace[];
const data2022 = require('../../data/2022/races.json') as YearRace[];

export function getRaces(series: TSeries, year: number): YearRace[] {
    let data: YearRace[] = [];

    switch (year) {
        case 2021:
            data = data2021;
            break;
        case 2022:
            data = data2022;
            break;
    }

    return data.filter((item) => item.series === series);
}

export function getRace(series: TSeries, year: number, round: number): YearRace | undefined {
    return getRaces(series, year).find((item) => {
        return item.round === round;
    });
}
