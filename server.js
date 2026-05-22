const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "testdb"
});

connection.connect((err) => {

  if (err) {
    console.log("DB connection failed ❌", err);
  } else {
    console.log("DB connected successfully ✅");
  }

});

connection.on("error", (err) => {
  console.log("MySQL Error:", err);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", (req, res) => {

  const { name, email, age } = req.body;

  const sql =
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

  connection.query(sql, [name, email, age], (err, result) => {

    if (err) {
      console.log(err);
      res.send("Error saving data");
    } else {
      res.send("Data saved successfully ✅");
    }

  });

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
