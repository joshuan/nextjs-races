export function renderJson(events: (object | string)[]): string {
    return JSON.stringify(events, null, 4);
}
