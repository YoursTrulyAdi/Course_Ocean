const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const z = require("zod");
const cors = require("cors");
require("dotenv").config();

//importing schemas
const {userModel, adminModel} = require("./db");

//declaring schemas for zod
const signupSchemaUser = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(6).max(100),
    name: z.string().min(2).max(50)
});

const signinSchemaUser = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(6).max(100)
});

const signupSchemaAdmin = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(6).max(100),
    name: z.string().min(2).max(50),
    role: z.string().min(2).max(20)
});

const signinSchemaAdmin = z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(6).max(100)
});

//connecting to mongoose
mongoose.connect(process.env.MONGO_URL);

//starting app
const app = express();
app.use(express.json());

//connecting cors
app.use(cors());

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

async function adminAuth(req, res, next){
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
app.post("/api/user/signup", async (req, res) => {
    let parsed = signupSchemaUser.safeParse(req.body);

    if(!parsed.success){
        res.status(404).json({
            err: "Error: Invalid format"
        })
        return;
    }

    let {email, password, name} = parsed.data;

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

app.post("/api/user/signin", async (req, res) => {
    let parsed = signinSchemaUser.safeParse(req.body);

    if(!parsed.success){
        res.status(404).json({
            err: "Error: Invalid format"
        })
        return;
    }

    let {email, password} = parsed.data;

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

app.post("/api/user/course", userAuth, (req, res) => {
    res.json({
        msg: "This is purshaseCourse",
        userId: req.userId
    })
})

app.get("/api/user/course", (req, res) => {
    res.json({
        msg: "This is viewCourse"
    })
})


//admin endpoints
app.post("/api/admin/signup", async (req, res) => {
    let parsed = signupSchemaAdmin.safeParse(req.body);

    if(!parsed.success){
        res.status(404).json({
            err: "Error: Invalid format"
        })
        return;
    }

    let {email, password, name, role} = parsed.data;

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

app.post("/api/admin/signin", async (req, res) => {
    let parsed = signinSchemaAdmin.safeParse(req.body);

    if(!parsed.success){
        res.status(404).json({
            err: "Error: Invalid format"
        })
        return;
    }
    let {email, password} = parsed.data;

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

//send a post request to create a course - functionality(endpoints) to add for improvement
app.post("/api/admin/course", adminAuth, (req, res) => {
    res.json({
        msg: "This is createCourse",
        userId: req.userId
    })
})

app.delete("/api/admin/course", (req, res) => {
    res.json({
        msg: "This is deleteCourse"
    })
})

app.put("/api/admin/course", (req, res) => {
    res.json({
        msg: "This is addCourseContent"
    })
})

app.listen(process.env.PORT);