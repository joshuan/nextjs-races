import React from 'react';
import Link from 'next/link';
import cities from '../lib/data';
import moment from '../lib/moment';
import * as i18n from '../@types/i18n';

function CityDates({ list }: { list: IServerEvents[] }) {
    const times = list.map((item) => (new Date(item.startDate)).getTime());
    const min   = new Date(Math.min(...times));
    const max   = new Date(Math.max(...times));

    return `${moment(min).format('L')} - ${moment(max).format('L')}`;
}

function isNow(list) {
    return list.filter((item) => item.onThisWeek).length > 0;
}

export default function CitiesPage() {
    return (
        <table cellSpacing={0}>
            {cities.map(({ city, list }) => (
                <tr key={city}>
                    <td>
                        <Link href={`/city/${encodeURIComponent(city)}`}>
                            {i18n.Cities[city]}
                        </Link>
                    </td>
                    <td>
                        <CityDates list={list}/>
                    </td>
                    <td>
                        {isNow(list) ? 'NOW!' : ''}
                    </td>
                </tr>
            ))}
        </table>
    );
}
