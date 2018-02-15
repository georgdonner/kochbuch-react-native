import moment from 'moment';
import 'moment/locale/de';

export default (date) => {
  moment.locale('de');
  if (moment(date).isSame(moment(), 'day')) {
    return 'Heute';
  } else if (moment(date).isSame(moment().add(1, 'd'), 'day')) {
    return 'Morgen';
  }
  return moment(date).format('dddd');
};
