const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')
const bodyParser = require('body-parser')
const connectTimeout = require('connect-timeout')
const helmet = require('helmet')

require('dotenv').config()

const {
  SERVER_ENV_MONGO_URI: MONGO_URI,
  SERVER_ENV_TIMEOUT: TIMEOUT,
  SERVER_ENV_HOST: HOST,
  SERVER_ENV_PORT: PORT
} = process.env

// init app
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(connectTimeout(TIMEOUT))
app.use(
  helmet({
    hidePoweredBy: { setTo: 'ASP.NET, ColdFusion Server' },
    hsts: false,
    ieNoOpen: false,
    xssFilter: false
  })
)

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    consola.ready({ message: 'Database connected.', badge: true })
    // Listen the server
    app.listen(PORT, HOST, () => {
      consola.ready({
        message: `Server listening on http://${HOST}:${PORT}`,
        badge: true
      })
    })
  })
  .catch(error => {
    console.error(error.message)
    process.exit(1)
  })
