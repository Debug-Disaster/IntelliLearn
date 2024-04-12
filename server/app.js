const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
app.use('/user', userRouter)
require('dotenv').config()
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(8080, () => {
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('App is running and database connected')
    })
})