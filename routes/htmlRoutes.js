const router = require("express").Router();
const saveData = require("../db/db.json");

// GET REQUEST

router.get("/notes", (req, res) => {
  saveData
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
