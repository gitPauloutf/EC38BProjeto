const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(name, usr, pw, isAdmin) {
    const payload = {
        name: name,
        usr: usr,
        pw: pw,
        isAdmin: isAdmin
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = {
    generateAccessToken,

    controlaAcesso: function (req, res, next) {
        let token = req.cookies.access_token
        if(!token) return res.status(401).json({ status: false, mensagem: "No tokens?" })


        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({ status: false, mensagem: "Acesso negado" })
            }
            req.name = payload.name
            req.usr = payload.usr
            req.pw = payload.pw
            req.isAdmin = payload.isAdmin
            next()
        })
    },
    deleteToken: function (req,res,next){
        console.log('im tryin')
        res.clearCookie('access_token')
        res.json({status:true})
        next()
    }
}