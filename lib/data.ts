import moment from './moment';
import rawEvents from '../data/calendar.json';
import rawChannels from '../data/channels.json';
import { IServerCitiesGroup, IEvent } from '../@types/types';
import { TChannels } from '../@types/fields';
import * as i18n from '../@types/i18n';

function convertDates<T extends { startDate: string; endDate: string; }>(item: T) {
    const { startDate, endDate, ...data } = item;

    return {
        ...data,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
    }
}

const events = (rawEvents as IEvent<string>[])
    .sort((a, b) => moment(a.startDate).isBefore(moment(b.startDate)) ? 1 : -1)
    .map<IEvent>((item) => {
        const { broadcasts, ...event } = item;

        return {
            ...convertDates(event),
            broadcasts: broadcasts.map(convertDates),
        };
    });

function groupByCity(events: IEvent[]): IServerCitiesGroup[] {
    return events
        .reduce((acc, event) => {
            const itemCity = event.city || 'unknownCity';
            const index = acc.findIndex((result) => result.city === itemCity);

            if (index === -1) {
                acc.push({
                    city: itemCity,
                    list: [ event ],
                    minDates: [ event.startDate ],
                    maxDates: [ event.endDate ],
                });
            } else {
                acc[index].list.push(event);
                acc[index].minDates.push(event.startDate);
                acc[index].maxDates.push(event.endDate);
            }

            return acc;
        }, [] as { city: string; list: IEvent[]; minDates: Date[]; maxDates: Date[] }[])
        .map(({ minDates, maxDates, list, ...item }) => {
            return {
                ...item,
                list: list.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
                firstDate: minDates.sort((a: Date, b: Date) => a.getTime() - b.getTime())[0],
                lastDate: maxDates.sort((a: Date, b: Date) => b.getTime() - a.getTime())[0],
            };
        })
        .sort((a, b) => b.firstDate.getTime() - a.firstDate.getTime());
}

export const calendar = groupByCity(events);

function prepareChannels(channels: TChannels[]) {
    return channels.map((channel) => ({
        channel,
        channelName: i18n.Channels[channel],
    }))
}

export const channels = prepareChannels(rawChannels);
