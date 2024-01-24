require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(`${process.env.MONGO_DB_URL}`).then(() => {
        console.log('You are now connected to The Database');
    })
}

module.exports = connectToDatabase;