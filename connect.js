const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/MERN")
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