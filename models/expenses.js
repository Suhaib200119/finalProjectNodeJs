const mongoose=require("mongoose");
const expensesSchema=new mongoose.Schema({
    expensesId:Number,
    expensesName:String
});

module.exports=mongoose.model("expenses",expensesSchema);

