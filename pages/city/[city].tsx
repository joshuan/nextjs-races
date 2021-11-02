import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from "../../lib/data";
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
            <table cellSpacing={0}>
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
        </>
    );
}
