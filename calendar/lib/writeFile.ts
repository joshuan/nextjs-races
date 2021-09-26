import fs from 'fs';
import pify from 'pify';

const fsWriteFile = pify(fs.writeFile);

export const writeFile = (file: string, content: string) => {
    if (process.env.DRY_RUN) {
        console.log('[DRY-RUN]', file);
        console.log(content);
        console.log('------');

        return Promise.resolve();
    }

    return fsWriteFile(file, content);
};
