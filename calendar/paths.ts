import path from 'path';

export const source = path.resolve(__dirname, '../events');
export const dist = path.resolve(__dirname, '../public');

export const json = path.resolve(dist, 'calendar.json');

export const ical = path.resolve(dist, 'calendar.ics');

export function getBroadcastPath(name?: string) {
    if (name) {
        return path.resolve(dist, `calendar-broadcast-${name}.ics`);
    }

    return path.resolve(dist, 'calendar-broadcast.ics');
}
