//fetching and DOM updates
console.log("Hello World");

const arrow = document.querySelector("#arrow");
const target = document.querySelector("#target");
const loginBtn = document.querySelector(".login-btn");
const password = document.querySelector("#password");
const toggle = document.querySelector("#togglePassword");

//event listener
arrow.addEventListener("click", () => {
    target.scrollIntoView({
        behavior: "smooth"
    })
})

loginBtn.addEventListener("click", () => {
    window.location.href = "/frontend_files/userLogin.html";
})


toggle.addEventListener("click", () => {
  // toggle type
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  
  // optionally toggle icon
  toggle.textContent = type === "password" ? "👁️" : "🙈";
});
