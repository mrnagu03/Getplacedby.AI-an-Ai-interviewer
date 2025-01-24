let loginForm = document.querySelector(".login-box");
let signupForm = document.querySelector(".signup-box");
let login = document.querySelector(".LOGIN");
let signup = document.querySelector(".SIGNUP");
signup.addEventListener("click", function (e) {
    e.preventDefault()
    loginForm.style.display = "none"
    signupForm.style.display = "flex"

})
login.addEventListener("click", function (e) {
    e.preventDefault()
    loginForm.style.display = "flex"
    signupForm.style.display = "none"
})
