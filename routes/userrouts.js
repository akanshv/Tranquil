const express = require('express');
const app = express();
var { navactive } = require('../navactive');
router = express.Router();
session = require('express-session')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//model
const feed = require('../Models/feed');
const User = require('../Models/user');

// error class
const ExpressError = require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');

//database calling
const { inserttable, checktable, result } = require('../Sqlitedb/database');
var loginerrori;
var regerrori;

const passport = require('passport');



router.get('/login', ((req, res, next) => {
    navactive = [0, 0, 0, 0, 0, 1];
    res.render('user/login', { navactive: navactive, loginerrori: loginerrori });
    //console.log('anmol');
}))

router.get('/register', ((req, res, next) => {
    navactive = [0, 0, 0, 0, 0, 1];
    res.render('user/register', { navactive: navactive, regerrori: regerrori });
    //console.log('anmol');
}))



router.post('/register', catchAsync(async(req,res)=>{
        try{
            const {username,password,email,pfp}=req.body.register;
            const user=new User({username,email,pfp});
            console.log(user);
            const registerdUser=await User.register(user,password);
            req.login(registerdUser,err=>{
                if(err) return next(err);
                req.flash('success','welcome to Tranquil!');
                if(req.session.returnTo){
                    if(req.session.postrequest){
                         
                    }
                    else{
                        return res.redirect(req.session.returnTo);
                    }
                }
                return res.redirect('/home');
            })
            //console.log(registerdUser);
        }
        catch(e){
            req.flash('error',e.message);
            res.redirect('/register');
        }
    }


));



router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), catchAsync(
    async(req,res)=>{
    //    if(req.session.postloggedIn){
    //         //console.log("anmol");
    //         req.flash('suceess',"Thanks for reviewing")
    //         url=`/campgrounds/${req.session.campid}`
    //         req.session.postloggedIn=false;
    //         const campground =await Campground.findById(req.session.campid);
    //         const review=new  Review(req.session.review);
    //         review.author=req.user._id;
    //         // console.log(review);
    //         // console.log(review.rating);
    //         // console.log(review.body);
    //         campground.reviews.push(review);
    //         await review.save();
    //          await campground.save();
    //         res.redirect(url);
    
    //     }

    if(req.session.returnTo){
        if(req.session.postrequest){

        }
        else{
            req.flash('success',"You logged in Succesfully");
            return res.redirect(req.session.returnTo);
        }
    }
    req.flash('success',"You logged in Succesfully");
        redir='/home'
       // console.log(req.session);
        res.redirect(redir);
    }
))


router.get('/userprofile',(req, res) => {
    navactive=[1,0,0,0,0,0];
    res.render('userprofile',{navactive:navactive})
})


router.get("/logout", catchAsync(
    async(req, res, next) =>{
        req.logout(function(err) {
          if (err) {
            req.flash('error',"error in logout");
            return next(err);
          }
          req.flash('success',"You logged out successfully");
          res.redirect('/home');
        });
    }
));




// router.post('/login',catchAsync(async(req,res)=>{
//     username=req.body.user.username;
//     password=req.body.user.password;
//     checktable(username,password).then(d => {
//         req.session.loginno=1; 
//         delete req.session.regerror;
//         delete req.session.loginerror;
//        // console.log(d);
//         res.status(200).redirect('/home')
//     })
//     .catch(err => {
//         //alert('wrong credentials');
//         req.session.loginerror='Oops wrong credentials';
//         loginerrori=req.session.loginerror;
//         res.render('user/login',{navactive:navactive,loginerrori:loginerrori})
//         //console.log(err);
//         // //err -> OOPS
//         // res.status(404).json({
//         //     status:err
//         // })

//     })
// }))






// router.post('/login',catchAsync(async(req,res)=>{
//     email=req.body.user.email;
//     password=req.body.user.password;
//     if (!(password&&email)) {
//         req.flash('error','All fields are necessary');
//         res.redirect('/login');
//     }
//      // Validate if user exist in our database
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.Password))) {
//         // Create token
//         const token = jwt.sign(
//           { user_id: user._id, email },
//           process.env.TOKEN_KEY,
//           {
//             expiresIn: "2h",
//           }
//         );
//         res.cookie('TranquilCookie',token,{
//             expires:new Date(Date.now()+1000*60*60*2),
//             httpOnly:true
//         }).status(200)


//       }
//       res.status(400).send("Invalid Credentials");


// }))

// router.get('/logout',(req,res,next)=>{
//     req.session.destroy();
//     regerrori='';
//     loginerrori='';
//     res.redirect('/home');
// })


// // router.post('/register',catchAsync(async(req,res)=>{
// //     sname=req.body.register.name
// //     username=req.body.register.username;
// //     password=req.body.register.password;
// //     console.log(req.body);
// //     inserttable(sname,username,password).then(d => {
// //         req.session.loginno=1; 
// //         delete req.session.loginerror;
// //         delete req.session.regerror;
// //         res.status(200).redirect('/home')
// //     })
// //     .catch(err => {
// //         console.log(err);
// //         console.log(typeof(err));
// //         req.session.regerror="Oops this username is taken.....take any other username";
// //         regerrori=req.session.regerror;

// //         //err -> OOPS
// //         res.render('user/register',{navactive:navactive,regerrori:regerrori})
// //         // res.status(404).json({
// //         //     status:err
// //         // })

// //     })

// router.post('/register',catchAsync(async(req,res)=>{
//     email=req.body.register.email
//     username=req.body.register.username;
//     password=req.body.register.password;
//     pfp='https://i.imgur.com/T2Aoapu.jpg';
//      // Validate user input
//     if (!(email && password && username &&pfp)) {
//         req.flash('error','All fields are necessary');
//         res.redirect('/register');
//     }
//    // check if user already exist
//    // Validate if user exist in our database
//       const oldUser = await User.findOne({ email });

//       if (oldUser) {
//         req.flash('error','User Already Exists.....Please Login');
//         res.redirect('/login');
//       }

//       //Encrypt user password
//         encryptedPassword = await bcrypt.hash(password, 10);

//       // Create user in our database
//         const user = await User.create({
//         UserName:username,
//         SmileCount:0,
//         commentlike:0,
//         Email: email,// sanitize: convert email to lowercase
//         Password: encryptedPassword,

//       });
//       await user.save();
//       // Create token
//         const token = jwt.sign(
//         { user_id: user._id, email },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "2h",
//         }

//       );
//       res.cookie('TranquilCookie',token,{
//         expires:new Date(Date.now()+1000*60*60*2),
//         httpOnly:true
//     }).status(200)

//       // return new user
//     //   res.status(201).json(user);
//     req.flash('success','Login Done...Welcome User');
//     res.redirect('/home');

// }))




module.exports = router;