const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser')
const classroomRouter = require('./routes/classroom')
app.use(express.json()) 
app.use(cookieParser())
const cors = require('cors')
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use('/user', userRouter)
app.use('/classroom', classroomRouter)
require('dotenv').config()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(8080, () => {
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('App is running and database connected')
    })
})