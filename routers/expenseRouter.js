const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.use(express.static("public"));

router.get("/getMainPage", expenseController.getMainPage);

router.get("/getAllExpenses", expenseController.getAllExpenses);

router.get("/deleteExpense/:id", expenseController.deleteExpense);

console.log("router tak aaya");
router.post("/editExpense/:id", expenseController.editExpense);

router.post("/addExpense", expenseController.addExpense);

module.exports = router;
