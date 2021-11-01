import React from 'react';
import { RaceDate } from './RaceDate';

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
                    <td className="race-category">{item.categoryName}</td>
                    <td className="race-name">{item.name}</td>
                    <td className="race-date">
                        <RaceDate {...item} />
                    </td>
                    <td>
                        {item.broadcasts.map((broadcast, index) => (
                            <div key={`${item.uid}-${index}`}>
                                <p className="broadcast">
                                    <a className="link" href={broadcast.link}>
                                        {broadcast.channel}
                                    </a>
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
