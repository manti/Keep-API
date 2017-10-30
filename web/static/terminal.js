let typingSpeed = 50

const terminal = document.getElementById('terminal-content')
const terminalWindow = document.getElementById('terminal')
const filename = document.getElementById('filename')
const email = document.getElementById('email')

const getNewLine = _ => {
  const line = document.createElement('pre')
  line.className = 'code'
  terminal.appendChild(line)
  return line
}

const type = (text, mode) =>
  new Promise(resolve => {
    const line = getNewLine()

    let content = ''
    if (mode === 'command') content = '$ '
    if (mode === 'comment') line.className += ' comment'
    if (mode === 'link') {
      line.className += ' link'
      line.onclick = play
    }

    text.split('').map((c, index) =>
      setTimeout(() => {
        content += c

        if (mode === 'code') line.innerHTML = highlight(content)
        else line.innerHTML = content

        terminal.scrollTop = line.offsetTop
      }, index * typingSpeed)
    )
    setTimeout(resolve, text.split('').length * typingSpeed + 200)
  })

const tokens = {
  operator: ['=', '(', ')', "'", ';', '.', ',', '{', '}', ':'],
  function: ['require', 'set', 'get', 'then', '=>', 'log'],
  variable: ['store', 'user ', 'console'],
  keyword: ['const']
}

const highlight = code => {
  Object.keys(tokens).map(t => {
    tokens[t].map(key => (code = code.replace(key, `<span class="${t}">${key}</span>`)))
  })
  return code
}

const appear = text =>
  new Promise(resolve => {
    const line = getNewLine()
    line.innerHTML = text
    terminal.scrollTop = line.offsetTop
    resolve()
  })

const wait = delay =>
  new Promise(resolve => {
    setTimeout(resolve, delay)
  })

const insertLine = _ =>
  new Promise(resolve => {
    terminal.innerHTML += '<br>'
    resolve()
  })

const clearLastLine = _ =>
  new Promise(resolve => {
    const index = terminal.children.length - 1
    terminal.children[index].innerText = ''
    resolve()
  })

let terminalState = ''
const openEditor = _ =>
  new Promise(resolve => {
    terminalState = terminal.innerHTML
    terminal.innerHTML = ''
    filename.style.display = 'inline-block'
    changeBackground('#202328')
    resolve()
  })

const closeEditor = _ =>
  new Promise(resolve => {
    changeBackground('#000')
    terminal.innerHTML = terminalState
    filename.style.display = 'none'
    resolve()
  })

const changeBackground = hex => (terminalWindow.style.backgroundColor = hex)

const play = _ => {
  terminal.innerHTML = ''
  type('npm install keep -g', 'command')
    .then(_ => wait(100))
    .then(_ => appear('Installing...'))
    .then(_ => wait(750))
    .then(_ => clearLastLine())
    .then(_ => appear('+ keep@1.0.0'))
    .then(_ => wait(750))
    .then(_ => insertLine())
    .then(_ => type('keep new', 'command'))
    .then(_ => wait(100))
    .then(_ => appear('Creating a store for you...'))
    .then(_ => wait(1000))
    .then(_ => clearLastLine())
    .then(_ => appear('store created.'))
    .then(_ => wait(750))
    .then(_ => insertLine())
    .then(_ => type('vim index.js', 'command'))
    .then(_ => wait(200))
    .then(_ => openEditor())
    .then(_ => wait(750))
    .then(_ => type('// now just start using keep', 'comment'))
    .then(_ => type("const store = require('keep');", 'code'))
    .then(_ => insertLine())
    .then(_ => type('// set data', 'comment'))
    .then(_ => type("store.set('users', {", 'code'))
    .then(_ => type("  name: 'sid',", 'code'))
    .then(_ => type("  handle: '@siddharthkp',", 'code'))
    .then(_ => type('  tweets: 2097', 'code'))
    .then(_ => type('});', 'code'))
    .then(_ => insertLine())
    .then(_ => type('// get data with any key', 'comment'))
    .then(_ => type('store', 'code'))
    .then(_ => type(".get('users', { name: 'sid' })", 'code'))
    .then(_ => type('.then(user => console.log(user));', 'code'))
    .then(_ => insertLine())
    .then(_ => wait(1000))
    .then(_ => closeEditor())
    .then(_ => insertLine())
    .then(_ => wait(750))
    .then(_ => type('node index.js', 'command'))
    .then(_ => wait(750))
    .then(_ => appear('[{'))
    .then(_ => appear("  name: 'sid',"))
    .then(_ => appear("  handle: '@siddharthkp',"))
    .then(_ => appear('  tweets: 2907'))
    .then(_ => appear('}]'))
    .then(_ => wait(2000))
    .then(_ => insertLine())
    .then(_ => type('replay demo?', 'link'))
}

type(' ', 'command')
setTimeout(play, 2000)

const register = _ => {
  action.innerText = 'Check your email!'
  reqwest({
    url: '/register',
    method: 'post',
    data: { email: email.value }
  })
}
