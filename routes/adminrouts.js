const express = require('express');
const app = express();
router=express.Router();
const administer = require('../Models/admin');
// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
const bcrypt=require('bcrypt');

var {navactive}=require('../navactive')

navactive=[0,0,0,0,1,0]

//middleware
const {isLoggedIn}=require('../Middlewares/authomiddleware')

//model
const Product = require('../Models/products');
const doc = require('../Models/doctors');
const feed = require('../Models/feed')


router.get('/adminlogin',(req, res) => {
    navactive=[1,0,0,0,0,0];
    res.render('adminlogin',{navactive:navactive})
})
router.post('/adminlogin',catchAsync(async(req, res) => {
    email=req.body.email;
    password=req.body.password;
    console.log(email);
    console.log(password);
    if (!(password&&email)) {
        req.flash('error','All fields are necessary');
        return res.redirect('/admin/adminlogin');
    }
    
    // Validate if user exist in our database
    const admin= await administer.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.hash))){
        if(req.session.passport){
            delete req.session.passport;
        }
        if(req.session.doctorid){
            delete req.session.doctorid;
        }
        req.session.adminid=admin._id;
        console.log(req.session.adminid);
        res.redirect('/admin/adminprofile');
    }
    else{
        req.flash('error','Mismatched Credential');
        return res.redirect('/admin/adminlogin');
    }
}))

router.get('/adminprofile',catchAsync(async(req, res) => {
    if(req.session.adminid){
        const admini= await administer.findById( req.session.adminid );
        const docs = await doc.find({})
        const feeds = await feed.find({}).populate('author')
        navactive=[1,0,0,0,0,0];
        res.render('adminprofile',{navactive:navactive,admini:admini, docs:docs, feeds:feeds})
    }
    else{
        req.flash('error','You need to first login');
        return res.redirect('/admin/adminlogin');
    }
    
}))

router.get('/adminproductsmanage',catchAsync(async(req,res) =>{
    if(req.session.adminid){
        const prod = await Product.find({})
        navactive=[1,0,0,0,0,0];
        res.render('adminproductsmanage',{navactive:navactive, prod:prod})
    }
    else{
        req.flash('error','You need to first login');
        return res.redirect('/admin/adminlogin');
    }
}))



 


module.exports=router;