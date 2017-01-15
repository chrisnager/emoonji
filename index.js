const admin = require("firebase-admin")
const serviceAccount = require('./service-account.json')
const data = require('./data.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://emoji.firebaseio.com"
});

var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

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
  "default": [
    createAttachment(
      "I didn't understand that. Are you interested in knowing what tonight's moon is?",
      [
        createButton("tonight", "Tonight's moon"),
        createButton("not-now", "Not now"),
      ]
    )
  ],
  "about": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "I'm based in Brooklyn, NY and all my moon data is in US/Eastern Time Zone time. I was created by Chris Nager and launched on his wife's 400th lunar monthiversary.",
          "buttons": [
            {
              "type": "web_url",
              "url": "https://twitter.com/chrisnager",
              "title": "Who?"
            },
            {
              "type": "show_block",
              "block_name": "tonight",
              "title": "Tonight's moon"
            },
            {
              "type": "show_block",
              "block_name": "week",
              "title": "This week's moon"
            }
          ]
        }
      }
    }
  ],
  "not-now": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Oh ok, I'm here whenever you want to know.",
          "buttons": [
            {
              "type": "show_block",
              "block_name": "tonight",
              "title": "Tonight's moon"
            },
            {
              "type": "show_block",
              "block_name": "week",
              "title": "This week's moons"
            }
          ]
        }
      }
    }
  ],
  "tonight": [
    createAttachment(
      "Tonight's moon is a " + data.phases[year][month][day].phase + ". " + data.phases[year][month][day].moon,
      [
        createButton("week", "This week's moon"),
        createButton("month", months[month - 1] + "'s phases"),
        createButton("year", year + " moon phases"),
      ]
    )
  ],
  "week": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Sun Jan 15\n🌖 Waning gibbous\n\nMon Jan 16\n🌖 Waning gibbous\n\nTue Jan 17\n🌖 Waning gibbous\n\nWed Jan 18\n🌗 Last quarter\n\nThu Jan 19\n🌗 Last quarter\n\nFri Jan 20\n🌗 Last quarter\n\nSat Jan 21\n🌗 Last quarter",
          "buttons": [
            {
              "type": "show_block",
              "block_name": "tonight",
              "title": "Tonight's moon"
            },
            {
              "type": "show_block",
              "block_name": "month",
              "title": "January's phases"
            },
            {
              "type": "show_block",
              "block_name": "year",
              "title": "2017 moon phases"
            }
          ]
        }
      }
    }
  ],
  "month": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Thu Jan 5\n🌓 First quarter\n\nThu Jan 12\n🌝 Full moon!\n\nThu Jan 19\n🌗 Last quarter",
          "buttons": [
            {
              "type": "show_block",
              "block_name": "tonight",
              "title": "Tonight's moon"
            },
            {
              "type": "show_block",
              "block_name": "week",
              "title": "This week's moons"
            },
            {
              "type": "show_block",
              "block_name": "year",
              "title": "2017 moon phases"
            }
          ]
        }
      }
    }
  ],
  "year": [
    {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Jan\n🌓5\n🌝12\n🌗19\n🌚27\n\nFeb\n🌓3\n🌝10\n🌗18\n🌚26\n\nMar\n🌓5\n🌝12\n🌗20\n🌚27\n\nApr\n🌓3\n🌝11\n🌗19\n🌚26\n\nMay\n🌓2\n🌝10\n🌗18\n🌚25\n\nJun\n🌓1\n🌝9\n🌗17\n🌚23\n🌓30\n\nJul\n🌝9\n🌗16\n🌚23\n🌓30\n\nAug\n🌝7\n🌗14\n🌚21\n🌓29\n\nSep\n🌝6\n🌗13\n🌚20\n🌓27\n\nOct\n🌝5\n🌗12\n🌚19\n🌓27\n\nNov\n🌝4\n🌗10\n🌚18\n🌓26\n\nDec\n🌝3\n🌗10\n🌚18\n🌓26",
          "buttons": [
            {
              "type": "show_block",
              "block_name": "tonight",
              "title": "Tonight's moon"
            },
            {
              "type": "show_block",
              "block_name": "week",
              "title": "This week's moons"
            },
            {
              "type": "show_block",
              "block_name": "month",
              "title": "January's phases"
            }
          ]
        }
      }
    }
  ]
}

console.log(date, year, month, day, views)


admin.database().ref('/').set({
  'about': data['about'],
  'default': views.default,
  'month': data['month'],
  'not-now': data['not-now'],
  'phases': data['phases'],
  'tonight': views['tonight'],
  'week': data['week'],
  'welcome': views.welcome,
  'year': data['year'],
})
