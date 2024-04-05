require("dotenv").config()
const express = require('express')
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB=require('./config/dbConn')
const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path');
const fetch=require('node-fetch')
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

const app = express()
const PORT = process.env.PORT || 8888

connectDB()

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload=multer({storage:storage})
const upload=multer({dest:'./public/uploads'})

app.post('/', upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully!');
});

app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())
app.use("/api/auth",require("./router/authRoutes"))
app.use("/api/vacation",require("./router/vacationRoute"))
app.use("/api/user",require("./router/userRoute"))
app.get("/uploads/:filename",(req,res)=>
{
    const imagePath=path.join(__dirname,'public/uploads',req.params.filename);
    res.sendFile(imagePath,{headers:{"Content-Type":'image/jpeg'}})
});
app.get('/',(req,res)=>{
    res.send("HomePage")
})

app.get('/*',(req,res)=>{
    res.status(404).send('<h1>Resource Not Found</h1>')
    })
mongoose.connection.once('open',()=>{
    console.log('Connected');
    app.listen(PORT, ()=>console.log(`server running on ${PORT} 
    `))

    mongoose.connection.on('error', err=>{
        console.log(err);
    })
})
