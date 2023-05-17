const mongoose=require("mongoose");
const usersSchema=new mongoose.Schema({
   username:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      uniqe:true,
      match:[/.+\@.+\..+/,"invalid email!"],
   },
   password:{
      type:String,
      required:true,
      minlength:[9,"the min length 9"]
   },
   salary:{
      type:Number,
      required:true,
   },
   reminderSalary:{
      type:Number,
      required:true,
   },
   snn:{
      type:String,
      required:true,
      minlength:[9,"the min length 9"]
   },
});

module.exports=mongoose.model("users",usersSchema);