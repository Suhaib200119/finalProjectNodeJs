const Expenses=require("../models/expenses");
const addExpenses=async(req,res,next)=>{
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
}


const getAllExpenses=async(req,res,next)=>{
    const expensesTypes=await Expenses.find();
    res.json({expensesTypes:expensesTypes});
}

const deleteExpenses=async(req,res,next)=>{
    const expensesId=req.params.expensesId;
    try {
        const result=await Expenses.findOneAndDelete({expensesId});
        res.status(200).json({message:"Deleted Successfully",data:result});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}


module.exports={
    deleteExpenses,addExpenses,getAllExpenses
}