const app = require('./app.js')

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Ready at port ${process.env.PORT || 3001}`)
})