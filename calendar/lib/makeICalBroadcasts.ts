import { ICalEventData, ICalLocation } from 'ical-generator';
import { IBroadcastWithDate, IRawEventProcessed, IRawEventWithDate } from '../types';
import { renderTimes } from './renderTimes';
import { renderGeo } from './renderGeo';
import i18n from '../i18n/ru';

function renderBroadcast(event: IRawEventProcessed, broadcast: IBroadcastWithDate): string {
    const { commentator, channel, type, startDate, endDate } = broadcast;

    return [
        commentator,
        i18n.type[type] || type,
        renderTimes(event.startDate, startDate, endDate),
    ].filter(Boolean).join('. ');
}


export function makeICalBroadcasts(events: IRawEventWithDate[]): ICalEventData[] {
    return events.reduce<ICalEventData[]>((acc, event) => {
        const category = event.category && i18n.category[event.category] ? `${i18n.category[event.category]} - ` : '';

        event.broadcasts.forEach((broadcast, index) => {
            acc.push({
                id: `${event.uid}-broadcast-${index}`,
                start: broadcast.startDate,
                end: broadcast.endDate,
                timezone: 'Europe/Moscow',
                summary: `[${broadcast.channel}] ${category}${event.name}`,
                location: renderGeo(event),
                description: renderBroadcast(event, broadcast),
                url: broadcast.link,
            });
        });

        return acc;
    }, []);
}
