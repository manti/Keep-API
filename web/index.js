const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.use('/static', express.static('static'))

app.listen(5000, () => console.log('server ready'))
