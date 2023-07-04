const express = require('express');
const router = express.Router();
var usermodel = require('../model/User')
const tokens = require('../utils/jwt.js')

router.get('/', function(req, res, next){
    if (!req.usr) console.log("Not verified 1"); 
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

router.post('/log', async function (req, res, next) {
    const { usr, pw } = req.body
    console.log(usr)
    let [tmpuser, err] = await usermodel.log(usr, pw)
    if (!tmpuser) {
        res.status(403).json({ status: false, mensagem: err })
        return
    } else {
        const jwtToken = tokens.generateAccessToken(tmpuser.name, usr, tmpuser.isAdmin)
        console.log("Logged")
        res.json({usr: req.body.usr, name: tmpuser.name,isLogged: true,isAdmin: tmpuser.isAdmin, token: jwtToken})
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
    res.json({users, status: status, err: err})

})

router.get("/chcklog", tokens.controlaAcesso, async function (req, res, next) {
  let usr;
  usr = tokens.getuser(req);
  console.log(usr);
  let tmp = await usermodel.getlogs(usr);
  if (tmp) {
    res.json({ timeslogged: tmp, status: true });
  } else {
    res.json({ status: false, err: "Falha na obtencao dos dados" });
  }
});

module.exports = router
