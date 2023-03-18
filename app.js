
const express = require('express');
const app = express();
const ejsmate = require('ejs-mate');
const path = require('path');
//method overide for patch and put into post
const methodOveride = require('method-override');
const sqlite3=require('sqlite3')

app.use(methodOveride('_method'));


//post request ke liye parsing 
app.use(express.urlencoded({ extended: true }))  //to parse the post request of the urlencoded type
app.use(express.json())  //to parse the info in json type...both are the middlewares


// app.use(express.static(__dirname + '/Resources'));
app.use(express.static("Resources"));
//ejs set kiya
app.engine('ejs', ejsmate);//ejs mate laga rha
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// error class
const ExpressError=require('./utils/ExpressError')
// wrapper err function
const catchAsync = require('./utils/catchAsync');


//Database
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/Tranquil', {
    useNewUrlParser: true,//you have to specify the portno...mongoose changed this so by making false user can go to previous version where port no. is not required
    //useCreateIndex:true,//avoid depracation warnings(warnings that notify us that a specific feature (e.g. a method) will be removed soon (usually in the next minor or major version) and should be replaced with something else.)
    useUnifiedTopology: true// to use new connnection manager of mongoose
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(" Tranquil Database connected");
});


//routes
const feedroutes=require("./routes/feedrouts");

app.use("/feed",feedroutes);

app.get('/home', (req, res) => {
    res.render('home');
})

app.use((err, req, res, next) => {
    const {statusCode=500}=err;
    if(!err.message){
        err.message="Something went Wrong";
    }
    console.log(err);
    res.status(statusCode).render('error',{err});
   
})



app.listen(6969, () => {
    console.log('listening the port 3000 from Tranquil');
});



// const db_name=path.join(__dirname,"database","data.db");
// const db=new sqlite3.Database(db_name,err=>{
//     if(err){
//         return console.log(err.message);
//     }
//     console.log("Local Database Connected");
// })


// const ctfsd=`Create table if not exists fsdusers(
//     uid integer primary key autoincrement,
//     fname varchar(50) Not null,
//     lname varchar(50)
// );`
// db.run(ctfsd,err=>{
//     if(err){
//         return console.log(err.message);
//     }
//     console.log("Table created");
// })

// // You get a UNIQUE constraint failed error when the data that you are inserting has an entry which is already in the 
// //corresponding column of the table that you are inserting into.

// const ifsd=`insert or replace into fsdusers (uid,fname,lname) values
// (1,'Himan','Sarma'),
// (2,'Ram','Raja');`

// db.run(ifsd,err=>{
//     if(err){
//         return console.log(err.message);
//     }
//     console.log("Data Entered");
// })


// app.get('/FSD',(req,res)=>{
//     const sefsd=`Select * from fsdusers order by uid`
//     db.all(sefsd,(err,rows)=>{
//         if(err){
//             return console.log(err.message);
//         }
//         res.render('ffdata',{model:rows})
//     })
// })


