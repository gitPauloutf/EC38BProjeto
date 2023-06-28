const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    usr: String,
    name: String,
    pw: String,
    isAdmin: String
})
const UserModel = mongoose.model("User", UserSchema)

async function getByName(nome) {
    return await UserModel.findOne({ name: nome }).lean()
}

async function getByUsr(nome) {
    return await UserModel.findOne({ usr: nome }).lean()
}

async function list() {
    return await UserModel.find().lean()
}

async function del(usr) {
    return await UserModel.deleteOne({ usr: usr })
}
async function alter(usr, newusr) {
    return await UserModel.updateOne({ usr: usr }, { $set: newusr })
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
        return [{ usr: obj.usr, name: obj.name, isAdmin: obj.isAdmin }, err]
    },
    reg: async function (usr, name, pw, isAdmin) {
        obj = await getByUsr(usr)
        console.log('a')
        let err = null
        if (!obj) {
            obj = await getByName(name)
            console.log('b '+ obj)
            if (!obj) {
                const user = new UserModel({
                    usr: usr,
                    name: name,
                    pw: pw,
                    isAdmin: isAdmin
                })
                console.log('c')
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