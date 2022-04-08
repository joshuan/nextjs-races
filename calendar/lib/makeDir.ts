import fs from 'fs';
import pify from 'pify';

const fsMkdirFile = pify(fs.mkdir);

export const makeDir = (dir: string) => {
    if (process.env.DRY_RUN) {
        console.log('[DRY-RUN] Make dir:', dir);

        return Promise.resolve();
    }

    return fsMkdirFile(dir, { recursive: true });
};
