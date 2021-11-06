import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { calendar as data } from "../../lib/data";
import City from "../../components/City";
import WeekLine from '../../components/WeekLine';
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
    const city = Array.isArray(router.query.city) ? router.query.city[0] : router.query.city;
    const events = getEvents(city);
    const [hoveredEventUid, setHoveredEvent] = useState<string | null>(null);
    const eventHoverHandle = useCallback((eventUid: string) => {
        setHoveredEvent(eventUid);
    }, []);
    const eventLeaveHandle = useCallback(() => {
        setHoveredEvent(null);
    }, []);
    const firstEvent = events[0];

    useEffect(() => {
        if (firstEvent?.circuitLocation) {
            window.ymaps.ready(() => {
                window.circuitMap = new window.ymaps.Map('map', {
                    center: [ firstEvent.circuitLocation[0], firstEvent.circuitLocation[1] ],
                    zoom: 15,
                    type: 'yandex#satellite',
                });

                const circuitObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: [ firstEvent.circuitLocation[0], firstEvent.circuitLocation[1] ],
                    }
                });

                window.circuitMap.geoObjects.add(circuitObject);
            });
        }
    }, [firstEvent]);

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
                    <div id="map" style={{ width: '100%', height: '400px'}} />
                </>
            ) : ''}
        </>
    );
}
