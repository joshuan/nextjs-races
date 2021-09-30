import { ICalLocation } from 'ical-generator';
import { IRawEventWithDate } from '../../@types/types';

export function renderGeo({ city }: IRawEventWithDate): ICalLocation | null {
    if (city === 'monca') {
        return {
            title: 'monca, Италия',
            geo: {
                lat: 45.6132,
                lon: 9.2893,
            },
        };
    }

    return null;
}
