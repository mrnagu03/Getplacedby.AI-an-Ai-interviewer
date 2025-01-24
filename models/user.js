

const mongooes = require("mongoose");
const connect = mongooes.connect("mongodb://localhost:27017/login-form");

connect.then(() => {
    console.log("Database is Connected");

})
    .catch(() => {
        console.log("Database is not connected");

    })

const loginSchema = mongooes.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
const collections = new mongooes.model("users", loginSchema)
module.exports = collections;


