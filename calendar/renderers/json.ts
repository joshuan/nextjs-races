export function renderJson(events: object[]): string {
    return JSON.stringify(events, null, 4);
}
