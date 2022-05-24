// @ts-check

const app = require('./app')

const PORT = 5000

app.listen(PORT, () => {
  console.log(`The Express server is lintening at port: ${PORT}`)
})
