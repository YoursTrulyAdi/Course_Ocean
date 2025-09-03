const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    name: {type: String}
})

const Admin = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    name: {type: String},
    role: {type: String}
})

const userModel = mongoose.model("users", User);
const adminModel = mongoose.model("admins", Admin);

module.exports = {
    userModel: userModel,
    adminModel: adminModel
};