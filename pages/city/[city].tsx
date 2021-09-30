import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from "../../lib/data";
import City from "../../components/City";

export default function CityPage() {
    const router = useRouter();
    const currentCity = router.query.city;

    return (
        <>
            <p>
                <Link href="/cities">← Все гонки</Link>
            </p>
            <table cellSpacing={0}>
                <tbody>
                    {data.filter(({ city }) => city === currentCity).map(({ city, list }) => (
                        <City key={city} name={city} events={list} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
