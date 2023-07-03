const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(name, usr, isAdmin) {
    const payload = {
        name: name,
        usr: usr,
        isAdmin: isAdmin
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = {
    generateAccessToken,

    controlaAcesso: function (req, res, next) {
        let token = req.headers.access_token
        if(!token) return res.status(401).json({ status: false, mensagem: "No tokens?" })


        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({ status: false, mensagem: "Acesso negado" })
            }
            req.name = payload.name
            req.usr = payload.usr
            req.isAdmin = payload.isAdmin
            next()
        })
    },
    setUser: function (req, res, next) {
        let token = req.headers.access_token
        if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).json({ status: false, mensagem: "Acesso negado" })
            }
            req.name = payload.name
            req.usr = payload.usr
            req.isAdmin = payload.isAdmin
        })}
        next()
    }
}