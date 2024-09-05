const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/dldvsz19p/image/upload/v1724669056/swirl-profile-pictures/default_rnzot7.jpg"
    },
    coverImg:{
        type:String,
        default: "https://res.cloudinary.com/dldvsz19p/image/upload/v1724669250/swirl-profile-pictures/default_ktikcn.jpg"
    },
    bio:{
       type:String,
       default: "hey there , I'm swirl user."
    },
    country:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    posts:[
        {type:mongoose.Schema.Types.ObjectId,ref:"swirl-posts"}
    ],
    followers:[
        {type:mongoose.Schema.Types.ObjectId,ref:"swirl-users"}
    ],
    following:[
        {type:mongoose.Schema.Types.ObjectId,ref:"swirl-users"}
    ],
    notifications:[
        {
            user:{
                type:Object,
                required:true
            },
            message:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})

const userModel = mongoose.model("swirl-users",UserSchema)
module.exports = userModel