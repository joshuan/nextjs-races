import moment from "../lib/moment";
import React from "react";

export function RaceDate(item) {
    const startMoment = moment(item.startDate);
    const endMoment = moment(item.endDate);

    if (item.onThisWeek) {
        return (
            <div className={item.isEnded && 'ended'}>
                {startMoment.calendar()}
                <br />
                {endMoment.calendar()}
                <style jsx>{`               
                .ended {
                  color: #aaa;
                }
                `}</style>
            </div>
        );
    }

    return (
        <div className={item.isEnded && 'ended'}>
            {startMoment.format('L')} - {startMoment.format('dddd')}
            <br />
            {startMoment.format('LT')} - {endMoment.format('LT')}
            <style jsx>{`               
            .ended {
              color: #aaa;
            }
            `}</style>
        </div>
    );
}
