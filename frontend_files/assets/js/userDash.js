const courseCards = document.querySelectorAll(".course-card");
const signoutbtn = document.querySelector(".signout-btn");
const username = document.querySelector(".user-name");

const player = document.getElementById("yt-player");
const modal = document.getElementById("videoModal");
const closeBtn = document.getElementById("closeModal");


const token = localStorage.getItem("token");

axios.get("http://localhost:3000/api/user/name", {
    headers: {
        Authorization: `Bearer ${token}`
  }
})
.then(res => {
    console.log("User:", res.data.name);
    username.textContent = "Welcome Back, " + res.data.name;

})
.catch(err => {
    console.error("Error:", err);
});




//course scale increase and decrease
courseCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "transform 0.3s";
    });
    
    card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
    });
})

signoutbtn.addEventListener("click", () => {
    alert("✅ Successfully Signed Out!");
    window.location.href = ("/frontend_files/index.html")
});



//iframe logic
courseCards.forEach(card => {
  card.addEventListener("click", () => {
    const videoId = card.getAttribute("data-video");

    // Set iframe src
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Show modal
    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  player.src = ""; // stop video
});

// close if user clicks outside video
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    player.src = "";
  }
});