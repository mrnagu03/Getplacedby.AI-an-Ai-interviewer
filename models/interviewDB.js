const mongooes = require("mongoose");
const connect = mongooes.connect("mongodb://localhost:27017/login-form");



const interviewSchema = mongooes.Schema({
    jobRole: {
        type: String,
        require: true
    },
    skills: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    experience: {
        type: Number,
        require: true
    },
    jsonMockResponce: {
        type: String

    },
    mockId: {
        type: String
    }

})
const interviewDatas = new mongooes.model("interview", interviewSchema)
module.exports = interviewDatas;

