import {TChannels, TCities, TBroadcastWorld, TSeries, TRaces} from './fields';
import {BroadcastWorld, Channels, Cities, Races, Series} from './i18n';

export interface IRawBroadcast {
    link?: string;
    audio?: string;
    channel: TChannels;
    channelName?: string;
    type: TBroadcastWorld;
    intro?: string;
    date?: string; // ISO 8601 Date. Ex. 2021-11-01T18:24:16+03:00
    duration?: string; // ISO 8601 Date Interval. Ex. PT10M (= 10 min)
}

export interface IRawEvent {
    series: TSeries;
    race: TRaces;
    city: TCities;
    date: string; // ISO 8601 Date. Ex. 2021-11-01T18:24:16+03:00
    duration: string; // ISO 8601 Date Interval. Ex. PT10M (= 10 min)
    broadcasts: IRawBroadcast[];
}

export interface IRawEventWithUid extends IRawEvent {
    uid: string;
}

export const schema = {
    $$strict: true,
    series: { type: 'enum', values: Object.keys(Series) },
    race: { type: 'enum', values: Object.keys(Races) },
    date: { type: 'date' },
    duration: { type: 'string' },
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
                intro: { type: 'string', optional: true },
                date: { type: 'date', optional: true },
                duration: { type: 'string', optional: true },
            }
        },
    },
};
