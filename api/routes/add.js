const add = (req, res) => {
  const data = req.body.params

  const { table, store } = res.locals

  const tableRef = store.collection(table)

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

module.exports = add
