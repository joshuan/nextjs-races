import {TBroadcastWorld, TChannels, TCities, TRaces, TSeries} from './fields';

export const BroadcastWorld: Record<TBroadcastWorld, string> = {
    online: 'В прямом эфире',
    offline: 'Без трансляции',
    record: 'В записи',
}

export const Series: Record<TSeries, string> = {
    f1: 'Формула 1',
    f2: 'Формула 2',
    f3: 'Формула 3',
}

export const Channels: Record<TChannels, string> = {
    sportbox: 'Sportbox',
    matchtv: 'Матч ТВ',
    youtube: 'Youtube'
}

export const Cities: Record<TCities, string> = {
    monza: 'Монца',
    sochi: 'Сочи',
    turkey: 'Турция',
    america: 'Америка',
    mexico: 'Мехико',
    brazil: 'Бразилия',
    saudi: 'Джидда',
    abudabi: 'Абу-Даби',
    qatar: 'Катар',
}

export const Races: Record<TRaces, string> = {
    p: 'Практика',
    p1: 'Первая серия свободных заездов',
    p2: 'Вторая серия свободных заездов',
    p3: 'Третья серия свободных заездов',
    q: 'Квалификация',
    sprint: 'Спринт-квалификация',
    grandprix: 'Гран-при',
    race1: 'Первая гонка',
    race2: 'Вторая гонка',
    race3: 'Третья гонка',
}
