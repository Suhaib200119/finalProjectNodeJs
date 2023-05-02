const express=require("express");
const expenses_routes=express.Router();
module.exports=expenses_routes;

const Expenses=require("../models/expenses");

expenses_routes.post("/addExpenses",async(req,res)=>{
    const expensesData= new Expenses({
        expensesId:req.body.expensesId,
        expensesName:req.body.expensesName
    });

    try {
        const result = await expensesData.save();
        res.status(200).json({
            message:"Inserted Successfully",
            informations:result
        });
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

expenses_routes.get("/getAllExpenses",async(req,res)=>{
    const expensesTypes=await Expenses.find();
    res.json({expensesTypes:expensesTypes});
});


expenses_routes.delete("/delete/:expensesId",async(req,res)=>{
    const expensesId=req.params.expensesId;
    try {
        const result=await Expenses.findOneAndDelete({expensesId});
        res.status(200).json({message:"Deleted Successfully",data:result});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})