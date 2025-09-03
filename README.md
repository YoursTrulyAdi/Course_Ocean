# 🌊COURSE_OCEAN

###### COURSE_OCEAN helps learners access, organize, and track courses while giving admins powerful tools to manage content.
## 🚀 Features Implemented

- **User Authentication**  
  >Users can **sign up** and **sign in** using their email and password.  
   >   input format validation ensures wrong formats are not accepted.

- **Admin Authentication**  
  >Admins can **sign in** to get access to privileged features like **editing** or **deleting courses** (to be added).

- **Simple UI**  
  >Minimalistic and user-friendly interface.

- **Password Handling**  
  >Passwords are stored securely in the database using **Mongoose**.  
  >All passwords are **hashed using bcrypt** to safeguard user data from attacks.

- **Validation**
  >Input validation handled with **Zod**.

- **Networking**  
  >Frontend communicates with the backend using **Axios** to send `GET`, `POST`, etc. requests.

- **Security**  
  >Backend has **CORS support** for safe cross-origin requests.
  >Add **JWT authentication** for secure session handling.

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Axios for HTTP requests)  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Validation:** Zod  
- **Security:** bcrypt, CORS, JWT


---

## 🖼️ Screenshots (UI Example)
![Signup Page](./screenshots/signup.png)
![Signin Page](./screenshots/signin.png)
![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## ✅ Next Steps
- Add **course management features** for admins (edit/delete courses).  
- Add a **Dashboard** for users and admins.
- Improve **UI** with modern design libraries.  
- Add more **Endpoints** to add more features
- Shift to **React.js** to make it a **SPA**-Single Page Application

---

## 📌 Notes
This project demonstrates a **full-stack authentication system** with proper validation, security, and clean architecture.  
Perfect for **learning authentication flows** with MERN stack!
