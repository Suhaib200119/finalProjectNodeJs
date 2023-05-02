const express=require("express");
const auth_routes=express.Router();
module.exports=auth_routes;
const Users=require("../models/users");
const UsersExpenses = require("../models/user_expenses");

auth_routes.post("/login",async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try {
        const result= await Users.findOne({email,password});
        if(result){
            const expenses=await UsersExpenses.find({userSnn:result.snn});
            res.status(200).json({
                status:"true",
                userInformations:result,
                expenses:expenses
            });
        }else{
            res.status(200).json({
                status:"false",
                message:"Invalid Data"
            });
        }
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});