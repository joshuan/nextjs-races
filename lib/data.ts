import moment from './moment';
import rawData from '../public/calendar.json';
import {IDateble, ISavedEventWithDate, IServerEvents, IServerGroups} from '../@types/types';

function groupByCity(data: IServerEvents[]): IServerGroups[] {
    const results: IServerGroups[] = [];

    data.forEach((item) => {
        const itemCity = item.city || 'unknownCity';
        const index = results.findIndex((result) => result.city === itemCity);

        if (index === -1) {
            results.push({ city: itemCity, list: [ item ] });
        } else {
            results[index].list.push(item);
        }
    });

    return results;
}

function sortRawData(a: IDateble<string>, b: IDateble<string>) {
    return a.startDate > b.startDate ? 1 : -1;
}

const data = groupByCity(
    (rawData as ISavedEventWithDate[])
        .sort(sortRawData)
        .map<IServerEvents>((item) => {
            return {
                ...item,
                onThisWeek: moment(item.startDate).isSame(new Date(), 'week'),
                isStarted: moment(item.startDate).isBefore(new Date()),
                isEnded: moment(item.endDate).isBefore(new Date()),
            };
        })
);

export default data;
