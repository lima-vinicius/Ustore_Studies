const dbConfig = require('../config/databaseConfig.js')

const mongoose = require('mongoose')

mongoose.connect(dbConfig.database_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));
