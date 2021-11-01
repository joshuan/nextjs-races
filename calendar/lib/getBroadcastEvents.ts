import { IEvent } from '../../@types/types';

export function getBroadcastEvents(events: IEvent[]): IEvent[] {
    return events.reduce<IEvent[]>((acc, event) => {
        event.broadcasts.forEach((broadcast) => {
            acc.push({
                ...event,
                broadcasts: [ broadcast ],
            });
        });

        return acc;
    }, []);
}
