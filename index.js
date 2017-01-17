const {CronJob} = require('cron')
const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')
const {
  about,
  generic,
  month,
  notNow,
  tonight,
  week,
  welcome,
  year,
} = require('./blocks')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://emoji.firebaseio.com',
})

new CronJob('0 0 0 * * *', () => {
  admin.database().ref('/').set({
    about,
    generic,
    month,
    'not-now': notNow,
    tonight,
    week,
    welcome,
    year,
  })

  console.log('\x1b[36m', `🌝  Database updated on ${new Date()}.`, '\x1b[0m')
}, null, true, 'America/New_York')
