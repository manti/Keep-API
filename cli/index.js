const axios = require('axios')
const prompt = require('prompt')
const fs = require('fs')

const url = 'http://localhost:3000/init'

prompt.get('email', function(err, { email }) {
  axios
    .post(url, { email })
    .then(response => append(response.data))
    .catch(error => console.log(error.message))
})

const append = ({ appId, secret }) => {
  const exists = fs.existsSync('.env')
  let content = ''
  if (exists) content = fs.readFileSync('.env')
  content += `
KEEP_APP_ID=${appId}
KEEP_SECRET=${secret}
`
  fs.writeFileSync('.env', content)
}
