const moment = require('moment-timezone')
const MoonPhases = require('./moon-phases.json')
const {createButton} = require('./creation')
const {padLeft} = require('./utilities')
const {
  months,
  weekdays,
  emoonjis,
} = require('./constants')
const {
  YEAR,
  MONTH,
  DAY,
} = require('./utilities')

function getTonightsMoon() {
  const phase = MoonPhases[YEAR][MONTH][DAY].phase
  const message = MoonPhases[YEAR][MONTH][DAY].message

  return message || `Tonight's moon is a ${phase.toLowerCase()}. ${emoonjis[phase]}`
}

function getThisWeeksMoons() {
  const startOfWeek = moment().startOf('week').format('D')
  const endOfWeek = moment().endOf('week').format('D')
  let weekArray = []

  for (let i = +startOfWeek > +endOfWeek ? 1 : +startOfWeek; i <= +endOfWeek; i++) {
    const phase = MoonPhases[YEAR][MONTH][i].phase

    weekArray.push({
      title: `${moment(`${YEAR}-${MONTH}-${i}`).format('ddd MMM D')}`,
      subtitle: `${emoonjis[phase]} ${phase}`,
      buttons: [
        createButton(`tonight`, `Tonight's moon`),
        createButton(`month`, months[MONTH - 1] + `'s phases`),
        createButton(`year`, YEAR + ` moon phases`),
      ]
    })
  }

  return weekArray
}

function getThisMonthsMoons() {
  let monthString = months[MONTH - 1] + ' ' + YEAR + '\n\n'

  function checkForMajorPhases(specificDay) {
    const isMajorPhase = MoonPhases[YEAR][MONTH][specificDay].major || false

    return isMajorPhase
  }

  const majorPhases = Object.keys(MoonPhases[YEAR][MONTH]).filter(checkForMajorPhases)

  monthString += majorPhases.map(item => {
    const d = new Date(`${YEAR}-${padLeft(MONTH)}-${padLeft(item)}`)

    const majorMonthPhase = (
      weekdays[d.getDay() + 1 === 7 ? 0 : d.getDay() + 1].slice(0, 3)
      + ' '
      + months[MONTH - 1].slice(0, 3)
      + ' '
      + item
      + '\n'
      + emoonjis[MoonPhases[YEAR][MONTH][item].phase]
      + ' '
      + MoonPhases[YEAR][MONTH][item].phase
      + (MONTH === majorPhases.length - 1 ? '' : '\n\n')
    )

    return majorMonthPhase
  }).join('')

  return monthString
}

function getThisYearsMoons() {
  let yearString = YEAR + '\n\n'

  Object.keys(MoonPhases[YEAR]).forEach(
    monthNumber => {
      yearString += months[monthNumber - 1].slice(0, 3) + '\n'

      function checkForMajorPhases(specificDay) {
        const isMajorPhase = MoonPhases[YEAR][monthNumber][specificDay].major || false

        return isMajorPhase
      }

      const majorPhases = Object.keys(MoonPhases[YEAR][monthNumber]).filter(checkForMajorPhases)

      yearString += majorPhases.map(item => (emoonjis[MoonPhases[YEAR][monthNumber][item].phase] + item + (monthNumber === majorPhases.length - 1 ? '' : '\n'))).join('')

      yearString += monthNumber === '12' ? '' : '\n'
    }
  )

  return yearString
}

exports.getTonightsMoon = getTonightsMoon
exports.getThisWeeksMoons = getThisWeeksMoons
exports.getThisMonthsMoons = getThisMonthsMoons
exports.getThisYearsMoons = getThisYearsMoons
