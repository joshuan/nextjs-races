import {TChannels, TCities, TBroadcastWorld, TSeries, TRaces} from './fields';
import {BroadcastWorld, Channels, Cities, Races, Series} from './i18n';

export interface IRawBroadcast {
    link?: string;
    audio?: string;
    channel: TChannels;
    channelName?: string;
    type: TBroadcastWorld;
    date?: string;
    startTime?: string;
    endTime?: string;
}

export interface IRawEvent {
    series: TSeries;
    race: TRaces;
    city: TCities;
    date: string;
    startTime: string;
    endTime: string;
    broadcasts: IRawBroadcast[];
}

export interface IRawEventWithUid extends IRawEvent {
    uid: string;
}

export const schema = {
    $$strict: true,
    series: { type: 'enum', values: Object.keys(Series) },
    race: { type: 'enum', values: Object.keys(Races) },
    date: { type: 'string' },
    startTime: { type: 'string' },
    endTime: { type: 'string' },
    city: { type: 'enum', values: Object.keys(Cities) },
    broadcasts: {
        type: 'array',
        items: {
            strict: true,
            type: 'object',
            props: {
                link: 'string',
                audio: { type: 'string', optional: true },
                channel: { type: 'enum', values: Object.keys(Channels) },
                channelName: { type: 'string', optional: true },
                type: { type: 'enum', values: Object.keys(BroadcastWorld) },
                date: { type: 'string', optional: true },
                startTime: { type: 'string', optional: true },
                endTime: { type: 'string', optional: true },
            }
        },
    },
};
