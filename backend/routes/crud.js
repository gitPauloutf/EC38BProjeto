const express = require('express');
const router = express.Router();
var bookmodel = require('../model/Books')
var authormodel = require('../model/Author')

async function createAut(name,res){
    let [status,err] = await authormodel.create(name)
    if (status) {
        console.log("Done")
        
        return await authormodel.getByName(name)
    }
    console.log(err)
    return null
}


router.post('/c', async function (req,res,next) {
    let list = null
    let tmp = null
    if (req.body.type=='book'){
        let { ano, autor, name, editora } = req.body.payload
        //check author existance and return id
        tmp = await authormodel.getByName(autor)
        if (tmp) autor=tmp;
        else {
            tmp = await createAut(autor, res)
            if (!tmp) {
                console.log("Falha na criacao do autor")
                return
            }
            else autor = tmp}
        //else create author and get id
        let [status,err] = await bookmodel.create(name,autor,editora,ano)
        if (status) {
            list = await bookmodel.list()
            console.log("Done2")
            console.log(list)
            res.status(200).json({books: list, status: true })
        } else {
            console.log(err)
            res.status(500).json({ status: false, mensagem: err })
        }
        res.send()
        return    
    }
    if (req.body.type=='author'){
        let name = req.body.payload
        tmp = await createAut(name, res)
        if (!tmp) {
        res.status(500).json({ status: false, mensagem: err })
        }
        list = await authormodel.list()
        res.status(200).json({authors: list, status: true })
        res.send()
        return
    }
    res.status(500).json({ status: false, mensagem: 'Falha de comunicacao' })
})

router.post('/r', async function (req,res,next) {
    let list = null
    if (req.body.type=='book'){
        list = await bookmodel.list()
        res.json({books: list, status: true })
        return
    }
    if (req.body.type=='author'){
        list = await authormodel.list()
        res.json({authors: list, status: true })
        return
    }
    res.status(500).json({ status: false, mensagem: 'Falha de comunicacao' })
})

router.post('/u', async function (req,res,next) {
    let obj = req.body.payload
    let list = null
    let old = req.body.old   
    if (req.body.type=='book'){
        let [status,err] = await bookmodel.update(old, obj)
        if (status) {
            list = await bookmodel.list()
            console.log("Done")
            res.status(200)
            res.json({books: list, status: true })
            return
        } else {
            console.log(err)
            res.status(500).json({ status: false, mensagem: err })
            res.send()
            return
        }}
    if (req.body.type=='author'){
            let [status,err] = await authormodel.update(old, obj)
            if (status) {
                list = await authormodel.list()
                console.log("Done")
                res.status(200)
                res.json({authors: list, status: true })
                return
            } else {
                console.log(err)
                res.status(500).json({ status: false, mensagem: err })
                res.send()
                return
    }}
    res.status(500).json({ status: false, mensagem: 'Falha de comunicacao' })
})

router.post('/d', async function (req,res,next) {
    let id = req.body.payload
    let list
    if (req.body.type=='book'){
        let [status,err] = await bookmodel.del(id)
        if (status) {
            list = await bookmodel.list()
            console.log("Done")
            res.status(200)
            res.json({books: list, status: true })
            return
        } else {
            console.log(err)
            res.status(500).json({ status: false, mensagem: err })
            res.send()
            return
        }}
    if (req.body.type=='author'){
        
        let [status,err] = await authormodel.del(id)
        if (status) {
            list = await authormodel.list()
            console.log("Done")
            res.status(200)
            res.json({authors: list, status: true })
            return
        } else {
            console.log(err)
            res.status(500).json({ status: false, mensagem: err })
            res.send()
            return
        }}
    res.status(500).json({ status: false, mensagem: 'Falha de comunicacao' })
})

module.exports = router