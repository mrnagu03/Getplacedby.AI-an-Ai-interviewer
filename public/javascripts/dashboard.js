let interviewBox = document.querySelector(".dashboard-box-1");


let interviewButton = document.querySelector(".new-interview");
let questionButton = document.querySelector(".pre-interview-que");
let aiMaterialButton = document.querySelector(".ai-material");
let aiCoachButton = document.querySelector(".ai-coach");
let speakToRecruitersButton = document.querySelector(".ai-recruiters");
let helpCenterButton = document.querySelector(".help-center");


//interview detail box toggleing

let startInterviewButton = document.querySelector(".start");
let interviewDatailsBox = document.querySelector(".interview-details");
let interviewDatailsStyle = interviewDatailsBox.getAttribute('style')
startInterviewButton.addEventListener("click", () => {
    interviewDatailsBox.classList.toggle('active')


})
let go = document.querySelector(".button");
go.addEventListener("load", () => {
    go.style.color = "black"
})
