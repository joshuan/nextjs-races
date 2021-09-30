// 1. Интерфейс в сыром файле
import {Cities, TBroadcastType, TChannel, TEventCategory} from "./types";

export interface IEventFile {
    category: TEventCategory;
    city?: Cities;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    broadcasts: {
        link: string;
        commentator?: string;
        channel: TChannel;
        channelName?: string;
        type: TBroadcastType;
        date?: string;
        startTime?: string;
        endTime?: string;
    }[];
}
