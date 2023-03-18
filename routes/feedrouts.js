const express = require('express');
const app = express();
router=express.Router();

// error class
const ExpressError=require('../utils/ExpressError')
// wrapper err function
const catchAsync = require('../utils/catchAsync');


//model
const feed=require('../Models/feed');
const user=require('../Models/user');

router.get('/', catchAsync(async (req, res, next) => {

    //res.send("Hello from Yelpcamp");
    //yahan pe dbms se aa rha feed
     const feeds = await feed.find({});
     //console.log(feeds);
     res.render('feed/index', {feeds});

}))

router.get('/newblog',(req, res, next) => {
    //res.send("Hello from Yelpcamp");
    res.render('products/products');
})

router.get('/:id',catchAsync(async (req, res, next) => {
    //res.send("Hello from Yelpcamp");
    const id = req.params
    // console.log(id);
    const post = await feed.findById(id.id);
    console.log(post);
    res.render('feed/show',{post});
}))



module.exports=router;

