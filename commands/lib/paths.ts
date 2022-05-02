import * as path from 'path';

enum Storage {
    Database = 'data',
    Ergast = 'ergast'
}

function resolve(storage: Storage, file?: string) {
    return path.resolve(__dirname, '../..', storage, file || '');
}

export function getFilePath(name: string) {
    return resolve(Storage.Database, name);
}

export function getErgastPath(year: string, filename: string) {
    return resolve(Storage.Ergast, path.join(year, filename));
}
