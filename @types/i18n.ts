import { TBroadcastWorld, TChannels, TCities, TRaces, TSeries } from './fields';

export const BroadcastWorld: Record<TBroadcastWorld, string> = {
    online: 'Прямой эфир',
    offline: 'Без трансляции',
    record: 'Запись',
};

export const Series: Record<TSeries, string> = {
    f1: 'Формула 1',
    f2: 'Формула 2',
    f3: 'Формула 3',
};

export const SeriesShort: Record<TSeries, string> = {
    f1: 'Ф1',
    f2: 'Ф2',
    f3: 'Ф3',
};

export const Channels: Record<TChannels, string> = {
    sportbox: 'Sportbox',
    beonedge: 'Be on edge',
    matchtv: 'Матч ТВ',
    youtube: 'Youtube'
};

export const Cities: Record<TCities, string> = {
    BAK: 'Баку',
    hungaroring: 'Хунгароринг',
    interlagos: 'Интерлагос',
    marina_bay: 'MARINA_BAY',
    monaco: 'Монако',
    red_bull_ring: 'RED_BULL_RING',
    ricard: 'RICARD',
    silverstone: 'SILVERSTONE',
    spa: 'Спа',
    suzuka: 'Сузука',
    villeneuve: 'VILLENEUVE',
    zandvoort: 'Зандворд',
    imola: 'Имола',
    monza: 'Монца',
    sochi: 'Сочи',
    turkey: 'Турция',
    americas: 'Америка',
    rodriguez: 'Мехико',
    brazil: 'Бразилия',
    saudi: 'Джидда',
    yas_marina: 'Абу-Даби',
    bahrain: 'Бахрейн',
    qatar: 'Катар',
    australia: 'Мельбурн',
    catalunya: 'Барселона',
    miami: 'Майами',
    albert_park: 'Мельбурн',
    jeddah: 'Джидда',
};

export const Races: Record<TRaces, string> = {
    p: 'Практика',
    fp1: 'Первая серия свободных заездов',
    fp2: 'Вторая серия свободных заездов',
    fp3: 'Третья серия свободных заездов',
    quali: 'Квалификация',
    sprint: 'Спринт-квалификация',
    grandprix: 'Гран-при',
    race: 'Гран-при',
    race1: 'Первая гонка',
    race2: 'Вторая гонка',
    race3: 'Третья гонка',
};
