// localhost:2020/ <==== is the base

const router = require("express").Router();
const fs = require("fs");
// const index = fs.readFileSync("./public/index.html", "utf8");
// const notes = fs.readFileSync("./public/notes.html", "utf8");
const { nanoid } = require("nanoid");
let id = nanoid(7);
const path = require("path");

// GET: saved notes as object notation
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    // console.log(data);
    const parsedData = JSON.parse(data);
    console.log(parsedData);
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

    // console.log(notes);

    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) return res.send("failed to add");
      return res.json({ msg: "success" });
    });
  });
});

router.delete("/api/notes/:id", (req, res) => {
  // let keep;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // console.log(data)
    let obj = JSON.parse(data);
    let keep = obj.filter((element) => element.id !== req.params.id);
    console.log(keep);
    fs.writeFile("./db/db.json", JSON.stringify(keep), (err) => {
      if (err) throw err;
      // res.json(keep);
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
