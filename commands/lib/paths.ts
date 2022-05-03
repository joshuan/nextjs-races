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

export function getYearFilePath(year: string | number, name: string) {
    return resolve(Storage.Database, path.join(`${year}`, name));
}

export function getErgastPath(filename: string = '', type?: FileType) {
    const filepath = path.join(type ? filename + '.' + type : filename);

    return resolve(Storage.Ergast, filepath);
}
