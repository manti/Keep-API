const get = (req, res, db) => {
  const query = req.query
  delete query.mode

  const table = query._table
  delete query._table

  const key = query.key

  const appId = req.headers.keep_app_id
  const appStore = db.collection('data').doc(appId)

  const ref = appStore.collection(table).doc(key)

  ref.get().then(doc => {
    const data = doc.data()
    data.key = doc.id
    res.end(JSON.stringify(data))
  })
}

module.exports = get
