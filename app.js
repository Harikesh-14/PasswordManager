const express = require('express')
const path = require('path')
const passport = require('passport')
const expressSession = require('express-session')

// database related imports
require('./database/conn')

// establishing the port
const port = 3000 || process.env.PORT

const app = express()

// setting up express-session
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

// setting up passport
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// setting up the public folder
app.use(express.static(path.join(__dirname, 'public')))

// setting up the views folder for ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`)
})