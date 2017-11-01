const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')

const add = require('./routes/add')
const del = require('./routes/delete')
const find = require('./routes/find')
const get = require('./routes/get')
const update = require('./routes/update')

const config = require('./config/config.json')
admin.initializeApp({ credential: admin.credential.cert(config) })
const db = admin.firestore()

const app = express()

app.use(bodyParser.json())

// find != get
// let people pick their id
// get works only on id

app.post('/api', (req, res) => add(req, res, db))
app.delete('/api', (req, res) => del(req, res, db))

app.get('/api', (req, res) => {
  if (req.query.mode === 'find') find(req, res, db)
  else get(req, res, db)
})

app.patch('/api', (req, res) => update(req, res, db))

app.listen(3000, () => console.log('server ready'))

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})
