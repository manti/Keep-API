const test = require('ava')
const keep = require('../lib')
const firebase = require('firebase-tools')
require('dotenv').config()

/* clean out the database before starting */
test.before(async t => {
  console.log('cleaning up database before starting...')
  await firebase.firestore
    .delete('data/' + process.env.KEEP_APP_ID, {
      token: process.env.KEEP_PROJECT_TOKEN,
      recursive: true,
      yes: true
    })
    .catch(error => console.log(error))
})

const user1 = { name: 'sid', handle: '@siddharthkp', tweets: 1000 }
const user2 = { key: 'duck', name: 'duck', handle: '@duckles', tweets: 500 }

/* keys are autogenerated for the user */
let generatedKey

test('add', async t => {
  const response = await keep.add('users', user1)

  /* a key should be present */
  t.truthy(response.key)

  /* store this key for other tests */
  generatedKey = response.key
})

test('get user by key', async t => {
  /* create the expected response with the generated key */
  const expectedResponse = Object.assign({}, user1, { key: generatedKey })

  const response = await keep.get('users', { key: generatedKey })

  t.deepEqual(response, expectedResponse)
})

/* folks can also use their own key */
test('add with custom key', async t => {
  const response = await keep.add('users', user2)

  /* check if the key is set correctly */
  t.is(response.key, user2.key)
})

test('find users by param', async t => {
  /* the expected response is an array of users */
  const expectedResponse = [user2]

  const response = await keep.find('users', { name: user2.name })

  t.deepEqual(response, expectedResponse)
})

test('delete user', async t => {
  const response = await keep.delete('users', { key: generatedKey })
  t.truthy(response)
})