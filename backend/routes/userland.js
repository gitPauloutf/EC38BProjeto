var express = require('express');
var router = express.Router();
var usermodel = require('../model/User')

router.post('/', function(req,res,next) {
    let usr = req.body.usr.split(';');
    res.render('logged',{ifAdmin: usr[0], name: usr[1], content: provider(req.body.id)})
})

function provider(type){
    let tmpcode = '<ul>';
    let list = usermodel.list()
    console.log("here -> ",list.length)
    for(let i=0;i<list.length;i++) tmpcode += '<li>'+list[i].name+'</li>'
    tmpcode += '</ul>'
    return '<div>'+tmpcode+'</div>'
}


module.exports = router;