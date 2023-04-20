const { object } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');
const DoctorSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        sparse:true, /// Koi bhi errror aage aya to yahim se aayega to remove E110000
    },
    name:String,
});
DoctorSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('Admin',AdminSchema);
