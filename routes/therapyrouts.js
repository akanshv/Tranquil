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

router.get('/:no',catchAsync(async(req,res)=>{
  navactive=[0,0,0,1,0,0]
  type=req.params.no;
  console.log(typeof(type));
  doctor = await experts.find({});
  let expertarray=[];
  if(type ==='1'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Relationship")){
        expertarray.push(doc);
      }
    }
    console.log(expertarray)
  }
  else if(type==='2'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Work Stress")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='3'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Teen Problems")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='4'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Substance Abuse")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='5'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Sexual Abuse")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='6'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Harrassment")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='7'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Loneliness")){
        expertarray.push(doc);
      }
    }  }
  else if(type==='8'){
    for (let doc of doctor) {
      if(doc.ExpertsIn.includes("Anxiety")){
        expertarray.push(doc);
      }
    }  }
  else{
      return res.redirect('/therapy');
  }

  res.render('therapy/therapyentry', {expertarray:expertarray,navactive:navactive});

}))




module.exports=router;