import { promisify } from 'util';

import { client } from '../lib/ergast/client';
import { writeFile } from '../lib/writeFile';
import { renderJson } from '../renderers/json';

import * as paths from '../paths';

(async function() {
    try {
        const season = await promisify(client.getSeason)(2022);

        await writeFile(
            paths.getErgastPath('season'),
            renderJson(season),
        );

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
