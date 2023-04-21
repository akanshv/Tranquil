const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
//middleware
const {isLoggedIn}=require('../Middlewares/authomiddleware')


var {navactive}=require('../navactive')

navactive=[0,0,0,1,0,0];


router.get('/', isLoggedIn,catchAsync(async (req, res, next) => {
    navactive=[0,0,0,1,0,0];
   
       res.render('therapy/therapyentry',{navactive,navactive:navactive})

}))


router.get('/newtherapists', isLoggedIn,catchAsync(async (req, res, next) => {
    navactive=[0,0,0,1,0,0];
       res.render('therapy/therapists',{navactive,navactive:navactive});
}))



module.exports=router;