const path = require("path");
const express = require("express");
const app = express();

const expenseRoute = require("./routes/expenseRoute");

const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const expenseRouter = require("./routers/expenseRouter");

//exprenseModel just needed to be import in these file in order to create table. It will work fine even if we import in the expenseController.
const expenseModel = require("./models/expenseModel"); //Controller main need thi vhi kar dia but yha bhi rakh ke new table generate ho gyi thi.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/get", expenseRouter);
app.use("/get", expenseRoute);
console.log("in app.js");
app.use("/post", expenseRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
