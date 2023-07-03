const mongoose = require("mongoose")
const bookmodel = require('../model/Books')

const AuthorSchema = new mongoose.Schema({
    nome: String,
})

const AuthorModel = mongoose.model("Author", AuthorSchema)

async function getById(id) {
    return await AuthorModel.findOne({_id: id}).lean()
}

async function getByName(name) {
    tmp = await AuthorModel.findOne({nome: name}).lean()
    if (tmp==null) return null
    return tmp._id
}

module.exports = {
    getById,getByName,
    list: async function() {
        const authors = await AuthorModel.find({}).lean()
        return authors
    },
    
    create: async function(nome) {
        const author = new AuthorModel({
            nome: nome,
        })
        if (!author) return [0,'Falha na criacao']
        else {
            if (await getByName(nome)) return [0, 'Autor ja existe']
            else {    
                await author.save()
                return [1,0]
        }}
        
    },

    update: async function(old, obj) {
        tmp = await AuthorModel.updateOne({ nome: old }, {$set:{ nome: obj.nome}})
        if (tmp.modifiedCount>0) return [1,0] 
        else return [0,'Falha na operacao']
    },

    del: async function(id) {
        if (await AuthorModel.countDocuments()>0){
            let tmp = await getByName(id)
            if (tmp) id = tmp
            tmp = await AuthorModel.deleteOne({ _id: id })
            console.log(await bookmodel.handlebooks)
            console.log(tmp)
            if (tmp.acknowledged) return [1,0]
            else return [0,'Falha na operacao']
        } else {
            return [0,'Banco vazio']
        }
        /*booktmp = await bookmodel.BookModel.updateMany({autor: tmp._id}, {$set: {autor: 'none'}})
        if (booktmp.modifiedCount>0) console.log('Livros atualizados')
        if (tmp) return [1,0]
        else return [0,'Falha na operacao']*/
    },


}