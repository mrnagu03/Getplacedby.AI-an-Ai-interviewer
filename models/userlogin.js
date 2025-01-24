const mongooes = require("mongoose")
const connect = mongooes.connect("mongodb://localhost:27017/login-form");

const userLoginSchema = mongooes.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})
const loginCollections = new mongooes.model("Login", userLoginSchema)
module.exports = loginCollections;