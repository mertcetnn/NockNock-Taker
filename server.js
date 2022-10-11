const express = require("express");
const notes = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.static("public"));

//Routes in out htmls
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//After data added to json will display on page
app.get("api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
    if (err == true) {
      err();
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
