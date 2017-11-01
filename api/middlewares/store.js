const admin = require('firebase-admin')

const config = require('../config/config.json')
admin.initializeApp({ credential: admin.credential.cert(config) })
const db = admin.firestore()

const getStore = (req, res, next) => {
  const appId = req.headers.keep_app_id
  const store = db.collection('data').doc(appId)
  res.locals.store = store
  next()
}

module.exports = getStore
