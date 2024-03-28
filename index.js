const express = require("express");
const app = express();
var cors = require("cors");
var mysql = require("mysql2");

const port = 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});

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

app.listen(port, () => {
  console.log(`Expanse app listening on port ${port}`);
});
