import { ICalEventData, ICalLocation } from 'ical-generator';
import { IRawEventProcessed, IRawEventWithDate } from '../types';
import { renderTimes } from './renderTimes';
import { renderGeo } from './renderGeo';
import i18n from '../i18n/ru';

function renderBroadcasts(event: IRawEventProcessed): string {
    return event.broadcasts.map((broadcast, index) => {
        const { link, commentator, channel, type, startDate, endDate } = broadcast;

        return [
            `${commentator}. ${channel} (${i18n.type[type] || type})`,
            renderTimes(event.startDate, startDate, endDate),
            index > 0 && link,
        ].filter(Boolean).join('. ');
    }).filter(Boolean).reverse().join('.\n---\n');
}

export function makeICalEvent(event: IRawEventWithDate): ICalEventData {
    const category = event.category && i18n.category[event.category] ? `${i18n.category[event.category]} - ` : '';

    return {
        id: event.uid,
        start: event.startDate,
        end: event.endDate,
        timezone: 'Europe/Moscow',
        summary: `${category}${event.name}`,
        location: renderGeo(event),
        description: renderBroadcasts(event),
        url: event.broadcasts[0]?.link,
    };
}

export function makeICalEvents(events: IRawEventWithDate[]): ICalEventData[] {
    return events.map(makeICalEvent);
}
