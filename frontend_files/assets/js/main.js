//fetching and DOM updates
const arrow = document.querySelector("#arrow");
const target = document.querySelector("#target");
const loginBtn = document.querySelector(".login-button button");


//event listeners
arrow.addEventListener("click", () => {
    target.scrollIntoView({
        behavior: "smooth"
    })
})

loginBtn.addEventListener("click", () => {
    window.location.href = "/frontend_files/userSignin.html";
})