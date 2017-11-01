const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const add = require('./routes/add')
const del = require('./routes/delete')
const find = require('./routes/find')
const get = require('./routes/get')
const update = require('./routes/update')

const app = express()

app.use(bodyParser.json())

const { table, store } = require('./middlewares')
app.use('/api', store)
app.use('/api', table)

// find != get
// let people pick their id
// get works only on id

app.post('/api', (req, res) => add(req, res))
app.delete('/api', (req, res) => del(req, res))

app.get('/api', (req, res) => {
  if (req.query.mode === 'find') find(req, res)
  else get(req, res)
})

app.patch('/api', (req, res) => update(req, res))

app.listen(3000, () => console.log('server ready'))

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})
