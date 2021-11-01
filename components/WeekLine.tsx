import React from 'react';
import { IServerEvents } from '../@types/types';

interface WeelLineProps {
    events: IServerEvents[];
}

function getTime(date: string) {
    return (new Date(date)).getTime();
}

function getMinDate(events: IServerEvents[], maxDate: number = Date.now()): number {
    const time = events.reduce<number>((min, event) => {
        return Math.min(min, getTime(event.startDate));
    }, maxDate);

    const date = new Date(time);

    date.setHours(8);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

function getMaxDate(events: IServerEvents[]): number {
    const time = events.reduce<number>((max, event) => {
        return Math.max(max, getTime(event.endDate));
    }, 0);

    const date = new Date(time);

    date.setHours(20);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

function RaceLine({ event, minDate, fullWidth }) {
    const width = getTime(event.endDate) - getTime(event.startDate);
    const left = getTime(event.startDate) - minDate;

    return (
        <div>
            {event.category} {event.name}
            <style jsx>{`
                position: absolute;
                width:${(width / fullWidth) * 100}%;
                height: 50px;
                top: 0px;
                left: ${(left / fullWidth) * 100}%;
                overflow: hidden;
                background: #eee;
                border-right: 1px solid #ccc;
                border-left: 1px solid #ccc;
                overflow-wrap: break-word;
                font-size: 10px;
            `}</style>
        </div>
    );
}

const HOUR = 1000 * 60 * 60;

function pad(x: number) {
    return x < 10 ? `0${x}` : `${x}`;
}

function getTimeString(time: number) {
    const d = new Date(time);

    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Times({ min, max }) {
    const list = [];
    let i = min;
    const maxDiff = max - min;
    let j = 0;

    while (i < max) {
        list.push({
            perc: ((i - min) / maxDiff) * 100,
            time: getTimeString(i),
            index: j,
        });
        j++;
        i += HOUR;
    }

    return (
        <div>
            {list.map(({ perc, time, index }) => (
                <div
                    key={`time-${time}-${index}`}
                    style={{
                        position: 'absolute',
                        top: '30px',
                        left: `${perc}%`,
                        height: '20px',
                        width: '1px',
                        borderLeft: '1px solid #ccc',
                    }}
                >
                    {index % 6 === 0 ? (
                        <div
                            style={{
                                position: 'absolute',
                                top: '20px',
                                borderLeft: '1px solid #ccc',
                                fontSize: '0.75em',
                            }}
                        >
                            {time}
                        </div>
                    ) : ''}
                </div>
            ))}
        </div>
    );
}

export default function WeekLine({ events }: WeelLineProps) {
    const maxDate = getMaxDate(events);
    const minDate = getMinDate(events, maxDate);
    const fullWidth = maxDate - minDate;

    return (
        <div>
            <Times min={minDate} max={maxDate} />
            {events.map((event) => (
                <RaceLine
                    key={event.uid}
                    event={event}
                    minDate={minDate}
                    fullWidth={fullWidth}
                />
            ))}
            <style jsx>{`
                width: 100%;
                border: 1px solid gray;
                position: relative;
                height: 50px;
            `}</style>
        </div>
    );
}
