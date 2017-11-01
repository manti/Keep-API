const { pullTable } = require('../helpers')

const del = (req, res, db) => {
  const query = req.query

  const table = pullTable(query)

  const key = query.key

  const appId = req.headers.keep_app_id
  const appStore = db.collection('data').doc(appId)

  const ref = appStore.collection(table).doc(key)

  ref.delete().then(_ => res.send(true))
}

module.exports = del
