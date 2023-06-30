const express = require('express');
const router = express.Router();
var usermodel = require('../model/User')
var bookmodel = require('../model/Books')

router.post('/c', async function (req,res,next) {
    let { ano, autor, name, editora } = req.body
    let [status,err] = bookmodel.create(name,autor,editora,ano)
    if (status) {
        list = bookmodel.list()
        console.log("Done")
        res.status(200)
        res.json({books: list, status: true })
        return
    } else {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
        return
    }
})
router.post('/r', async function (req,res,next) {
    let [status,err] = bookmodel.list()
    if (!status) {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
    } else {
        list = bookmodel.list()
        console.log("Done")
        res.status(200)
        res.json({books: list, status: true })
    }
    return
})
router.post('/u', async function (req,res,next) {
    let bookobj= req.body.book
    let id = req.body.bookid
    let [status,err] = bookmodel.update(id, bookobj)
    if (status) {
        list = bookmodel.list()
        console.log("Done")
        res.status(200)
        res.json({books: list, status: true })
        return
    } else {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
        return
    }
})
router.post('/d', async function (req,res,next) {
    //let { ano, autor, name, editora } = req.body
    let id = req.body.bookid
    let [status,err] = bookmodel.del(id)
    if (status) {
        list = bookmodel.list()
        console.log("Done")
        res.status(200)
        res.json({books: list, status: true })
        return
    } else {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
        return
    }
})

module.exports = router