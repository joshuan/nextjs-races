import { ICalLocation } from 'ical-generator';
import { IRawEventWithDate } from '../../@types/types';

export function renderGeo({ city }: IRawEventWithDate): ICalLocation | null {
    if (city === 'Монца') {
        return {
            title: 'Монца, Италия',
            geo: {
                lat: 45.6132,
                lon: 9.2893,
            },
        };
    }

    return null;
}
