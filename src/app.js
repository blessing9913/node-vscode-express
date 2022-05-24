// @ts-check

/* eslint-disable no-console */

const express = require('express')

const app = express()
app.use(express.json())

// Template engine에서 사용가능하도록 Static file 서빙
// api 호출 시 src/public 하위의 동일한 경로/이름을 가진 파일을 참조하지 않도록 '/public' prefix를 선언해줌
app.use('/public', express.static('src/public'))

// View template engin: pug
app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))

// Error Handling
// @ts-ignore
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

// app.js 만 Jest Test를 위해 Server listen을 하지 않고 main.js에서 서버실행하도록 함
// app.listen(PORT, () => {
//   console.log(`The Express server is lintening at port: ${PORT}`)
// })

module.exports = app
