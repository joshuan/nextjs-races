import * as path from 'path';

enum Storage {
    Database = 'data',
    Ergast = 'data/ergast',
}

export enum FileType {
    CSV = 'csv',
    JSON = 'json',
}

function resolve(storage: Storage, file?: string) {
    return path.resolve(__dirname, '../..', storage, file || '');
}

export function getFilePath(name: string) {
    return resolve(Storage.Database, name);
}

export function getErgastPath(year: string, filename: string = '', type?: FileType) {
    const filepath = path.join(year, type ? filename + '.' + type : filename);

    return resolve(Storage.Ergast, filepath);
}
