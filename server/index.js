const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const mongoose=require("mongoose");
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const axios=require("axios")
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

const categories=require('./models/categories')

const restaurant=require('./routes/restaurant')
const customer=require('./routes/customer')
const user=require('./routes/user')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/zomato')
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connectin error:"));
db.once("open",()=>{
    console.log("Datbase connected");
})

// const store = MongoStore.create({
//     mongoUrl: 'mongodb://127.0.0.1:27017/zomato',
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: 'thisshouldbeabettersecret!'
//     }
// });

// store.on("error", function (e) {
//     console.log("SESSION STORE ERROR", e)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         // secure: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

// app.use(session(sessionConfig))
app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());

// use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(cors())

// app.use((req, res, next) => {
//     // console.log(req.session)
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

app.use('/restaurant',restaurant);
app.use('/customer',customer);
app.use('/user',user);

app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    console.log(req);
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // const cldRes = await handleUpload(dataURI);
    // const category=new categories({title:req.body.title,image:cldRes.url});
    // await category.save();
    res.json("success") 
    // res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.post('/addCategory',async(req,res)=>{
  console.log(req.body);
  const {title,image}=req.body;
  const category=new categories({title,image});
  await category.save();
  res.status(200).json("success");
    // const{}
})

app.get('/data',async(req,res)=>{
  // https://catfact.ninja/breeds?limit=10
  // console.log("hii");
  const data=await categories.find();
  // const data=await axios.get("https://catfact.ninja/breeds?limit=10")
  // console.log(data);
  res.json(data);
    // const{}
})




  app.listen(4000, ()=>{
    console.log("Server is running")
})