import * as React from 'react';
import { IEvent } from '../../@types/types';
import styles from './RaceLine.module.css';

interface RaceLineProps {
    event: IEvent;
    minTime: number;
    fullWidth: number;
    hovered: boolean;
    onRaceHover(eventUid: string): void;
    onRaceLeave(): void;
}

export function RaceLine({ event, minTime, fullWidth, hovered, onRaceHover, onRaceLeave }: RaceLineProps) {
    const width = event.endDate.getTime() - event.startDate.getTime();
    const left = event.startDate.getTime() - minTime;

    return (
        <div
            className={`${styles.raceLine} ${hovered ? styles.raceLineHover : ''}`}
            title={`${event.seriesName} - ${event.raceName}`}
            onMouseEnter={() => onRaceHover(event.uid)}
            onMouseLeave={onRaceLeave}
        >
            <style jsx>{`
                width:${(width / fullWidth) * 100}%;
                left: ${(left / fullWidth) * 100}%;
            `}</style>
        </div>
    );
}
