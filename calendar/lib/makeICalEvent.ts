import { IEvent, IICalEvent } from '../../@types/types';
import { renderTimes } from './renderTimes';
import { renderGeo } from './renderGeo';
import { BroadcastWorld } from '../../@types/i18n';

function renderBroadcasts(event: IEvent): string {
    return event.broadcasts.map((broadcast, index) => {
        const { link, audio, channel, type, startDate, endDate } = broadcast;

        return [
            `${audio}. ${channel} (${BroadcastWorld[type]})`,
            renderTimes(event.startDate, startDate, endDate),
            index > 0 && link,
        ].filter(Boolean).join('. ');
    }).filter(Boolean).reverse().join('.\n---\n');
}

export function makeICalEvent(event: IEvent): IICalEvent {
    return {
        id: event.uid,
        start: event.startDate,
        end: event.endDate,
        summary: `${event.seriesName} ${event.raceName} (${event.cityName})`,
        location: renderGeo(event),
        description: renderBroadcasts(event),
        url: event.broadcasts[0]?.link,
    };
}

export function makeICalEvents(events: IEvent[]): IICalEvent[] {
    return events.map(makeICalEvent);
}
