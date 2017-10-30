const axios = require('axios')

const url = 'https://localhost:5000/api'

const send = (action, table, params) => {
  return new Promise((resolve, reject) => {
    action(url, params)
      .then(response => resolve(response.data))
      .then(error => reject(error.message))
  })
}

const add = (table, params) => send(axios.post, table, params)
const get = (table, params) => send(axios.get, table, Object.assign(params, { mode: 'get' }))
const find = (table, params) => send(axios.get, table, Object.assign(params, { mode: 'find' }))
const del = (table, params) => send(axios.delete, table, params)

const keep = {
  add,
  get,
  find,
  delete: del
}

module.exports = keep
