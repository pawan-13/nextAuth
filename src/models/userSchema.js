import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please provide a username"],
        trim:true,
        unique:true,
    },
    email : {
        type : String,
        required : [true,"Please provide a email"],
        trim:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        },
        unique:true,
    },
    password : {
        type : String,
        required : [true,"Please provide a password"],
        unique:true,
        minlength:6,
    },
    // isValid:{
    //     type:Boolean,
    //     default:false,
    // },
    // isAdmin:{
    //     type:Boolean,
    //     default:false,
    // },
    // forgotPasswordToken:String,
    // forgotPasswordTokenExpiry:Date,
    // verifyToken:String,
    // verifyTokenExpiry:Date,
});

const userdb = mongoose.models.users || new mongoose.model('users',userSchema);
export default userdb;