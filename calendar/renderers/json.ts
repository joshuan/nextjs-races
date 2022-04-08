type Item = (object | string);

export function renderJson(events: Item | Item[]): string {
    return JSON.stringify(events, null, 4);
}
