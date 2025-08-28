const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const z = require("zod");
require("dotenv").config();

//importing schemas
const {userModel, adminModel} = require("./db");

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

async function adminAuth(){
    let token = req.headers.authorization;

    let decoded = jwt.verify(token, JWT_SECRET);

    const admin = await adminModel.findOne({
        email: decoded.email
    })

    if(admin){
        req.userId = admin._id;

        next();
    }
    else{
        res.status(404).json({
            err: "Error: Unauthorized"
        })
    }
}


//user endpoints
app.post("/user/signup", async (req, res) => {
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

app.post("/user/signin", async (req, res) => {
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

app.post("/user/course", userAuth, (req, res) => {
    res.json({
        msg: "This is purshaseCourse",
        userId: req.userId
    })
})

app.get("/user/course", (req, res) => {
    res.json({
        msg: "This is viewCourse"
    })
})


//admin endpoints
app.post("/admin/signup", async (req, res) => {
    let {email, password, name, role} = req.body;

    //check if user already exists
    let admin = await adminModel.findOne({
        email: email
    })

    if(admin){
        res.status(404).json({
            err: "Admin already exists!"
        })
        return;
    }

    //main
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    await adminModel.create({
        email: email,
        password: hashedPassword,
        name: name,
        role: role
    })

    res.json({
        msg: "Admin sign up Successfull"
    })
})

app.post("/admin/signin", async (req, res) => {
    let {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email
    })

    if(admin){
        //check if password is correct or not
        let isPasswordMatched = await bcrypt.compare(password, admin.password);

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
            msg: "Admin login Successfull",
            token: token
        })
    }
    else{
        res.status(404).json({
            err: "Error: Invalid Credentials"
        })
    }
})

//send a post request to create a course
app.post("/admin/course", adminAuth, (req, res) => {
    res.json({
        msg: "This is createCourse",
        userId: req.userId
    })
})

app.delete("/admin/course", (req, res) => {
    res.json({
        msg: "This is deleteCourse"
    })
})

app.post("/admin/course", (req, res) => {
    res.json({
        msg: "This is addCourseContent"
    })
})


app.listen(process.env.PORT);