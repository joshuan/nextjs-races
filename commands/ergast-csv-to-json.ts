import * as path from 'path';

import { parseCsv } from './lib/parseCsv';
import { FileType, getErgastPath } from './lib/paths';
import { readDir } from './lib/readDir';
import { writeFile } from './lib/writeFile';

async function getFiles() {
    return (await readDir(getErgastPath()))
        .filter((file) => path.extname(file) === '.csv');
}

async function getData(file: string) {
    const filepath = getErgastPath(file, FileType.CSV);

    return await parseCsv(filepath);
}

async function putData(file: string, data: any) {
    return await writeFile(
        getErgastPath(file, FileType.JSON),
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
        const files = await getFiles();

        for (const file of files) {
            const { name } = path.parse(file);
            const data = await getData(name);

            await putData(name, processData(data));
        }

        console.log('Done');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}());
