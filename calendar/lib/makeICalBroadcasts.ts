import {IEvent, IEventBroadcast, IICalEvent} from '../../@types/types';
import { renderTimes } from './renderTimes';
import { renderGeo } from './renderGeo';

function renderBroadcastDescription(event: IEvent, broadcast: IEventBroadcast): string {
    return [
        broadcast.channelName,
        broadcast.audio,
        broadcast.typeName,
        renderTimes(event.startDate, broadcast.startDate, broadcast.endDate),
    ].filter(Boolean).join('. ');
}

export function makeICalBroadcasts(events: IEvent[]): IICalEvent[] {
    return events.reduce<IICalEvent[]>((acc, event) => {
        event.broadcasts.forEach((broadcast, index) => {
            acc.push({
                id: `${event.uid}-broadcast-${index}`,
                start: broadcast.startDate,
                end: broadcast.endDate,
                summary: `[${broadcast.channelName}] ${event.seriesName} ${event.raceName} (${event.cityName})`,
                location: renderGeo(event),
                description: renderBroadcastDescription(event, broadcast),
                url: broadcast.link,
            });
        });

        return acc;
    }, []);
}
