import type { Race } from 'ergast-client';
import { client } from './client';

type ISeason = Record<number, Race>;

const seasonsCache = new Map<number, ISeason>();

export function getSeason(year: number): Promise<ISeason> {
    return new Promise((resolve, reject) => {
        if (seasonsCache.has(year)) {
            resolve(seasonsCache.get(year) as ISeason);

            return;
        }

        client.getSeason(year, function(err, season) {
            if (err) {
                reject(err);
            } else {
                const record = season.races.reduce((acc, race: Race) => {
                    acc[race.round] = race;

                    return acc;
                }, {} as ISeason);

                seasonsCache.set(year, record);

                resolve(record);
            }
        });
    });
}
