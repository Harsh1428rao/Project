const mongoose=require("mongoose");
require('dotenv').config();

const mongoURI=process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then(()=>{
    console.log("Connection succesful");
}).catch((err)=>{
    console.log(`No connection ${err}`)
})

const User = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true
    }
    })
const Student = mongoose.model("Table", User);
module.exports = Student;