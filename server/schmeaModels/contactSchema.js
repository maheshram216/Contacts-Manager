const mongoose= require("mongoose");


const contactinfo=new mongoose.Schema({
    name:{type:String},
    designation:{type:String},
    company:{type:String},
    industry:{type:String},
    email:{type:String},
    phonenumber:{type:String},
    country:{type:String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


const usercontact = mongoose.model("UserContactInfo", contactinfo)
module.exports=usercontact;