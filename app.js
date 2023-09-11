const express = require('express')
const path = require('path')
const passport = require('passport')
const expressSession = require('express-session')
require('dotenv').config()

// database related imports
require('./database/conn')
const profileDetail = require('./database/userDetails')
const { initializePassport, isAuthenticated } = require('./passportConfig');

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
app.use(express.urlencoded({ extended: false }))

// setting up the public folder
app.use(express.static(path.join(__dirname, 'public')))

// setting up the views folder for ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// login page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "signIn.html"))
})

app.post('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout(); // Log out the current user
        console.log('User logged out');
    }
    passport.authenticate("local", {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

// sign up page route
app.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "signUp.html"))
})

app.post('/register-user', async (req, res) => {
    try {
        const profileList = new profileDetail({
            firstName: req.body.signUpFirstName,
            lastName: req.body.signUpLastName,
            emailID: req.body.signUpEmail,
            password: req.body.signUpPassword,
        })

        await profileList.save()
        res.redirect('/')
    } catch (err) {
        console.log("Ann error occurred")
        res.status(500).json({ error: "Error while registering the detail", errorMessage: err })
    }
})

// profile page routes
app.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, emailID, password } = req.user
        console.log(`User retrieved`)
        res.render('profile', { firstName, lastName, emailID, password })
    } catch (err) {
        console.log("ERROR")
        res.status(500).json({ error: "Error in retrieving the details", errorMessage: err })
    }
})

// logout route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: "Error in logging out the user", errorMessage: err })
        }
    })
})

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`)
})