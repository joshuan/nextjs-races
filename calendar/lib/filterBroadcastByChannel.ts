import { IRawEventWithDate } from '../../@types/types';

export function filterBroadcastByChannel(list: IRawEventWithDate[], channel: string) {
    return list.filter((item) => {
        return item.broadcasts[0]?.channel === channel;
    });
}
