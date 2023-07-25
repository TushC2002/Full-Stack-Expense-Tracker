const path = require("path");
const Expense = require("../models/expenseModel");

exports.getMainPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "public", "views", "index.html"));
};

exports.addExpense = (req, res, next) => {
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;

  Expense.create({
    category: category,
    description: description,
    amount: amount,
  })
    .then((result) => {
      console.log("Expense Added");
      res.redirect("/get/getMainPage");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
      res.json(expenses);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log("Expense Deleted");
      res.redirect("/get/getMainPage");
    })
    .catch((err) => console.log(err));
};

exports.editExpense = (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
  const category = req.body.category;
  const description = req.body.description;
  const amount = req.body.amount;
  console.log(
    "controller main enter kar gya or yeh rhii values : ",
    id,
    category,
    description,
    amount
  );
  Expense.findByPk(id)
    .then((expense) => {
      expense.category = category;
      expense.description = description;
      expense.amount = amount;
      return expense.save();
    })
    .then((result) => {
      res.redirect("/get/getMainPage");
    })
    .catch((err) => console.log(err));
};
