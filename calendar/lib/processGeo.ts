import type { Race } from 'ergast-client';
import { IEvent } from '../../@types/types';
import { getSeason } from './ergast/getSeason';

export async function processGeo(item: IEvent) {
    const season = await getSeason(2021);

    if (!season[item.round]) {
        return item;
    }

    const race = season[item.round] as Race;

    return {
        ...item,
        weekName: race.raceName,
        circuitName: race.circuit.circuitName,
        circuitLocation: [ race.circuit.location.lat, race.circuit.location.long ],
        wiki: race.url,
        locationName: `${race.circuit.location.locality} (${race.circuit.location.country})`,
    };
}
