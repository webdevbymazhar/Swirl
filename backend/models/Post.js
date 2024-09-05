const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    userId : {
        type:"String",
        required:true
    },
    content : {
        type:String,
        required:true
    },
    image:{
        type:String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'swirl-users' 
    }],
    comments:[
       {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"swirl-users",
            required:true
        },
        content:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default : Date.now
        }
       }
    ]
},{timestamps:true})

const postModel = new mongoose.model("swirl-posts",postSchema)
module.exports = postModel