const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

//importing schemas
const userModel = require("./db");

//connecting to mongoose

mongoose.connect(process.env.MONGO_URL);

//starting app
const app = express();
app.use(express.json());

//declaring jwt_secret
const JWT_SECRET = process.env.JWT_SECRET;

//authentication middlewares
async function userAuth(req, res, next){
    let token = req.headers.authorization;

    let decoded = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findOne({
        email: decoded.email
    })

    if(user){
        req.userId = user._id;

        next();
    }
    else{
        res.status(404).json({
            err: "Error: Unauthorized"
        })
    }
}

function adminAuth(){

}


//user endpoints
app.post("/userSignup", async (req, res) => {
    let {email, password, name} = req.body;

    //check if user already exists
    let user = await userModel.findOne({
        email: email
    })

    if(user){
        res.status(404).json({
            err: "User already exists!"
        })
        return;
    }

    //main
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    await userModel.create({
        email: email,
        password: hashedPassword,
        name: name
    })

    res.json({
        msg: "User sign up Successfull"
    })
})

app.post("/userLogin", async (req, res) => {
    let {email, password} = req.body;

    const user = await userModel.findOne({
        email: email
    })

    if(user){
        //check if password is correct or not
        let isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            res.status(404).json({
                err: "Error: Password is incorrect"
            })
            return;
        }

        //generate token
        let token = jwt.sign({
            email: email
        }, JWT_SECRET);

        res.json({
            msg: "User login Successfull",
            token: token
        })
    }
    else{
        res.status(404).json({
            err: "Error: Invalid Credentials"
        })
    }
})

app.post("/purshaseCourse", userAuth, (req, res) => {
    res.json({
        msg: "This is purshaseCourse",
        userId: req.userId
    })
})

app.get("/viewCourse", (req, res) => {
    res.json({
        msg: "This is viewCourse"
    })
})


//admin endpoints
app.post("/adminSignup", (req, res) => {
    res.json({
        msg: "This is adminSignup"
    })
})

app.post("/adminLogin", (req, res) => {
    res.json({
        msg: "This is adminLogin"
    })
})

app.post("/createCourse", userAuth, (req, res) => {
    res.json({
        msg: "This is createCourse"
    })
})

app.delete("/deleteCourse", (req, res) => {
    res.json({
        msg: "This is deleteCourse"
    })
})

app.post("/addCourseContent", (req, res) => {
    res.json({
        msg: "This is addCourseContent"
    })
})


app.listen(process.env.PORT);