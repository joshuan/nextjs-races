import path from 'path';

enum Storage {
    Source = 'events',
    Public = 'public',
    Database = 'data',
}

export enum DataFile {
    CHANNELS = 'channels',
    CALENDAR = 'calendar',
}

export enum PublicFile {
    CALENDAR = 'calendar',
}

export enum Format {
    JSON = 'json',
    ICAL = 'ics',
}

function resolve(storage: Storage, file?: string) {
    return path.resolve(__dirname, '..', storage, file || '');
}

export function getSourcePath() {
    return resolve(Storage.Source);
}

export function getDatabasePath(file: DataFile, type: Format = Format.ICAL) {
    return resolve(Storage.Database, `${file}.${type}`);
}

export function getPublicPath(file: PublicFile, type: Format = Format.ICAL) {
    return resolve(Storage.Public, `${file}.${type}`);
}

export function getBroadcastPath(name?: string, type: Format = Format.ICAL) {
    const file = name ? `${PublicFile.CALENDAR}-broadcast-${name}` : `${PublicFile.CALENDAR}-broadcast`;

    return resolve(Storage.Public, `${file}.${type}`);
}

export function getErgastPath(name: string) {
    return resolve(Storage.Database, `ergast-${name}.json`);
}
