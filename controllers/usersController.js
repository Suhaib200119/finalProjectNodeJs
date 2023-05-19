const Users = require("../models/users");
const UsersExpenses = require("../models/user_expenses");
const Expenses = require("../models/expenses");

const add_daily_expense = async (req, res, next) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const expenseId = req.body.expensesId;
    const expenseData = await Expenses.findOne({ expensesId: expenseId });
    const newExpenses = new UsersExpenses({
        userSnn: req.body.userSnn,
        expensesId: req.body.expensesId,
        expensesName: expenseData.expensesName,
        expensesDate: formattedDate,
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
}

const statisticsPage = async (req, res, next) => {
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
}

const groupExpenses = async (req, res, next) => {
    const userSnn = req.params.userSnn;
    try {

        UsersExpenses.aggregate([
            {
                $match: {
                    userSnn: userSnn
                },
            },
            {
                $group: {
                    _id: { expensesName: "$expensesName" },
                    totalExpensesValue: { $sum: "$expensesValue" },
                },
            },
        ]).then(result => {
            res.json({ result: result });
        }).catch(error => {
            res.json({ error: error.message });
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const homePage = async (req, res, next) => {
    const userSnn = req.params.userSnn;
    try {
        console.log(`userSnn : ${userSnn}`);
        const allExpenses = await UsersExpenses.find({ userSnn: userSnn });
        console.log(`allExpenses : ${allExpenses}`);
        res.json({ expenses: allExpenses });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
    homePage, groupExpenses, statisticsPage, add_daily_expense
}