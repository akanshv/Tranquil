//model from model dir
const Feed = require('../Models/feed');// dp dots cause going to seeds to models
const User = require('../Models/user');
const {arr,userdata}=require('./dataseeding');
const {config}=require('dotenv');
config();





//Database
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.url, {
    useNewUrlParser: true,//you have to specify the portno...mongoose changed this so by making false user can go to previous version where port no. is not required
    //useCreateIndex:true,//avoid depracation warnings(warnings that notify us that a specific feature (e.g. a method) will be removed soon (usually in the next minor or major version) and should be replaced with something else.)
    useUnifiedTopology: true// to use new connnection manager of mongoose
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Tranquil Database connected");
});


//console.log(arr);

const seedDb = async () => {
    
    
    // await User.deleteMany({});
    // for (let index = 0; index <userdata.length; index++) {
    //     const user = new User(userdata[index]);
    //     //console.log(feed);
    //     await user.save();

    // }
    await Feed.deleteMany({});
    for (let index = 0; index < 16; index++) {
        const feed = new Feed(arr[index]);
        //console.log(feed);
        await feed.save();
    }
    
    console.log(await Feed.find({}));
}
seedDb().then(() => {
    mongoose.connection.close();
});
