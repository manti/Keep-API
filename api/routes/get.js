const get = (req, res) => {
  const query = req.query
  delete query.mode

  const { table, store } = res.locals

  const key = query.key

  const ref = store.collection(table).doc(key)

  ref.get().then(doc => {
    const data = doc.data()
    data.key = doc.id
    res.end(JSON.stringify(data))
  })
}

module.exports = get
