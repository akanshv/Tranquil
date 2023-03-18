const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    Username:String,
    Signupdate:Date,
    SmileCount:Number,
  //Chat and products baad me 
    
});
module.exports=mongoose.model('User',UserSchema);