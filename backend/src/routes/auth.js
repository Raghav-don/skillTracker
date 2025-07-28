const express=require('express');
const router=express.Router();
const User=require("../models/User.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//registration route
router.post('/register',async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        //check if user exists
        let user=await User.findOne({email});
        if(user) return res.status(400).json({msg:'User already registered'});

        //Hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //save user
        user=new User({username,email,password:hashedPassword});
        await user.save();

        res.status(201).json({msg:'Registration successful'});
    



    } catch(err){
        res.status(500).json({msg:'Server error'});
    }
});

//Login route

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        //find user
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:'Invalid credentials'});
        

        //compare passwords
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

        //Generate JWT
        const token=jwt.sign(
            {
                id:user._id,username:user.username
            },
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.json({token,user:{id:user._id,username:user.username}});
    
    
        
    } catch(err){
        res.status(500).json({msg:'Server error'});
    }

});

//Middleware to protect routes
function authMiddleware(req,res,next){
    const token=req.header('x-auth-token');
    if(!token) return res.status(401).json({msg:'No token,authorization denied'});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch{
        res.status(401).json({msg:'Token is not valid'});
    }
}

module.exports={router,authMiddleware};
