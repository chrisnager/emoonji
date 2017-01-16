const admin = require('firebase-admin')
const serviceAccount = require('./service-account.json')
const {
  about,
  generic,
  monthView,
  notNow,
  tonight,
  week,
  welcome,
  yearView,
} = require('./blocks')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://emoji.firebaseio.com',
})

admin.database().ref('/').set({
  about,
  generic,
  month: monthView,
  'not-now': notNow,
  tonight,
  week,
  welcome,
  year: yearView,
})
