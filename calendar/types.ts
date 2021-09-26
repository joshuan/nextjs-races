import { ICalEvent, ICalEventData } from 'ical-generator';

export type IEvent = ICalEvent | ICalEventData;

export interface IRawFile {
    filename: string;
    content: string;
}

export interface IBroadcast {
    link: string;
    commentator: string;
    channel: string;
    type: 'online' | 'offline' | 'record';
    date?: string;
    startTime?: string;
    endTime?: string;
}

export interface IRawEvent {
    category: 'f1' | 'f2' | 'f3';
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
};

export type IBroadcastWithDate = IBroadcast & IDateble;

export interface IRawEventWithDate extends IRawEventData, IDateble {
    broadcasts: IBroadcastWithDate[];
};

export type IRawEventProcessed = IRawEventWithDate;
