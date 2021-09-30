import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from "../../lib/data";
import City from "../../components/City";
import WeekLine from '../../components/WeekLine';

function getEvents(city: string) {
    const found = data.find((item) => {
        // console.log('... find', { item: item.city }, { query: city });
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

    return (
        <>
            <p>
                <Link href="/cities">← Все гонки</Link>
            </p>
            <WeekLine events={events} />
            <table cellSpacing={0}>
                <tbody>
                    <City name={city} events={events} />
                </tbody>
            </table>
        </>
    );
}
