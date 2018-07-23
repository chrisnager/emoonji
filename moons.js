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
  let d = 0

  for (let i = +startOfWeek > +endOfWeek ? 1 : +startOfWeek; i <= +endOfWeek; i++) {
    const phase = MoonPhases[YEAR][MONTH][i].phase

    weekArray.push({
      title: `${weekdays[d]}, ${months[MONTH - 1]} ${i}`,
      subtitle: `${emoonjis[phase]} ${phase}`,
      buttons: [
        createButton(`tonight`, `Tonigh t's moon`),
        createButton(`month`, months[MONTH - 1] + `'s phases`),
        createButton(`year`, YEAR + ` moon phases`),
      ]
    })

    d++
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
  let yearArray = []

  for (let i = 1; i <= 12; i++) {
    function checkForMajorPhases(specificDay) {
      const isMajorPhase = MoonPhases[YEAR][i][specificDay].major || false
  
      return isMajorPhase
    }
  
    const majorPhases = Object.keys(MoonPhases[YEAR][i]).filter(checkForMajorPhases)
  
    const subtitle = majorPhases.map(item => {
      const d = new Date(`${YEAR}-${padLeft(i)}-${padLeft(item)}`)
      const phase = MoonPhases[YEAR][i][item].phase

      const majorMonthPhase = (
        emoonjis[phase]
        + ' '
        + item
        + ' - '
        + (phase === 'First quarter' ? 'First ¼' : phase === 'Last quarter' ? 'Last ¼' : phase)
        + (item === majorPhases.length - 1 ? '' : '\n')
      )
  
      return majorMonthPhase
    }).join('')

    yearArray.push({
      title: `${months[i - 1]} ${YEAR}`,
      subtitle,
      buttons: [
        createButton(`tonight`, `Tonight's moon`),
        createButton(`week`, `This week's moons`),
        createButton(`month`, months[MONTH - 1] + `'s phases`),
     ]
    })
  }

  return [yearArray.slice(0, 6), yearArray.slice(6, 12)]
}

exports.getTonightsMoon = getTonightsMoon
exports.getThisWeeksMoons = getThisWeeksMoons
exports.getThisMonthsMoons = getThisMonthsMoons
exports.getThisYearsMoons = getThisYearsMoons
