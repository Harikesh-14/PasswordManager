const express = require('express')
const path = require('path')
const passport = require('passport')
const expressSession = require('express-session')
require('dotenv').config()

// database related imports
require('./database/conn')
const profileDetail = require('./database/userDetails')
const userTableImport = require('./database/userTable')
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
initializePassport(passport)
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
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.sendFile(path.join(__dirname, "public", "html", "signIn.html"))
    }
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
        res.status(500).json({ 
            error: "Error while registering the detail", 
            errorMessage: err 
        })
    }
})

app.get('/profile', isAuthenticated, async (req, res) => {
    try {
        // Fetch userTableData here
        const userTableData = await userTableImport.find({ websiteCredId: req.user._id });

        // Render the 'profile' template and pass userTableData to it
        res.render('profile', { userTableData, firstName: req.user.firstName });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error in retrieving the details",
            errorMessage: err
        });
    }
});

app.post('/profile', isAuthenticated, async (req, res) => {
    try {
        // Create a new userTable entry associated with the currently logged-in user
        const userTable = new userTableImport({
            websiteCredId: req.user._id, // Assuming you want to associate it with the currently logged-in user
            websiteName: req.body.websiteName,
            websiteUsername: req.body.websiteUsername,
            websitePassword: req.body.websitePassword,
        });

        // Save the userTable entry
        await userTable.save();

        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error in inserting the details",
            errorMessage: err,
        });
    }
});

app.delete('/delete-entry/:id', isAuthenticated, async (req, res) => {
    try {
        const id = req.params.id;
        // Use Mongoose to find and delete the entry by its ID
        await userTableImport.findByIdAndDelete(id);
        res.sendStatus(200); // Send a success status code
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error in deleting the entry",
            errorMessage: err
        });
    }
});

// logout route
app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`)
})