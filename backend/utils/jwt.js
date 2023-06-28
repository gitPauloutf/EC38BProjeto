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
        let bearer = req.headers['authorization'] || ''
        let aux = bearer.split(' ')
        let token = ''
        if (aux[0] == 'Bearer') {
            token = aux[1]
        }

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
    }
}