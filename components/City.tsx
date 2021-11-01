import React from 'react';
import { RaceDate } from './RaceDate';
import * as i18n from '../@types/i18n';

export default function City({ name, events }: { name: string; events?: any[] }) {
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
                <tr key={item.uid}>
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
              
              .race-type {
                color: #bbb;
              }

              .race-name {
                font-weight: bold;
              }

              .race-date {

              }

              .broadcast {
                margin: 0.2em 0;
              }
            `}</style>
        </>
    );
}
