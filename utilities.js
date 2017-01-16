const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const weekday = date.getDay()

function padLeft(n) {
  return ("" + n).length > 1 ? ("" + n) : ("0" + n)
}

exports.date = date
exports.year = year
exports.month = month
exports.day = day
exports.weekday = weekday
exports.padLeft = padLeft
