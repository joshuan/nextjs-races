import { ILink } from '../../@types/link';
import { TSeries } from '../../@types/fields';

const data2021 = require('../../data/2021/links.json') as ILink[];
const data2022 = require('../../data/2022/links.json') as ILink[];

export function getYearLinks(series: TSeries, year: number): ILink[] {
    let data: ILink[] = [];

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

export function getRoundLinks(series: TSeries, year: number, round: number): ILink[] {
    return getYearLinks(series, year).filter((item) => {
        return item.round === round;
    });
}
