const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
const bcrypt=require('bcrypt');

const multer=require('multer');
const uploads=multer({dest:'routes/uploads'});


//imagur
const imgurUploader = require('imgur-uploader');



var {navactive}=require('../navactive')

navactive=[0,0,0,0,1,0]

//middleware
const {isLoggedIn}=require('../Middlewares/authomiddleware')

//model
const Product = require('../Models/products');
const experts=require('../Models/doctors');

router.get('/newtherapists',catchAsync(async (req, res, next) => {
    navactive=[0,0,0,1,0,0];
    res.render('therapy/therapists',{navactive,navactive:navactive});
}))

router.post('/newtherapists',uploads.single('Image'),uploads.single('document'),catchAsync(async(req,res,next)=>{
    navactive=[0,0,0,1,0,0];
    password=req.body.doctor.password;
    email=req.body.doctor.email
// Validate user input
    if (!(email && password && pfp )) {
        req.flash('error','All fields are necessary');
        res.redirect('expert/newtherapist');
    }
// check if user already exist
// Validate if user exist in our database
    const tempdoc = await tempdoc.findOne({ email });
    const doc = await doctor.findOne({ email });
    if (tempdoc){
        req.flash('error','Your Request is due with Admin, please wait');
        return res.redirect('expert/newtherapist');
    }
    else if(doc){
        req.flash('error','Your Account Already Exists.....Please Login');
        return res.redirect('expert/login');
    }

    


//Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    const tempdoctor = await tempdoctor.create({
        email:email,
        Name:req.body.doctor.name,
        Email: email,// sanitize: convert email to lowercase
        hash: encryptedPassword,
        ExpertsIn:[],
        Charge:req.body.doctor.charge,
        Experience:req.body.doctor.Exp,
        pfp:
        document:

      });
      await user.save();
    
}))




router.get('/',catchAsync(async (req, res, next) => {
    navactive=[0,0,0,0,1,0];
    const products =  await Product.find({});
    console.log(products);
     res.render('products/products',{navactive,navactive:navactive,products:products});

}))


module.exports=router;