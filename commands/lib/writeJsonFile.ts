import { writeFile } from './writeFile';

export const writeJsonFile = (file: string, content: object | object[]) => {
    return writeFile(file, JSON.stringify(content, null, 4));
};
