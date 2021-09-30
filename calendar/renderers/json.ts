import { IRawEventWithDate } from '../../@types/types';

export function renderJson(events: IRawEventWithDate[]): string {
    return JSON.stringify(events, null, 4);
}
