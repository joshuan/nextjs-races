import * as fs from 'fs/promises';

export const writeFile = (file: string, content: string) => {
    if (process.env.DRY_RUN) {
        console.log('[DRY-RUN]', file);
        console.log(content);
        console.log('------');

        return Promise.resolve();
    }

    return fs.writeFile(file, content);
};
