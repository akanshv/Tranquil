const mongoose=require('mongoose');
const comments=require('./comments');
const Schema=mongoose.Schema;

const FeedSchema=new Schema({
    title:String,
    likes:Number,
    topic:String,
    image:String,
    caption:String,
    description:String,
    uploaddate:Date,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    ,
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        } 
    ]
    
});
module.exports=mongoose.model('Feed',FeedSchema);