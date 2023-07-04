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

function getuser(req) {
  let tmpuser = null;
  if (req) {
    //token = req.body.token
    let bearer = req.headers["authorization"] || "";
    let aux = bearer.split(" ");
    let token = "";
    console.log(token);
    if (aux[0] == "Bearer") {
      token = aux[1];
    } else {
      console.log("sem token");
      return;
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        return;
      }
      tmpusr = payload.usr;
    });
  }
  return tmpusr;
}

module.exports = {
  generateAccessToken,
  getuser,

  controlaAcesso: function (req, res, next) {
    if (res) {
      //token = req.body.token
      let bearer = req.headers["authorization"] || "";
      let aux = bearer.split(" ");
      let token = "";
      console.log(token);
      if (aux[0] == "Bearer") {
        token = aux[1];
      }
      if (!token)
        return res.status(401).json({ status: false, mensagem: "No tokens?" });

      jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
        if (err) {
          console.log(err);
          return res
            .status(403)
            .json({ status: false, mensagem: "Acesso negado" });
        }
        if (req.body.name) {
          req.body.name = payload.name;
          req.body.usr = payload.usr;
          req.body.isAdmin = payload.isAdmin;
          next();
        } else {
        }
      });
    } else console.log("falhou");
    next();
  },
};