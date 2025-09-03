// const axios = require("axios");


//fetching and DOM updates
const arrow = document.querySelector("#arrow");
const target = document.querySelector("#target");
const loginBtn = document.querySelector(".login-button button");

//forms
const userSigninForm = document.querySelector("#userSigninForm");
const userSignupForm = document.querySelector("#userSignupForm");
const adminSigninForm = document.querySelector("#adminSigninForm");

//event listener
arrow.addEventListener("click", () => {
    target.scrollIntoView({
        behavior: "smooth"
    })
})

loginBtn.addEventListener("click", () => {
    window.location.href = "/frontend_files/userSignin.html";
})


//using axios
userSigninForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        email: document.querySelector("#userSigninEmail").value,
        password: document.querySelector("#userSigninPassword").value
    };

    try {
        const response = await axios.post("http://localhost:5000/api/users/login", data);
        console.log(response.data);

        alert("Login successful!");

        // store token if backend sends it
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard.html";
    } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Login failed: " + (error.response?.data?.message || "Server error"));
    }
});