const express=require("express");
const expenses_routes=express.Router();
module.exports=expenses_routes;
const expensesController=require("../controllers/expensesController");

expenses_routes.post("/addExpenses",expensesController.addExpenses);

expenses_routes.get("/getAllExpenses",expensesController.getAllExpenses);

expenses_routes.delete("/delete/:expensesId",expensesController.deleteExpenses);