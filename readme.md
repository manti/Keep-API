<p align="center">
  <img src="https://raw.githubusercontent.com/siddharthkp/keep/master/art/logo.png" height="200px"/>
  <br><br>
  <b>keep lets you store data for your apps with zero setup</b>
  <br>
</p>

&nbsp;

### sponsor

<a target='_blank' rel='nofollow' href='http://app.codesponsor.io/link/LhLT2c31ydJzdLUuSR9f8mCA/siddharthkp/keep'>
  <img alt='Sponsor' width='888' height='68' src='http://app.codesponsor.io/embed/LhLT2c31ydJzdLUuSR9f8mCA/siddharthkp/keep.svg' />
</a>


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

  keep.add('users', { name: 'sid', handle: 'siddharthkp' })
  // { key: 'awdd33', name: 'sid', handle: 'siddharthkp' }

  // or provide your own key
  keep.add('users', { key: 'user-242', name: 'duck', handle: 'duckles' })
  // { key: 'user-242', name: 'duck', handle: 'duckles' }

  keep.get('users', 'awdd33')
  // { key: 'awdd33', name: 'sid', handle: 'siddharthkp' }

  keep.update('users', 'awdd33', { name: 'siddharth' })
  // { key: 'awdd33', name: 'siddharth', handle: 'siddharthkp' }

  keep.find('users', { name: 'siddharth' })
  /* [
       { key: 'awdd33', name: 'siddharth', handle: 'siddharthkp' },
       { key: 'yui368', name: 'siddharth', 'handle: 'otherguy' }
     ]
  */

  keep.delete('users', {id: 'awdd33'})
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
