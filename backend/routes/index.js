var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var usermodel = require('../model/User')

router.get('/', function(req, res, next){
    console.log("Running");
})
router.post('/', function(req, res, next){
    console.log("Running");
})

module.exports = router;