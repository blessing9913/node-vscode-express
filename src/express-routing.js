// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyParser.json())

const PORT = 5000

app.get('/', (req, res) => {
  res.send('Root - GET')
})

userRouter.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  1: {
    nickname: 'foo',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log(`id parameter: ${value}`)

  /* @ts-ignore */
  req.user = USERS[value]
  next()
})

userRouter.get('/:id', (req, res) => {
  console.log('userRouter get ID')

  /* @ts-ignore */
  res.send(req.user)
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

app.listen(PORT, () => {
  console.log(`The Express server is lintening at port: ${PORT}`)
})
