const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    usr: String,
    name: String,
    pw: String,
    isAdmin: String,
    timeslogged: Number
})
const UserModel = mongoose.model("User", UserSchema)

async function getByName(nome) {
    return await UserModel.findOne({ name: nome }).lean()
}

async function getByUsr(nome) {
    return await UserModel.findOne({ usr: nome }).lean()
}

async function list() {
    tmp = await UserModel.find().lean()
    tmp = tmp.map(item => {delete item.pw
            return item})
    return tmp
}

async function del(usr) {
    tmp = await UserModel.deleteOne({ usr: usr })
    if (tmp.acknowledged>0) return [1,0]
    else return [0,'Falha na operacao']
}
async function alter(usr, newusr) {
    tmp = await UserModel.updateOne({ usr: usr }, {$set:{ usr: newusr.usr, name: newusr.name, isAdmin: newusr.isAdmin }})
    if (tmp.modifiedCount>0) return [1,0] 
    else return [0,'Falha na operacao']
}
module.exports = {
    getByName, getByUsr, list, del, alter,

    log: async function (usr, pw) {
        obj = await getByUsr(usr)
        let err
        if (!obj) {
            err = "User not found"
            return [0, err]
        }
        if (obj.pw != pw) {
            err = "Wrong password"
            return [0, err]
        }
        tmp = await UserModel.updateOne({ usr: usr }, {$inc:{ timeslogged: 1 }})
        if (tmp.modifiedCount>0) 
        else return [0,'Falha na operacao']
        return [{ usr: obj.usr, name: obj.name, isAdmin: obj.isAdmin }, err]
    },
    getlogs: async function (usr){
        obj = await getByUsr(usr)
        if (obj) {
            res.status(200)
            return obj.timeslogged
        } else {
            res.status(403)
            return
        }
    },
    reg: async function (usr, name, pw, isAdmin) {
        obj = await getByUsr(usr)
        let err = null
        if (!obj) {
            obj = await getByName(name)
            if (!obj) {
                const user = new UserModel({
                    usr: usr,
                    name: name,
                    pw: pw,
                    isAdmin: isAdmin,
                    timeslogged: 0
                })
                if (usr == 'admin') user.isAdmin = 'Admin'
                await user.save()
                return [1,0]
            } else {
                err = "Name already exists"
            }
        } else err = "User already exists"
        return [0,err]
    }
}
