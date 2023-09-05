const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect("mongodb://127.0.0.1:27017/PasswordManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database successfully connected")
}).catch((err) => {
    console.log(`An error occurred: ${err}`)
})