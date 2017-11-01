const all = (req, res) => {
  const { table, store } = res.locals

  const ref = store.collection(table)

  let allData = []

  ref.get().then(docs => {
    docs.forEach(doc => {
      const data = doc.data()
      data.key = doc.id
      allData.push(data)
    })

    allData = allData.sort((a, b) => a.key > b.key)
    res.end(JSON.stringify(allData))
  })
}

module.exports = all
