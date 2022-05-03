import * as React from 'react';

const HOUR = 1000 * 60 * 60;

function pad(x: number) {
    return x < 10 ? `0${x}` : `${x}`;
}

function getTimeString(time: number) {
    const d = new Date(time);

    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface TimesProps {
    min: number;
    max: number;
}

export function Times({ min, max }: TimesProps) {
    const list = [];
    let i = min;
    const maxDiff = max - min;
    let j = 0;

    while (i < max) {
        list.push({
            perc: ((i - min) / maxDiff) * 100,
            time: getTimeString(i),
            index: j,
        });
        j++;
        i += HOUR;
    }

    return (
        <>
            {list.map(({ perc, time, index }) => (
                <div
                    key={`time-${time}-${index}`}
                    style={{
                        position: 'absolute',
                        top: '30px',
                        left: `${perc}%`,
                        height: '20px',
                        width: '1px',
                        borderLeft: '1px solid #ccc',
                    }}
                >
                    {index % 6 === 0 ? (
                        <div
                            style={{
                                position: 'absolute',
                                top: '20px',
                                borderLeft: '1px solid #ccc',
                                fontSize: '0.75em',
                            }}
                        >
                            {time}
                        </div>
                    ) : ''}
                </div>
            ))}
        </>
    );
}
