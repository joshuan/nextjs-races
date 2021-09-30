import { ICalEvent, ICalEventData } from 'ical-generator';

export type IEvent = ICalEvent | ICalEventData;

export type TBroadcastType = 'online' | 'offline' | 'record';

export type TEventCategory = 'f1' | 'f2' | 'f3';

export type TChannel = 'sportbox' | 'matchtv';

export enum Cities {
    monca = 'Монца',
    sochi = 'Сочи',
    turkey = 'Турция',
    america = 'Америка',
    mexico = 'Мехико',
    brazil = 'Бразилия',
    saudi = 'Джидда',
    abudabi = 'Абу-Даби',
}

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

export interface IDateble<T> {
    startDate: T;
    endDate: T;
}

export type IBroadcastWithDate = IBroadcast & IDateble<Date>;
export type ISavedBroadcastWithDate = IBroadcast & IDateble<string>;

export interface IRawEventWithDate extends IRawEventData, IDateble<Date> {
    broadcasts: IBroadcastWithDate[];
}

export interface ISavedEventWithDate extends IRawEventData, IDateble<string> {
    broadcasts: ISavedBroadcastWithDate[];
}

export type IRawEventProcessed = IRawEventWithDate;

export type IServerEvents = ISavedEventWithDate & {
    onThisWeek: boolean;
    isStarted: boolean;
    isEnded: boolean;
}

export interface IServerGroups {
    city: string;
    list: IServerEvents[];
}
