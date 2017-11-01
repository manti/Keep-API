const find = (req, res) => {
  const query = req.query
  delete query.mode

  const { table, store } = res.locals

  let queryRef = store.collection(table)
  Object.keys(query).map(key => {
    queryRef = queryRef.where(key, '==', query[key])
  })

  const data = []

  queryRef
    .get()
    .then(docs => {
      docs.forEach(doc => {
        const docData = doc.data()
        docData.key = doc.id
        data.push(docData)
      })
      res.send(JSON.stringify(data))
    })
    .catch(err => console.log('Error getting documents', err))
}

module.exports = find
