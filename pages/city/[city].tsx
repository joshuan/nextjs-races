import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { calendar as data } from "../../lib/data";
import City from "../../components/City";
import WeekLine from '../../components/WeekLine';
import Map from '../../components/Map';
import * as i18n from '../../@types/i18n';

function getEvents(city: string) {
    const found = data.find((item) => {
        return item.city === city
    });

    if (!found) {
        return [];
    }

    return found.list;
}

export default function CityPage() {
    const router = useRouter();
    const city = (Array.isArray(router.query.city) ? router.query.city[0] : router.query.city || 'unknown');
    const events = getEvents(city);
    const [hoveredEventUid, setHoveredEvent] = useState<string | null>(null);
    const eventHoverHandle = useCallback((eventUid: string) => {
        setHoveredEvent(eventUid);
    }, []);
    const eventLeaveHandle = useCallback(() => {
        setHoveredEvent(null);
    }, []);
    const firstEvent = events[0];

    return (
        <>
            <p>
                <Link href="/cities">← Все гонки</Link>
            </p>
            <WeekLine
                events={events}
                hoveredEventUid={hoveredEventUid}
                onEventHover={eventHoverHandle}
                onEventLeave={eventLeaveHandle}
            />
            <table cellSpacing={0} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                <tbody>
                    <City
                        name={i18n.Cities[city]}
                        events={events}
                        hoveredEventUid={hoveredEventUid}
                        onEventHover={eventHoverHandle}
                        onEventLeave={eventLeaveHandle}
                    />
                </tbody>
            </table>
            <hr />
            {firstEvent ? (
                <>
                    <h2>{firstEvent.weekName}</h2>
                    <h3>{firstEvent.circuitName} - {firstEvent.locationName}</h3>
                    <p><a href={firstEvent.wiki}>Отчет о гонке</a></p>
                    <Map
                        lat={firstEvent.circuitLocation[0]}
                        lon={firstEvent.circuitLocation[1]}
                    />
                </>
            ) : ''}
        </>
    );
}
