
const mongoose=require("mongoose");
const userExpensesSchema=new mongoose.Schema({
    userSnn:String,
    expensesId:Number,
    expensesName:String,
    expensesDate:String,
    expensesValue:Number,
    createdAt: { type: Date, default: Date.now(), expires: 60*60*24*30 },
});

module.exports=mongoose.model("UserExpenses",userExpensesSchema);