import * as path from 'path';

import { parseCsv } from './lib/parseCsv';
import { FileType, getErgastPath, getFilePath } from './lib/paths';
import { readDir } from './lib/readDir';
import { readFile } from './lib/readFile';
import { writeFile } from './lib/writeFile';

(async function() {
    try {
        const ROOT = 'events_2021';
        const dir = getFilePath(ROOT);
        const events = await readDir(dir);
        const links = [];

        for (const event of events) {
            const EVENT_ROOT = ROOT + '/' + event;
            const eventDir = getFilePath(EVENT_ROOT);
            const series = await readDir(eventDir);

            for (const s of series) {
                const SERIES_ROOT = EVENT_ROOT + '/' + s;
                const seriesDir = getFilePath(SERIES_ROOT);
                const races = await readDir(seriesDir);

                for (const race of races) {
                    const raceFile = getFilePath(SERIES_ROOT + '/' + race);
                    const raceData = require('js-yaml').load(await readFile(raceFile));

                    if (raceData.broadcasts && raceData.broadcasts.length > 0) {
                        for (const broadcast of raceData.broadcasts) {
                            let raceType = 'race';
                            switch (raceData.race) {
                                case 'race':
                                case 'grandprix':
                                    raceType = 'GrandPrix';
                                    break;
                                case 'q':
                                    raceType = 'Qualifying';
                                    break;
                                case 'p3':
                                    raceType = 'ThirdPractice';
                                    break;
                                case 'p2':
                                    raceType = 'SecondPractice';
                                    break;
                                case 'p1':
                                    raceType = 'FirstPractice';
                                    break;
                                case 'p':
                                    raceType = 'Practice';
                                    break;
                                case 'sprint':
                                    raceType = 'Sprint';
                                    break;
                                case 'race1':
                                    raceType = 'FirstRace';
                                    break;
                                case 'race2':
                                    raceType = 'SecondRace';
                                    break;
                                case 'race3':
                                    raceType = 'ThirdRace';
                                    break;
                                default:
                                    console.error(raceFile, raceData);
                                    throw new Error(`Unknown race type: ${raceData.race}`);
                                    break;
                            }

                            links.push({
                                series: s,
                                round: raceData.round,
                                race:  "FirstPractice",
                                type: "broadcast",
                                channel: broadcast.channel,
                                link: broadcast.link,
                                audio: broadcast.audio,
                            });
                        }
                    }
                }
            }
        }

        await writeFile(
            getFilePath('links-2021.json'),
            JSON.stringify(links, null, 4),
        );

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
