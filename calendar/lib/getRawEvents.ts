import fs from 'fs';
import path from 'path';
import pify from 'pify';

import { IRawFile } from '../types';

const fsReadDir = pify(fs.readdir);
const fsReadFile = pify(fs.readFile);

function readDir(dir: string): Promise<string[]> {
    return fsReadDir(dir);
}

function readFile(file: string): Promise<string> {
    return fsReadFile(file, { encoding: 'utf-8' });
}

function getFilename(file: string): string {
    return path.basename(file, '.yml');
}

/**
 * Получает путь до папки, где плоско лежат yaml файлы.
 * Читает их и отдает по каждому инфу: имя файла и его содержимое
 */
export async function getRawEvents(dir: string): Promise<IRawFile[]> {
    const files = await readDir(dir);
    const data = await Promise.all(files.map(async (file: string) => {
        const filename = getFilename(file);
        const content = await readFile(path.join(dir, file));

        return { filename, content };
    }));

    return data;
}
