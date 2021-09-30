import { IRawEventWithDate } from '../../@types/types';

export function getBroadcastEvents(events: IRawEventWithDate[]): IRawEventWithDate[] {
    return events.reduce<IRawEventWithDate[]>((acc, event) => {
        event.broadcasts.forEach((broadcast) => {
            acc.push({
                ...event,
                broadcasts: [ broadcast ],
            });
        });

        return acc;
    }, []);
}
