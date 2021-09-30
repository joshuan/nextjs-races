import moment from 'moment';
import 'moment/locale/ru';

if (typeof window !== 'undefined') {
    window.moment = moment
}

moment.locale('ru');

export default moment;
