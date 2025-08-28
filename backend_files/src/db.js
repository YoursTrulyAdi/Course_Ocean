const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    name: {type: String}
})



const userModel = mongoose.model("users", User);



module.exports = userModel;