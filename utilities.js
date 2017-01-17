const date = new Date()
const YEAR = date.getFullYear()
const MONTH = date.getMonth() + 1
const DAY = date.getDate()
const WEEKDAY = date.getDay()

function padLeft(n) {
  return ('' + n).length > 1 ? ('' + n) : ('0' + n)
}

exports.YEAR = YEAR
exports.MONTH = MONTH
exports.DAY = DAY
exports.WEEKDAY = WEEKDAY
exports.padLeft = padLeft
