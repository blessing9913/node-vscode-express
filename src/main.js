// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyParser.json())

// Template engine에서 사용가능하도록 Static file 서빙
// api 호출 시 src/public 하위의 동일한 경로/이름을 가진 파일을 참조하지 않도록 '/public' prefix를 선언해줌
app.use('/public', express.static('src/public'))

// View template engin: pug
app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

const USERS = {
  1: {
    nickname: 'foo',
  },
  2: {
    nickname: 'bar',
  },
}

userRouter.get('/', (req, res) => {
  res.send('User list')
})

userRouter.param('id', (req, res, next, value) => {
  console.log(`id parameter: ${value}`)

  /* @ts-ignore */
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    /* @ts-ignore */
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      /* @ts-ignore */
      nickname: req.user.nickname,
    })
  }
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User Register')
})

userRouter.post('/:id/nickname', (req, res) => {
  // req: {"nickname": "bar"}
  /* @ts-ignore */
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

app.use('/users', userRouter)

// View template engin 사용
app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello, Pug!!',
  })
})

app.listen(PORT, () => {
  console.log(`The Express server is lintening at port: ${PORT}`)
})
