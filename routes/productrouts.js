const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');


var {navactive}=require('../navactive')

navactive=[0,0,0,0,1,0]

//middleware
const {isLoggedIn}=require('../Middlewares/authomiddleware')

//model
const Product = require('../Models/products');


router.get('/',isLoggedIn,catchAsync(async (req, res, next) => {
    navactive=[0,0,0,0,1,0];
    const products =  await Product.find({});
    console.log(products);
    res.render('products/products',{navactive:navactive,products:products});

}))





module.exports=router;