const post = (req, res, db) => {
  const data = req.body.params

  const table = data._table
  delete data._table

  const appId = req.headers.keep_app_id
  const appStore = db.collection('data').doc(appId)

  const tableRef = appStore.collection(table)

  if (data.key) {
    tableRef
      .doc(data.key)
      .set(data)
      .then(_ => res.send(JSON.stringify(data)))
  } else {
    tableRef.add(data).then(ref => {
      data.key = ref.id
      res.send(JSON.stringify(data))
    })
  }
}

module.exports = post