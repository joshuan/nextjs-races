import path from 'path';

import { makeDir } from '../lib/makeDir';
import { writeFile } from '../lib/writeFile';

import * as paths from '../paths';

(async function() {
    try {
        const season = require('../../data/season.json');

        for (const race of season.races) {
            const folder = path.join(paths.getSourcePath(), `${race.date}-${race.circuit.circuitId}`, 'f1');

            await makeDir(folder);

            const types = ['p1', 'p2', 'p3', 'q', 'race'];

            for (const type of types) {
                const data = `series: f1
round: ${race.round}
city: ${race.circuit.circuitId}
race: ${type}
date: ${new Date(`${race.date}T${race.time}`).toISOString()}
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
