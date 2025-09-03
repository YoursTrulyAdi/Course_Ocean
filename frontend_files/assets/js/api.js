//forms
const userSigninForm = document.querySelector("#userSigninForm");
const userSignupForm = document.querySelector("#userSignupForm");
const adminSigninForm = document.querySelector("#adminSigninForm");

//using axios
// grab the form from DOM
if (userSignupForm) {
    userSignupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.querySelector("#userSignupName").value,
            email: document.querySelector("#userSignupEmail").value,
            password: document.querySelector("#userSignupPassword").value
        };

        try {
            const response = await axios.post("http://localhost:3000/api/user/signup", data);

            console.log(response.data);
            console.log("✅ Successful Sign Up");
        } catch (error) {
            console.error("❌ Error occurred:", error.response?.data || error.message);
        }
    });
}

if (userSigninForm) {
    userSigninForm.addEventListener("submit", async (e) => {
        e.preventDefault(); //stops user from leaving fields empty

        const data = {
            email: document.querySelector("#userSigninEmail").value,
            password: document.querySelector("#userSigninPassword").value
        };

        try {
            const response = await axios.post("http://localhost:3000/api/user/signin", data);
            console.log(response.data);

            // store token if backend sends it
            localStorage.setItem("token", response.data.token);
            window.location.href = "/frontend_files/userDashboard.html";

            console.log(response.data.token);
        } catch (error) {
            console.log("Some error occured in user Signin");
        }
    });
}

//admin
if (adminSigninForm) {
    adminSigninForm.addEventListener("submit", async (e) => {
        e.preventDefault(); //stops user from leaving fields empty

        const data = {
            email: document.querySelector("#adminSigninEmail").value,
            password: document.querySelector("#adminSigninPassword").value
        };

        try {
            const response = await axios.post("http://localhost:3000/api/admin/signin", data);
            console.log(response.data);

            // store token if backend sends it
            localStorage.setItem("token", response.data.token);
            window.location.href = "/frontend_files/adminDashboard.html";

            console.log(response.data.token);
        } catch (error) {
            console.log("Some error occured in user Signin");
        }
    });
}