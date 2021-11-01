import { ICalLocation } from 'ical-generator';
import { IEvent } from '../../@types/types';

export function renderGeo({ city }: IEvent): ICalLocation | null {
    if (city === 'monza') {
        return {
            title: 'monza, Италия',
            geo: {
                lat: 45.6132,
                lon: 9.2893,
            },
        };
    }

    return null;
}
