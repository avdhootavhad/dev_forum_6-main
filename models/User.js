const mongoose=require('mongoose')
var autoIncrement=require('mongoose-auto-increment')
const schema=mongoose.schema

const userSchema=new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
        //trim:true
    },
    password:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 1024
        
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:false
    }
})
autoIncrement.initialize(mongoose.connection)
userSchema.plugin(autoIncrement.plugin,'User')
const User=mongoose.model('User',userSchema)
module.exports=User
