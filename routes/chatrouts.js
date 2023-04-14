const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');


var {navactive}=require('../navactive')

const {authorising}=require('../Middlewares/authomiddleware');

navactive=[0,0,1,0,0,0]


//model



router.get('/',authorising, catchAsync(async (req, res, next) => {
     console.log(navactive)
    //res.send("Hello from Yelpcamp");
    //yahan pe dbms se aa rha feed
     //const feeds = await feed.find({});
     //console.log(feeds);
     isloggedin=0;
    //console.log(isloggedin)
    if(1){
        isloggedin=req.session.loginno;
        res.render('chats/chatentry',{navactive,navactive:navactive,isloggedin:isloggedin});
    }
    else{
         res.redirect('login');
    }
     

}))

router.get('/peer', catchAsync(async (req, res, next) => {
    console.log(navactive)
   //res.send("Hello from Yelpcamp");
   //yahan pe dbms se aa rha feed
    //const feeds = await feed.find({});
    //console.log(feeds);
    isloggedin=0;
   //console.log(isloggedin)
   if(req.session.loginno){
       isloggedin=req.session.loginno;
       res.render('chats/chatpeer',{navactive,navactive:navactive,isloggedin:isloggedin});
   }
   else{
        res.redirect('login');
   }
    

}))


router.get('/listner', catchAsync(async (req, res, next) => {
    console.log(navactive)
   //res.send("Hello from Yelpcamp");
   //yahan pe dbms se aa rha feed
    //const feeds = await feed.find({});
    //console.log(feeds);
    isloggedin=0;
   //console.log(isloggedin)
   if(req.session.loginno){
       isloggedin=req.session.loginno;
       res.render('chats/chatlisten',{navactive,navactive:navactive,isloggedin:isloggedin});
   }
   else{
        res.redirect('login');
   }
    

}))





module.exports=router;