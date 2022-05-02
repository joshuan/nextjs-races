import * as fs from 'fs/promises';

export const readFile = (file: string) => {
    return fs.readFile(file, { encoding: 'utf-8' });
};
