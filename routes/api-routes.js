// localhost:2020/ <==== is the base

const router = require("express").Router();
const fs = require("fs");
const index = fs.readFileSync("./public/index.html", "utf8");
const notes = fs.readFileSync("./public/notes.html", "utf8");
const { nanoid } = require("nanoid");
let id = nanoid(7);


// GET: saved notes as object notation
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST: new note to db.json
router.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);

    notes.push({
      title: req.body.title,
      text: req.body.text,
      noteId: id,
    });

    console.log(notes);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) return res.send("failed to add");
      return res.json({ msg: "success" });
    });
  });
});

// GET: notes.html
router.get("/notes", (req, res) => {
  res.send(notes);
});

// GET: index.html
router.get("/*", (req, res) => {
  res.send(index);
});

module.exports = router;
