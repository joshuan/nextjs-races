import axios from 'axios';

import { writeFile } from '../lib/writeFile';
import { renderJson } from '../renderers/json';

import * as paths from '../paths';

(async function() {
    try {
        const YEAR = process.env.YEAR;

        if (!YEAR) {
            throw new Error('Set YEAR env var to set season');
        }

        const response = await axios(`http://ergast.com/api/f1/${YEAR}.json`);
        const season = response.data.MRData.RaceTable.Races;

        await writeFile(
            paths.getErgastPath(`f1-${YEAR}`),
            renderJson(season),
        );

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
