const express = require('express')
const path = require('path')
const passport = require('passport')
const expressSession = require('express-session')

// database related imports
require('./database/conn')
const profileDetail = require('./database/userDetails')
const { initializePassport, isAuthenticated } = require('./passportConfig')

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

// login page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "signIn.html"))
})

app.post('/', (req, res) => {
    if(req.isAuthenticated()){
        req.logout() // logout the current user
        console.log("User logged out")
    }

    passport.authenticate("local", {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})

// sign up page route
app.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "signUp.html"))
})

// profile page routes
app.get('/profile', isAuthenticated, async (req, res) => {
    // try{
    //     const {firstName, lastName, emailID, password}
    // } catch(err){
    //     console.log("ERROR")
    // }
})

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`)
})