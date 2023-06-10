const express=require("express");
const auth_routes=express.Router();
module.exports=auth_routes;
const Users=require("../models/users");
const UsersExpenses = require("../models/user_expenses");
const {hashSync,compareSync} =require("bcryptjs");

auth_routes.post("/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    try {
        const result= await Users.findOne({email:email});
        if(result){
            if(compareSync(password,result.password)){
                const expenses=await UsersExpenses.find({userSnn:result.snn});
                res.status(200).json({
                    status:"true",
                    userInformations:result,
                    userExpenses:expenses
                });
            }else{
                res.status(400).json({
                    status:"false",
                    message:"Invalid Password"
                });
            }
        }else{
            res.status(400).json({
                status:"false",
                message:"Invalid Email"
            });
        }
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

auth_routes.post("/registration",async(req,res,next)=>{
  const user=await Users.findOne({
        "$or":[
            {email:req.body.email},
            {snn: req.body.snn},
        ],
    });
    if(user==null){
        const hasedPassword=hashSync(req.body.password);
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hasedPassword,
            salary: req.body.salary,
            reminderSalary:req.body.salary,
            snn: req.body.snn
        });
        try {
            const result = await newUser.save();
            res.status(200).json({ message: "Account successfully created", informations: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }else{
        res.json({message: "the email or snn used , you must replace the email or snn",});
    }
    
});

