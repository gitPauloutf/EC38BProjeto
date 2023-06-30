var express = require('express');
var router = express.Router();
const tokens = require('../utils/jwt.js')

router.get('/',tokens.controlaAcesso, function(req, res, next){
    console.log("Running");
    if (!req.usr) console.log("Not verified"); 
    else res.json({usr: req.usr, name: req.name,isLogged: true,isAdmin: req.isAdmin})
})

router.get('/out',tokens.deleteToken)

router.post('/', function(req, res, next){
    console.log("Running");
})

module.exports = router;