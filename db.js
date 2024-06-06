const mongoose = require('mongoose')

function Connection() {
    const mongoURL = 'mongodb+srv://tlim8772:t0238319a@cluster0.1ynnidi.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0/'
    mongoose.connect(mongoURL)
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err))
}

module.exports = Connection