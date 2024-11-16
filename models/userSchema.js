const {Schema,model} =require("mongoose")

const { createHmac,randomBytes } = require('crypto');



const userSchema=new Schema({
  fullname:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  salt:{
    type:String
  },
  password:{
    type:String,
    require:true
  }

    
},{timestamps:true});

userSchema.pre('save', function(next) {
    const user=this;
    const salt=randomBytes(16).toString();
    if(!user.isModified("password"))return ;
     
    const hashedPassword=createHmac('sha256',randomBytes)
    .update(user.password)
    .digest("hex")

    this.salt=salt
    this.password=hashedPassword;
    next();
   
  });
  

const User=model('user',userSchema)