const mongoose = require('mongoose')
const userDetails = require('./userDetails')

const userTableSchema = new mongoose.Schema({
    websiteName: String,
    websiteUsername: String,
    websitePassword: String,
    websiteFirstName: String
})

const userTableImport = new mongoose.model('usertable', userTableSchema)

module.exports = userTableImport