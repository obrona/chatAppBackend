const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    username: String,
    module: String,  
    message: String,
    imageId: String,
    timestamp: {type: Date, default: Date.now}
})

const Chat = mongoose.model('message', chatSchema)
module.exports = Chat