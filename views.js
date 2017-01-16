const {
  months,
  weekdays,
  emoonjis,
} = require('./constants')
const {
  createText,
  createAttachment,
  createButton,
  createUrlButton,
} = require('./creation')
const {
  getTonightsMoon,
  getThisWeeksMoons,
  getThisMonthsMoons,
  getThisYearsMoons,
} = require('./moons')
const {
  date,
  year,
  month,
  day,
  weekday,
} = require('./utilities')

const welcome = [
  createText('Hi! I\'m Emoonji.'),
  createText('I can send you the latest phases of the moon.'),
  createAttachment(
    'Would you like to know the phase of tonight\'s moon?',
    [
      createButton('tonight', 'Yes, tonight\'s moon'),
      createButton('not-now', 'Not now'),
      createButton('about', 'More about Emoonji'),
    ]
  )
]

const generic = [
  createAttachment(
    'I didn\'t understand that. Are you interested in knowing what tonight\'s moon is?',
    [
      createButton('tonight', 'Tonight\'s moon'),
      createButton('not-now', 'Not now'),
    ]
  )
]

const about = [
  createAttachment(
    'I\'m based in Brooklyn, NY and all my moon data is in US/Eastern Time Zone time. I was created by Chris Nager and launched on his wife\'s 400th lunar monthiversary.',
    [
      createUrlButton('https://twitter.com/chrisnager', 'Who?'),
      createButton('tonight', 'Tonight\'s moon'),
      createButton('week', 'This week\'s moons'),
    ]
  )
]

const notNow = [
  createAttachment(
    'Oh ok, I\'m here whenever you want to know.',
    [
      createButton('tonight', 'Tonight\'s moon'),
      createButton('week', 'This week\'s moons'),
    ]
  )
]

const tonight = [
  createAttachment(
    getTonightsMoon(),
    [
      createButton('week', 'This week\'s moons'),
      createButton('month', months[month - 1] + '\'s phases'),
      createButton('year', year + ' moon phases'),
    ]
  )
]

const week = [
  createAttachment(
    getThisWeeksMoons(),
    [
      createButton('tonight', 'Tonight\'s moon'),
      createButton('month', months[month - 1] + '\'s phases'),
      createButton('year', year + ' moon phases'),
    ]
  )
]

const monthView = [
  createAttachment(
    getThisMonthsMoons(),
    [
      createButton('tonight', 'Tonight\'s moon'),
      createButton('week', 'This week\'s moons'),
      createButton('year', year + ' moon phases'),
    ]
  )
]

const yearView = [
  createAttachment(
    getThisYearsMoons(),
    [
      createButton('tonight', 'Tonight\'s moon'),
      createButton('week', 'This week\'s moons'),
      createButton('month', months[month - 1] + '\'s phases'),
    ]
  )
]

exports.welcome = welcome
exports.generic = generic
exports.about = about
exports.notNow = notNow
exports.tonight = tonight
exports.week = week
exports.monthView = monthView
exports.yearView = yearView
