import Link from 'next/link';
import * as React from 'react';
import { useRouter } from 'next/router';
import { YearRace } from '../../../@types/year-database';
import moment from '../../lib/moment';
import { getRaces } from '../../lib/races';

function RaceDates({ list }: { list: { datetime: string; }[] }) {
    const times = list.map((item) => (new Date(item.datetime)).getTime());
    const min   = new Date(Math.min(...times));
    const max   = new Date(Math.max(...times));

    return <>{moment(min).format('L')} - {moment(max).format('L')}</>;
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

export default function Year() {
    const router = useRouter();
    const year = parseInt((Array.isArray(router.query.year) ? router.query.year[0] : router.query.year || '0'), 10);
    const races = getRaces('f1', year);
    console.log('... races', races);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>{year}</h2>

            <div className="races">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th style={{ width: '50em' }}>Name</th>
                            <th style={{ width: '30em' }}>Dates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {races.map((race) => {
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
                                        <Link href={`/${year}/${race.round}`}>
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
                    .races {
                      width: 100%;
                      max-width: 500px;
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
        </div>
    );
}
