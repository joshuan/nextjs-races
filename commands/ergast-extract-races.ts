import { ErgastRace } from '../@types/ergast';
import { YearRace } from '../@types/year-database';
import { getErgastCircuits, getErgastRaces } from './lib/ergast';
import { getYearFilePath } from './lib/paths';
import { writeJsonFile } from './lib/writeJsonFile';

function makeTime(date: string, time: string): string {
    return `${date}T${time}.000Z`;
}

const circuits = getErgastCircuits();

function getCircuit(id: number) {
    if (!circuits[id]) {
        throw new Error('Not found circuit by id: ' + id);
    }

    return circuits[id];
}

function makeRaces(item: ErgastRace): { race: string; datetime: string; }[] {
    const races = [];

    if (item.fp1_date) {
        races.push({ race: 'fp1', datetime: makeTime(item.fp1_date, item.fp1_time) });
    }
    if (item.fp2_date) {
        races.push({ race: 'fp2', datetime: makeTime(item.fp2_date, item.fp2_time) });
    }
    if (item.fp3_date) {
        races.push({ race: 'fp3', datetime: makeTime(item.fp3_date, item.fp3_time) });
    }
    if (item.quali_date) {
        races.push({ race: 'quali', datetime: makeTime(item.quali_date, item.quali_time) });
    }
    if (item.sprint_date) {
        races.push({ race: 'sprint', datetime: makeTime(item.sprint_date, item.sprint_time) });
    }
    if (item.date) {
        races.push({ race: 'grandprix', datetime: makeTime(item.date, item.time) });
    }

    return races;
}

function getYearRaces(year: string | number) {
    return require(`../data/${year}/races.json`) as YearRace[];
}

(async function() {
    try {
        const year = parseInt(process.env.YEAR || '0', 10);
        const source = getYearRaces(year)
            .filter((item) => item.series !== 'f1');
        const data = getErgastRaces()
            .filter((item) => item.year === year)
            .map<YearRace>((item) => ({
                series: 'f1',
                round: item.round,
                name: item.name,
                datetime: `${item.date}T${item.time}`,
                url: item.url,
                circuit: getCircuit(item.circuitId),
                races: makeRaces(item),
            }));

        const result = [...data, ...source];

        await writeJsonFile(getYearFilePath(year, 'races.json'), result);

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
