require('dotenv').config()

databaseCredentials = {
    database_name: process.env.DATABASE_NAME,
    database_username: process.env.DATABASE_USERNAME,
    database_passwornd: process.env.DATABASE_PASSWORD,
}

module.exports = {
    database_uri: `mongodb+srv://${databaseCredentials.database_username}:${databaseCredentials.database_passwornd}@${databaseCredentials.database_name}.fukbztm.mongodb.net/?retryWrites=true&w=majority`
}
