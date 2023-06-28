const mongoose = require("mongoose")
module.exports = (req, res, next) => {
    mongoose.connect(process.env.MONGO_URL).catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}