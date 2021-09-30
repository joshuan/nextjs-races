import ical from 'ical-generator';
import { IEvent } from '../../@types/types';

export function renderICal(events: IEvent[]): string {
    const cal = ical({
        description: 'Календарь формульных событий',
        name: 'Formula',
        prodId: {
            company: 'joshuan',
            product: 'f1-calendar',
            language: 'RU'
        },
        events,
    });

    return cal.toString();
}
