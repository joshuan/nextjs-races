import { IEvent } from '../../@types/types';

export function getBroadcastChannels(data: IEvent[]): string[] {
    return data.reduce<string[]>((acc, {broadcasts}) => {
        const currentChannel = broadcasts[0]?.channel;

        if (!currentChannel) {
            throw new Error('Broadcast without channel');
        }

        if (acc.findIndex((found) => found === currentChannel) === -1) {
            acc.push(currentChannel);
        }

        return acc;
    }, []);
}
