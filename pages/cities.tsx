import React from 'react';
import Link from 'next/link';
import { calendar as data } from '../lib/data';
import moment from '../lib/moment';
import * as i18n from '../@types/i18n';
import { IEvent, IServerCitiesGroup } from '../@types/types';

function CityDates({ list }: { list: IEvent[] }) {
    const times = list.map((item) => (new Date(item.startDate)).getTime());
    const min   = new Date(Math.min(...times));
    const max   = new Date(Math.max(...times));

    return <>{moment(min).format('L')} - {moment(max).format('L')}</>;
}

function actualizeDates(groups: IServerCitiesGroup[]) {
    return groups.map((group) => {
        const now = moment();
        const onThisWeek = moment(group.firstDate).isSame(now, 'week');
        const isPastWeek = !onThisWeek && moment(group.firstDate).isBefore(now);
        const isFeatureWeek = !onThisWeek && !isPastWeek;

        return {
            ...group,
            onThisWeek,
            isPastWeek,
            isFeatureWeek,
        };
    });
}

export default function CitiesPage() {
    const cities = actualizeDates(data);

    return (
        <div className="cities">
            <table cellSpacing={0}>
                <tbody>
                    {cities.map(({ onThisWeek, isPastWeek, isFeatureWeek, city, list }) => {
                        const tdClass = onThisWeek ? 'onThisWeek' : (
                            isPastWeek ? 'isPastWeek' : (
                                isFeatureWeek ? 'isFeatureWeek' : ''
                            )
                        );

                        return (
                            <tr key={city}>
                                <td className={tdClass}>
                                    <Link href={`/city/${encodeURIComponent(city)}`}>
                                        {i18n.Cities[city]}
                                    </Link>
                                    {onThisWeek ? ' 🏎 ' : ''}
                                </td>
                                <td className={tdClass}>
                                    <CityDates list={list}/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <style jsx>{`
                .cities {
                  width: 100%;
                  max-width: 340px;
                  margin: 0 auto;
                }
                .onThisWeek {
                  font-weight: bold;
                }
                .isPastWeek {
                  opacity: 0.5;
                }
            `}</style>
        </div>
    );
}
