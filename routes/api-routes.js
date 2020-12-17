const router = require("express").Router();
const fs = require("fs");
const { nanoid } = require("nanoid");
let id = nanoid(7);
const path = require("path");

// GET: saved notes as object notation
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    res.send(parsedData);
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
      id: id,
    });

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) return res.send("failed to add");
      return res.json({ msg: "success" });
    });
  });
});

router.delete("/api/notes/:id", (req, res) => {

  fs.readFile("./db/db.json", "utf8", (err, data) => {

    let obj = JSON.parse(data);
    let keep = obj.filter((element) => element.id !== req.params.id);

    fs.writeFile("./db/db.json", JSON.stringify(keep), (err) => {
      if (err) throw err;
    });
    res.sendStatus(200);
  });
});

// GET: notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET: index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
