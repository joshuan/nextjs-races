import path from 'path';

import { makeDir } from '../lib/makeDir';
import { writeFile } from '../lib/writeFile';

import * as paths from '../paths';

function slugify(text: string) {
    return text.replace(/\s/g, '-').toLowerCase();
}

function getDate({ date, time }: { date: string; time: string; }): string {
    const d = new Date(`${date}T${time}`);

    d.setHours(d.getHours()+3);

    return d.toISOString().replace('.000Z', '+03:00');
}

const types = ['p1', 'p2', 'p3', 'q', 'sprint', 'race'] as const;

type Types = typeof types[number];

const typeFields: Record<Types, string> = {
    p1: 'FirstPractice',
    p2: 'SecondPractice',
    p3: 'ThirdPractice',
    q: 'Qualifying',
    sprint: 'Sprint',
    race: '',
};

(async function() {
    try {
        const races = require('../../data/2022.json');

        for (const race of races) {
            const folder = path.join(paths.getSourcePath(), `${race.date}-${slugify(race.raceName)}`, 'f1');

            await makeDir(folder);

            for (const type of types) {
                let date = '';

                if (type === 'race') {
                    date = getDate(race);
                } else if (race[typeFields[type]]) {
                    date = getDate(race[typeFields[type]])
                } else {
                    continue;
                }

                const data = `series: f1
round: ${race.round}
city: ${race.Circuit.circuitId}
race: ${type}
date: ${date}
duration: ${type === 'race' ? 'PT2H' : 'PT1H'}
broadcasts: []
`;

                await writeFile(
                    path.join(folder, `${type}.yml`),
                    data,
                )
            }
        }

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
