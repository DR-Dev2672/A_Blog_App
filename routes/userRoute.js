const {Router} =require("express")

const router=Router()
const User=require("../models/userSchema")

router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.post("/signup",async (req,res)=>{
  const {fullName,email,password}=req.body;
  await User.create({
   fullName,
   email,
   password
  })
  res.redirect("/")
  
})

module.exports=router;
