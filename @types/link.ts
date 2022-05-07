import { TChannels, TRaceNames, TSeries } from './fields';

export interface ILink {
    series: TSeries;
    round: number;
    race: TRaceNames;
    type: 'broadcast';
    channel: TChannels;
    link: string;
    audio?: string;
}
