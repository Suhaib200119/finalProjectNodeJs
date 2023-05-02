const mongoose=require("mongoose");
const usersSchema=new mongoose.Schema({
   username:String,
   email:String,
   password:String,
   salary:Number,
   reminderSalary:Number,
   snn:String
});

module.exports=mongoose.model("users",usersSchema);