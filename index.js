const express = require("express")
const app = express();
const getUserMedia = require('getusermedia');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config()
const { v4: uuidv4 } = require('uuid');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const path = require("path");
const bcrypt = require("bcrypt");
//signUpSchema Database
const collections = require("./models/user");
//interviewData Schema Database
const interviewDatas = require("./models/interviewDB");
//LoginSchema Database
const loginCollections = require("./models/userlogin");
const { chatSession } = require("./models/GeminiAi");
const GeminiAi = require("./models/GeminiAi.js");
const { date } = require("drizzle-orm/mysql-core");
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/login', (req, res) => {
    res.render("login")

})
app.get('/signup', (req, res) => {
    res.render("signup")

})
app.get('/', (req, res) => {
    res.render("home")
})
app.get('/dashboard', async (req, res) => {

    res.render("dashboard")
})



app.post("/log", (req, res) => {

    res.redirect("login")
})
app.post("/login", async (req, res) => {

    const loginData = {
        email: req.body.email,
        password: req.body.password,
    }
    const valid = await collections.findOne({ email: loginData.email });
    if (valid) {
        const matchPassword = await bcrypt.compare(loginData.password, valid.password)
        if (matchPassword) {
            res.redirect("dashboard");
        } else {
            res.redirect("login");

        }
    } else {
        res.redirect("login");
    }


})

let signUpData;

app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }

    // console.log(data)
    const hashedPassword = await bcrypt.hash(data.password, 10)

    data.password = hashedPassword;
    const userdata = await collections.insertMany(data);
    signUpData = userdata;
    console.log(userdata)
    res.redirect("login")


});

var interviewResult;
app.post("/interview", async (req, res) => {
    const dataInterview = { jobRole, skills, discription, experience } = req.body;
    const prompt = "Job Role:" + jobRole + " ,skills:" + skills + ",Job Discription:" + discription + ",Experience:" + experience + " years ,based on this information give " + process.env.QUESTION_COUNT + " interview questions along with answeres in Json format, Give Question and Answere as field in Json";


    try {
        const result = await model.generateContent(prompt);

        res.redirect("interview")
        const mockJsonResponce = (result.response.text()).replace("```json", "").replace("```", "");

        const parse = JSON.parse(mockJsonResponce);

        console.log(parse.length)
        interviewResult = parse;

        const arr = Object.values(parse);
        console.log("que1:", arr[0])
        const newData = {
            mockId: uuidv4(),
            jobRole: jobRole,
            skills: skills,
            discription: discription,
            experience: experience,
            jsonMockResponce: mockJsonResponce
        }
        const interviewdata = await interviewDatas.insertMany(newData);
        console.log(interviewdata);

        const insertedId = {

            mockId: newData.mockId,
        }
        console.log("insertedId", insertedId);

    } catch (err) {
        console.log(err);

    }
})

app.get('/interview', (req, res) => {

    const activeIndex = 0;
    res.render("interview", { interviewResult, activeIndex });
})
let AiMaterialinfo;

app.post("/Ai-material", async (req, res) => {
    const topic = req.body.topic;
    const materialPrompt = "Generate in detail notes on" + topic + "notes should include detail introduction, Core components, limitations,some  interview questions, and conclusion in Json format give introduction,core components,limitations and questions as field in JSON .";
    try {
        const materialResult = await model.generateContent(materialPrompt);
        const Responce = (materialResult.response.text()).replace("```json", "").replace("```", "");

        AiMaterialinfo = Responce;
        console.log(Responce);

        res.redirect("/dashboard/notes")

    } catch (err) {
        console.log(err)
    }


})
app.get("/dashboard/notes", (req, res) => {
    res.render("aimaterial", { AiMaterialinfo })
})



app.listen(3000);