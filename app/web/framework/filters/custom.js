import moment from 'moment';
export default {
  formatTime(time, format) {
    return moment(time).format(format);
  }
}