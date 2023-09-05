const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "signInEmail",
        passwordField: "signInPassword"
    }, async (email, password, done) => {
        try{

        } catch(err){
            console.log(err)
            return done(err, false)
        }
    }))
}