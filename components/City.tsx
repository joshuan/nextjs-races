import React  from 'react';
import { RaceDate } from './RaceDate';
import * as i18n from '../@types/i18n';
import { IEvent } from '../@types/types';

interface CityProps {
    name: string;
    events?: IEvent[];
    hoveredEventUid: string | null;
    onEventHover(eventUid: string): void;
    onEventLeave(): void;
}

export default function City({ name, events, hoveredEventUid, onEventHover, onEventLeave }: CityProps) {
    return (
        <>
            <tr>
                <td colSpan={5} className="city">
                    <h2 id={name}>
                        <a href={`#${name}`}>
                            {name}
                        </a>
                    </h2>
                </td>
            </tr>
            {events && events.map((item) => (
                <tr
                    key={item.uid}
                    onMouseEnter={() => onEventHover(item.uid)}
                    onMouseLeave={onEventLeave}
                    className={hoveredEventUid === item.uid ? 'race-tr-hover' : ''}
                >
                    <td className="race-category">{item.seriesName}</td>
                    <td className="race-name">{item.raceName}</td>
                    <td className="race-date">
                        <RaceDate {...item} />
                    </td>
                    <td>
                        {item.broadcasts.map((broadcast, index) => (
                            <div key={`${item.uid}-${index}`}>
                                <p className="broadcast">
                                    <a className="link" href={broadcast.link}>
                                        {i18n.Channels[broadcast.channel]}
                                    </a>
                                    {' '}
                                    <span className="race-type">{i18n.BroadcastWorld[broadcast.type]}</span>
                                </p>
                            </div>
                        ))}
                    </td>
                </tr>
            ))}
            <style jsx>{`
              .city {
                border-left: 0;
                border-right: 0;
              }
              
              .race-tr-hover td {
                background: #ffff00;
              }
              
              .race-type {
                color: #bbb;
              }

              .race-name {
                font-weight: bold;
              }

              .broadcast {
                margin: 0.2em 0;
              }
            `}</style>
        </>
    );
}
