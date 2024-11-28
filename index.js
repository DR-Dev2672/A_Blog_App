const express=require("express")
const path=require("path")
const userRoute=require("./routes/userRoute")

const cookieParser=require("cookie-parser")

const mongoose=require("mongoose")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")



const app=express()


const PORT=8001;



mongoose.connect("mongodb://localhost:27017/blogify")
.then((e)=>console.log("MongoDB connected"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))

app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user
    });

})
app.use("/user",userRoute);

// app.get("/",(req,res)=>{
//     res.send("hii from server")
// })

app.listen(PORT,(req,res)=>{
    console.log(`server is started at PORT:${PORT}`);
})
