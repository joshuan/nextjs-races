import moment from 'moment';
import { IRawEventWithUid } from '../../@types/database';
import { IEvent } from '../../@types/types';
import * as i18n from '../../@types/i18n';

export function processDates(data: IRawEventWithUid): IEvent {
    const {
        date,
        duration,
        ...event
    } = data;

    const eventStartDate = moment(date);
    const eventEndDate = eventStartDate.clone().add(moment.duration(duration));

    return {
        ...event,
        cityName: i18n.Cities[data.city],
        seriesName: i18n.Series[data.series],
        raceName: i18n.Races[data.race],
        startDate: eventStartDate.toDate(),
        endDate: eventEndDate.toDate(),
        broadcasts: event.broadcasts.map((broadcastData) => {
            const {
                intro,
                date: broadcastDate = date,
                ...broadcast
            } = broadcastData;

            const broadcastStartDate = moment(broadcastDate);
            const broadcastEndDate = broadcastStartDate.clone().add(moment.duration(duration));

            if (intro) {
                broadcastStartDate.subtract(moment.duration(intro));
            }

            return {
                ...broadcast,
                typeName: i18n.BroadcastWorld[broadcast.type],
                startDate: broadcastStartDate.toDate(),
                endDate: broadcastEndDate.toDate(),
            };
        }),
    };
}
