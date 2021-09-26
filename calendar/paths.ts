import path from 'path';

export const source = path.resolve(__dirname, '../events');
export const dist = path.resolve(__dirname, '../public');

export const json = path.resolve(dist, 'calendar.json');

export const ical = path.resolve(dist, 'calendar.ics');
export const broadcastIcal = path.resolve(dist, 'calendar-broadcast.ics');
