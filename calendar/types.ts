import { ICalEvent, ICalEventData } from 'ical-generator';

export type IEvent = ICalEvent | ICalEventData;

type TBroadcastType = 'online' | 'offline' | 'record';

type TEventCategory = 'f1' | 'f2' | 'f3';

type TChannel = 'sportbox' | 'matchtv';

export interface IRawFile {
    filename: string;
    content: string;
}

export interface IBroadcast {
    link: string;
    commentator: string;
    channel: TChannel;
    channelName?: string;
    type: TBroadcastType;
    date?: string;
    startTime?: string;
    endTime?: string;
}

export interface IRawEvent {
    category: TEventCategory;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    city?: string;
    broadcasts: IBroadcast[];
}

export type IRawEventData = IRawEvent & { uid: string; };

interface IDateble {
    startDate: Date;
    endDate: Date;
}

export type IBroadcastWithDate = IBroadcast & IDateble;

export interface IRawEventWithDate extends IRawEventData, IDateble {
    broadcasts: IBroadcastWithDate[];
}

export interface IBroadcastEventsWithDate {
    channel: string;
    event: IRawEventWithDate;
    broadcast: IBroadcastWithDate;
    index: number;
}

export type IRawEventProcessed = IRawEventWithDate;
