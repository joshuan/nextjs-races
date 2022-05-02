import * as path from 'path';

import { parseCsv } from './lib/parseCsv';
import { FileType, getErgastPath } from './lib/paths';
import { readDir } from './lib/readDir';
import { writeFile } from './lib/writeFile';

function getYear() {
    const { YEAR } = process.env;

    if (!YEAR) {
        throw new Error('Unknown Year!');
    }

    return YEAR;
}

async function getFiles(year: string) {
    return (await readDir(getErgastPath(year)))
        .filter((file) => path.extname(file) === '.csv');
}

async function getData(year: string, file: string) {
    const filepath = getErgastPath(year, file, FileType.CSV);

    return await parseCsv(filepath);
}

async function putData(year: string, file: string, data: any) {
    return await writeFile(
        getErgastPath(year, file, FileType.JSON),
        JSON.stringify(data, null, 4),
    );
}

function processData(list: unknown): Array<Record<string, string | number>> {
    if (!Array.isArray(list)) {
        throw new Error('Must be array');
    }

    return list.map((item) => {
        for (const key in item) {
            if (/^\d+$/.test(item[key])) {
                item[key] = parseInt(item[key], 10);
            }
        }

        return item;
    });
}

(async function() {
    try {
        const YEAR = getYear();
        const files = await getFiles(YEAR);

        for (const file of files) {
            const { name } = path.parse(file);
            const data = await getData(YEAR, name);

            await putData(YEAR, name, processData(data));
        }

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
