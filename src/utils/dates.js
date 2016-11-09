import moment from 'moment';

const parseDateToMillis = (date) => {
  return (date != null ? new Date(date).getTime() : null);
};

const convertToUTCStartOfDay = (date) => {
  return (date != null ? moment(date).startOf('day').utc().valueOf() : null);
};

const convertToUTCEndOfDay = (date) => {
  return date != null ? moment(date).endOf('day').utc().valueOf() : null;
};

const convertDateFromMillis = (date) => {
  return (date != null ? new Date(date).toISOString() : null);
};

export default {
  parseDateToMillis,
  convertToUTCStartOfDay,
  convertToUTCEndOfDay,
  convertDateFromMillis
};
