//fetching and DOM updates
const arrow = document.querySelector("#arrow");
const target = document.querySelector("#target");
const loginBtn = document.querySelector(".login-button button");
const courseCards = document.querySelectorAll(".course-card");

//event listeners
arrow.addEventListener("click", () => {
    target.scrollIntoView({
        behavior: "smooth"
    })
})

loginBtn.addEventListener("click", () => {
    window.location.href = "/frontend_files/userSignin.html";
})

//course scale increase and decrease
courseCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "transform 0.3s"; // optional, for smooth animation
    });
    
    card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)"; // reset when mouse leaves
    });

    card.addEventListener("click", () => {
        alert("Sign In To View Your Courses!🌊")
    })
})

//Implementation of hamburger menu functionality
const hamburger_div = document.querySelector(".nav-contents")
const menu = document.querySelector("#menu")
const cross = document.querySelector("#cross")
menu.addEventListener('click', ()=>{
    hamburger_div.classList.toggle('active')
})
cross.addEventListener('click', ()=>{
    hamburger_div.classList.toggle('active')
})
