const express = require("express");
const users_routes = express.Router();
module.exports = users_routes;
const usersController=require("../controllers/usersController");
const users = require("../models/users");

users_routes.post("/registration",usersController.registration);

users_routes.post("/Add_daily_expense",usersController.add_daily_expense );

users_routes.get("/statisticsPage/:userSnn",usersController.statisticsPage);

users_routes.get("/groupExpenses/:userSnn",usersController.groupExpenses);

users_routes.get("/homePage/:userSnn",usersController.homePage);
// users_routes.get("/avgExpenses/:userSnn",usersController.avgExpenses);

