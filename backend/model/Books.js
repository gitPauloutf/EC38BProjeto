const mongoose = require("mongoose")
const authormodel = require('../model/Author')
//Remover autor
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
async function getByName(name) {
    let tmp = await BookModel.findOne({nome: name}).lean()
    if (tmp==null) return null
    return tmp._id
}
async function handlebooks(id){
    let tmp = await BookModel.updateMany({autor: id}, {$set: {autor: 'none'}})
    if (tmp) return 'Livros atualizados'
    else return 'Erro atualizando livros'
}

module.exports = {
    getById, getByName, handlebooks,
    list: async function() {
        if (await BookModel.countDocuments()>0){
            var books = await BookModel.find({}).lean()
            books = await Promise.all(books.map(async key => {
                let t = await authormodel.getById(key.autor)
                if (key.autor != 'none') 
                    if (t) key.autor = t.nome
                    else key.autor = 'none'
                return key
            }))
            console.log(books)
            return books
        } else return 'Banco vazio'
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
            var tmp = await this.getByName(nome)
            if (tmp) return [0, 'Livro ja existe']
            else {
                await book.save()
                return [1,0]
        }}
    },

    update: async function(old, obj) {
        tmp = await BookModel.updateOne({ nome: old }, {$set:{ nome: obj.nome, autor: obj.autor, editora: obj.editora, ano: obj.ano }})
        if (tmp.modifiedCount>0) return [1,0] 
        else return [0,'Falha na operacao']
    },

    del: async function(name) {
        if (await BookModel.countDocuments()>0){
            tmp = await BookModel.deleteOne({ nome: name })
            console.log(tmp)
            if (tmp.acknowledged) return [1,0]
            else return [0,'Falha na operacao']
        } else {
            return [0,'Banco vazio']
        }
    },


}