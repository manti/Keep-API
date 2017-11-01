const pullTable = data => {
  const table = data._table
  delete data._table
  return table
}

module.exports = pullTable
