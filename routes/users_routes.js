const express = require("express");
const users_routes = express.Router();
module.exports = users_routes;
const Users = require("../models/users");
const UsersExpenses = require("../models/user_expenses");
const Expenses = require("../models/expenses");


users_routes.post("/registration", async (req, res) => {
    const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        salary: req.body.salary,
        reminderSalary: req.body.reminderSalary,
        snn: req.body.snn
    });
    try {
        const result = await newUser.save();
        res.status(200).json({ message: "Account successfully created", informations: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

users_routes.post("/addExpenses", async (req, res) => {
    const expenseId=req.body.expensesId;
    const expenseData=await Expenses.findOne({expensesId:expenseId});
    const newExpenses = new UsersExpenses({
        userSnn: req.body.userSnn,
        expensesId: req.body.expensesId,
        expensesName:expenseData.expensesName,
        expensesDate: Date.now(),
        expensesValue: req.body.expensesValue,
    });
    try {

        const result = await newExpenses.save();
        if (result) {
            const userData = await Users.findOne({ snn: req.body.userSnn });
            const reminderSalary = userData.reminderSalary - req.body.expensesValue;
            const user = await Users.findOneAndUpdate(
                { snn: req.body.userSnn }, { $set: { reminderSalary: reminderSalary } }, { new: true }
            );
            res.status(200).json({
                message: "Inserted Successfully",
                informations: result
            });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

users_routes.get("/statisticsPage/:userSnn", async (req, res) => {
    const userSnn = req.params.userSnn;
    try {
        const userData = await Users.findOne({ snn: userSnn });
        const countExpenses = await UsersExpenses.find({ userSnn }).countDocuments();
        const allExpenses = await UsersExpenses.find({ userSnn });
        var sumExpensesValue = 0;
        allExpenses.forEach(element => {
            sumExpensesValue += element.expensesValue;
        });
        res.status(200).json({
            countExpenses: countExpenses,
            allExpenses: allExpenses,
            sumExpenses: sumExpensesValue,
            salary: userData.salary,
            reminderSalary: userData.reminderSalary
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


users_routes.get("/getAllExpenses/:userSnn", async (req, res) => {
    const userSnn = req.params.userSnn;
    try {

        UsersExpenses.aggregate([

            { $match: { userSnn: userSnn }, },
            {
                $group:
                {
                    _id: { expensesName: "$expensesName" },
                    totalExpensesValue: { $sum: "$expensesValue" },
                },
            }


        ])
            .then(result => {

                res.json({ result: result });

            })
            .catch(error => {
                res.json({ error: error.message });
            })

        //

        // res.json({ allExpenses: allExpenses });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

