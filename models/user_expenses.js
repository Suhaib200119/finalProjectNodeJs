const mongoose = require("mongoose");
const userExpensesSchema = new mongoose.Schema({
    userSnn: {
        type: String,
        required: true,
        minlength: [9, "the min length 9"]
    },
        expensesId: { 
        type: Number,
         required: true 
        },
    expensesName: {
        type: String,
        required: true,
    },
    expensesDate: {
        type: String,
        required: true,
    },
    expensesValue: {
        type: Number,
        required: true,
    },
    createdAt: { type: Date, default: Date.now(), expires: 60 * 60 * 24 * 30 },
});

module.exports = mongoose.model("UserExpenses", userExpensesSchema);