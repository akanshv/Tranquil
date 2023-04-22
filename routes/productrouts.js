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
const cart=require('../Models/cart');
const user=require('../Models/user');


router.get('/',isLoggedIn,catchAsync(async (req, res, next) => {
    navactive=[0,0,0,0,1,0];
    const products =  await Product.find({});
    //console.log(products);
    res.render('products/products',{navactive:navactive,products:products});

}))

router.post('/addtocart',catchAsync(async(req,res,next)=>{
    navactive=[0,0,0,0,1,0];
    console.log(req.body);
   // console.log(req.user);
    

    // if(useraccount.cart.includes(req.body.productid)){
    //     function isequal(,){

    //     }  
    // }
    // else{
    //     useraccount.cart.push({Id:req.body.productid,
    //         count:1
    //     })
    // }
    search=await cart.find({userid:req.user._id,productid:req.body.productid});
    console.log(search);
    if(search.length){
          x=search[0].count
          await cart.findOneAndUpdate({userid:req.user._id,productid:req.body.productid},{count:x+1})
    }else{
        newadd=await new cart({
            productid:req.body.productid,
            userid:req.user._id,
        })
        await newadd.save()
        console.log(await cart.find({userid:req.user._id}));
    }

    res.redirect('/products');

       
    
    // flag=0;
    // for (let index = 0; index < useraccount.cart.length; index++) {
    //     if(useraccount.cart[index].Id===req.body.productid){
    //         useraccount.cart[index].count=useraccount.cart[index].count;
    //         flag=1;
    //         break;
    //     }
        
    // }
    // if(flag===0){
    //     useraccount.cart.push({
    //         Id:req.body.productid,
    //         count:1
    //     })
    // }
    // console.log(userccount);





}))









module.exports=router;