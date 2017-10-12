<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/keep/master/art/logo.png" height="200px"/>
  <br><br>
  <b>keep lets you store data for your apps with zero setup</b>
  <br>
</p>

&nbsp;

### the problem

&nbsp;

I see myself repeating the same steps with every side project:

1. create a data store
2. add authentication layer on top of the store
3. write CRUDs on top of the store
4. (optional) create an extra layer to protect secrets/config if the app will live on other folks' machine (example: npm packages/cli tools)

&nbsp;

### what i want

1) Zero config setup

```
keep new
```

spit out secrets in a .env file

good to have: copy the secrets into a custom config file

&nbsp;

2) Super simple API

```js
  import keep from 'keep'
  // auto initialise

  keep.add('users', {name: 'Siddharth', handle: 'siddharthkp'})
  // returns a promise, resolves to give id/hash

  keep.get('users', {id: 1})
  // {name: 'Siddharth', handle: 'siddharthkp'}

  keep.get('repos', {user_id: 1})
  // [{name: 'bundlesize', forks: 68}, {name: 'db', forks: 0}]

  keep.find('users', {name: 'sid'})
  // [{id: 1, name: 'Siddharth', handle: 'siddharthkp'}, {id: 9, name: 'Sid Vicious', handle: 'vicious'}]

  keep.delete('users', {id: 1})
```

good to have:

```js
  // support for custom config
  import { init } from 'keep'
  init({identifier: 'my_app', secret: 'super_secret'})

  // prefetch all entries in a table and store in cache for perf
  keep.prefetch('users')

  // prefetch data from all tables for a user and store in cache for convenience
  keep.prefetch({user_id: 1})
```

&nbsp;

### sounds exciting?

give it a star, that's a proxy for demand :smile:

or help out with the implementation, DM me on [twitter](https://twitter.com/siddharthkp)

&nbsp;

### inspiration/prior art

- inspired by the simplicity of [zeit/now](https://zeit.co/now)
- [firebase by google](https://firebase.google.com)
- [pronto by Vadim Demedes](https://github.com/vadimdemedes/pronto)

&nbsp;

### implementation details

this is super rough

1. each app get's an identifier, this tied up with the secret is how you access data
2. a table = f(identifier + secret + name)
3. api layer in between the user and database
4. use firebase/aws dynamo as the true store
5. add limits on project level
6. good to have: preload data on to the api layer for extra perf
7. good to have: auto index based on common queries, the user shouldn't have to bother
8. good to have: paid plan to increase limits
