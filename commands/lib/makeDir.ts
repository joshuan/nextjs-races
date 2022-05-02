import * as fs from 'fs/promises';

export const makeDir = (dir: string) => {
    if (process.env.DRY_RUN) {
        console.log('[DRY-RUN] Make dir:', dir);

        return Promise.resolve();
    }

    return fs.mkdir(dir, { recursive: true });
};
