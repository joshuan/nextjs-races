import React from "react";
import {RaceDate} from "./RaceDate";

function getCategory(category: string): string {
    return {
        f1: 'Формула 1',
        f2: 'Формула 2',
        f3: 'Формула 3',
    }[category] || 'Unknown category!';
}

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
                    <td className="race-category">{getCategory(item.category)}</td>
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
