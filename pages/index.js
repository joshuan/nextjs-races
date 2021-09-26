const React = require('react');
const moment = require('moment');
const { useRouter } = require('next/router');

require('moment/locale/ru');

const rawData = require('../public/calendar.json');

if (typeof window !== 'undefined') {
    window.moment = moment
}

moment.locale('ru');

function getCategory(category) {
    return {
        f1: 'Формула 1',
        f2: 'Формула 2',
        f3: 'Формалу 3',
    }[category] || 'Unknown category!';
}

function RaceDate(item) {
    const startMoment = moment(item.startDate);
    const endMoment = moment(item.endDate);

    if (item.onThisWeek) {
        return (
            <div className={item.isEnded && 'ended'}>
                {startMoment.calendar()}
                <br />
                {endMoment.calendar()}
                <style jsx>{`               
                .ended {
                  color: #aaa;
                }
                `}</style>
            </div>
        );
    }

    return (
        <div className={item.isEnded && 'ended'}>
            {startMoment.format('L')} - {startMoment.format('dddd')}
            <br />
            {startMoment.format('LT')} - {endMoment.format('LT')}
            <style jsx>{`               
            .ended {
              color: #aaa;
            }
            `}</style>
        </div>
    );
}

function groupByCity(data) {
    const results = [];

    data.forEach((item) => {
        const index = results.findIndex((result) => result.city === item.city);

        if (index === -1) {
            results.push({ city: item.city, list: [ item ] });
        } else {
            results[index].list.push(item);
        }
    });

    return results;
}

function sortRawData(a, b) {
    return a.startDate > b.startDate ? 1 : -1;
}

const data = groupByCity(rawData.sort(sortRawData).map((item) => {
    item.onThisWeek = moment(item.startDate).isSame(new Date(), 'week');
    item.isEnded = moment(item.endDate).isBefore(new Date());

    return item;
}));

function AllCity() {
    return (
        <ul>
            {data.map(({ city }) => (
                <li key={city}><a href={`?city=${city}`}>{city}</a></li>
            ))}
        </ul>
    );
}

function City({ name, events }) {
    return (
        <>
            <tr>
                <td colSpan={5} className="city">
                    <h2 id={name}>
                        <a href={`#${name}`}>
                            {name}
                        </a>
                    </h2>
                </td>
            </tr>
            {events.map((item) => (
                <tr key={item.uid}>
                    <td className="race-category">{getCategory(item.category)}</td>
                    <td className="race-name">{item.name}</td>
                    <td className="race-date">
                        <RaceDate {...item} />
                    </td>
                    <td>
                        {item.broadcasts.map((broadcast, index) => (
                            <div key={index}>
                                <p className="broadcast">
                                    <a className="link" href={broadcast.link}>
                                        {broadcast.channel}
                                    </a>
                                </p>
                            </div>
                        ))}
                    </td>
                </tr>
            ))}
            <style jsx>{`               
                .city {
                  border-left: 0;
                  border-right: 0;
                }
                
                td {
                  padding: 5px;
                  border: 1px solid #ccc;
                }
        
                .race-name {
                  font-weight: bold;
                }
                
                .race-date {
                  
                }
                
                .broadcast {
                  margin: 0.2em 0;
                }
            `}</style>
        </>
    );
}

function Container({ children }) {
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Formula calendar
                </h1>

                {children}
            </main>

            <style jsx>{`
                .container {
                  min-height: 100vh;
                  padding: 0 0.5rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
        
                main {
                  padding: 2rem 0;
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
            `}</style>
        </div>
    );
}

export default function Home() {
    const router = useRouter()
    const currentCity = router.query.city;

    if (!currentCity) {
        return (
            <Container>
                <AllCity />
            </Container>
        );
    }

    return (
        <Container>
            <p>
                <a href="?">← Все гонки</a>
            </p>
            <table cellSpacing={0}>
                <tbody>
                    {data.filter(({ city }) => city === currentCity).map(({ city, list }) => (
                        <City key={city} name={city} events={list} />
                    ))}
                </tbody>
            </table>

            <style jsx>{`               
                .city {
                  border-left: 0;
                  border-right: 0;
                }
        
                a {
                  color: blue;
                  text-decoration: none;
                }
                
                a:hover {
                  text-decoration: underline;
                }
                
                table {
                  width: 100%;
                  max-width: 1300px;
                  border-collapse: collapse;
                }
            `}
            </style>
        </Container>
    )
}
