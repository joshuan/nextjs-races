import { parseCsv } from './lib/parseCsv';
import { getErgastPath, getFilePath } from './lib/paths';
import { writeFile } from './lib/writeFile';
import { readDir } from './lib/readDir';

function getYear() {
    const { YEAR } = process.env;

    if (!YEAR) {
        throw new Error('Unknown Year!');
    }

    return YEAR;
}

async function getFiles(year: string) {
    return (await readDir(getErgastPath(year, '')))
        .filter((file) => file.endsWith('.csv'));
}

async function getData(year: string, file: string) {
    const filepath = getErgastPath(year, file);

    return await parseCsv(filepath);
}

async function putData(year: string, file: string, data: any) {
    return await writeFile(getErgastPath(year, file), JSON.stringify(data, null, 4));
}

(async function() {
    try {
        const YEAR = getYear();
        const files = await getFiles(YEAR);

        for (const file of files) {
            const filename = file.replace('.csv', '');
            const data = await getData(YEAR, file + '.csv');

            await putData(YEAR, filename + '.json', data);
        }

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
