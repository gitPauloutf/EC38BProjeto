const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    nome: String,
    autor: String,
    editora: String,
    ano: Number
})

const BookModel = mongoose.model("Book", BookSchema)
async function getById(id) {
    return await BookModel.findById(id).lean()
}

module.exports = {
    getById,
    list: async function() {
        const books = await BookModel.find({}).lean()
        return books
    },
    
    create: async function(nome, autor, editora, ano) {
        const book = new BookModel({
            nome: nome,
            autor: autor,
            editora: editora,
            ano: ano
        })
        if (!book) return [0,'Falha na criacao']
        else {
        await book.save()
        return [1,0]
        }
        
    },

    update: async function(id, obj) {

        let book = await BookModel.findById(id)
        if (!book) {
            return [0,'Livro nao encontrado']
        }
        
        Object.keys(obj).forEach(key => book[key] = obj[key])
        await book.save()
        return [1,'Registro alterado']
    },

    del: async function(id) {
        let books = await BookModel.findByIdAndDelete(id)
        if (!books) {
            return [0,'Livro nao encontrado']
        }
        else return [1,'Registro apagado']
    },


}