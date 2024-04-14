const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser')
const classroomRouter = require('./routes/classroom')
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OpenAI })
const classroom = require('./models/clasroom')
const User = require('./models/user')
const geUser = require('./utils/getUser')
const cookie = require('cookie');
const runRouter = require('./routes/run')
app.use(express.json())
app.use(cookieParser())
const cors = require('cors')
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use('/run', runRouter)
app.use('/user', userRouter)
app.use('/classroom', classroomRouter)
require('dotenv').config()
const socketIO = require('socket.io')
const server = require('http').createServer(app)
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
})
////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
////////////////////////////////////////////////////////////////////////////////////////////
io.on('connection', (socket) => {
    socket.on('join', (classroomId) => {
        console.log('Client joined room', classroomId);
        socket.join(classroomId);
    });
    
    socket.on('message', async (data) => {
        const { text, sender, classroomId } = data;
        console.log('Client sent message', text, sender, classroomId);
        try {
            socket.to(classroomId).emit('message', data)
            const classrooma = await classroom.findOne({ _id: classroomId });
            classrooma.chat.push(data)
            await classrooma.save()
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
////////////////////////////////////////////////////////////////////////////////////////////
app.post('/chatbot', async (req, res) => {
    const { prompt } = req.body;
    const cookies = cookie.parse(req.headers.cookie);
    if (!cookies || !cookies.primaryToken || !cookies.refreshToken) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const { user } = await geUser(cookies.primaryToken, cookies.refreshToken);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    const usera = await User.findOne({ username: user.username });
    if (!usera) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    usera.prompts.push(prompt)
    try {
        const completion = await client.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });
        usera.prompts.push(completion.choices[0].message.content)
        await usera.save()
        res.status(200).json({ message: completion.choices[0].message.content })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
////////////////////////////////////////////////////////////////////////////////////////////
server.listen(8080, () => {
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('App is running and database connected')
    })
})
////////////////////////////////////////////////////////////////////////////////////////////