const randomNumber = length =>
  Math.random()
    .toString(36)
    .substring(length)

const init = (req, res) => {
  const { email } = req.body
  const { meta } = res.locals

  const appId = 'KEEP_APP_' + randomNumber(8).toUpperCase()

  meta
    .collection('secrets')
    .add({ email, appId })
    .then(doc => {
      const secret = doc.id
      res.send({ appId, secret })
    })
}

module.exports = init
