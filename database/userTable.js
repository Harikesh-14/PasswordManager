const mongoose = require('mongoose')
const userDetails = require('./userDetails')

const userTableSchema = new mongoose.Schema({
    websiteCredId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginDetails",
    },
    websiteName: String,
    websiteUsername: String,
    websitePassword: String,
})

const userTableImport = new mongoose.model('UserTable', userTableSchema)

module.exports = userTableImport