import * as React from 'react';
import Link from 'next/link';
import { YearRace } from '../../@types/year-database';
import { getRaces } from '../lib/races';
import moment from '../lib/moment';
import * as i18n from '../../@types/i18n';
import { IEvent, IServerCitiesGroup } from '../../@types/types';

function RaceDates({ list }: { list: { datetime: string; }[] }) {
    console.log('... list', list);
    const times = list.map((item) => (new Date(item.datetime)).getTime());
    console.log('... times', times);
    const min   = new Date(Math.min(...times));
    console.log('... min', min);
    const max   = new Date(Math.max(...times));
    console.log('... max', max);

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

function isOnThisWeek(race: YearRace): boolean {
    return moment(race.datetime).isSame(moment(), 'week');
}

function isOnPast(race: YearRace): boolean {
    return moment(race.datetime).isBefore(moment());
}

function isOnFeature(race: YearRace): boolean {
    return moment(race.datetime).isAfter(moment());
}

export default function CitiesPage() {
    const races = getRaces('f1');

    return (
        <div className="cities">
            <table cellSpacing={0}>
                <tbody>
                    {races.slice(0, 1).map((race) => {
                        const onThisWeek = isOnThisWeek(race);
                        const onPastWeek = !onThisWeek && isOnPast(race);
                        const onFeatureWeek = !onThisWeek && !onPastWeek && isOnFeature(race);

                        const tdClass = onThisWeek ? 'onThisWeek' : (
                            onPastWeek ? 'isPastWeek' : (
                                onFeatureWeek ? 'isFeatureWeek' : ''
                            )
                        );

                        return (
                            <tr key={race.round}>
                                <td className={tdClass}>
                                    <Link href={`/round/${race.round}`}>
                                        {race.name}
                                    </Link>
                                    {onThisWeek ? ' 🏎 ' : ''}
                                </td>
                                <td className={tdClass}>
                                    <RaceDates list={race.races}/>
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
