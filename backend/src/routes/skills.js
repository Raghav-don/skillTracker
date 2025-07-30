const express=require('express');
const router=express.Router();
const Skill=require('../models/Skill.js');
const {authMiddleware}=require('./auth.js');


//get all skills for the logged-in user

router.get('/',authMiddleware,async(req,res)=>{
    const skills=await Skill.find({
        user:req.user.id}).sort({createdAt:-1});
    
    res.json(skills);
});

//Add a new skill

router.post('/',authMiddleware,async(req,res)=>{
    const {title,description,progress}=req.body;

    const skill=new Skill({user:req.user.id,title,description,progress});

    await skill.save();
    res.status(201).json(skill);
});


//update a skill
router.put('/:id',authMiddleware,async(req,res)=>{
    const updated=await Skill.findOneAndUpdate({
        _id:req.params.id,user:req.user.id},
        req.body,
        {new:true}
    );
    res.json(updated);

    
});

//delete a skill
router.delete('/:id',authMiddleware,async(req,res)=>{
    await Skill.findOneAndDelete({
        _id:req.params.id,user:req.user.id
    });
    res.json({msg:"Skill deleted"});

});

module.exports=router;
