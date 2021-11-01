import { IEvent } from '../../@types/types';

export function filterBroadcastByChannel(list: IEvent[], channel: string) {
    return list.filter((item) => {
        return item.broadcasts[0]?.channel === channel;
    });
}
