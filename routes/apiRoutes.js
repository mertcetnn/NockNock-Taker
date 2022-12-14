const fs = require("fs");
const { request } = require("http");
const notesData = require("../db/db.json");

module.exports = (app) => {
  function writeToDb(notes) {
    // DATA +> STRING DATA
    notes = JSON.stringify(notes);
    console.log(notes);
    // STRING DATA +> OverWrite db/db.json
    fs.writeFileSync("db/db.json", notes, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  //Returning all notes
  app.get("/api/notes", (req, res) => {
    console.log(notesData);
    res.json(notesData);
  });

  app.post("/api/notes", (req, res) => {
    console.log(notesData.length);
    if (notesData.length == 0) {
      req.body.id = 1;
    } else {
      req.body.id = notesData[notesData.length - 1].id + 1;
    }
    console.log("req.body.id: " + req.body.id);
    // pushes body to JSON ARRAY
    notesData.push(req.body);

    writeToDb(notesData);
    console.log(notesData);
    // returns new note into JSON format
    res.json(req.body);
  });

  app.delete("/api/notes/:id", (req, res) => {
    var id = req.params.id;
    for (var i = 0; i < notesData.length; i++) {
      if (notesData[i].id == id) {
        const newArr = notesData.splice(i, i);
        writeToDb(newArr);
      }
    }
  });
};
