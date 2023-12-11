const { databaseConfig } = require('../config')

const mongoose = require('mongoose')

mongoose.connect(databaseConfig.database_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));
