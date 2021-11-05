import React from 'react';
import CitiesPage from './cities';
import { channels } from '../lib/data';

export default function Home() {
    return (
        <div>
            <CitiesPage />
            <hr />
            <h2>iCal calendar:</h2>
            <ul>
                <li><a href="/calendar.ics">Календарь гонок</a></li>
                <li><a href="/calendar-broadcast.ics">Календарь всех трансляций</a></li>
                {channels.map(({ channel, channelName }) => (
                    <li key={channel}>
                        <a href={`/calendar-broadcast-${channel}.ics`}>
                            Календарь трансляций канала "{channelName}"
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
