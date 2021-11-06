import { processGeo } from './processGeo';
import { IEvent } from '../../@types/types';

function asyncMap<T>(items: T[], cb: (item: T) => T | Promise<T>) {
    return Promise.all(items.map(cb));
}

const middlewares = [
    processGeo,
];

export async function processEvents(events: IEvent[]): Promise<IEvent[]> {
    let processedEvents = events;

    for (let i in middlewares) {
        processedEvents = await asyncMap(processedEvents, middlewares[i]);
    }

    return processedEvents;
}
