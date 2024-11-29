const express=require("express")
const path=require("path")
const userRoute=require("./routes/userRoute")
const blogRoute=require("./routes/blogRoute")
const Blog=require("./models/blog")

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
app.use(express.static(path.resolve("./public")))

app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({}).sort();
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    });

})
app.use("/user",userRoute);
app.use("/blog",blogRoute);

// app.get("/",(req,res)=>{
//     res.send("hii from server")
// })

app.listen(PORT,(req,res)=>{
    console.log(`server is started at PORT:${8001}`);
})