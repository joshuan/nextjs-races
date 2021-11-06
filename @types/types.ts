import { ICalEvent, ICalEventData } from 'ical-generator';
import { IRawEvent, IRawBroadcast } from './database';

export type IICalEvent = ICalEvent | ICalEventData;

type TDatable<T, D = Date> = Omit<T, 'date' | 'duration'> & {
    startDate: D;
    endDate: D;
};

export type IEventBroadcast<D = Date> = TDatable<IRawBroadcast, D> & {
    typeName: string;
};

export type IEvent<D = Date> = Omit<TDatable<IRawEvent, D>, 'broadcasts'> & {
    uid: string;
    cityName: string;
    seriesName: string;
    raceName: string;
    broadcasts: IEventBroadcast<D>[];

    weekName?: string;
    circuitName?: string;
    circuitLocation?: number[];
    wiki?: string;
    locationName?: string;
};

export interface IServerCitiesGroup {
    city: string;
    list: IEvent[];
    firstDate: Date;
    lastDate: Date;
}
