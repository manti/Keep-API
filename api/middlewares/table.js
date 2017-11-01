const pullTable = (req, res, next) => {
  let data
  if (['POST', 'PATCH'].includes(req.method)) data = req.body.params
  else data = req.query

  res.locals.table = data._table
  delete data._table
  next()
}

module.exports = pullTable
