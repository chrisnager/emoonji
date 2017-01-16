const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')
const MoonPhases = require('./moon-phases.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://emoji.firebaseio.com',
})

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const emoonjis = {
  "full moon": "🌕",
  "waning gibbous": "🌖",
  "last quarter": "🌗",
  "waning crescent": "🌘",
  "new moon": "🌑",
  "waxing crescent": "🌒",
  "first quarter": "🌓",
  "waxing gibbous": "🌔",
}

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const weekday = date.getDay()

function createText(text) {
  return ({
    text,
  })
}

function createAttachment(text, buttons) {
  return ({
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text,
        buttons,
      }
    }
  })
}

function createButton(block_name, title) {
  return ({
    type: "show_block",
    block_name,
    title,
  })
}

function createUrlButton(url, title) {
  return ({
    type: "web_url",
    url,
    title,
  })
}

function getTonightsMoon() {
  const phase = MoonPhases[year][month][day].phase

  return "Tonight's moon is a " + phase + ". " + emoonjis[phase]
}

function getThisWeeksMoons() {
  return "Sun Jan 15\n🌖 Waning gibbous\n\nMon Jan 16\n🌖 Waning gibbous\n\nTue Jan 17\n🌖 Waning gibbous\n\nWed Jan 18\n🌗 Last quarter\n\nThu Jan 19\n🌗 Last quarter\n\nFri Jan 20\n🌗 Last quarter\n\nSat Jan 21\n🌗 Last quarter"
}

function getThisMonthsMoons() {
  return "Thu Jan 5\n🌓 First quarter\n\nThu Jan 12\n🌝 Full moon!\n\nThu Jan 19\n🌗 Last quarter"
}

function getThisYearsMoons() {
  let yearString = year + "\n\n"

  Object.keys(MoonPhases[year]).forEach(
    monthNumber => {
      yearString += months[monthNumber - 1].slice(0, 3) + "\n"

      function checkForMajorPhases(specificDay) {
        const isMajorPhase = MoonPhases[year][monthNumber][specificDay].major || false

        return isMajorPhase
      }

      const majorPhases = Object.keys(MoonPhases[year][monthNumber]).filter(checkForMajorPhases)

      yearString += majorPhases.map(item => (yearString, emoonjis[MoonPhases[year][monthNumber][item].phase] + item + (monthNumber === majorPhases.length - 1 ? "" : "\n"))).join('')

      yearString += monthNumber === "12" ? "" : "\n"
    }
  )

  return yearString
}

const views = {
  welcome: [
    createText("Hi! I'm Emoonji."),
    createText("I can send you the latest phases of the moon."),
    createAttachment(
      "Would you like to know the phase of tonight's moon?",
      [
        createButton("tonight", "Yes, tonight's moon"),
        createButton("not-now", "Not now"),
        createButton("about", "More about Emoonji"),
      ]
    )
  ],
  default: [
    createAttachment(
      "I didn't understand that. Are you interested in knowing what tonight's moon is?",
      [
        createButton("tonight", "Tonight's moon"),
        createButton("not-now", "Not now"),
      ]
    )
  ],
  about: [
    createAttachment(
      "I'm based in Brooklyn, NY and all my moon data is in US/Eastern Time Zone time. I was created by Chris Nager and launched on his wife's 400th lunar monthiversary.",
      [
        createUrlButton("https://twitter.com/chrisnager", "Who?"),
        createButton("tonight", "Tonight's moon"),
        createButton("week", "This week's moons"),
      ]
    )
  ],
  notNow: [
    createAttachment(
      "Oh ok, I'm here whenever you want to know.",
      [
        createButton("tonight", "Tonight's moon"),
        createButton("week", "This week's moons"),
      ]
    )
  ],
  tonight: [
    createAttachment(
      getTonightsMoon(),
      [
        createButton("week", "This week's moons"),
        createButton("month", months[month - 1] + "'s phases"),
        createButton("year", year + " moon phases"),
      ]
    )
  ],
  week: [
    createAttachment(
      getThisWeeksMoons(),
      [
        createButton("tonight", "Tonight's moon"),
        createButton("month", months[month - 1] + "'s phases"),
        createButton("year", year + " moon phases"),
      ]
    )
  ],
  month: [
    createAttachment(
      getThisMonthsMoons(),
      [
        createButton("tonight", "Tonight's moon"),
        createButton("week", "This week's moons"),
        createButton("year", year + " moon phases"),
      ]
    )
  ],
  year: [
    createAttachment(
      getThisYearsMoons(),
      [
        createButton("tonight", "Tonight's moon"),
        createButton("week", "This week's moons"),
        createButton("month", months[month - 1] + "'s phases"),
      ]
    )
  ]
}

admin.database().ref('/').set({
  about: views.about,
  default: views.default,
  month: views.month,
  'not-now': views.notNow,
  tonight: views.tonight,
  week: views.week,
  welcome: views.welcome,
  year: views.year,
})
