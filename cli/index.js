const axios = require('axios')
const prompt = require('prompt')

const url = 'http://localhost:3000/init'

prompt.get('email', function(err, { email }) {
  axios
    .post(url, { email })
    .then(response => console.log(response.data))
    .catch(error => console.log(error.message))
})
