const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const { PORT, MONGO_URL } = require('./config')
const { errorHandler } = require('./middlewares')
const router = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)
app.use(errorHandler)

mongoose.connect(MONGO_URL).then(() => {
  console.log('Database Conncted...')
  app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`)
  })
})
