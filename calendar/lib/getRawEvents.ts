import fs from 'fs';
import path from 'path';
import pify from 'pify';

import { IRawFile } from '../../@types/types';

const fsReadDir = pify(fs.readdir);
const fsReadFile = pify(fs.readFile);
const fsStats = pify(fs.lstat);

async function readDir(root: string, dir: string = ''): Promise<string[]> {
    const filesAndDirs = await fsReadDir(path.join(root, dir));
    const list = [];

    for (let index in filesAndDirs) {
        const itemPath = path.join(dir, filesAndDirs[index]);
        const stats = await fsStats(path.join(root, itemPath));

        if (stats.isDirectory()) {
            list.push(...await readDir(root, itemPath));
        }

        if (stats.isFile()) {
            list.push(itemPath);
        }
    }

    return list;
}

function readFile(root: string, file: string): Promise<string> {
    return fsReadFile(path.join(root, file), { encoding: 'utf-8' });
}

function getFilename(file: string): string {
    return path.join(path.dirname(file), path.basename(file, '.yml'));
}

/**
 * Получает путь до папки, где плоско лежат yaml файлы.
 * Читает их и отдает по каждому инфу: имя файла и его содержимое
 */
export async function getRawEvents(dir: string): Promise<IRawFile[]> {
    const files = await readDir(dir);

    return await Promise.all(files.map(async (file: string) => {
        const filename = getFilename(file);
        const content = await readFile(dir, file);

        return { filename, content };
    }));
}
