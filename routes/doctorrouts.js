const express = require('express');
const app = express();
router = express.Router();

// error class
const ExpressError = require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');

const multer = require('multer');
const uploads = multer({ dest: 'routes/uploads' });

//imagur
const imgurUploader = require('imgur-uploader');



var { navactive } = require('../navactive')
navactive = [0, 0, 0, 0, 1, 0]

//middleware
const { isLoggedIn,isDoctorloggedin} = require('../Middlewares/authomiddleware')

//model
const experts = require('../Models/doctors');
const tempdoct = require('../Models/temp-doctors');
const User=require('../Models/temp-doctors');










router.get('/expertlogin',(req, res) => {
    navactive=[1,0,0,0,0,0];
    res.render('therapy/doctorlogin',{navactive:navactive})
})

router.post('/expertlogin',catchAsync(async (req,res)=>{
    navactive=[1,0,0,0,0,0];
    email=req.body.email;
    password=req.body.password;
    if (!(password&&email)) {
        req.flash('error','All fields are necessary');
        return res.redirect('/expert/expertlogin');
    }
    
    // Validate if user exist in our database
    const doctor = await experts.findOne({ email });
    if (doctor && (await bcrypt.compare(password, doctor.hash))){
        req.session.doctorid=doctor._id;
        res.redirect('/expert/expertprofile');
    }
    else{
        req.flash('error','Mismatched Credential');
        return res.redirect('/expert/expertlogin');
    } 
}))

//yahan image lagani hai


router.get('/newtherapists', catchAsync(async (req, res, next) => {
    navactive = [0, 0, 0, 1, 0, 0];
    res.render('therapy/therapists', {navactive: navactive});
}))

router.post('/newtherapists', catchAsync(async (req, res, next) => {
    password = req.body.doctor.password;
    arr = [];
    if (req.body.doctor.Sub) {
        arr.push('Substance Abuse')
    }
    if (req.body.doctor.rel) {
        arr.push('Relationship')
    }
    if (req.body.doctor.Wor) {
        arr.push('Work Stress')
    }
    if (req.body.doctor.Teen) {
        arr.push('Teen Problems')
    }
    if (req.body.doctor.Sex) {
        arr.push('Sexual Abuse')
    }
    if (req.body.doctor.Harr) {
        arr.push('Harrassment')
    }
    if (req.body.doctor.Lon) {
        arr.push('Loneliness')
    }
    if (req.body.doctor.Anxiety) {
        arr.push('Anxiety')
    }
    console.log(req.body.doctor.password);
    email = req.body.doctor.email
    console.log(email);
    console.log(arr);
    Name=req.body.doctor.Name;
    yoe=req.body.doctor.yoe;
    document=req.body.doctor.document;
    pfp=req.body.doctor.image;
    charge=req.body.doctor.charge;

    // check if user already exist
    // Validate if user exist in our database
    const tempdoc = await tempdoct.findOne({ email });
    const expert = await experts.findOne({ email });
    if (tempdoc) {
        req.flash('error', 'Your Request is due with Admin, please wait');
        return res.redirect('/expert/newtherapists');
    }
    if (expert) {
        req.flash('error', 'Your Account Already Exists.....Please Login');
        return res.redirect('/expert/expertlogin');
    }




    // // //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // const tempdoctor = new tempdoct({
    //     email: email,
    //     Name: Name,
    //     hash: encryptedPassword,
    //     ExpertsIn: arr,
    //     Charge: charge,
    //     Experience: yoe,
    //     pfp: pfp,
    //     document: document
    // });
    // console.log(tempdoctor);
    const experter = new experts({
        email: email,
        Name: Name,
        hash: encryptedPassword,
        ExpertsIn: arr,
        Charge: charge,
        Experience: yoe,
        pfp: pfp,
        document: document
    });
    console.log(experter);
    await experter.save();
    const doctor = await experts.findOne({ email });
    req.session.doctorid=doctor._id;
    res.redirect('/expert/expertprofile');

}))








router.get('/expertprofile',(req, res) => {
    navactive=[1,0,0,0,0,0];
    console.log(req.session.doctorid);
    res.render('doctorprofile',{navactive:navactive})
})









module.exports = router;