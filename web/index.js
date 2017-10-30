const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const keep = require('keep')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static('static'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.post('/register', (req, res) => {
  const { email } = req.body
  keep.set('users', { email }).then(_ => res.end())
})

app.listen(5000, () => console.log('server ready'))
