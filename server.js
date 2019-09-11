const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const cookieParser = require('cookie-parser')
const path = require('path')

const indexRouter = require('./routes/indexRouter')
const notesRouter = require('./routes/notesRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const db = config.get('mongoURI')

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.use('/', indexRouter)
app.use('/notes', notesRouter)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
