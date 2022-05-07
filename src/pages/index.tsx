import Link from 'next/link';
import * as React from 'react';

function getYears() {
    const years = [];
    const firstYear = 2021;
    const currentYear = (new Date()).getFullYear();

    for (let i = currentYear; i >= firstYear ; i-- ) {
        years.push({ year: i, current: i === currentYear });
    }

    return years;
}

export default function Home() {
    const years = getYears();

    return (
        <div>
            <ul style={{ fontSize: '2em' }}>
                {years.map(({ year, current }) => (
                    <li key={year}>
                        <Link href={`/${year}`}>
                            <a>
                                {year}
                                {current ? ' 🏎 ' : ''}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <hr />
            <h2>iCal календари:</h2>
            <ul>
                <li><a href="/calendar.ics">Календарь гонок</a></li>
                <li><a href="/calendar-broadcast.ics">Календарь всех трансляций</a></li>
            </ul>
        </div>
    )
}
