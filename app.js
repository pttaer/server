const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const moongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')

require('./models/user')
require('./models/post')

// mongoose.model("User")

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

mongoose.connect(MONGOURI)
mongoose.connection.on('connected', () => {
    console.log("connected to mongo yeahhh")
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})


// const customMiddleware = (req, res, next) => {
//     console.log("middleware executed!!")
//     next()
// }

// app.get('/', (req, res) => {
//     console.log("home")
//     res.send("hello world")
// })
// app.get('/about', customMiddleware, (req, res) => {
//     console.log("about")
//     res.send("about page")
// })

app.listen(PORT, () => {
    console.log("server is running on", PORT)
})

