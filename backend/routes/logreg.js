const express = require('express');
const router = express.Router();
var usermodel = require('../model/User')
const tokens = require('../utils/jwt.js')

router.get('/',tokens.setUser, function(req, res, next){
    if (!req.usr) console.log("Not verified"); 
    else res.json({usr: req.usr, name: req.name,isLogged: true,isAdmin: req.isAdmin})
})

router.post('/reg', async function (req, res, next) {
    console.log(req.body)
    let { usr, pw, name, isAdmin } = req.body
    let [status, err] = await usermodel.reg(usr, name, pw, isAdmin)
    if (status) {
        console.log("Done")
        res.status(200).json({ status: true })
        return
    } else {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
        return
    }
})

router.post('/log', tokens.setUser, async function (req, res, next) {
    if (!req.isAdmin){
        const { usr, pw } = req.body
        let [tmpuser, err] = await usermodel.log(usr, pw)
        if (!tmpuser) {
            res.status(403).json({ status: false, mensagem: err })
        } else {
            const jwtToken = tokens.generateAccessToken(tmpuser.name, usr, tmpuser.isAdmin)
            res.set("access-token", jwtToken);
            console.log("Logged")
        }}
        //return error if not logged
        res.json({usr: req.usr, name: req.name,isLogged: true,isAdmin: req.isAdmin})
})

router.post('/logged',tokens.controlaAcesso, async function (req, res, next) {
    console.log(req.body)
    let status, err
    switch (req.body.act) {
        case 'alt':
            [status, err] = await usermodel.alter(req.body.usr, {usr : req.body.newusr,
                name: req.body.newnam,
                isAdmin: req.body.newadm})
            break;
        case 'create':
            [status, err] = await usermodel.reg(req.body.newusr, req.body.nwusr.name, req.body.nwusr.pswd, req.body.nwusr.isAdmin)
            break;
        case 'del':
            [status, err] = await usermodel.del(req.body.usr)
            break;
        case 'list':
            err = 0
            break;
    }
    if (err) {
        res.status(500).json({ status:status ,err: err })
        return
    }
    users = await usermodel.list()
    res.status(200).json({users, status: status, err: err})

})

module.exports = router