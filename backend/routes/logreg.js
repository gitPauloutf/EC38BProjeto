const express = require('express');
const router = express.Router();
var usermodel = require('../model/User')
const tokens = require('../utils/jwt.js')

router.post('/reg', async function (req, res, next) {
    console.log(req.body)
    let { usr, pw, name, isAdmin } = req.body
    let [status, err] = await usermodel.reg(usr, name, pw, isAdmin)
    if (status) {
        console.log("Done")
        res.status(200)
        res.json({ status: true })
        return
    } else {
        console.err(err)
        res.status(500).json({ status: false, mensagem: err })
        res.send()
        return
    }
})

router.post('/log',  async function (req, res, next) {
    //let jwtToken
    const { usr, pw } = req.body
    let [tmpuser, err] = await usermodel.log(usr, pw)
    if (!tmpuser) {
        res.status(403).json({ status: false, mensagem: err })
    } else {
        const jwtToken = tokens.generateAccessToken(tmpuser.name, usr, pw, tmpuser.isAdmin)
        res.set("x-access-token", jwtToken);
        res.cookie("access_token", jwtToken,{maxAge: 600000}).status(200).json({ usr: usr, name: tmpuser.name , isAdmin: tmpuser.isAdmin, status: true });
        console.log("Logged")
    }
    
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