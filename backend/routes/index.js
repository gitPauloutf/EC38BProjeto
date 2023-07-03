var express = require('express');
var router = express.Router();
const tokens = require('../utils/jwt.js')

router.get('/',tokens.setUser, function(req, res, next){
    if (!req.usr) console.log("Not verified"); 
    else res.json({usr: req.usr, name: req.name,isLogged: true,isAdmin: req.isAdmin})
})

router.post('/', function(req, res, next){
    console.log("Running");
})

module.exports = router;