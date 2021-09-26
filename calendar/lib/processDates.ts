import { IRawEventData, IRawEventWithDate } from "../types";

function createDate(date: string, time: string): Date {
    const [day, month, year] = date.split('.');
    const [hour, minutes] = time.split(':');

    return new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minutes, 10),
    );
}

export function processDates(event: IRawEventData): IRawEventWithDate {
    return {
        ...event,
        startDate: createDate(event.date, event.startTime),
        endDate: createDate(event.date, event.endTime),
        broadcasts: event.broadcasts.map((broadcast) => {
            return { 
                ...broadcast,
                startDate: createDate(broadcast.date || event.date, broadcast.startTime || event.startTime),
                endDate: createDate(broadcast.date || event.date, broadcast.endTime || event.endTime),
            };
        }),
    };
}