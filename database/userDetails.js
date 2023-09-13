const mongoose = require('mongoose')

const userDetailSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailID: String,
    password: String
})

const userDetail = new mongoose.model("LoginDetails", userDetailSchema)

module.exports = userDetail