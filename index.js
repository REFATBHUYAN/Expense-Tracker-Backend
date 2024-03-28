const express = require("express");
const app = express();
var cors = require("cors");
var moment = require("moment");
var mysql = require("mysql2");

const port = 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql5.freemysqlhosting.net",
  user: "sql5694870",
  password: "Fixe8XuvGD",
  database: "sql5694870",
});
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "test",
// });

console.log(moment(Date.now()).format("YYYY-MM-DD"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// category related route
app.get("/category", (req, res) => {
  const q = "SELECT * FROM category";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});
app.post("/category", (req, res) => {
  const q = "INSERT INTO category (`name`,`budget`) VALUES (?)";
  const values = [req.body.name, req.body.budget];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

// expense related route here
app.get("/expense", (req, res) => {
  const q = "SELECT * FROM expense";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.post("/expense", (req, res) => {
  const q =
    "INSERT INTO expense (`date`,`description`,`location`,`payment`,`cateId`, `amount`) VALUES (?)";
  const values = [
    moment(Date.now()).format("YYYY-MM-DD"),
    req.body.description,
    req.body.location,
    req.body.payment,
    req.body.cateId,
    req.body.amount,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

// total budget route

app.get("/budget", (req, res) => {
  const q = "SELECT * FROM budget";
  db.query(q, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});
app.post("/budget", (req, res) => {
  const q = "INSERT INTO budget (`month`,`totalBudget`, `year`) VALUES (?)";
  const values = [
    moment(Date.now()).format("MM"),
    req.body.totalBudget,
    moment(Date.now()).format("YYYY"),
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log(`Expanse app listening on port ${port}`);
});
