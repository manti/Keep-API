const { pullTable } = require('../helpers')

const find = (req, res, db) => {
  const query = req.query
  delete query.mode

  const table = pullTable(query)

  const appId = req.headers.keep_app_id
  const appStore = db.collection('data').doc(appId)

  let queryRef = appStore.collection(table)
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
