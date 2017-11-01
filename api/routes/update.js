const get = require('./get')

const update = (req, res) => {
  const data = req.body.params

  const { table, store } = res.locals

  const key = data.key

  const ref = store.collection(table).doc(key)

  ref.update(data).then(_ => {
    ref.get().then(doc => {
      const data = doc.data()
      res.send(JSON.stringify(data))
    })
  })
}

module.exports = update
