import { IRawEventWithUid } from '../../@types/database';
import { IEvent } from '../../@types/types';
import * as i18n from '../../@types/i18n';

function createDate(date: string, time: string): Date {
    const [day, month, year] = date.split('.');
    const [hour, minutes] = time.split(':');

    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minutes, 10),
    );
}

export function processDates(data: IRawEventWithUid): IEvent {
    const {
        date,
        startTime,
        endTime,
        ...event
    } = data;

    return {
        ...event,
        cityName: i18n.Cities[data.city],
        seriesName: i18n.Series[data.series],
        raceName: i18n.Races[data.race],
        startDate: createDate(date, startTime),
        endDate: createDate(date, endTime),
        broadcasts: event.broadcasts.map((broadcastData) => {
            const {
                date: broadcastDate = date,
                startTime: broadcastStartTime = startTime,
                endTime: broadcastEndTime = endTime,
                ...broadcast
            } = broadcastData;

            return {
                ...broadcast,
                typeName: i18n.BroadcastWorld[broadcast.type],
                startDate: createDate(broadcastDate, broadcastStartTime),
                endDate: createDate(broadcastDate, broadcastEndTime),
            };
        }),
    };
}
