
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide a username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'please provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide a password']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:String,
})

const User = mongoose.models.Users || mongoose.model('Users',userSchema)
export default User;