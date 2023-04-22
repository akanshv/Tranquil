const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
//middleware
const {isLoggedIn}=require('../Middlewares/authomiddleware')

//models
const experts = require('../Models/doctors');

var {navactive}=require('../navactive')

navactive=[0,0,0,1,0,0];


router.get('/',catchAsync(async (req, res, next) => {
          navactive=[0,0,0,1,0,0];
          expertarray= await experts.find({});
        //   console.log(expertarray);
          res.render('therapy/therapyentry',{expertarray:expertarray,navactive:navactive})

}))





module.exports=router;