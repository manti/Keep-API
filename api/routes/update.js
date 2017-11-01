const { pullTable } = require('../helpers')

const get = require('./get')

const update = (req, res, db) => {
  const data = req.body.params

  const table = pullTable(data)

  const key = data.key

  const appId = req.headers.keep_app_id
  const appStore = db.collection('data').doc(appId)

  const ref = appStore.collection(table).doc(key)

  ref.update(data).then(_ => {
    ref.get().then(doc => {
      const data = doc.data()
      res.send(JSON.stringify(data))
    })
  })
}

module.exports = update
