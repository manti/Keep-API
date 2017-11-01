const axios = require('axios')
require('dotenv').config()

const url = 'http://localhost:3000/api'
const { KEEP_APP_ID, KEEP_APP_TOKEN } = process.env

if (!KEEP_APP_ID || !KEEP_APP_TOKEN)
  console.log(`
    Error! keep config not found.

    Learn how to set up keep for your application: https://getkeep.store/docs/setup
`)

const headers = { KEEP_APP_ID, KEEP_APP_TOKEN }

const send = (action, table, data) => {
  const params = Object.assign({}, data, { _table: table })
  return new Promise((resolve, reject) => {
    action(url, { params, headers }, { headers })
      .then(response => resolve(response.data))
      .catch(error => reject(error.message))
  })
}

const add = (table, data) => send(axios.post, table, data)
const get = (table, key) => send(axios.get, table, { key, mode: 'get' })
const find = (table, data) => send(axios.get, table, Object.assign(data, { mode: 'find' }))
const del = (table, data) => send(axios.delete, table, data)
const update = (table, key, data) => send(axios.patch, table, Object.assign(data, { key }))
const all = table => send(axios.get, table, { mode: 'all' })

const keep = {
  add,
  get,
  find,
  delete: del,
  update,
  all
}

module.exports = keep
