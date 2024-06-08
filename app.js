const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const Connection = require('./db.js')
const mongoose = require('mongoose')
const Chat = require('./models/Chat.js')
const { timeStamp } = require('console')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())
Connection()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    },
    
})

io.on('connection', (socket) => {
    //console.log('connected');
    
    const loadMessages = async () => {
        try {
            const messages = await Chat.find().sort({timeStamp : 1}).exec()
            socket.emit('chat', messages)
        } catch (err) {
            console.log(err)
        }
    }
    loadMessages()

    socket.on('newMessage', async (msg) => {
        //console.log('received')
        try {
            const newMessage = new Chat(msg)
            await newMessage.save()
            io.emit('message', msg)
        } catch (err) {
            console.log(err)
        }
    })
    
    

    socket.on('disconnect', () => {})
})

const port = process.env.PORT || 3000
//console.log(port)

server.listen(port, () => console.log(`running on port ${port}`))