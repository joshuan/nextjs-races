const data = require('../data/calendar.json');

function getCategory(category) {
    return {
        f1: 'Формула 1',
        f2: 'Формула 2',
        f3: 'Формалу 3',
    }[category] || 'Unknown category!';
}

export default function Home() {
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Formula calendar
                </h1>

                <table cellSpacing={0}>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.uid}>
                                <td className="race-category">{getCategory(item.category)}</td>
                                <td className="race-city">{item.city}</td>
                                <td className="race-name">{item.name}</td>
                                <td className="race-date">
                                    {item.date} {item.startTime} - {item.endTime}
                                </td>
                                <td>
                                    {item.broadcasts.map((broadcast, index) => (
                                        <div key={index}>
                                            <p className="broadcast">
                                                <a href={broadcast.link}>
                                                    {broadcast.channel}
                                                </a>
                                            </p>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
        
        table {
          width: 100%;
          max-width: 1000px;
          border-collapse: collapse;
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
      `}</style>
        </div>
    )
}
