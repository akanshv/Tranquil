const mongoose=require('mongoose');
const comments=require('./comments');
const Schema=mongoose.Schema;
const { object } = require('joi');

const ExpertScheduleSchema=new Schema({
    userid:{type:String,default:'null'},
    doctorid:String,
    Date:String,
    Time:String,
    status:{type:String,enum:['pending','accept','refused'],default:'refused'}
})
module.exports=mongoose.model('Cart',ExpertScheduleSchema);