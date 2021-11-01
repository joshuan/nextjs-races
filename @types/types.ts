import { ICalEvent, ICalEventData } from 'ical-generator';
import { IRawEvent, IRawBroadcast } from './database';

export type IICalEvent = ICalEvent | ICalEventData;

type TDatable<T> = Omit<T, 'date' | 'duration'> & {
    startDate: Date;
    endDate: Date;
};

export type IEventBroadcast = TDatable<IRawBroadcast> & {
    typeName: string;
};

export type IEvent = Omit<TDatable<IRawEvent>, 'broadcasts'> & {
    uid: string;
    cityName: string;
    seriesName: string;
    raceName: string;
    broadcasts: IEventBroadcast[];
};

export interface IServerEvents extends IEvent {
    onThisWeek: boolean;
    isStarted: boolean;
    isEnded: boolean;
}
