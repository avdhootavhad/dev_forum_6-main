const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const register=(req,res)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            userName:req.body.userName,
            password:hashedPass,
            email:req.body.email,
            phone:req.body.phone,
            role:"user"
        })
        user.save()
        .then(user=>{
            res.send(user)
            // res.json({
            //     message:'User registered'
            // })
        })
        .catch(error=>{
            res.json({
                message:error.message
            })
        })
    })   
}
const login=(req,res)=>{
    var userName=req.body.userName
    var password=req.body.password

    User.findOne({ userName})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                  
                 if(err){
                     res.json({
                         error:err
                     })
                 }
                 if(result){
                     let token=jwt.sign({userName:user.userName,role:user.role},'verySecretValue',{expiresIn:'1h'})
                     res
                    .cookie("access_token", token, {
                     httpOnly: true,
                     secure: process.env.NODE_ENV === "production",
                      })
                     res.status(201).json({
                         message:'Login Successful',
                         token:token
                     })
                      
                 }else{
                     res.status(400).send("Blank userName/password")
                 }
            }
            )

        }else{
            res.json({
                message:'No User Found'
            })
        }
        
    })
}
const logout=(req,res)=>{
    res.clearCookie("access_token")
    res.send(true)
}
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token)
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, "verySecretValue");
      
      return next();
    } catch {
      return res.sendStatus(403);
    }
  }
const returnUser=(req,res)=>{
   //var id= req.params._id
   console.log(req.params.id)
   User.findById(req.params.id)
   .then(result=>{
       res.status(200).json({
           user:result
       })
    
   })
   .catch(err=>{
       res.status(500).json({
           error:err
       })
   })
}
module.exports={
    register,
    login,
    authorization,
    logout,
    returnUser,

}