const express = require('express')

/* create a new express app */
const app = express()

/* add body parser middleware for json decoding */
const bodyParser = require('body-parser')
app.use(bodyParser.json())

/* add middlewares for common tasks */
const { table, store } = require('./middlewares')
app.use('/api', [store, table])

/* define routes */
const { add, del, find, get, update } = require('./routes')

app.post('/api', add)
app.patch('/api', update)
app.delete('/api', del)

/* get can mean either of get by key or find by param */
app.get('/api', (req, res) => {
  if (req.query.mode === 'find') find(req, res)
  else get(req, res)
})

/* start the server! */
app.listen(3000, () => console.log('server ready'))

/* catch unhandled errors */
process.on('unhandledRejection', err => console.log('unhandledRejection', err))
