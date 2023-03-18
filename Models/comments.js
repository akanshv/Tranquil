const mongoose=require('mongoose');
const comments=require('./comments');
const Schema=mongoose.Schema;

const CommentSchema=new Schema({
    comlikes:Number,
    body:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    date:String
});
module.exports=mongoose.model('Comment',CommentSchema);