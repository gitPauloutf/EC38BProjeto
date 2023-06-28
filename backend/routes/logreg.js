const express = require('express');
const router = express.Router();
var usermodel = require('../model/User')
const jwt = require('jsonwebtoken');
const tokens = require('../utils/jwt.js')

router.post('/reg', function (req, res, next) {
    console.log(req.body)
    let { usr, pw, name } = req.body
    let [ status, err ] = usermodel.reg(usr, name, pw, 'Usuario')
    console.log(status,err)
    if (status) {
        console.log("Done")
        res.status(200)
        res.send()
        return
    } else {
    console.log(err)
    res.status(500).json({ status: false, mensagem: err })
    res.send()
    return}
})

router.post('/log', async function (req, res, next) {
    const {usr, pw}  = req.body
    let [tmpuser, err] = await usermodel.log(usr, pw)
    if (!tmpuser) {
        res.status(403).json({ status: false, mensagem: err })
    } else {
        const jwtToken = tokens.generateAccessToken(tmpuser.name, usr, pw, tmpuser.isAdmin)
        res.set("x-access-token", jwtToken);
        console.log("Logged")
        res.status(200).json()
    }
})

router.post('/logged', async function (req, res, next) {
    console.log(req.body)
    let status, err
    switch (req.body.act) {
        case 'alt':
            status = await usermodel.alter(req.body.usr, req.body.nwuser)
            break;
        case 'create':
            status, err = usermodel.reg(req.body.nwusr, req.body.name, req.body.pswd, req.body.isAdmin)
            break;
        case 'del':
            await usermodel.del(req.body.usr)
            break;
    }
    if (err) {
        res.status(500).json({ message: err })
        return
    }

    res.status(200).send()

})

module.exports = router