const mongoose = require("mongoose")

module.exports = (req, res, next) => {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.tykjpas.mongodb.net/?retryWrites=true&w=majority").catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}