import path from 'path';
import { getDate, getSQLDate, leadZero } from '../lib/renderTimes';
import { writeFile } from '../lib/writeFile';

import * as paths from '../paths';

/**
 * Example:
 * FIRST_DAY=2021-12-31 \
 *     CATEGORY=f1 \
 *     CITY=Вассаби \
 *     TIME_DIFF=-3 \
 *     ts-node src/commands/addEvents.ts
*/

function getRaces(category: string) {
    const names: Record<string, string> = category === 'f1' ? {
        p1: 'Первая сессия свободных заездов',
        p2: 'Вторая сессия свободных заездов',
        p3: 'Третья сессия свободных заездов',
        q: 'Квалификация',
        race: 'Гран-при',
    } : (category === 'f2' ? {
        p: 'Свободные заезды',
        q: 'Квалификация',
        race1: 'Первая гонка',
        race2: 'Вторая гонка',
        race3: 'Третья гонка',
    } : (category === 'f3' ? {
        p: 'Свободные заезды',
        q: 'Квалификация',
        race1: 'Первая гонка',
        race2: 'Вторая гонка',
        race3: 'Третья гонка',
    } : {}));

    const plusDay: Record<string, number> = {
        p1: 0,
        p2: 0,
        p3: 1,
        q: 1,
        race1: 1,
        race2: 1,
        race: 2,
        race3: 2,
    };

    const times: Record<string, [string, string]> = {
        p1: ['12:30', '13:30'],
        p2: ['16:00', '17:00'],
        p3: ['13:00', '14:00'],
        q: ['16:00', '17:00'],
        race: ['16:00', '18:00'],
    };

    return {
        names,
        plusDay,
        races: Object.keys(names),
        times,
    };
}

function parseTimeDiff(str: string) {
    return (str[0] === '-' ? -1 : 1) * parseInt(str, 10);
}

function moveTime(time: string, diff: number) {
    const [hours, mins] = time.split(':');

    return `${leadZero(parseInt(hours) + diff)}:${mins}`;
}

(async function() {
    try {
        const firstDay = process.env.FIRST_DAY || getSQLDate(new Date());
        const category = process.env.CATEGORY || 'f1';
        const city = process.env.CITY;
        const timeDiff = parseTimeDiff(process.env.TIME_DIFF || '-1');

        const { names, plusDay, races, times } = getRaces(category);

        races.map(async (race) => {
            const date = new Date(firstDay);
            date.setDate(date.getDate() + plusDay[race]);
            const content = `category: ${category}
city: ${city}
name: ${names[race]}
date: ${getDate(date)}
startTime: ${moveTime(times[race]?.[0] || '15:00', timeDiff)}
endTime: ${moveTime(times[race]?.[1] || '17:00', timeDiff)}
broadcasts: []
`;
            await writeFile(path.join(paths.source, `${getSQLDate(date)}-${category}-${race}.yml`), content);
        });

        console.log('Successfully');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
