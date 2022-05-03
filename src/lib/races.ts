import { Series, YearRace } from '../../@types/year-database';

const data = require('../../data/2022/races.json') as YearRace[];

export function getRaces(series: Series) {
    return data.filter((item) => item.series === series);
}

export function getRace(series: Series, round: number) {
    return getRaces(series).find((item) => item.round === round);
}
