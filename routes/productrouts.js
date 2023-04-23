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
    const carter=await cart.find({userid:req.user._id}).populate('product');
    //console.log(carter);
    totalcount=0;
    amount=0;
    var cartor=[];
    for (let index in carter) {
        var product=await Product.findById(carter[index].productid);
        obj={
            product:product,
            indicount:carter[index].count
        }
        cartor.push(obj);
        //console.log(product);
        amount=amount+carter[index].count*product.Price;
        totalcount=totalcount+carter[index].count
        
    }
    console.log(cartor); 
    cartdetails={
         amount:amount,
         totalcount    
    }

    console.log(cartdetails);
    res.render('products/products',{navactive:navactive,products:products,cartdetails:cartdetails,cartor:cartor});

}))


router.delete('/cart/:pid',catchAsync(async (req,res)=>{
    pid=req.params.pid;
    //console.log(pid);
    await cart.deleteOne({productid:pid});
    res.redirect('/products');
}))

router.get('/clearcart',catchAsync( async (req,res)=>{
    await cart.deleteMany({userid:req.user._id});
    res.redirect('/products');
}))


router.post('/changecount/:pid',catchAsync(async (req,res)=>{
    pid=req.params.pid;
    newcount=req.body.newcount;
    //console.log(pid);
    await cart.updateOne({productid:pid},{count:newcount});
    res.redirect('/products');
}))


// router.update('/')

router.post('/buyproduct',catchAsync(async(req,res)=>{
    console.log(req.body);
    res.send(hi);
}))



router.post('/addtocart',catchAsync(async(req,res,next)=>{
    navactive=[0,0,0,0,1,0];
    console.log(req.body);

    search=await cart.find({userid:req.user._id,productid:req.body.productid});
   // console.log(search);
    if(search.length){
          x=search[0].count
          await cart.findOneAndUpdate({userid:req.user._id,productid:req.body.productid},{count:x+1})
    }else{
        newadd=await new cart({
            productid:req.body.productid,
            userid:req.user._id,
        })
        await newadd.save()
    //     console.log(await cart.find({userid:req.user._id}));
     }

    res.redirect('/products');






}))









module.exports=router;