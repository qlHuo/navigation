const moment = require('moment');

const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(time).format(format)
}

module.exports = formatTime;