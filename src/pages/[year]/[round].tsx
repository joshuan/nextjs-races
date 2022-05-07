import moment from 'moment';
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TBroadcastWorld, TRaceNames, TRaces } from '../../../@types/fields';
import { Races, Series } from '../../../@types/i18n';
import { ILink } from '../../../@types/link';
import { IEvent, IEventBroadcast } from '../../../@types/types';
import { YearRace } from '../../../@types/year-database';
import City from '../../components/City';
import WeekLine from '../../components/WeekLine';
import { getRoundLinks } from '../../lib/links';
import { getRace } from '../../lib/races';

const raceMap: Record<TRaces, TRaceNames | undefined> = {
    fp1: 'FirstPractice',
    fp2: 'SecondPractice',
    fp3: 'ThirdPractice',
    grandprix: 'GrandPrix',
    p: undefined,
    quali: 'Qualifying',
    race: undefined,
    race1: undefined,
    race2: undefined,
    race3: undefined,
    sprint: 'Sprint',
};

function getEvents(race: YearRace, links: ILink[]) {
    console.log('... links', links);
    return race.races.map<IEvent>((item, index) => {
        const startDate = moment(item.datetime);
        const endDate = startDate.clone().add(moment.duration(item.race === 'grandprix' ? 'PT2H' : 'PT1H'));

        const broadcasts = links
            .filter((link) => link.race === raceMap[item.race])
            .map((link) => ({
                link: link.link,
                channel: link.channel,
                type: 'online',
            } as IEventBroadcast));

        return {
            uid: `race-${index}`,
            cityName: race.circuit.name,
            seriesName: Series[race.series],
            raceName: Races[item.race] || item.race,
            broadcasts,

            startDate: startDate.toDate(),
            endDate: endDate.toDate(),

            round: race.round,
            series: 'f1',
            race: item.race,
            city: 'australia',
        };
    });
}

export default function RoundPage() {
    const router = useRouter();
    const year = parseInt((Array.isArray(router.query.year) ? router.query.year[0] : router.query.year || '0'), 10);
    const round = parseInt((Array.isArray(router.query.round) ? router.query.round[0] : router.query.round || '0'), 10);

    if (!round) {
        return <p>Undefined round id</p>;
    }

    const race = getRace('f1', year, round);

    if (!race) {
        return <p>Unknown round by id {round}</p>;
    }

    const links = getRoundLinks('f1', year, round);
    const events = getEvents(race, links);

    const [hoveredEventUid, setHoveredEvent] = React.useState<string | null>(null);
    const eventHoverHandle = React.useCallback((eventUid: string) => {
        setHoveredEvent(eventUid);
    }, []);
    const eventLeaveHandle = React.useCallback(() => {
        setHoveredEvent(null);
    }, []);

    return (
        <>
            <p>
                <Link href={`/${year}`}>← Все гонки</Link>
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
                        name={race.name}
                        events={events}
                        hoveredEventUid={hoveredEventUid}
                        onEventHover={eventHoverHandle}
                        onEventLeave={eventLeaveHandle}
                    />
                </tbody>
            </table>
            <hr />
            <p><a href={race.url}>Отчет о гонке</a></p>
            <p>
                <Link href={`/circuit/${race.circuit.circuitId}`}>
                    {race.circuit.name}
                </Link> ({race.circuit.location}, {race.circuit.country})
            </p>
        </>
    );
}
