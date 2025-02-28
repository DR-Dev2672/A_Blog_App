const {Schema,model} =require("mongoose")

const { createHmac,randomBytes} = require('crypto');
const { stringify } = require("querystring");
const { createTokenUser } = require("../server/authentication");



const userSchema=new Schema({
  fullName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  salt:{
    type:String
  },
  password:{
    type:String,
    required:true
  },
  profileImageUrl:{
    type:String,
    default:""
    
  },
  role:{
    // type:
      // type:"ADMIN"|"Developer"
  }


    
},{timestamps:true});

 userSchema.pre('save', function(next) {
    const user=this;
    if(!user.isModified("password"))return ;
    const salt=randomBytes(16).toString();
    
     
    const hashedPassword=createHmac("sha256",salt)
    .update(user.password)
    .digest("hex")
    
    

    this.salt=salt;
    console.log(salt)
    this.password=hashedPassword;
    next();
   
  });

  userSchema.static("matchPasswordAndGenerateToken",async function (email,password){
    const user= await this.findOne({email});
    console.log("usershemamatchcheck")
    if(!user) throw new Error('User not found');

    const salt=user.salt;
    console.log(salt);
    console.log("saltcheck")
    const hashedPassword=user.password;
    console.log("passcheck")
    const userProvidedHash=createHmac("sha256",salt)
    .update(password)
    .digest("hex")
    

    console.log("check")

    if(hashedPassword!==userProvidedHash) throw new Error('Password not match')

    const token=createTokenUser(user);
    return token;

   

  })
  // console.log(salt);
  // console.log(hashedPassword)
  

const User=model('user',userSchema)

module.exports=User;