const del = (req, res) => {
  const query = req.query

  const { table, store } = res.locals

  const key = query.key

  const ref = store.collection(table).doc(key)

  ref.delete().then(_ => res.send(true))
}

module.exports = del
