export function leadZero(str: number): string {
    return str < 10 ? `0${str}` : `${str}`;
}

export function getDate(date: Date): string {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].map(leadZero).join('.');
}

export function getSQLDate(date: Date): string {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(leadZero).join('-');
}

export function getTime(date: Date): string {
    return [date.getHours(), date.getMinutes()].map(leadZero).join(':');
}

export function renderTimes(root: Date, from: Date, to: Date): string {
    const eventDate = getDate(root);
    const fromDate = getDate(from);
    const fromTime = getTime(from)
    const toDate = getDate(to);
    const toTime = getTime(to);

    return [
        fromDate !== eventDate && fromDate,
        'с',
        fromTime,
        'до',
        fromDate !== toDate && toDate,
        toTime,
    ].filter(Boolean).join(' ');
}
