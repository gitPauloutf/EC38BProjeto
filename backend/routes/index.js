var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var usermodel = require('../model/User')

router.get('/', function(req, res, next){
    res.send('salv dog');
    console.log("Running");
})
router.post('/', function(req, res, next){
    //res.render('index',{...content.display(req.body.page)});
    console.log("Running");
})

module.exports = router;