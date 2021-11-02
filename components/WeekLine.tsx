import React, { useCallback } from 'react';
import { IEvent } from '../@types/types';

import { Times } from './TImes';
import { RaceLine } from './RaceLine';

interface WeekLineProps {
    events: IEvent[];
    hoveredEventUid: null | string;
    onEventHover(eventUid: string): void;
    onEventLeave(): void;
}

function getMinDate(events: IEvent[], maxDate: number = Date.now()): number {
    const time = events.reduce<number>((min, event) => {
        return Math.min(min, event.startDate.getTime());
    }, maxDate);

    const date = new Date(time);

    date.setHours(6);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

function getMaxDate(events: IEvent[]): number {
    const time = events.reduce<number>((max, event) => {
        return Math.max(max, event.endDate.getTime());
    }, 0);

    const date = new Date(time);

    date.setHours(23);
    date.setMinutes(0);
    date.setSeconds(0);

    return date.getTime();
}

export default function WeekLine({ events, hoveredEventUid, onEventHover, onEventLeave }: WeekLineProps) {
    const maxDate = getMaxDate(events);
    const minDate = getMinDate(events, maxDate);
    const fullWidth = maxDate - minDate;
    const now = new Date().getTime();

    const onRaceHover = useCallback((eventUid) => {
        onEventHover(eventUid);
    }, [onEventHover]);

    const onRaceLeave = useCallback(() => {
        onEventLeave();
    }, [onEventLeave]);

    return (
        <div style={{
            width: '100%',
            border: '1px solid gray',
            height: '50px',
            position: 'sticky',
            top: 0,
            left: 0,
            background: 'white',
        }}>
            <Times min={minDate} max={maxDate} />
            {events.map((event) => (
                <RaceLine
                    key={event.uid}
                    event={event}
                    minTime={minDate}
                    fullWidth={fullWidth}
                    hovered={hoveredEventUid === event.uid}
                    onRaceHover={onRaceHover}
                    onRaceLeave={onRaceLeave}
                />
            ))}
            {now >= minDate && now <= maxDate ? (
                <div
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        left: `${((now - minDate) / (maxDate - minDate)) * 100}%`,
                        height: '80px',
                        width: '1px',
                        borderLeft: '1px solid #ff0000',
                    }}
                />
            ) : ''}
        </div>
    );
}
