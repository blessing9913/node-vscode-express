// @ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 5000

app.use(
  '/',
  async (req, res, next) => {
    console.log('Middleware 1-1')

    // 다음 middleware로 특정 값을 전달할 Data
    const requestedAt = new Date()
    const fileContent = await fs.promises.readFile('.gitignore')

    // 전달할 Data를 request 객체에 담아 전달
    // @ts-ignore
    req.requestedAt = requestedAt
    // @ts-ignore
    req.fileContent = fileContent

    // 비동기 작업 이후 다음 Middleware로 이동
    // setTimeout(() => {
    //   next()
    // }, 1000)

    next()
  }
  // (req, res, next) => {
  //   console.log('Middleware 1-2')
  //   next()
  // }
)

app.use((req, res) => {
  console.log('Middleware 2')

  /* @ts-ignore */
  res.send(`Requested at ${req.requestedAt}, ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server is lintening at port: ${PORT}`)
})
