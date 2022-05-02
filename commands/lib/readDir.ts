import * as fs from 'fs/promises';

export const readDir = (dir: string) => {
    return fs.readdir(dir);
};
