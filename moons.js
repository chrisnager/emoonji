const moment = require('moment-timezone')
const MoonPhases = require('./moon-phases.json')
const {padLeft} = require('./utilities')
const {
  months,
  weekdays,
  emoonjis,
} = require('./constants')
const {
  date,
  year,
  month,
  day,
  weekday,
} = require('./utilities')

function getTonightsMoon() {
  const phase = MoonPhases[year][month][day].phase.toLowerCase()
  const message = MoonPhases[year][month][day].message

  return message || `Tonight's moon is a ${phase}. ${emoonjis[phase]}`
}

function getThisWeeksMoons() {
  const startOfWeek = moment().startOf('week').format('D')
  const endOfWeek = moment().endOf('week').format('D')
  let weekString = ''

  for (let i = +startOfWeek; i <= endOfWeek; i++) {
    const phase = MoonPhases[year][month][i].phase

    weekString += `${moment(`${year}-${month}-${i}`).format('ddd MMM D')}\n${emoonjis[phase]} ${phase}\n\n`
  }

  return weekString
}

function getThisMonthsMoons() {
  let monthString = months[month - 1] + ' ' + year + '\n\n'

  function checkForMajorPhases(specificDay) {
    const isMajorPhase = MoonPhases[year][month][specificDay].major || false

    return isMajorPhase
  }

  const majorPhases = Object.keys(MoonPhases[year][month]).filter(checkForMajorPhases)

  monthString += majorPhases.map(item => {
    const d = new Date(`${year}-${padLeft(month)}-${padLeft(item)}`)

    const majorMonthPhase = (
      weekdays[d.getDay() + 1].slice(0, 3)
      + ' '
      + months[month - 1].slice(0, 3)
      + ' '
      + item
      + '\n'
      + emoonjis[MoonPhases[year][month][item].phase]
      + ' '
      + MoonPhases[year][month][item].phase
      + (month === majorPhases.length - 1 ? '' : '\n\n')
    )

    return majorMonthPhase
  }).join('')

  return monthString
}

function getThisYearsMoons() {
  let yearString = year + '\n\n'

  Object.keys(MoonPhases[year]).forEach(
    monthNumber => {
      yearString += months[monthNumber - 1].slice(0, 3) + '\n'

      function checkForMajorPhases(specificDay) {
        const isMajorPhase = MoonPhases[year][monthNumber][specificDay].major || false

        return isMajorPhase
      }

      const majorPhases = Object.keys(MoonPhases[year][monthNumber]).filter(checkForMajorPhases)

      yearString += majorPhases.map(item => (emoonjis[MoonPhases[year][monthNumber][item].phase] + item + (monthNumber === majorPhases.length - 1 ? '' : '\n'))).join('')

      yearString += monthNumber === '12' ? '' : '\n'
    }
  )

  return yearString
}

exports.getTonightsMoon = getTonightsMoon
exports.getThisWeeksMoons = getThisWeeksMoons
exports.getThisMonthsMoons = getThisMonthsMoons
exports.getThisYearsMoons = getThisYearsMoons
